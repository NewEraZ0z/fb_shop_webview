// Set a cookie with SameSite=none
document.cookie = "my-cookie=1; SameSite=None; Secure";

// Create a function to send the cookie to the third-party server
function sendCookieToThirdPartyServer(cookieValue) {
  // Make a request to the third-party server with the cookie in the header
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://webview-fd-order.onrender.com/webview");
  xhr.setRequestHeader("Cookie", `my-cookie=${cookieValue}`);
  xhr.send();
}

// Get the value of the cookie and send it to the third-party server
const cookieValue = document.cookie.match(/(^|;) ?my-cookie=([^;]*)/g)[0].split("=")[1];
sendCookieToThirdPartyServer(cookieValue);
