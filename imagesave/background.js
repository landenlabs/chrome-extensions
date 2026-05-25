//
// Download Largest Image - background.js
//

/// Docs
///   https://developer.chrome.com/blog/crx-scripting-api
///   https://developer.chrome.com/docs/extensions/reference/api/scripting#injected_code
///   https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
///   https://developer.chrome.com/docs/extensions/reference/api/commands
///   https://stackoverflow.com/questions/75326332/use-chrome-downloads-api-in-manifest-v3-chrome-extension
///
///  settings - disable prompt for save-as 
///    https://stackoverflow.com/questions/41400018/chrome-downloads-download-ignores-saveas-option-and-opens-the-dialog-regardless
///
///  storage - 
///    https://dev.to/paulasantamaria/chrome-extensions-local-storage-1b34
///
///  javascript
///     https://www.w3schools.com/js/js_string_methods.asp
///     https://playcode.io/javascript
///
///  Html input
///     https://www.w3schools.com/tags/att_input_type.asp
///
/// Examples:
///   https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/functional-samples/sample.page-redder/service-worker.js


/// Must add  "type": "module" to manifest background section.
/// see https://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file
import { getSaveAsFor } from './common.js';

var options = { save_from: 1000, save_to: 2000, save_step: 1, save_fmt: "{name.20}_{####}", popup: "a" };


getOptions();

// manifest.js defines _execute_action
chrome.action.onClicked.addListener((tab) => incSaveFindSaveImage(tab));

/*
// ignored if manifest.js defines _execute_action
chrome.commands.onCommand.addListener((command) => {
  if (command === "save-largest-image") {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => incSaveFindSaveImage(tabs[0]) );
} } );
*/

function defaultOptions(optData) {
	if (!optData || !optData.save_fmt) {
		optData['save_from'] = 1000;
		optData['save_to'] = 2000;
		optData['save_step'] = 1;
		optData['save_fmt'] = '{name.20}_{####}';
		optData['popup'] = 'a';
		chrome.storage.local.set(optData);
	}
	options = Object.assign(options, optData);
}

function getOptions() {
	defaultOptions(options);
	chrome.storage.local.get([ 'save_fmt', 'save_from', 'save_to', 'save_step', 'popup' ])
		.then((optData) => { defaultOptions(optData) });
}

function incSaveFindSaveImage(tab) {
	chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });
	getOptions();
	chrome.storage.session.get(['saveNumber']).then((result) => {
		let saveNumber = result.saveNumber;
		if (isNaN(saveNumber) || saveNumber < options.save_from || saveNumber >= options.save_to) {
			saveNumber = options.save_from;
		}
		saveNumber++;
		// console.log("saveNumber=" + saveNumber)
		chrome.storage.session.set({ 'saveNumber': saveNumber }).then(() => findAndSaveImage(tab, saveNumber));
	});
}

function findAndSaveImage(tab, saveNumber) {
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ['saveimage.js']
		// , args: [ saveNumber ]  // Not allowed with 'files'
	}).then(result => saveImage(tab, result));
}

async function saveImage(tab, largestImageResult) {
	const result = await chrome.storage.session.get(['saveNumber']);
	let saveNumber = result.saveNumber;

	if (largestImageResult && largestImageResult.length > 0 && largestImageResult[0].result) {
		saveImageAs(tab, largestImageResult[0], saveNumber);
	} else {
		// No large image to save, revert update to saveNumber
		saveNumber--;
		await chrome.storage.session.set({ 'saveNumber': saveNumber });
	}
}

function saveImageAs(tab, largestImageResult, saveNumber) {
	// console.log("saveImageAs");
	// console.dir(largestImageResult);
	const srcInfo = largestImageResult.result;
	const saveAs = getSaveAsFor(srcInfo, saveNumber, options);
	chrome.downloads.download({ url: srcInfo.src, filename: saveAs }).then((downloadId) => saveDone(tab, srcInfo, saveAs, downloadId));

	chrome.downloads.onChanged.addListener((dd) => {
		/*
			console.log(dd);
	    
			// https://developer.chrome.com/docs/extensions/reference/api/downloads#type-State
			if (dd.state && dd.state.current == "complete") { // in_progress, interrupted or complete
				// https://developer.chrome.com/docs/extensions/mv2/reference/windows#method-create
			  	chrome.windows.create({ type: "popup", url: "good.html", width: 300, height: 100, left: 100, top:100 }
					, function(newWindow) {
					const ttsId = newWindow.id;
					console.log("--- Alert window ---")
					console.log(newWindow); 
					// Can't get alert.html to listen for message
					// chrome.runtime.sendMessage({ type: "a_message_type",  foo: "bar" });
					
					// Auto close - need to wait for sound to play
					chrome.windows.remove(ttsId);
					// newWindow.close();
				});
			} else if (dd.state && dd.state.current == "interrupted") {
				chrome.windows.create({ type: "popup", url: "fail.html", width: 300, height: 100, left: 100, top:100 });
			}
		 */
	});
}

function saveDone(tab, srcInfo, saveAs, downloadId) {
	chrome.downloads.search({ id: downloadId }).then((result) => saveDownloadInfo(tab, downloadId, result, srcInfo, saveAs))
}

function saveDownloadInfo(tab, downloadId, result, srcInfo, saveAs) {
	// console.log("downInfo for " + saveAs);
	// console.dir(result);

	if (result && result.length > 0) {
		// Fails - must call from a click/event listener
		// chrome.downloads.open( downloadId );
	}

	openStatusPopup(tab, srcInfo, saveAs);
}

function openStatusPopup(tab, srcInfo, saveAs) {
	chrome.storage.local.get(['popup']).then((optData) => {
		if (optData.popup !== '-') {
			// Save parameters to session, then launch status script.
			chrome.storage.session.set({ src_info: srcInfo, save_as: saveAs }).then(() => {
				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					files: ['savestatus.js']
					// , args: [ saveNumber ]  // Not allowed with 'files'
				});
			});
		}
	});
}
