
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'Messenger'));


window.extAsyncInit = function() {
 MessengerExtensions.getSupportedFeatures(function success(result) {
  let features = result.supported_features;
  if (features.indexOf("context") != -1) {
    MessengerExtensions.getContext('269582959293477',
      function success(thread_context) {
        // success
        let userId = thread_context.psid;
        document.getElementById("psid").value = userId;
        // More code to follow
      handleSaveBtn(userId);
      },
      function error(err) {
        console.log(err);
      }
    );
  }
}, function error(err) {
  console.log(err);
});
};

function handleSaveBtn(userId) {

  const serverEndpoint = '/setup-webview';

  // Prepare the data to send to the server
  const requestData = {
    psid: userId, // Use the retrieved PSID
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
  // Close the webview after making the request
  MessengerExtensions.requestCloseBrowser(function success() {
  console.log("Webview closing");
  }, function error(err) {
    console.log(err);
  });
}
