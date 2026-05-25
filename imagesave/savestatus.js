//
// Download Largest Image - savestatus.js
//

(function () { 
	chrome.storage.session.get(['src_info', 'save_as']).then((data) => {
		try {
			console.dir(data);
			const link = data.src_info.src;
			const title = data.src_info.title;
			const size = data.src_info.size;
			const saveAs = data.save_as;

			const path = link.split('?')[0];
			const dir = path.substr(0, path.lastIndexOf('/'));
			const name = path.split('/').pop();
			const ext = name.split('.').pop();
			const root = name.substr(0, name.lastIndexOf('.')).replace(/[0-9]/g, '').replace(/^[^A-Za-z]/, '').replace(/[^A-Za-z]$/, '');

			// https://www.w3schools.com/jsref/met_win_open.asp
			const popup = open(" ", "LargeImage", "popup=yes,width=600,height=200,left=400,top=400"); // ,toolbar=no,status=no,menubar=no,titlebar=no
			const doc = popup.document;

			doc.write('<html><head><title>Download Largest Image</title></head>');
			doc.write('<body>');
			doc.write('<a target="_blank" rel="noopener noreferrer" href="' + link + '">Link to image</a>');
			doc.write('<br>Title: ' + title);
			doc.write('<br>Dir: ' + dir);
			doc.write('<br>Name:   ' + name);
			doc.write('<br>Size:   ' + size);
			doc.write('<br>SaveAs: ' + saveAs);
			doc.write('<hr>');
			// violates security policy -  inline script
			// doc.write('<script type="text/javascript"> setTimeout(function() { window.close() }, 2000); </script>');
			doc.write('</body></html>');
			doc.close();

			popup.blur();
			popup.addEventListener('click', function (e) { popup.close() });

			chrome.storage.local.get(['popup']).then((optData) => {
				console.log("popup=" + optData.popup);
				if (optData && optData.popup === 'a') {
					pauseFor(3000).then( () => popup.close() );
				}
			});
		} catch (error) {
			console.error(error);
		}
	});
})();

function pauseFor(milli) {
	return new Promise((resolve) => { setTimeout(() => resolve(0), milli) });
}