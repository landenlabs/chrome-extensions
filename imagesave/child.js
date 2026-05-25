//  Not used
$(function () {
  chrome.runtime.onMessage.addListener(function (request) {
    if (request.type === "a_message_type") {
      console.log(request.foo); // request has the payload from the parent window
    }
  });
});
