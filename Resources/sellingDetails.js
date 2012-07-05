/**
 * @author Yi Hong
 */
var Cloud = require('ti.cloud');
Cloud.debug = true;

var sellingDetailsWin = Ti.UI.currentWindow;
var isbnNo = sellingDetailsWin.isbnNo;
var imageTaken = sellingDetailsWin.image;
Ti.API.info(isbnNo);
var screenHeight = Ti.Platform.displayCaps.platformHeight;
var screenWidth = Ti.Platform.displayCaps.platformWidth;

function GetWidth(value) {
	return parseInt((screenWidth * value) / 320);
};
function GetHeight(value) {
	return parseInt((screenWidth * value) / 480);
};


//Setting global varible for book details
var output;
var details;
var bookImage = Ti.UI.createImageView({
	image : imageTaken.image,
	top : '10dp',
	//left: 'center',
	width : '100dp',
	height : '100dp'
});
var titleLabel = Ti.UI.createLabel({
	text : 'Title: ',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
		fontWeight : 'bold'
	},
	color : '#000014',
	left : '10dp',
});
//sellingDetailsWin.add(titleLabel);
var titleField = Ti.UI.createTextField({
	hintText : 'Book Title',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
	},
	verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
	left : '110dp',
	height : '35dp',
	width : '200dp'
});
var subtitleField = Ti.UI.createTextField({
	hintText : 'Subtitle',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
	},
	color : '#000014',
	left : '110dp',
	height : '35dp',
	width : '200dp'
});
var authorsLabel = Ti.UI.createLabel({
	text : 'Author :',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
		fontWeight : 'bold'
	},
	color : '#000014',
	left : '10dp',
});
var authorsField = Ti.UI.createTextField({
	hintText : 'Name of Author/(s/)',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
	},
	color : '#000014',
	left : '110dp',
	height : '35dp',
	width : '200dp'
});
var publisherLabel = Ti.UI.createLabel({
	text : 'Publisher :',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
		fontWeight : 'bold'
	},
	color : '#000014',
	left : '10dp',
});
var publisherField = Ti.UI.createTextField({
	hintText : 'name of publisher',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
	},
	color : '#000014',
	left : '110dp',
	height : '35dp',
	width : '200dp'
});
var publishedDateLabel = Ti.UI.createLabel({
	text : 'Published Date :',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
		fontWeight : 'bold'
	},
	color : '#000014',
	left : '10dp',
});
var publishedDateField = Ti.UI.createTextField({
	hintText : 'Date of Publish',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
	},
	color : '#000014',
	left : '130dp',
	height : '35dp',
	width : '180dp'
});
var editionLabel = Ti.UI.createLabel({
	text : 'Edition :',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
		fontWeight : 'bold'
	},
	color : '#000014',
	left : '10dp',
});
var editionField = Ti.UI.createTextField({
	hintText : 'edition',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
	},
	color : '#000014',
	left : '110dp',
	height : '35dp',
	width : '200dp'
});
var conditionLabel = Ti.UI.createLabel({
	text : 'Condition :',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
		fontWeight : 'bold'
	},
	color : '#000014',
	left : '10dp',
});
var conditionField = Ti.UI.createTextField({
	hintText : '5.5',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
	},
	color : '#000014',
	left : '110dp',
	height : '35dp',
	width : '60dp'
});
var condition10Label = Ti.UI.createLabel({
	text : '/10',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
		fontWeight : 'bold'
	},
	color : '#000014',
	left : '170dp',
});
var FacultyLabel = Ti.UI.createLabel({
	text : 'Faculty :*',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
		fontWeight : 'bold'
	},
	color : '#000014',
	left : '10dp',
});
var facultyField = Ti.UI.createTextField({
	hintText : 'edition',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
	},
	color : '#000014',
	left : '110dp',
	height : '35dp',
	width : '200dp'
});
var facultyPicker = Titanium.UI.createPicker({
	height : '35dp',
	width : '200dp',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
	},
});
var facultiesList = [];
facultiesList[0] = Titanium.UI.createPickerRow({
	title : 'Arts and Social Sciences'
});
facultiesList[1] = Titanium.UI.createPickerRow({
	title : 'Business'
});
facultiesList[2] = Titanium.UI.createPickerRow({
	title : 'Computing'
});
facultiesList[3] = Titanium.UI.createPickerRow({
	title : 'Dentistry'
});
facultiesList[4] = Titanium.UI.createPickerRow({
	title : 'Design and Environment'
});
facultiesList[5] = Titanium.UI.createPickerRow({
	title : 'Engineering'
});
facultiesList[6] = Titanium.UI.createPickerRow({
	title : 'Law'
});
facultiesList[7] = Titanium.UI.createPickerRow({
	title : 'Medicine'
});
facultiesList[8] = Titanium.UI.createPickerRow({
	title : 'Science'
});
facultyPicker.add(facultiesList);

