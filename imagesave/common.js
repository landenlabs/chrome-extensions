//
// Download Largest Image - common.js
//

export function getSaveAsFor(srcInfo, saveNumber, options) {
	try {
		const saveFmt = options.save_fmt;
		const srcLink = srcInfo.src;
		const srcTitle = srcInfo.title;
		// const srcSize = srcInfo.size;

		const path = srcLink.split('?')[0];
		const domain = (new URL(path));	// domain.protocol, hostname, pathname
		const name = path.split('/').pop();
		const ext = name.split('.').pop();
		const root = name.substr(0, name.lastIndexOf('.')).replace(/[0-9]/g, '');
		
		const title = srcTitle ? srcTitle.replace(/[\/|]/g, '_').replace(/ /g, '').toLowerCase() : "";

		let saveAs = "";
		let i = 0;
		while (i < saveFmt.length) {
		if (saveFmt[i] !== '{') {
			saveAs += saveFmt[i];
		} else {
			i++;
			// const cmd = saveFmt[i];
			const end = saveFmt.indexOf('}', i);
			const cmd = saveFmt.substring(i, end);
			const w = cmd.match(/\d/g);
			const cmdWidth = (w) ? parseInt(w.join(''), 10) : 0;
			switch (cmd[0]) {
			default:
				break;
			case '#': // {##..}
				saveAs += saveNumber.toString().padStart(end-i, '0');
				break;
			case 'n': // {name}
				saveAs += (cmdWidth > 0) ? name.slice(0, cmdWidth) : name;
				break;
			case 't': // {title}
				saveAs += (cmdWidth > 0) ? title.slice(0, cmdWidth) : title;
				break;  
			case 'h': // {host}
				saveAs += (cmdWidth > 0) ? domain.hostname.slice(0, cmdWidth) : domain.hostname;
				break; 
			}
			i = end;
		}
		i++;
		}                                                                                                                                 
		saveAs +=  "." + ext;
		console.log("saveImageAs=" + saveAs);
		
		return saveAs;
	} catch (error) {
		console.error(error);
		return "largestimage.png";
	}
}

