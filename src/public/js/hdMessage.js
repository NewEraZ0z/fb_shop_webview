(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'Messenger'));

window.extAsyncInit = function() {
  // the Messenger Extensions JS SDK is done loading 
  //get user PSID
  MessengerExtensions.getContext('269582959293477', 
  function success(thread_context){
    let userPSID = thread_context.psid;
    document.getElementById("psid").value = userPSID;
    
  },
  function error(err){
    // error
  }
);
  // webview closed
  document.getElementById("submitBtn").addEventListener('click',function ()
    {
     MessengerExtensions.requestCloseBrowser(function success() {
  
    // send request
    let dataBody = {
    psid: document.getElementById("psid").value, // Use the PSID passed as a parameter
    foods: foods, // Assuming 'foods' is an object with item data as you've defined
    }

       // request via ajax
       $.ajax({
         method: 'POST',
         data: dataBody,
         url: '${window.location.origin}/setup-webview',
         success: function(data){
           console.log('success response from server ajax:', data)
         },
         error: function(error){
           console.log('error response from server ajax:', error)
         }
       })
       
}, function error(err) {
  // an error occurred
});
    }  ); 
  
};