var moduleCodeLabel = Ti.UI.createLabel({
	text : 'Module Code :*',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
		fontWeight : 'bold'
	},
	color : '#000014',
	left : '10dp',
});
var moduleCodeField = Ti.UI.createTextField({
	hintText : 'module code',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
	},
	color : '#000014',
	left : '110dp',
	height : '35dp',
	width : '200dp'
});
var priceLabel = Ti.UI.createLabel({
	text : 'Price :*',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
		fontWeight : 'bold'
	},
	color : '#000014',
	left : '10dp',
});
var priceField = Ti.UI.createTextField({
	hintText : '$30',
	value: '$',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
	},
	color : '#000014',
	left : '110dp',
	height : '35dp',
	width : '200dp'
});
var publishButton = Ti.UI.createButton({
	title : 'Submit',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
		fontWeight : 'bold'
	},
	color : '#000014',
	//left : '80dp',
	width : '80dp',
	height : '35dp'
});
/*var cancelButton = Ti.UI.createButton({
	title : 'Cancel',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
		fontWeight : 'bold'
	},
	color : '#000014',
	left : '180dp',
	width : '80dp',
	height : '35dp'
});
var transacWindow = Ti.UI.createWindow({
	backgroundColor : 'white',
	url : 'transact.js'
});

var cancelDialog = Ti.UI.createAlertDialog({
	title : 'Cancel Dialog',
	message : 'Are you sure you would like to cancel this?',
	cancel : 1,
	buttonNames : ['Confirm', 'Cancel'],
});
cancelButton.addEventListener('click', function() {
	cancelDialog.show();
});
cancelDialog.addEventListener('click', function(ev) {
	if (ev.index == 0) {// clicked "Confirm"
		transacWindow.open();
	} else if (ev.index == 1) {// clicked "Cancel"
		// do nothing
	}
});
*/
var isbnAPIUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
var isbnApiKey = 'AIzaSyBgUbjxOGiJNbKS39ZHF2NH2hLVHdo6FEs';

var xhr = Ti.Network.createHTTPClient();
xhr.open("GET", isbnAPIUrl + isbnNo + '&key=' + isbnApiKey);

xhr.onload = function() {
	output = JSON.parse(xhr.responseText);

	if (output.hasOwnProperty('totalItems')) {

		if (output.totalItems >= 1) {

			if (output.totalItems > 1) {// normally will not happen... error checking in case it happen...
				alert('There is more than 1 book found! Only 1st book appear.')
			};

			details = output.items[0];

			titleField.value = details.volumeInfo.title;

			if (details.volumeInfo.subtitle != null) {
				subtitleField.value = details.volumeInfo.subtitle;
			};

			var noOfAuthor = details.volumeInfo.authors.length
			Ti.API.info(noOfAuthor);
			if (noOfAuthor > 0) {
				var Aur = details.volumeInfo.authors[0];
				for ( i = 1; i < noOfAuthor; i++) {
					Aur = Aur + ', ' + details.volumeInfo.authors[i];
				};
				authorsField.value = Aur;
			};

			if (details.volumeInfo.publisher != null) {
				publisherField.value = details.volumeInfo.publisher;
			};

			if (details.volumeInfo.publishedDate != null) {
				publishedDateField.value = details.volumeInfo.publishedDate;
			};

			/*

			 if(details.volumeInfo.hasOwnProperty('imageLinks')){
			 if(details.volumeInfo.imageLinks.hasOwnProperty('thumbnail')){
			 bookImage.url = details.volumeInfo.imageLinks.thumbnail;
			 } else if(details.volumeInfo.imageLinks.hasOwnProperty('smallThumbnail')){
			 bookImage.url = details.volumeInfo.imageLinks.smallThumbnail;
			 }

			 };
			 */
		} else if (output.totalItems == 0) {
			alert('This Barcode is invalid! This might not be a book or the book is not in the database.')
		} else {
			alert('Error in looking for a book in database')
		}
	} else {
		alert('This Barcode is invalid. This might not be a book or book not found in database.');
	}
};

