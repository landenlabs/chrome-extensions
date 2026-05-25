//
// Download Largest Image - saveimage.js
//

(function () {
	const images = document.querySelectorAll('img');
	let largestImage = null;
	let largestArea = 0;

	for (const image of images) {
		const area = image.width * image.height;
		if (area > largestArea) {
			largestArea = area;
			largestImage = image;
		}
	}

	let srcSize = "";
	if (largestImage != null) {
	 	srcSize = largestImage.width + " x  " + largestImage.height;
		// chrome.storage.session.set({ src_size: srcSize, src_title: document.title });
		/*
		chrome.storage.session.get(['saveNumber']).then( (result) => {
			let saveNumber = result.saveNumber;
			console.log("saveimage.js saveNumber=" + saveNumber);
			createPopup(largestImage, saveNumber);
	   });
	   */
	}

	return (largestImage != null) ? { src: largestImage.src, title: document.title, size: srcSize } : null;
})();

/*
function pauseFor(milli) {
  return new Promise((resolve) => { setTimeout(() => resolve(0), milli) });
}

async function createPopup(img, saveNumber){
	
	const link = img.src;
	const path = link.split('?')[0];
	const dir = path.substr(0, path.lastIndexOf('/'));
	const name = path.split('/').pop();
	const ext = name.split('.').pop();
	const root = name.substr(0, name.lastIndexOf('.')).replace(/[0-9]/g, '').replace(/^[^A-Za-z]/, '').replace(/[^A-Za-z]$/, '');
	const saveAs = root + "_" + saveNumber + "." + ext;
	
	// https://www.w3schools.com/jsref/met_win_open.asp
	const popup = open(" ", "LargeImage", "popup=yes,width=600,height=200,left=400,top=400"); // ,toolbar=no,status=no,menubar=no,titlebar=no
	const doc = popup.document;
	
	doc.write('<html><head><title>Download Largest Image</title></head>');
	doc.write('<body>');
	doc.write('<a target="_blank" rel="noopener noreferrer" href="' + link + '">Link to image</a>');
	doc.write('<br>Dir: ' + dir);
	doc.write('<br>Name:   ' + name);
	doc.write('<br>Size:   ' + img.width + " x " + img.height);
	doc.write('<br>SaveAs: ' + saveAs);
	doc.write('<hr>');
	// violates security policy -  inline script
	// doc.write('<script type="text/javascript"> setTimeout(function() { window.close() }, 2000); </script>');
	doc.write('</body></html>');
	doc.close();
	
	popup.blur();
	popup.addEventListener('click', function (e) { popup.close() });
	
	// await pauseFor(3000);
	// popup.close();
}
*/
