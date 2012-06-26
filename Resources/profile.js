// initiate the window for 'profile' tab
var winProfile = Titanium.UI.currentWindow;

// variables
var apikey = Ti.App.Properties.getString('apikey');
var token = Ti.App.Properties.getString('token');
var nameText = 'Name: ';
var emailText = 'Email: ';

// save photo in database??

//dialog with the options of where to get an image from
var dialog = Titanium.UI.createOptionDialog({
	title: 'Choose an image source...',
	options: ['Camera','Photo Gallery', 'Cancel'],
	cancel:2
});

//add event listener
dialog.addEventListener('click',function(e) {
	Ti.API.info('You selected ' + e.index);
});


// choose a photo logo
var photoLogo = Titanium.UI.createImageView({
	image: 'profile.png',
	width: '140dp',
	height:	'133dp',
	left: '85dp',
	right: '85dp',
	top: '12dp'
});
winProfile.add(photoLogo);

var photoInstruct = Titanium.UI.createLabel({
	width: 'auto',
	height: '15dp',
	top: '145dp',
	left: '90dp',
	color: '#D3D3D3',
	font: {fontSize: 10, fontFamily: 'Helvetica'},
	text: 'Click on photo to change it...'
})
winProfile.add(photoInstruct);

photoLogo.addEventListener('click', function(e){
	dialog.show();
});

//add event listener
dialog.addEventListener('click',function(e){
	Ti.API.info('You selected ' + e.index);
	if(e.index == 0){
		//from the camera
		Titanium.Media.showCamera({
			success:function(event){
				var image = event.media;
				if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){
					//set image view
					/*var imgView =
					Titanium.UI.createImageView({
						top: 20,
						left: 20,
						width: 280,
						height: 320
					});
					imgView.image = image;
					win.add(imgView);*/
					photoLogo = image
				}
			},
			cancel:function(){ // having problems with this...will try to solve it
				//getting image from camera was cancelled
				winProfile.open();
			},
			error:function(error){
				//create alert
				var a = Titanium.UI.createAlertDialog({title:'Camera'});
				// set message
				if (error.code == Titanium.Media.NO_CAMERA){
					a.setMessage('Device does not have image recording capabilities');
				}
				else{
					a.setMessage('Unexpected error: ' + error.code);
				}
				// show alert
				a.show();
			},
			allowImageEditing:true,
			saveToPhotoGallery:false
		});
	}
	else{
		//cancel choosing a photo
		dialog.hide();
	}
});

//add event listener
dialog.addEventListener('click',function(e){
	Ti.API.info('You selected ' + e.index);
	if(e.index == 1){
		//obtain an image from the gallery
		Titanium.Media.openPhotoGallery({
			success:function(event){
				var image = event.media;
				// set image view
				Ti.API.debug('Our type was: '+event.mediaType);
				if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){
					/*var imgView = Titanium.UI.createImageView({
						top: 20,
						left: 20,
						width: 280,
						height: 320
					});
					imgView.image = image;
					win.add(imgView);*/
					photLogo = image
				}
			},
			cancel:function(){ // having probles, will try to solve it
				//user cancelled the action from within
				//the photo gallery
				winProfile.open();
			}
		});
	}
	else{
	//cancel choosing photo
	dialog.hide();
	}
});
	
// save photo to database??

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

// prompt for app username
var displayName;
var usernameLabel = Titanium.UI.createLabel({
	width: 'auto',
	height: '30dp',
	top: '160dp',
	left: '20dp',
	color: '#000014',
	font: {fontSize: 14, fontFamily: 'Helvetica',
	fontWeight:'bold'},
	text: 'Display name:'
});
winProfile.add(usernameLabel);

// text field to enter username
var usernameText = Titanium.UI.createTextField({ 
	value: Ti.App.Properties.getString('name'),
	font:{
		fontSize: '13dp',
	},
	width: '175dp',
	height: '35dp',
	top: '160dp',
	left: '125dp'
});
winProfile.add(usernameText);
// save username to database


// create a label to display name
var nameDisplay = Titanium.UI.createLabel({
	width: 'auto',
	height: '30dp',
	top: '195dp',
	left: '20dp',
	color: '#000014',
	font: {fontSize: 14, fontFamily: 'Helvetica',
	fontWeight:'bold'},
	text: nameText
});
winProfile.add(nameDisplay);


// create a label to display email
var emailDisplay = Titanium.UI.createLabel({
	width: 'auto',
	height: '30dp',
	top: '230dp',
	left: '20dp',
	color: '#000014',
	font: {fontSize: 14, fontFamily: 'Helvetica',
	fontWeight:'bold'},
	text: emailText
});
winProfile.add(emailDisplay);

// other details textbox
var addDetails;
var detailsLabel = Titanium.UI.createLabel({
	width: 'auto',
	height: '30dp',
	top: '265dp',
	left: '20dp',
	color: '#000014',
	font: {fontSize: 14, fontFamily: 'Helvetica',
	fontWeight:'bold'},
	text: 'Other details:'
});
winProfile.add(detailsLabel);

var details = Titanium.UI.createTextField({ 
	hintText: 'Handphone, etc...',
	font:{
		fontSize: '14dp',
	},
	width: '280dp',
	height: '35dp',
	top: '295dp',
	left: '20dp',
	value: addDetails
});

winProfile.add(details);

// login window
var loginWin = Titanium.UI.createWindow({
	backgroundColor : '#FFFFFF',
	url : 'app.js',
	navBarHidden: true
});

// logout button
var logout = Titanium.UI.createButton({
	title: 'Logout',
	font: {fontsize: 25},
	bottom: '20dp',
	left: '100dp',
	width: '120dp',
	height: '30dp'
})
winProfile.add(logout);

logout.addEventListener('click', function(e){
	// options when logout button is clicked
	var resultOptionDialog = Titanium.UI.createAlertDialog({
		title: 'Logout Dialog',
		message: 'Are you sure you want to logout?',
		cancel: 1,
		buttonNames: ['Confirm', 'Cancel']
	});
	
	resultOptionDialog.addEventListener('click', function(e){
		// clicking on yes...
		if (e.index == 0){
			Ti.App.Properties.setString("token", ''),
			loginWin.open();
		}
		else{
			resultOptionDialog.hide();
		}
	});
	resultOptionDialog.show();
});