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

/*CREATE IMAGE BUTTON*/
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
var mySellingListWin = Ti.UI.createWindow({
	backgroundColor : '#FFFFFF'
});
var loadingIndicator = Ti.UI.createActivityIndicator({
	color : 'Red',
	font : {
		fontFamily : 'Helvetica Neue',
		fontSize : 26,
		fontWeight : 'bold'
	},
	message : 'Loading...',
});
var mySellingData = [];
var resultData = [];

sellingListImage.addEventListener('click', function(e) {
	loadingIndicator.show();
	//currentTab.open(mySellingListWin);
	Cloud.Users.login({
		login : 'jessicalee_88@hotmail.com',
		password : 'test_password'
	}, function(e) {
		if (e.success) {
			var user = e.users[0];
			//alert('Success:\\n' + 'id: ' + user.id + '\\n' + 'first name: ' + user.first_name + '\\n' + 'last name: ' + user.last_name);
			Cloud.Posts.query({
				page : 1,
				per_page : 20,
				where : {
					"userId" : Ti.App.Properties.getString('email')  // *** NEED TO CHANGE THIS AFTER SETTING UP DETAILS OF USER! ***
				},
				order : "-created_at"
			}, function(e) {
				if (e.success) {
					//alert('Success:\\n' + 'Count: ' + e.posts.length);
					if (e.posts.length === 0 ) {
						var blackWindow = Ti.UI.createWindow({
							backgroundColor : '#FFFFFF',
							modal : true
						});
						var noResult = Ti.UI.createLabel({
							text : "There are no book on your selling list.  Created one at Transact Tab",
							left : '10dp',
							right : '10dp',
							color : '#000014',
							font : {
								fontSize : '15dp',
								fontWeight : 'bold'
							}
						});
						blackWindow.add(noResult);
						loadingIndicator.hide();
						currentTab.open(blackWindow);
						return
					};
					for (var i = 0; i < e.posts.length; i++) {
						var post = e.posts[i];
						mySellingData[i] = post;
						//alert('id: ' + post.id + '\\n' + 'id: ' + post.id + '\\n' + 'title: ' + post.title + '\\n' + 'content: ' + post.content + '\\n' + 'updated_at: ' + post.updated_at);

						var mySellingItemRow = Ti.UI.createTableViewRow({
							height: '100dp',
						});

						var bookImage = Titanium.UI.createImageView({
							image : post.photo.urls.square_75 ,
							width : '80dp',
							height : '80dp',
							left : '10dp',
							top : '10dp'
						});

						var bookTitle = Titanium.UI.createLabel({
							text : post.custom_fields.bookTitle,
							font : {
								fontSize : '15dp',
								fontWeight : 'bold'
							},
							color: '#000014',
							width : 'auto',
							textAlign : 'left',
							left : '100dp',
						});
						Ti.API.info('The book title is : ' + bookTitle.text);

						var mySellingListRowNumber = Ti.UI.createLabel({
							text : i,
						});
						
						mySellingItemRow.add(bookImage);
						mySellingItemRow.add(bookTitle);
						mySellingItemRow.hasChild = true;

						//mySellingItemRow.className = 'My Selling List';
						resultData[i] = mySellingItemRow;
						//resultData.push(mySellingItemRow);
						//mySellingListTable.appendRow(mySellingItemRow);
					};
					Ti.API.info('No of data : ' + resultData.length);

					//mySellingListTable.data = resultData;
					//mySellingListTable.setData = data
					var mySellingListTable = Titanium.UI.createTableView({
						data: resultData,
						color : '#000014',
					});
					mySellingListWin.add(mySellingListTable);
					loadingIndicator.hide();
					currentTab.open(mySellingListWin);
					//mySellingListWin.open();
					
					mySellingListTable.addEventListener('click', function(e){
						
						var sellingListDetailwin = Ti.UI.createWindow({
							url: 'mySellingListDetail.js',
							backgroundColor: '#FFFFFF',
							modal: true, 
							exitOnClose: true
						});
						sellingListDetailwin.sellingDetails = mySellingData[e.index];
						//sellingListDetailwin.mySellingListRowNumber = e.index;
						//mySellingListWin.open(sellingListDetailwin);
						sellingListDetailwin.open({animated:true,});
					})
					
				} else {
					loadingIndicator.hide();
					alert('Error in query:\\n' + ((e.error && e.message) || JSON.stringify(e)));
				}
			});
		} else {
			loadingIndicator.hide();
			alert('Error in login:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	}); 
	
});

var myChatListImage = Ti.UI.createButton({
	backgroundImage : 'images/myChatList.png',
	backgroundSelectedImage : 'images/myChatList_click.png',
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
buyingListRow.add(myChatListImage);
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

					sellingDetailsWin.originalImage = event.media;

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
	//value : '9780071244640',
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
		Ti.UI.Android.hideSoftKeyboard();
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
