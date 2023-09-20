(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'Messenger'));



window.extAsyncInit = function() {
  // the Messenger Extensions JS SDK is done loading 
  MessengerExtensions.getContext('your app', 
    function success(thread_context){
      // success
      document.getElementById('psid').value =  thread_context.psid; // Store PSID as a global variable
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
    psid: psid, // Use the PSID passed as a parameter
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
      // Webview closed
    },
    function error(err) {
      // An error occurred while closing the webview
      console.log(err);
    }
  );
}
