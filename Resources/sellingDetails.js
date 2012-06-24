/**
 * @author Yi Hong
 */

var sellingDetailsWin = Ti.UI.currentWindow;
var isbnNo = sellingDetailsWin.isbnNo;
Ti.API.info(isbnNo);
var screenHeight = Ti.Platform.displayCaps.platformHeight;
var screenWidth = Ti.Platform.displayCaps.platformWidth;

function GetWidth(value) {
    return parseInt((screenWidth * value) / 320);
}


//Setting global varible for book details
var output ;
var details ;
var bookImage = Ti.UI.createImageView({
	url: "NoImage.png",
	top: '10dp',
	left: 'center',
	width: '85dp',
	height: '120dp'
});
var titleLabel = Ti.UI.createLabel({
	text: 'Title: ',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
		fontWeight:'bold'
	},
	color: '#000014',
	left: '10dp',
	//top: '140dp'
});
//sellingDetailsWin.add(titleLabel);
var titleField = Ti.UI.createTextField({
	hintText: 'Book Title',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
	},
	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
	left: '110dp',
	//top: '130dp',
	height: '35dp',
	width: '200dp'
});
var subtitleField = Ti.UI.createTextField({
	hintText: 'Subtitle',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
	},
	color: '#000014',
	left: '110dp',
	//top: '165dp',
	height: '35dp',
	width: '200dp'
});
var authorsLabel = Ti.UI.createLabel({
	text: 'Author :',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
		fontWeight:'bold'
	},
	color: '#000014',
	left: '10dp',
	//top: '210dp'
});
//sellingDetailsWin.add(authorsLabel);
var authorsField = Ti.UI.createTextField({
	hintText: 'Name of Author/(s/)',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
	},
	color: '#000014',
	left: '110dp',
	//top: '200dp',
	height: '35dp',
	width: '200dp'
});
var publisherLabel = Ti.UI.createLabel({
	text: 'Publisher :',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
		fontWeight:'bold'
	},
	color: '#000014',
	left: '10dp',
	//top: '245dp'
});
//sellingDetailsWin.add(publisherLabel);
var publisherField = Ti.UI.createTextField({
	hintText: 'name of publisher',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
	},
	color: '#000014',
	left: '110dp',
	//top: '235dp',
	height: '35dp',
	width: '200dp'
});
var publishedDateLabel = Ti.UI.createLabel({
	text: 'Published Date :',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
		fontWeight:'bold'
	},
	color: '#000014',
	left: '10dp',
	//top: '280dp'
});
//sellingDetailsWin.add(publisherDateLabel);
var publishedDateField = Ti.UI.createTextField({
	hintText: 'Date of Publish',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
	},
	color: '#000014',
	left: '130dp',
	//top: '270dp',
	height: '35dp',
	width: '180dp'
});
var editionLabel = Ti.UI.createLabel({
	text: 'Edition :',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
		fontWeight:'bold'
	},
	color: '#000014',
	left: '10dp',
	//top: '315dp'
});
//sellingDetailsWin.add(editionLabel);
var editionField = Ti.UI.createTextField({
	hintText: 'edition',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
	},
	color: '#000014',
	left: '110dp',
	//top: '305dp',
	height: '35dp',
	width: '200dp'
});
//sellingDetailsWin.add(editionField);
var conditionLabel = Ti.UI.createLabel({
	text: 'Condition :',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
		fontWeight:'bold'
	},
	color: '#000014',
	left: '10dp',
	//top: '350dp'
});
//sellingDetailsWin.add(conditionLabel);
var conditionField = Ti.UI.createTextField({
	hintText: '5.5',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
	},
	color: '#000014',
	left: '110dp',
	//top: '340dp',
	height: '35dp',
	width: '60dp'
});
//sellingDetailsWin.add(conditionField);
var condition10Label = Ti.UI.createLabel({
	text: '/10',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
		fontWeight:'bold'
	},
	color: '#000014',
	left: '170dp',
	//top: '350dp'
});
//sellingDetailsWin.add(condition10Label);

var submitSellingButton =  Ti.UI.createButton({
	title: 'Submit',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
		fontWeight:'bold'
	},
	color: '#000014',
	left: '80dp',
	//top: '400dp',
	width: '80dp',
	height: '35dp'
});
//sellingDetailsWin.add(submitSellingButton);
var cancelButton =  Ti.UI.createButton({
	title: 'Cancel',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
		fontWeight:'bold'
	},
	color: '#000014',
	left: '180dp',
	//top: '400dp',
	width: '80dp',
	height: '35dp'
});
//sellingDetailsWin.add(cancelButton);
var transacWindow = Ti.UI.createWindow({
	backgroundColor: 'white',
	url : 'transact.js'
});
var cancelDialog = Ti.UI.createAlertDialog({
	title: 'Cancel Dialog',
	message: 'Are you sure you would like to cancel this?',
	cancel: 1,
    buttonNames: ['Confirm', 'Cancel'],
});
cancelButton.addEventListener('click', function(){
	cancelDialog.show();
});
cancelDialog.addEventListener('click', function(ev) {
    if (ev.index == 0) { // clicked "Confirm"
      transacWindow.open();
    } else if (ev.index == 1) { // clicked "Cancel"
      // do nothing
    }
  });


var isbnAPIUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
var isbnApiKey = 'AIzaSyBgUbjxOGiJNbKS39ZHF2NH2hLVHdo6FEs';

