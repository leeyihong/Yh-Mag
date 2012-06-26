// initiate the window for 'transact' tab
var transactWin = Titanium.UI.currentWindow;

var screenHeight = Ti.Platform.displayCaps.platformHeight;
var screenWidth = Ti.Platform.displayCaps.platformWidth;
function GetWidth(value) {
    return parseInt((screenWidth * value) / 320);
}

var sellABookImage = Ti.UI.createImageView({
	image: 'images/Salesbook.png',
	width: '300dp',
	height:	'130dp',
	left: '10dp',
	right: '10dp',
	top: '10dp'
});
transactWin.add(sellABookImage);
sellABookImage.addEventListener('click', function(e){
	bacodeInputTypeWin.open();
});

var sellingListImage = Ti.UI.createImageView({
	image: 'images/sellingbooks1.png',
	width: '300dp',
	height:	'130dp',
	left: '10dp',
	right: '10dp',
	top: '150dp'
});
transactWin.add(sellingListImage);

var buyingListImage = Ti.UI.createImageView({
	image: 'images/blank.png',
	width: '300dp',
	height:	'130dp',
	left: '10dp',
	right: '10dp',
	top: '290dp'
});
transactWin.add(buyingListImage);

//Choosing Barcode
var bacodeInputTypeWin = Ti.UI.createWindow({
	backgroundColor: '#FFFFFF',
});
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
bacodeInputTypeWin.add(typeBarcodeTextField);

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
bacodeInputTypeWin.add(submitISBNButton);

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

bacodeInputTypeWin.add(scannerWinButton);