xhr.send();

var tableSetting = {
	leftOne : '10dp',
	leftTwo : '110dp'

};
var displayTable = Ti.UI.createTableView({
	height : 'auto',
	separatorColor : 'transparent'
});
//Book Image Row
var BookImageRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
bookImage.center
BookImageRow.add(bookImage);
displayTable.appendRow(BookImageRow);

//Title Row
var titleRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
titleLabel.left = tableSetting.leftOne;
titleRow.add(titleLabel);
titleField.left = tableSetting.leftTwo;
titleRow.add(titleField);
displayTable.appendRow(titleRow);

//Subtitle Row
var subtitleRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
subtitleField.left = tableSetting.leftTwo;
subtitleRow.add(subtitleField);
displayTable.appendRow(subtitleRow);

//Author Row
var authorRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
authorsLabel.left = tableSetting.leftOne;
authorRow.add(authorsLabel);
authorsField.left = tableSetting.leftTwo;
authorRow.add(authorsField);
displayTable.appendRow(authorRow);

//Publisher Row
var publisherRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
publisherLabel.left = tableSetting.leftOne;
publisherRow.add(publisherLabel);
publisherField.left = tableSetting.leftTwo;
publisherRow.add(publisherField);
displayTable.appendRow(publisherRow);

// Published Date Row
var publishedDateRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
publishedDateLabel.left = tableSetting.leftOne;
publishedDateRow.add(publishedDateLabel);
publishedDateField.left = '130dp';
publishedDateRow.add(publishedDateField);
displayTable.appendRow(publishedDateRow);

// Edition Row
var editionRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
editionLabel.left = tableSetting.leftOne;
editionRow.add(editionLabel);
editionField.left = tableSetting.leftTwo;
editionRow.add(editionField);
displayTable.appendRow(editionRow);

// Condition Row
var conditionRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
conditionLabel.left = tableSetting.leftOne;
conditionRow.add(conditionLabel);
conditionField.left = tableSetting.leftTwo;
conditionRow.add(conditionField);
condition10Label.left = '170dp';
conditionRow.add(condition10Label);
displayTable.appendRow(conditionRow);

// Faculty Row
var facultyRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
FacultyLabel.left = tableSetting.leftOne;
facultyRow.add(FacultyLabel);
facultyPicker.left = tableSetting.leftTwo;
facultyRow.add(facultyPicker);
displayTable.appendRow(facultyRow);

// Module Code Row
var moduleCodeRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
moduleCodeLabel.left = tableSetting.leftOne;
moduleCodeRow.add(moduleCodeLabel);
moduleCodeField.left = tableSetting.leftTwo;
moduleCodeRow.add(moduleCodeField);
displayTable.appendRow(moduleCodeRow);

// Price Row
var priceRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
priceLabel.left = tableSetting.leftOne;
priceRow.add(priceLabel);
priceField.left = tableSetting.leftTwo;
priceRow.add(priceField);
displayTable.appendRow(priceRow);

// Button Row
var buttonRow = Ti.UI.createTableViewRow({
	height : 'auto',
});
publishButton.center;
buttonRow.add(publishButton);
//cancelButton.left = '180dp';
//buttonRow.add(cancelButton);
displayTable.appendRow(buttonRow);

sellingDetailsWin.add(displayTable);

/*--- CONNECT TO NUS ---
 var ivleConnect = Ti.Network.createHTTPClient();
 ivleConnect.open("GET", "https://ivle.nus.edu.sg/api/Lapi.svc/UserID_Get?APIKey=" + Ti.App.Properties.getString('apikey') + "&Token=" + Ti.App.Properties.getString('token'));

 ivleConnect.onload = function(){
 var output = this.responseText;
 Ti.App.Properties.setString("userID", output.substring(1, output.length - 1));
 }
 ivleConnect.send();
 */

