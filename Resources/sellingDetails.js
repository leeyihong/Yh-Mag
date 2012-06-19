/**
 * @author Yi Hong
 */

var sellingDetailsWin = Ti.UI.currentWindow;
Ti.API.info(sellingDetailsWin.isbnNo);
var isbnNo = sellingDetailsWin.isbnNo;
Ti.API.info(isbnNo);

//Setting global varible for book details
var output ;
var details ;

var isbnAPIUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
var isbnApiKey = 'AIzaSyBgUbjxOGiJNbKS39ZHF2NH2hLVHdo6FEs';

var xhr = Ti.Network.createHTTPClient();
xhr.open("GET", isbnAPIUrl + isbnNo + '&key='+ isbnApiKey);

xhr.onload = function(){
	output = JSON.parse(xhr.responseText);
	details = output.items[0];
	
	var title = Ti.UI.createLabel({
		text: details.volumeInfo.title,
		font:{
			fontSize: '16dp', 
			fontFamily: 'Helvetica',
			fontWeight:'bold'
		},
		left: '10px',
		top: '30dp'
	});
	sellingDetailsWin.add(title);
	//Ti.API.info("lebal is " + output.items[0].volumeInfo.title);
	
	
};

xhr.send();