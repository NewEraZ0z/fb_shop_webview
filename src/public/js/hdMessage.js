  (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.com/en_US/messenger.Extensions.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'Messenger'));
    window.extAsyncInit = function () {
        var isSupported = MessengerExtensions.isInExtension(); 
        alert(isSupported);
        // the Messenger Extensions JS SDK is done loading
        MessengerExtensions.getContext('269582959293477', 
          function success(result){
            alert("Success: "+result.psid);
          },
          function error(result){
            alert(JSON.stringify(result));
          }
        );
    };