var xhr = Ti.Network.createHTTPClient();
xhr.open("GET", isbnAPIUrl + isbnNo + '&key='+ isbnApiKey);

xhr.onload = function(){
	output = JSON.parse(xhr.responseText);
	
	if(output.hasOwnProperty('totalItems')){
		
		if(output.totalItems >= 1){
			
			if(output.totalItems > 1){  // normally will not happen... error checking in case it happen...
				alert('There is more than 1 book found! Only 1st book appear.')
			};
			
			details = output.items[0];
			
			titleField.value = details.volumeInfo.title;
			//sellingDetailsWin.add(titleField)
			
			if(details.volumeInfo.subtitle != null){
				subtitleField.value = details.volumeInfo.subtitle;
			};
			//sellingDetailsWin.add(subtitleField);
			
			var noOfAuthor = details.volumeInfo.authors.length
			Ti.API.info(noOfAuthor);
			if (noOfAuthor > 0){
				var Aur = details.volumeInfo.authors[0];
				for(i=1; i<noOfAuthor; i ++){
					Aur = Aur + ', '+ details.volumeInfo.authors[i];
				};
				authorsField.value = Aur;
			};
			//sellingDetailsWin.add(authorsField);
			
			if (details.volumeInfo.publisher != null){
				publisherField.value = details.volumeInfo.publisher;
			};
			//sellingDetailsWin.add(publisherField);
			
			if (details.volumeInfo.publishedDate != null){
				publishedDateField.value = details.volumeInfo.publishedDate;
			};
			//sellingDetailsWin.add(publisherDateField);
			
			if(details.volumeInfo.hasOwnProperty('imageLinks')){
				if(details.volumeInfo.imageLinks.hasOwnProperty('thumbnail')){
					bookImage.url = details.volumeInfo.imageLinks.thumbnail;
				} else if(details.volumeInfo.imageLinks.hasOwnProperty('smallThumbnail')){
					bookImage.url = details.volumeInfo.imageLinks.smallThumbnail;
				}
			};
			//sellingDetailsWin.add(bookImage);
		} else if (output.totalItems == 0){
			alert('This Barcode is invalid! This might not be a book or the book is not in the database.')
		} else {
			aleat('Error in looking for a book in database')
		}
	} else {
		alert('This Barcode is invalid! This might not be a book or book not found in database.');
	}
};

xhr.send();

var tableSetting = {
	leftOne: '10dp',
	leftTwo: '110dp'
	
};
var displayTable = Ti.UI.createTableView({
	//data: tableData,
	height: 'auto',
	separatorColor: 'transparent'
});
var BookImageRow = Ti.UI.createTableViewRow({
	height: 'auto',
}); 
bookImage.left = '120dp';
BookImageRow.add(bookImage);
displayTable.appendRow(BookImageRow);

//Title Row
var titleRow = Ti.UI.createTableViewRow({
	height: 'auto',
});
titleLabel.left = tableSetting.leftOne;
titleRow.add(titleLabel);
titleField.left = tableSetting.leftTwo;
titleRow.add(titleField);
displayTable.appendRow(titleRow);

//Subtitle Row
var subtitleRow = Ti.UI.createTableViewRow({
	height: 'auto',
});
subtitleField.left = tableSetting.leftTwo;
subtitleRow.add(subtitleField);
displayTable.appendRow(subtitleRow);

//Author Row
var authorRow = Ti.UI.createTableViewRow({
	height: 'auto',
});
authorsLabel.left = tableSetting.leftOne;
authorRow.add(authorsLabel);
authorsField.left = tableSetting.leftTwo;
authorRow.add(authorsField);
displayTable.appendRow(authorRow);

//Publisher Row
var publisherRow = Ti.UI.createTableViewRow({
	height: 'auto',
});
publisherLabel.left = tableSetting.leftOne;
publisherRow.add(publisherLabel);
publisherField.left = tableSetting.leftTwo;
publisherRow.add(publisherField);
displayTable.appendRow(publisherRow);

// Published Date Row
var publishedDateRow = Ti.UI.createTableViewRow({
	height: 'auto',
});
publishedDateLabel.left = tableSetting.leftOne;
publishedDateRow.add(publishedDateLabel);
publishedDateField.left = '130dp';
publishedDateRow.add(publishedDateField);
displayTable.appendRow(publishedDateRow);

// Edition Row
var editionRow = Ti.UI.createTableViewRow({
	height: 'auto',
});
editionLabel.left = tableSetting.leftOne;
editionRow.add(editionLabel);
editionField.left = tableSetting.leftTwo;
editionRow.add(editionField);
displayTable.appendRow(editionRow);

// Condition Row
var conditionRow = Ti.UI.createTableViewRow({
	height: 'auto',
});
conditionLabel.left = tableSetting.leftOne;
conditionRow.add(conditionLabel);
conditionField.left = tableSetting.leftTwo;
conditionRow.add(conditionField);
condition10Label.left = '170dp';
conditionRow.add(condition10Label);
displayTable.appendRow(conditionRow);

// Button Row
var buttonRow = Ti.UI.createTableViewRow({
	height: 'auto',
});
submitSellingButton.left = '80dp';
buttonRow.add(submitSellingButton);
cancelButton.left = '180dp';
buttonRow.add(cancelButton);
displayTable.appendRow(buttonRow);

sellingDetailsWin.add(displayTable);