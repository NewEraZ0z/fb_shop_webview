const options = {
  method: 'POST',
  headers: {
    Authorization: 'Bearer test_sk_nu2KF22Dc60fD6LdkIoAwlp3WgfCj5rqn15atqeB',
    'Content-Type': 'application/json'
  },
  body: '{"amount":2000,"currency":"dzd","payment_method":"edahabia","success_url":"https://fb-shop-webview.onrender.com"}' // Truncated for brevity
};

fetch('https://pay.chargily.net/test/api/v2/checkouts', options)
  .then(response => response.json())
  .then(response => {
    if (response.checkout_url) { // Check for existence before accessing
      console.log(response.checkout_url); // Log for debugging (optional)
      // Assuming you want to use the URL in another file, return it:
      return response.checkout_url;
    } else {
      console.error('Checkout URL not found in response');
      // Handle the case where checkout_url is missing (optional)
    }
  })
  .catch(err => console.error(err));

// **Optional (for using in another file):**
// Let's say you want to export the checkout URL as a Promise:
  module.exports = fetchCheckoutUrl = async () => {
  const response = await fetch('https://pay.chargily.net/test/api/v2/checkouts', options);
  const data = await response.json();
  if (data.checkout_url) {
    return data.checkout_url;
  } else {
    console.error('Checkout URL not found in response');
    return null; // Or throw an error if necessary
  }
};












// import('node-fetch')
//   .then((nodeFetch) => {
//     const fetch = nodeFetch.default;

// const generateCheckoutUrl = async () => {

//   try {
//     // Import 'node-fetch' dynamically
//     const { default: fetch } = await import('node-fetch');

//   const options = {
//     method: 'POST',
//     headers: {Authorization: 'Bearer test_sk_nu2KF22Dc60fD6LdkIoAwlp3WgfCj5rqn15atqeB', 'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       "amount": 2000,
//       "currency": "dzd",
//       "payment_method": "edahabia",
//       "collect_shipping_address": true,
//       "success_url": "hhttps://fb-shop-webview.onrender.com"

//     })
//   };
//     const response = await fetch('https://pay.chargily.net/test/api/v2/checkouts', options);
//     const responseData = await response.json();
//     console.log("Checkout URL:", responseData.checkout_url);
//     return responseData.checkout_url; // Return the checkout URL
//   } catch (err) {
//     console.error(err);
//     throw err; // Throw the error to handle it outside of this function
//   }
// };


        
// // Export the 'generateCheckoutUrl' function
// module.exports = {
//   generateCheckoutUrl: generateCheckoutUrl
// };
// })
//   .catch((error) => {
//     console.error('Error loading node-fetch:', error);
//   });







// const request = require('request');

// // Function to generate checkout URL
// const generateCheckoutUrl = () => {
//     return new Promise((resolve, reject) => {
//     // Define the payload for the Chargily Pay API request
//     const payload = {
//         "amount": 5000,
//         "currency": "dzd",
//         "payment_method": "edahabia",
//         //"success_url": "<string>",
//         "pass_fees_to_customer": "2.5",
//         "collect_shipping_address": true,
//     };

//     // Define headers for the API request
//     const headers = {
//         "Authorization": "Bearer test_sk_nu2KF22Dc60fD6LdkIoAwlp3WgfCj5rqn15atqeB",
//         "Content-Type": "application/json"
//     };

//     // Define the URL for the Chargily Pay API
//     const url = "https://pay.chargily.net/test/api/v2/checkouts";

//     // Send a POST request to the Chargily Pay API
//     request.post({
//         url: url,
//         headers: headers,
//         json: payload
//     }, (error, response, body) => {
//         if (error) {
//             console.error("Error:", error);
//             reject(error);
//         } else {
//             // Extract the checkout URL from the response
//             const checkoutUrl = body.checkout_url;
//             console.log("Checkout URL:", checkoutUrl);
//             // Here you can perform any further processing with the checkout URL
//             // For example, you can store it in a database, cache, or return it directly
//            resolve(checkoutUrl);
//           }
//       });
//    });
// };

// module.exports = {
//     generateCheckoutUrl: generateCheckoutUrl
// };


