/**
 * @author Yi Hong
 */

var sellingDetailsWin = Ti.UI.currentWindow;
var isbnNo = sellingDetailsWin.isbnNo;
Ti.API.info(isbnNo);

//Setting global varible for book details
var output ;
var details ;
var titleLabel = Ti.UI.createLabel({
	text: 'Title: ',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
		fontWeight:'bold'
	},
	color: '#000014',
	left: '10dp',
	top: '140dp'
});
sellingDetailsWin.add(titleLabel);
var titleField = Ti.UI.createTextField({
	hintText: 'Book Title',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
	},
	verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
	left: '110dp',
	top: '130dp',
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
	top: '165dp',
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
	top: '210dp'
});
sellingDetailsWin.add(authorsLabel);
var authorsField = Ti.UI.createTextField({
	hintText: 'Name of Author/(s/)',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
	},
	color: '#000014',
	left: '110dp',
	top: '200dp',
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
	top: '245dp'
});
sellingDetailsWin.add(publisherLabel);
var publisherField = Ti.UI.createTextField({
	hintText: 'name of publisher',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
	},
	color: '#000014',
	left: '110dp',
	top: '235dp',
	height: '35dp',
	width: '200dp'
});
var publisherDateLabel = Ti.UI.createLabel({
	text: 'Published Date :',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
		fontWeight:'bold'
	},
	color: '#000014',
	left: '10dp',
	top: '280dp'
});
sellingDetailsWin.add(publisherDateLabel);
var publisherDateField = Ti.UI.createTextField({
	hintText: 'Date of Publish',
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
	},
	color: '#000014',
	left: '110dp',
	top: '270dp',
	height: '35dp',
	width: '200dp'
});

var bookImage = Ti.UI.createImageView({
	url: "NoImage.png",
	top: '10dp',
	left: '10dp',
	width: '85dp',
	height: '120dp'
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
			sellingDetailsWin.add(titleField)
			
			if(details.volumeInfo.subtitle != null){
				subtitleField.value = details.volumeInfo.subtitle;
			};
			sellingDetailsWin.add(subtitleField);
			
			var noOfAuthor = details.volumeInfo.authors.length
			Ti.API.info(noOfAuthor);
			if (noOfAuthor > 0){
				var Aur = details.volumeInfo.authors[0];
				for(i=1; i<noOfAuthor; i ++){
					Aur = Aur + ', '+ details.volumeInfo.authors[i];
				};
				authorsField.value = Aur;
			};
			sellingDetailsWin.add(authorsField);
			
			if (details.volumeInfo.publisher != null){
				publisherField.value = details.volumeInfo.publisher;
			};
			sellingDetailsWin.add(publisherField);
			
			if (details.volumeInfo.publishedDate != null){
				publisherDateField.value = details.volumeInfo.publishedDate;
			};
			sellingDetailsWin.add(publisherDateField);
			
			if(details.volumeInfo.hasOwnProperty('imageLinks')){
				if(details.volumeInfo.imageLinks.hasOwnProperty('thumbnail')){
					bookImage.url = details.volumeInfo.imageLinks.thumbnail;
				} else if(details.volumeInfo.imageLinks.hasOwnProperty('smallThumbnail')){
					bookImage.url = details.volumeInfo.imageLinks.smallThumbnail;
				}
			};
			sellingDetailsWin.add(bookImage);
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