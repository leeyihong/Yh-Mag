/**
 * @author Yi Hong
 */
var Cloud = require('ti.cloud');
Cloud.debug = true;

var sellingListDetailwin = Ti.UI.currentWindow;
sellingListDetailwin.exitOnClose = true;

var mySellingData = sellingListDetailwin.sellingDetails;

//alert('Selling Data information about book ' + mySellingData.custom_fields.bookTitle);

//Setting global varible for book details
var output;
var details;
var bookImage = Ti.UI.createImageView({
	image : mySellingData.photo.urls.square_75 ,
	top : '10dp',
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
var titleField = Ti.UI.createTextField({
	value : mySellingData.custom_fields.bookTitle,
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
	value : mySellingData.custom_fields.bookTitle,
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
	value : mySellingData.custom_fields.author,
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
	value : mySellingData.custom_fields.publisher,
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
	value : mySellingData.custom_fields.publishedDate,
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
	value : mySellingData.custom_fields.edition,
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
	value : mySellingData.custom_fields.condition,
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
function getCorrectPosition(dbString){
	for(var i = 0; i < facultiesList.length; i++){
		if(dbString === facultiesList[i].title){
			return i;
		}
	}; 
	return null;
};
facultyPicker.setSelectedRow(0,getCorrectPosition(mySellingData.custom_fields.faculty), true);

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
	value : mySellingData.custom_fields.moduleCode,
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
	value : mySellingData.custom_fields.price,
	hintText : '$30',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
	},
	color : '#000014',
	left : '110dp',
	height : '35dp',
	width : '200dp'
});
var editButton = Ti.UI.createButton({
	title : 'Save Edit',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
		fontWeight : 'bold'
	},
	color : '#000014',
	width : '80dp',
	height : '35dp'
});

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
editButton.center;
buttonRow.add(editButton);
displayTable.appendRow(buttonRow);

sellingListDetailwin.add(displayTable);

var activityIndicator = Ti.UI.createActivityIndicator({
	color: 'Red',
	font: {fontFamily:'Helvetica Neue', fontSize:'26dp', fontWeight:'bold'},
	message: 'Loading...',
	style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
});

editButton.addEventListener('click', function(e) {

	if(!moduleCodeField.value){
		alert('Please enter your module code');
		return;	
	}
	if((!priceField.value)||(priceField.value.length <= 1)){
		alert('Please enter the price');
		return;
	}

	activityIndicator.show();
	Cloud.Posts.update({
	    post_id: mySellingData.id,
	    title : Ti.App.Properties.getString('name') + ' Selling ' + moduleCodeField.value + ' Book!',
		content : 'Selling ' + moduleCodeField.value + ' Book via ShootNSell',
		//photo : sellingDetailsWin.originalImage,
		custom_fields : '{ "userId": "' + Ti.App.Properties.getString('email') + '","bookTitle": "' + titleField.value + '", "bookSubtitle": "' + subtitleField.value + '","author": "' + authorsField.value + '", "publisher": "' + publisherField.value + '","publishedDate": "' + publishedDateField.value + '","edition": "' + editionField.value + '", "condition": "' + conditionField.value + '","faculty": "' + facultyPicker.getSelectedRow(0).title + '","moduleCode": "' + moduleCodeField.value + '", "price": "' + priceField.value + '", "bookStatus": "onSales"}',

	}, function (e) {
	    if (e.success) {
	        var post = e.posts[0];
	        
	        alert('Successfully updated at:\\n' + post.updated_at);
			
	    } else {
	        alert('Error:\\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	    activityIndicator.hide();
	});
});
