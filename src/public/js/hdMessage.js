MessengerExtensions.getSupportedFeatures(function success(result) {
  let features = result.supported_features;
  if (features.indexOf("context") != -1) {
    MessengerExtensions.getContext('269582959293477',
      let userPSID;
      function success(thread_context) {
        // success
        userPSID = $("#psid").val(thread_context.psid);
        // More code to follow
        handleSaveBtn(userPSID);
      },
      function error(err) {
        console.log("return content messengerExtension",err);
         userPSID = $("#psid").val(sender_psid);
        handleSaveBtn(userPSID);
      }
    );
  }
}, function error(err) {
  console.log(err);
});


function handleSaveBtn(userPSID) { // Pass psid as a parameter
  // Assuming you have a server endpoint to send the 'foods' data to.
  const serverEndpoint = '/setup-webview';

  // Prepare the data to send to the server
  const requestData = {
    psid: userPSID,
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
