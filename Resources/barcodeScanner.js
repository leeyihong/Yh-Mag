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
	success:function(data) {
		if(data && data.barcode) {
			label.text(data.barcode);
			bookDetailsWin.open();
		} else {
			alert(JSON.stringify(data));
		}
	},

	error:function(err) { 
		alert("Error!! " + err); 
	},

	cancel:function() { 
		alert("cancel"); 
	}
});


var bookDetailsWin = Ti.UI.createWindow({
	backgroundColor: '#FFFFFF',
});


