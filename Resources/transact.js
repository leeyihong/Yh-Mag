// initiate the window for 'transact' tab
var Cloud = require('ti.cloud');
Cloud.debug = true;


var transactWin = Titanium.UI.currentWindow;

var screenHeight = Ti.Platform.displayCaps.platformHeight;
var screenWidth = Ti.Platform.displayCaps.platformWidth;
function GetWidth(value) {
	return parseInt((screenWidth * value) / 320);
}

var currentTab = Ti.UI.currentTab;

var sellABookImage = Ti.UI.createButton({
	backgroundImage : 'images/shootNSell.png',
	backgroundSelectedImage : 'images/shootNSell_click.png',
	width : '300dp',
	height : '130dp',
	left : '10dp',
	right : '10dp',
	top : '10dp'
});
sellABookImage.addEventListener('click', function(e) {
	openCameraDialog.show();
});

var sellingListImage = Ti.UI.createButton({
	backgroundImage : 'images/sellingList.png',
	backgroundSelectedImage : 'images/sellingList_click.png',
	width : '300dp',
	height : '130dp',
	left : '10dp',
	right : '10dp',
	top : '10dp'
});

var buyingListImage = Ti.UI.createButton({
	backgroundImage : 'images/buyingList.png',
	backgroundSelectedImage : 'images/buyingList_click.png',
	width : '300dp',
	height : '130dp',
	left : '10dp',
	right : '10dp',
	top : '10dp'
});

/*CREATE TABLE*/
var trasacOptionTable = Ti.UI.createTableView({
	height : 'auto',
	separatorColor : 'transparent',
});

//Shoot and Sell Button
var shootNSellRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
shootNSellRow.center
shootNSellRow.add(sellABookImage);
trasacOptionTable.appendRow(shootNSellRow);

//Selling List Button
var sellingListRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
sellingListRow.center
sellingListRow.add(sellingListImage);
trasacOptionTable.appendRow(sellingListRow);

//Selling List Button
var buyingListRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
buyingListRow.center
buyingListRow.add(buyingListImage);
trasacOptionTable.appendRow(buyingListRow);

transactWin.add(trasacOptionTable);

var openCameraDialog = Titanium.UI.createOptionDialog({
	title : 'Choose an image source :',
	options : ['Camera', 'Photo Gallery', 'Cancel'],
	cancel : 2
});

var imgView = Titanium.UI.createImageView({
	top : '5dp',
	left : GetWidth(60),
	width : '200dp',
	height : '200dp'
});
var originalImage = Titanium.UI.createImageView({
	width : screenHeight,
	height : screenWidth
});

openCameraDialog.addEventListener('click', function(e) {

	if (e.index == 0) {//from the camera

		Titanium.Media.showCamera({

			success : function(event) {
				var image = event.media;
				if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {

					sellingDetailsWin.originalImage = event.media;

					//set image view
					originalImage.image = image;
					imgView.image = cropImage(originalImage);

					currentTab.open(bacodeInputTypeWin);
					currentTab.add(bacodeInputTypeWin);
					bacodeInputTypeWin.open();
				}
			},

			cancel : function() {
				//getting image from camera was cancelled
			},

			error : function(error) {
				//create alert
				var a = Titanium.UI.createAlertDialog({
					title : 'Camera'
				});
				// set message
				if (error.code == Titanium.Media.NO_CAMERA) {
					a.setMessage('Device does not have image recording capabilities');
				} else {
					a.setMessage('Unexpected error: ' + error.code);
				}
				// show alert
				a.show();
			},

			allowImageEditing : true,
			saveToPhotoGallery : false
		});

	} else if (e.index == 1) {//obtain an image from the gallery

		Titanium.Media.openPhotoGallery({

			success : function(event) {
				var image = event.media;
				// set image view
				Ti.API.debug('Our type was: ' + event.mediaType);
				if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {

					originalImage.image = image;
					imgView.image = cropImage(originalImage);

					currentTab.open(bacodeInputTypeWin);
					currentTab.add(bacodeInputTypeWin);
					bacodeInputTypeWin.open();
				}
			},

			cancel : function() {
				//user cancelled the action from within
				//the photo gallery
			}
		});
	} else {
		//cancel was tapped
		//user opted not to choose a photo
	}
});

function cropImage(originalImage) {
	//set image view
	var cropView = Titanium.UI.createView({
		width : '320dp',
		height : '320dp'
	});
	cropView.add(originalImage);
	originalImage.left = '-90dp';

	return cropView.toImage();
}

//Choosing Barcode
var bacodeInputTypeWin = Ti.UI.createWindow({
	backgroundColor : '#FFFFFF',
	//modal: true
});

var bookTitleImage = Ti.UI.createImageView({
	url : 'images/Book Image.png',
	width : '150dp',
	height : '60dp'
})

var nextStepImage = Ti.UI.createImageView({
	url : 'images/Next Step.png',
	top : '20dp',
	width : '150dp',
	height : '60dp'
})

var typeBarcodeTextField = Ti.UI.createTextField({
	hintText : '13 ISBN w\/o \'-\'',
	value : '9780071244640',
	font : {
		fontSize : '14dp',
	},
	left : GetWidth(70),
	width : GetWidth(130),
	height : '40dp',
	keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD
});

var submitISBNButton = Ti.UI.createButton({
	title : 'Submit',
	font : {
		fontSize : '14dp',
	},
	left : GetWidth(200),
	width : '69dp',
	height : '40dp'
});
var isbnNo;
submitISBNButton.addEventListener('click', function(e) {
	if (typeBarcodeTextField.value.length == 13) {
		sellingDetailsWin.isbnNo = typeBarcodeTextField.value;
		sellingDetailsWin.image = imgView;
		sellingDetailsWin.open();
	} else {
		alert('Invalid isbn number. Check that the isbn number is 13 digit long. And remove all \'-\'')
	}
});

var sellingDetailsWin = Ti.UI.createWindow({
	backgroundColor : '#FFFFFF',
	url : "sellingDetails.js",
});

//Scanner Window
var scannerWinButton = Ti.UI.createButton({
	title : 'Barcode Scanner',
	font : {
		fontSize : '14dp',
	},
	left : GetWidth(68),
	width : GetWidth(200),
	height : '40dp'
});
scannerWinButton.addEventListener('click', function() {
	bacodeScanningWin.image = imgView.image;
	bacodeScanningWin.open();
});

var bacodeScanningWin = Titanium.UI.createWindow({
	backgroundColor : '#FFFFFF',
	url : 'barcodeScanner.js',
});

// Scrollable table
var barcodeOptionTable = Ti.UI.createTableView({
	height : 'auto',
	separatorColor : 'transparent',
});

//Image Title Row
var imageTitleRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
imageTitleRow.center
imageTitleRow.add(bookTitleImage);
barcodeOptionTable.appendRow(imageTitleRow);

//Image Row
var imageRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
imageRow.center
imageRow.add(imgView);
barcodeOptionTable.appendRow(imageRow);

//Next Step Row
var nextStepRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
nextStepRow.center
nextStepRow.add(nextStepImage);
barcodeOptionTable.appendRow(nextStepRow);

//Input Barcode Row
var inputBarcodeRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
inputBarcodeRow.add(typeBarcodeTextField);
inputBarcodeRow.add(submitISBNButton);
barcodeOptionTable.appendRow(inputBarcodeRow);

//Barcode Scanner Row
var barcodeScannerRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
barcodeScannerRow.center
barcodeScannerRow.add(scannerWinButton);
barcodeOptionTable.appendRow(barcodeScannerRow);

bacodeInputTypeWin.add(barcodeOptionTable);
