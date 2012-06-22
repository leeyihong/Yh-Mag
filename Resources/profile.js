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
	image: 'profilePic.png',
	width: 76,
	height:	100,
	left: 122,
	right: 122,
	top: 20
});

winProfile.add(photoLogo);

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

// create a label to display name
var nameDisplay = Titanium.UI.createLabel({
	width: 'auto',
	height: 30,
	top: 140,
	left: 20,
	color: '#4169E1',
	font: {fontSize: 14, fontFamily: 'Helvetica',
	fontWeight:'bold'},
	text: nameText
});
winProfile.add(nameDisplay);


// create a label to display email
var emailDisplay = Titanium.UI.createLabel({
	width: 'auto',
	height: 30,
	top: 170,
	left: 20,
	color: '#4169E1',
	font: {fontSize: 14, fontFamily: 'Helvetica',
	fontWeight:'bold'},
	text: emailText
});
winProfile.add(emailDisplay);

// other details textbox
var addDetails;
var details = Titanium.UI.createTextArea({ 
	width: 280,
	height: 100,
	top: 210,
	left: 20,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	returnKeyType:Titanium.UI.RETURNKEY_DONE,
	hintText: 'Other details...',
	value: addDetails
});

winProfile.add(details);

// home window
var homeWin = Titanium.UI.createWindow({
	backgroundColor : '#FFFFFF',
	url : 'home.js',
});

// login window
var loginWin = Titanium.UI.createWindow({
	backgroundColor : '#FFFFFF',
	url : 'app.js',
});

// logout button
var logout = Titanium.UI.createButton({
	title: 'Logout',
	font: {fontsize: 20},
	bottom: 20,
	left: 100,
	width: 120,
	height: 50
})
winProfile.add(logout);

logout.addEventListener('click', function(e){
	// options when logout button is clicked
	var resultOptionDialog = Titanium.UI.createOptionDialog({
		title: 'Are you sure you want to logout?',
		options: ['Yes', 'No'],
		cancel: 1
	});
	resultOptionDialog.addEventListener('click', function(e){
		// clicking on yes...
		if (e.index == 0){
			Ti.App.Properties.setString("token", ''),
			homeWin.hide(); // trying to hide the tab group after logging out - but not successful yet
			loginWin.open();
		}
		else{
			resultOptionDialog.hide();
		}
	});
	resultOptionDialog.show();
});