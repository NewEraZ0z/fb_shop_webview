const request = require('request');

// Function to generate checkout URL
const generateCheckoutUrl = () => {
    return new Promise((resolve, reject) => {
    // Define the payload for the Chargily Pay API request
    const payload = {
        "amount": 5000,
        "currency": "dzd",
        "payment_method": "edahabia",
        //"success_url": "<string>",
        "pass_fees_to_customer": "2.5",
        "collect_shipping_address": true,
    };

    // Define headers for the API request
    const headers = {
        "Authorization": "Bearer test_sk_nu2KF22Dc60fD6LdkIoAwlp3WgfCj5rqn15atqeB",
        "Content-Type": "application/json"
    };

    // Define the URL for the Chargily Pay API
    const url = "https://pay.chargily.net/test/api/v2/checkouts";

    // Send a POST request to the Chargily Pay API
    request.post({
        url: url,
        headers: headers,
        json: payload
    }, (error, response, body) => {
        if (error) {
            console.error("Error:", error);
            reject(error);
        } else {
            // Extract the checkout URL from the response
            const checkoutUrl = body.checkout_url;
            console.log("Checkout URL:", checkoutUrl);
            // Here you can perform any further processing with the checkout URL
            // For example, you can store it in a database, cache, or return it directly
           resolve(checkoutUrl);
          }
      });
   });
};

module.exports = {
    generateCheckoutUrl: generateCheckoutUrl
};
