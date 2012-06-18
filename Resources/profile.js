// initiate the window for 'profile' tab
var winProfile = Titanium.UI.currentWindow;

// include variables obtained from app.js
var apikey = Ti.App.Properties.getString('apikey');
var token = Ti.App.Properties.getString('token');
var nameText = 'Name: ';
var emailText = 'Email: ';

// user photo


// get username
var xhr = Ti.Network.createHTTPClient();
xhr.open("GET", "https://ivle.nus.edu.sg/api/Lapi.svc/UserName_Get?APIKey=" + apikey + "&Token=" + token);

xhr.onload = function(){
	var output = this.responseText;
	Ti.App.Properties.setString("name", output.substring(1, output.length - 1));
}
xhr.send();

// get email
var xhr = Ti.Network.createHTTPClient();
xhr.open("GET", "https://ivle.nus.edu.sg/api/Lapi.svc/UserEmail_Get?APIKey=" + apikey + "&Token=" + token);

xhr.onload = function(){
	var output2 = this.responseText;
	Ti.App.Properties.setString("email", output2.substring(1, output2.length - 1));
}
xhr.send();

nameText = nameText + Ti.App.Properties.getString('name');
emailText = emailText + Ti.App.Properties.getString('email');

// create a label to display name
var nameDisplay = Titanium.UI.createLabel({
	width: 'auto',
	height: '30dp',
	top: '100dp',
	left: '20dp',
	font: {fontSize: '14dp', fontFamily: 'Helvetica',
	fontWeight:'bold'},
	text: nameText
});
winProfile.add(nameDisplay);


// create a label to display email
var emailDisplay = Titanium.UI.createLabel({
	width: 'auto',
	height: '30dp',
	top: '140dp',
	left: '20dp',
	font: {fontSize: '14dp', fontFamily: 'Helvetica',
	fontWeight:'bold'},
	text: emailText
});
winProfile.add(emailDisplay);

