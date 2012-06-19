/**
 * @author Yi Hong
 */

var sellingDetailsWin = Ti.UI.currentWindow;
var isbnNo = sellingDetailsWin.isbnNo;
Ti.API.info(isbnNo);

//Setting global varible for book details
var output ;
var details ;
var title = Ti.UI.createLabel({
	font:{
		fontSize: '16dp', 
		fontFamily: 'Helvetica',
		fontWeight:'bold'
	},
	color: '#000014',
	left: '10dp',
	top: '150dp'
});
var subtitle = Ti.UI.createLabel({
	text: "",
	font:{
		fontSize: '15dp', 
		fontFamily: 'Helvetica',
	},
	color: '#000014',
	left: '10dp',
	top: '175dp'
});
var authors = Ti.UI.createLabel({
	text: "",
	font:{
		fontSize: '15dp', 
		fontFamily: 'Helvetica',
	},
	color: '#000014',
	left: '10dp',
	top: '200dp'
});

var publisher = Ti.UI.createLabel({
	text: "",
	font:{
		fontSize: '15dp', 
		fontFamily: 'Helvetica',
	},
	color: '#000014',
	left: '10dp',
	top: '225dp'
});

var publisherDate = Ti.UI.createLabel({
	text: "",
	font:{
		fontSize: '15dp', 
		fontFamily: 'Helvetica',
	},
	color: '#000014',
	left: '10dp',
	top: '250dp'
});

var bookImage = Ti.UI.createImageView({
	url: "NoImage.png",
	top: '10dp',
	left: '10dp',
	width: '75dp',
	height: '120dp'
});
var isbnAPIUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
var isbnApiKey = 'AIzaSyBgUbjxOGiJNbKS39ZHF2NH2hLVHdo6FEs';

var xhr = Ti.Network.createHTTPClient();
xhr.open("GET", isbnAPIUrl + isbnNo + '&key='+ isbnApiKey);

xhr.onload = function(){
	output = JSON.parse(xhr.responseText);
	details = output.items[0];
	
	title.text = details.volumeInfo.title;
	sellingDetailsWin.add(title);
	
	if(details.volumeInfo.subtitle != null){
		subtitle.text = details.volumeInfo.subtitle;
	}
	sellingDetailsWin.add(subtitle);
	
	var noOfAuthor = details.volumeInfo.authors.length
	Ti.API.info(noOfAuthor);
	if (noOfAuthor > 0){
		var Aur = details.volumeInfo.authors[0];
		for(i=1; i<noOfAuthor; i ++){
			Aur = Aur + ', '+ details.volumeInfo.authors[i];
		};
		authors.text = "Authors : " + Aur;
	};
	sellingDetailsWin.add(authors);
	
	if (details.volumeInfo.publisher != null){
		publisher.text = "Publisher : " + details.volumeInfo.publisher;
	};
	sellingDetailsWin.add(publisher);
	
	if (details.volumeInfo.publishedDate != null){
		publisherDate.text = "Published Date : " + details.volumeInfo.publishedDate;
	};
	sellingDetailsWin.add(publisherDate);
	
	if(details.volumeInfo.hasOwnProperty('imageLinks')){
		if(details.volumeInfo.imageLinks.hasOwnProperty('thumbnail')){
			bookImage.url = details.volumeInfo.imageLinks.thumbnail;
		} else if(details.volumeInfo.imageLinks.hasOwnProperty('smallThumbnail')){
			bookImage.url = details.volumeInfo.imageLinks.smallThumbnail;
		}
	};
	sellingDetailsWin.add(bookImage);
};

xhr.send();