jQuery.noConflict();

// Fetch regexp
chrome.runtime.sendMessage("regexp", function(response) {
  if (String(window.location).match(new RegExp(response))) {
    // Show button if valid url
    chrome.runtime.sendMessage("show");

    // Handle keydown
    jQuery(window).bind('keydown',function(e) {
      if (e.ctrlKey && e.altKey) {
        if (e.keyCode == 37) {
          chrome.runtime.sendMessage("decrement");
        } else if (e.keyCode == 39) {
          chrome.runtime.sendMessage("increment");
        }
      }
    });
  }
});