var publishDialog = Ti.UI.createAlertDialog({
	title : 'Publish Dialog',
	message : 'Are you sure you would like to publish this?',
	cancel : 1,
	buttonNames : ['Confirm', 'Cancel'],
});
publishButton.addEventListener('click', function() {

	if(!moduleCodeField.value){
		alert('Please enter your module code');
		return;	
	}
	if((!priceField.value)||(priceField.value.length <= 1)){
		alert('Please enter the price');
		return;
	}
	
	publishDialog.show();
});

var activityIndicator = Ti.UI.createActivityIndicator({
	color: 'Red',
	font: {fontFamily:'Helvetica Neue', fontSize:'26dp', fontWeight:'bold'},
	message: 'Loading...',
	style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
});

publishDialog.addEventListener('click', function(e) {

	if (e.index == 0) {// clicked "Confirm"
		activityIndicator.show();
		Cloud.Users.login({
			login : 'jessicalee_88@hotmail.com',
			password : 'test_password'
		}, function(e) {
			if (e.success) {
				var user = e.users[0];
				//alert('Success Login:\\n' + 'id: ' + user.id + '\\n' + 'first name: ' + user.first_name + '\\n' + 'last name: ' + user.last_name);
				/*
				Cloud.Photos.create({
					photo : sellingDetailsWin.originalImage
				}, function(e) {
					if (e.success) {
						var photo = e.photos[0];
						alert('Success:\\n' + 'id: ' + photo.id + '\\n' + 'filename: ' + photo.filename + '\\n' + 'size: ' + photo.size, 'updated_at: ' + photo.updated_at);
					} else {
						alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
					}
				});
				*/
				Cloud.Posts.create({
					title : Ti.App.Properties.getString('name') + ' Selling ' + moduleCodeField.value + ' Book!',
					content : 'Selling ' + moduleCodeField.value + ' Book via ShootNSell',
					photo : sellingDetailsWin.originalImage,
					custom_fields : '{ "userId": "' + Ti.App.Properties.getString('email') + '","bookTitle": "' + titleField.value + '", "bookSubtitle": "' + subtitleField.value + '","author": "' + authorsField.value + '", "publisher": "' + publisherField.value + '","publishedDate": "' + publishedDateField.value + '","edition": "' + editionField.value + '", "condition": "' + conditionField.value + '","faculty": "' + facultyPicker.getSelectedRow(0).title + '","moduleCode": "' + moduleCodeField.value + '", "price": "' + priceField.value + '", "bookStatus": "onSales"}',

				}, function(e) {
					if (e.success) {
						var post = e.posts[0];
						activityIndicator.hide();
						var homeWin = Ti.UI.createWindow({
							url: "home.js",
						});
						homeWin.open();
						//alert('Success create post:\\n' + 'id: ' + post.id + '\\n' + 'title: ' + post.title + '\\n' + 'content: ' + post.content + '\\n');
					} else {
						alert('Error in post creating:\\n' + ((e.error && e.message) || JSON.stringify(e)));
					}
				});

			} else {
				alert('Error in Login :\\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});

		/*
		 Cloud.Posts.create({
		 title : Ti.App.Properties.getString('name') + ' Selling ' + moduleCodeField.value + ' Book!',
		 content : 'Selling ' + moduleCodeField.value + ' Book via ShootNSell',
		 photo : bookImage.image.media,
		 custom_fields : '{ "userId": "' + Ti.App.Properties.getString('email') + '","bookTitle": "' + titleField.value + '", "bookSubtitle": "' + subtitleField.value + '","author": "' + authorsField.value + '", "publisher": "' + publisherField.value + '","publishedDate": "' + publishedDateField.value + '","edition": "' + editionField.value + '", "condition": "' + conditionField.value + '","faculty": "' + facultyPicker.getSelectedRow(0).title + '","moduleCode": "' + moduleCodeField.value + '", "price": "' + priceField.value + '"}',

		 }, function(e) {
		 if (e.success) {
		 var post = e.posts[0];
		 alert('Success create post:\\n' + 'id: ' + post.id + '\\n' + 'title: ' + post.title + '\\n' + 'content: ' + post.content + '\\n');
		 } else {
		 alert('Error in post creating:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		 }
		 });
		 */
	} else if (e.index == 1) {// clicked "Cancel"
		// do nothing
	}
});
