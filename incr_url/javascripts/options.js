$(document).ready(function() {
  chrome.runtime.sendMessage("regexp", function(response) {
    $("#regexp").val(response);
  });
  chrome.runtime.sendMessage("step", function(response) {
    $("#step").val(response);
  });

  $("#options-form").submit(function(e) {
    e.preventDefault();
    save_options();
  });

  $("#reset").click(function() {
    restore_defaults();
  });
});

// Saves options to localStorage
function save_options() {
  var regexp = $("#regexp").val();
  localStorage["regexp"] = regexp;
  var step = $("#step").val();
  localStorage["step"] = step;
  $("#status").text("Options saved.");
  setTimeout(function() {
    $("#status").text("");
  }, 750);
}

// Delete options from localStorage
function restore_defaults() {
  delete localStorage["regexp"];
  delete localStorage["step"];
  chrome.runtime.sendMessage("regexp", function(response) {
    $("#regexp").val(response);
  });
  chrome.runtime.sendMessage("step", function(response) {
    $("#step").val(response);
  });
  $("#status").text("Options reset.");
  setTimeout(function() {
    $("#status").text("");
  }, 750);
}
