/**
 * @author Yi Hong
 */
/*--- SCANNER WINDOW ---*/
var barcodeScanningWin = Ti.UI.currentWindow;
var imageTaken = barcodeScanningWin.image;

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
			sellingDetailsWin.image = imageTaken;
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
	url: "sellingDetails.js",
});

