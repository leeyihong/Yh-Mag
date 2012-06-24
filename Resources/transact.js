// initiate the window for 'transact' tab
var win = Titanium.UI.currentWindow;

var screenHeight = Ti.Platform.displayCaps.platformHeight;
var screenWidth = Ti.Platform.displayCaps.platformWidth;

function GetWidth(value) {
    return parseInt((screenWidth * value) / 320);
}

var typeBarcodeTextField = Ti.UI.createTextField({
	hintText: '13 ISBN w\/o \'-\'',
	font:{
		fontSize: '14dp',
	},
	left: GetWidth(70),
	top: '50dp',
	width: GetWidth(130),
	height: '40dp',
	keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD
});
win.add(typeBarcodeTextField);

var submitISBNButton = Ti.UI.createButton({
	title: 'Submit',
	font:{
		fontSize: '14dp',
	},
	left: GetWidth(200),
	top:'50dp',
	width: '69dp',
	height: '40dp'
});

var isbnNo;
submitISBNButton.addEventListener('click', function(e){
	if(typeBarcodeTextField.value.length == 13){
		sellingDetailsWin.isbnNo = typeBarcodeTextField.value;
		sellingDetailsWin.open();
	} else {
		alert('Invalid isbn number. Check that the isbn number is 13 digit long. And remove all \'-\'')
	}
});
win.add(submitISBNButton);

var sellingDetailsWin = Ti.UI.createWindow({
	backgroundColor : '#FFFFFF',
	url: "sellingDetails.js",
});


//Scanner Window
var scannerWinButton = Ti.UI.createButton({
	title: 'Barcode Scanner',
	font:{
		fontSize: '14dp',
	},
	left: GetWidth(68),
	top:'100dp',
	width: GetWidth(200),
	height: '40dp'	
});
scannerWinButton.addEventListener('click', function(){
	bacodeScanningWin.open();
});

var bacodeScanningWin = Titanium.UI.createWindow({
	backgroundColor : '#FFFFFF',
	url : 'barcodeScanner.js',
});

win.add(scannerWinButton);


