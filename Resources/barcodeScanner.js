/**
 * @author Yi Hong
 */
/*--- SCANNER WINDOW ---*/
var barcodeScanningWin = Ti.UI.currentWindow;

var label = Ti.UI.createLabel();
barcodeScanningWin.add(label);
//barcodeScanningWin.open();

var titaniumBarcode = require('com.mwaysolutions.barcode');

titaniumBarcode.scan({
	success : function(data) {
		if (data && data.barcode) {
			var label = Titanium.UI.createLabel({
				text : data.barcode,
			});

			sellingDetailsWin.isbnNo = data.barcode;
			sellingDetailsWin.open();

		} else {
			alert(JSON.stringify(data));
		}
	},

	error : function(err) {
		alert("Error!! " + err);
	},

	cancel : function() {
		alert("cancel");
	}
});

var sellingDetailsWin = Ti.UI.createWindow({
	backgroundColor : '#FFFFFF',
	originalImage : barcodeScanningWin.originalImage,
	url : "sellingDetails.js",
});

sellingDetailsWin.addEventListener('close', function(e) {
	barcodeScanningWin.close();
	alert('closing');
});

