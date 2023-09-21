(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'Messenger'));



window.extAsyncInit = function() {
  // the Messenger Extensions JS SDK is done loading 
  MessengerExtensions.getContext('269582959293477', 
    function success(thread_context){
      // success
      document.getElementById('psid').value =  thread_context.psid; // Store PSID as a global variable
      let userID = thread_context.psid;
      console.log("PSID:", userID);
    },
    function error(err){
      // error
      console.log(err);
    }
  );
};

function handleSaveBtn() { // Pass psid as a parameter
  // Assuming you have a server endpoint to send the 'foods' data to.
  const serverEndpoint = '/setup-webview';

  // Prepare the data to send to the server
  const requestData = {
    psid: document.getElementById("psid").value, // Use the PSID passed as a parameter
    foods: foods, // Assuming 'foods' is an object with item data as you've defined
  };

  // Make an HTTP POST request to the server
  fetch(serverEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server as needed
      console.log(data);
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });


  // Close the webview when the request is initiated
  MessengerExtensions.requestCloseBrowser(
    function success() {
      
  // fetch data to airtable 
  
// Define the URL where you want to send the data
const apiUrl = "https://webhook.site/000d2234-460a-44f2-a502-e2ca1f9858d1"; // Replace with your API endpoint

// Make an HTTP POST request to the API
fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json", // Set the content type to JSON
  },
  body: JSON.stringify(requestData), // Convert the JavaScript object to a JSON string
})
  .then((response) => response.json()) // Parse the response as JSON
  .then((data) => {
    // Handle the response data here
    console.log("Response from the server:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
  // fetch data to airtable 
      // Webview closed
    },
    function error(err) {
      // An error occurred while closing the webview
      console.log(err);
    }
  );
}
