// initiate the window for 'transact' tab
var win = Titanium.UI.currentWindow;

var screenHeight = Ti.Platform.displayCaps.platformHeight;
var screenWidth = Ti.Platform.displayCaps.platformWidth;

function GetWidth(value) {
    //var temp = (value * 100) / 320;
    return parseInt((screenWidth * value) / 320);
}

var typeBarcodeTextField = Ti.UI.createTextField({
	hintText: 'ISBN without \'-\'',
	font:{
		fontSize: '14dp',
	},
	verticalAlign:'center',
	left: GetWidth(70),
	top: '50dp',
	width: GetWidth(130),
	height: '40dp'
});
win.add(typeBarcodeTextField);

var submitISBNButton = Ti.UI.createButton({
	title: 'Submit',
	font:{
		fontSize: '14dp',
	},
	verticalAlign: 'center',
	left: GetWidth(200),
	top:'50dp',
	width: '69dp',
	height: '40dp'	
});
win.add(submitISBNButton);

var scannerWinButton = Ti.UI.createButton({
	title: 'Barcode Scanner',
	font:{
		fontSize: '14dp',
	},
	verticalAlign: 'center',
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


