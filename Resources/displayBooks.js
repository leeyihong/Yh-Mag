// create new window
var bookWin = Titanium.UI.createWindow({
	backgroundColor : '#FFFFFF',
});

var homeWin = Titanium.UI.createWindow({
	backgroundColor : '#FFFFFF',
	url: 'home.js'
});
// access ti properties to get the view name
var pageTitle = Ti.App.Properties.getString('title');

var heading = Titanium.UI.createLabel({
	width: 'auto',
	height: '30dp',
	top: '10dp',
	left: '10dp',
	color: '#000014',
	font: {fontSize: '15dp', fontFamily: 'Helvetica',
	fontWeight:'bold'},
	text: pageTitle
})

bookWin.add(heading);
/*
var book = Titanium.UI.createImageView({
	image: 'images/light_home.png',
	width: '100dp',
	height:	'133dp',
	left: '10dp',
	top: '50dp'
})

var priceDisplay = Ti.UI.createView({
	backgroundColor : '#FFFACD',
	bottom : '0dp',
	left : '0dp',
	height : '15dp',
	//borderWidth : '5',
	//borderColor : '#FFFFFF',
	width : '100dp',
	opacity : 0.20
});

var price = Ti.UI.createLabel({
	text : '$10',
	textAlign : 'center',
	top : 0,
	left : 0,
	height : '15dp',
	width : '100%',
	font : {
		fontSize : '10dp',
		fontWeight : 'bold'
	}
});

bookWin.add(heading);
bookWin.add(book);
priceDisplay.add(price);
book.add(priceDisplay);
*/
// access database to get books according to date upload
	// overlay- price of book 
/*	
// back button
var back = Titanium.UI.createButton({
	title: 'Back',
	font: {fontsize: 25},
	bottom: '20dp',
	right: '110dp',
	width: '100dp',
	height: '30dp'
})
bookWin.add(back);

back.addEventListener('click', function(e){
	homeWin.open();
});
*/
bookWin.open();
