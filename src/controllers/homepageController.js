require("dotenv").config();
//import request from "request";
const request = require("request");







// Import the necessary modules or functions
//const { generateCheckoutUrl } = require("../chargilypay.js");
// const { ChargilyClient } = require("@chargily/chargily-pay");

// const client = new ChargilyClient({
//   api_key: 'test_sk_nu2KF22Dc60fD6LdkIoAwlp3WgfCj5rqn15atqeB',
//   mode: 'test', // Change to 'live' when deploying your application
// });

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const WEBVIEW_URL = process.env.WEBVIEW_URL;
let getHomepage = (req, res) => {
    return res.render("homepage.ejs");
};

let getWebhook = (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = MY_VERIFY_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
};

let postWebhook = (req, res) => {
    // Parse the request body from the POST
    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {

            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);


            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }

        });

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

};

// Handles messages events
let handleMessage = (sender_psid, received_message) => {
    let response;

   // Checks if the message contains text
    if (received_message.text) {
        // Create the payload for a basic text message, which
        // will be added to the body of our request to the Send API
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
        };
        
    if (received_message.text.toLowerCase() === "webview") {
           response = {
                       "attachment":{
                           "type":"template",
                           "payload":{
                               "template_type":"button",
                               "text":"What do you want to do next?",
                               "buttons":[
                                    {
                                     "type":"web_url",
                                     "url": WEBVIEW_URL + "/" + sender_psid,
                                     "title":"Order Now",
                                     "messenger_extensions": true,
                                     "webview_height_ratio": "tall",
                                    },
          
                                        ]
                                  }
                       }
             }; 
        }
    } else if (received_message.attachments) {
        // Get the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachment_url,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Yes!",
                                "payload": "yes",
                            },
                            {
                                "type": "postback",
                                "title": "No!",
                                "payload": "no",
                            }
                        ],
                    }]
                }
            }
        }
    }

    // Send the response message
    callSendAPI(sender_psid, response);
};




// // Your code to obtain the checkout_url
// const { checkout_url } =  client.createCheckout({
//   amount: 2000,
//   currency:"dzd",
//   success_url: 'https://fb-shop-webview.onrender.com/webview/:sender_psid',  
//   failure_url: 'https://fb-shop-webview.onrender.com/webview/:sender_psid',
//   payment_method: 'edahabia', // Optional, defaults to 'edahabia'
//   locale: 'en', // Optional, defaults to 'ar'
//   pass_fees_to_customer: true, // Optional, defaults to false
//   collect_shipping_address: true, // Optional, defaults to false
// });


(async () => {
  const fetch = await import('node-fetch'); // Corrected async import syntax

  const fetchCheckoutUrl = async () => {
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test_sk_nu2KF22Dc60fD6LdkIoAwlp3WgfCj5rqn15atqeB', // Replace with your secret key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 2000,
        currency: "dzd",
        payment_method: "edahabia",
        collect_shipping_address: true,
        success_url: "https://fb-shop-webview.onrender.com",
      }),
    };

    try {
      const response = await fetch('https://pay.chargily.net/test/api/v2/checkouts', options);
      const responseData = await response.json();
      return responseData.checkout_url;
    } catch (err) {
      console.error(err);
      throw err; // Re-throw the error for handling outside
    }
  };

  // Handles messaging_postbacks events
  let handlePostback = async (sender_psid, received_postback) => {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'yes') {
      response = { "text": "Thanks!" }
    } else if (payload === 'no') {
      response = { "text": "Oops, try sending another image." }
    } else if (payload === 'Order Now') {

      // Fetch the checkout URL asynchronously
      const checkoutUrl = await fetchCheckoutUrl();

      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": "What do you want to do next?",
            "buttons": [
              {
                "type": "web_url",
                "url": checkoutUrl, // Use the fetched checkout URL
                "title": "Order Now",
                "messenger_extensions": true,
                "webview_height_ratio": "tall",
              },
            ],
          },
        },
      };
    }

    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
  };
})();

// Sends response messages via the Send API
let callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v18.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};

let getWebViewPage = (req, res) => {
    let sender_psid = req.params.sender_psid
    return res.render("food.ejs", {
        sender_psid: sender_psid
    });
};


let handleWebView = (req, res) => {
    console.log(req.body);
    let response =  {
        "text": 'Exellent !! nous avons Recus votre Commande we are coocking'
    };
    
    callSendAPI(req.body.psid, response);
    return res.redirect("/");
};


let handleWebInfo = async (req, res) => {

    
// Send the HTTP request to the Messenger Platform
    let request_body = {
        
  "get_started": {
      "payload": "GET_STARTED_PAYLOAD"
        },
        "persistent_menu": [
        {
            "locale": "default",
            "composer_input_disabled": false,
            "call_to_actions": [
                 {
                    "type": "postback",
                    "title": "Order Now",
                    "payload": "Order Now"
                }
            ]
        }
      ]
};

    return new Promise((resolve, reject)=>{
        try{
             request({
        "uri": "https://graph.facebook.com/v18.0/me/messenger_profile",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, response, body) => {
        if (!err) {
            console.log('--------------------------------')
            console.log('set persistant menu:', response) 
            console.log('--------------------------------')
            return res.send('setup done!')
        } else {
            return res.send('somthing wrongs setup, please check logs')
        }
    });
        }catch(e) {
            reject(e);
        }
    })

}

module.exports = {
    getHomepage: getHomepage,
    getWebhook: getWebhook,
    postWebhook: postWebhook,
    getWebViewPage: getWebViewPage,
    handleWebView: handleWebView,
    handleWebInfo: handleWebInfo,
    handlePostback
};
