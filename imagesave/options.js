//
// Download Largest Image - options.js
//

'use strict'

let save_fmt = document.getElementById('save_fmt');
let save_from = document.getElementById('save_from');
let save_to = document.getElementById('save_to');
let save_step = document.getElementById('save_step');

let open_never = document.getElementById('open_never');
let open_normal = document.getElementById('open_normal');
let tap_close = document.getElementById('tap_close');
let auto_close = document.getElementById('auto_close');

function setRadioBtn(data, value, checkbox) {
    checkbox.checked = (data === value);
};

// Gets thumbnails and saveImages value from storage
chrome.storage.local.get([ 'save_fmt', 'save_from', 'save_to', 'save_step',  'popup' ],
  function (data) {
    save_fmt.defaultValue = data.save_fmt ? data.save_fmt : "{name}_{####}";
    save_from.defaultValue = data.save_from ? data.save_from : "1000";
    save_to.defaultValue = data.save_to ? data.save_to : "2000";
    save_step.defaultValue = data.save_step ? data.save_step : "1";

    setRadioBtn(data.popup, '-', open_never);
    setRadioBtn(data.popup, 'n', open_normal);
    setRadioBtn(data.popup, 't', tap_close);
    setRadioBtn(data.popup, 'a', auto_close);
  });

// Saves users prefrences
function storeOption(optionName, optionValue) {
    let data = {};
    data[optionName] = optionValue;
    chrome.storage.local.set(data);
};

save_fmt.onchange = function () {
    storeOption('save_fmt', save_fmt.value);
};
save_from.onchange = function () {
    storeOption('save_from', save_from.value);
};
save_to.onchange = function () {
    storeOption('save_to', save_to.value);
};
save_step.onchange = function () {
    storeOption('save_step', save_step.value);
};


// Saves users prefrences
function storeRadio(optionName, optionState, optionValue) {
    if (optionState) {
        let data = {};
        data[optionName] = optionValue;
        chrome.storage.local.set(data);
    }
};

open_never.onchange = function () {
    storeRadio('popup', open_never.checked, '-');
};
open_normal.onchange = function () {
    storeRadio('popup', open_normal.checked, 'n');
};
tap_close.onchange = function () {
    storeRadio('popup', tap_close.checked, 't');
};
auto_close.onchange = function () {
    storeRadio('popup', auto_close.checked, 'a');
};

/*
let savedImages = document.getElementById('savedImages');  // div

let deleteButton = document.getElementById('delete_button');

deleteButton.onclick = function() {
  let blankArray = [];
  chrome.storage.local.set({'savedImages': blankArray});
  location.reload();
};
 
// Gets saved downloaded images from storage
chrome.storage.local.get('savedImages', function(element) {
  let pageImages = element.savedImages;
  pageImages.forEach(function(image) {
    // Create div element and give it class of square
    let newDiv = document.createElement('div');
    newDiv.className = 'square';
    // Create image element
    let newImage = document.createElement('img');
    // let lineBreak = document.createElement('br');
    // Image source is equal to saved download image
    newImage.src = image;
    newImage.addEventListener('click', function() {
      chrome.downloads.download({url: newImage.src});
    });
    // Append all elements to options page
    newDiv.appendChild(newImage);
    savedImages.appendChild(newDiv);
  });
});

*/
