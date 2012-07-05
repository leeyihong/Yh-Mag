// app initialization
var Cloud = require('ti.cloud');
Cloud.debug = true;

// home window upon successful login
var homeWin = Titanium.UI.createWindow({
	navBarHidden : true,
	backgroundColor : '#FFFFFF',
	url : 'home.js',
});

if(Ti.App.Properties.getString('email'))
	login(Ti.App.Properties.getString('email'));
else {
	var apikey = 'B35vgIdq2a3SpGSBD81Be'
	Ti.App.Properties.setString('apikey', apikey);

	// login window
	var loginWin = Titanium.UI.createWindow({
		backgroundColor : '#FFFFFF',
		navBarHidden : true
	});

	var windowWidth = Ti.Platform.displayCaps.platformWidth;

	// display app logo
	var logo = Titanium.UI.createImageView({
		image : 'logo.png',
		width : 200,
		height : 200,
		top : 20
	});

	loginWin.add(logo);

	// BUTTON FOR IVLE LOGIN
	var ivleLoginButton = Titanium.UI.createButton({
		title : 'Login with IVLE',
		font : {
			fontSize : '15dp'
		},
		top : '250dp',
		height : '35dp',
		width : '180dp'
	});

	ivleLoginButton.addEventListener('click', function(e) {
		ivleLoginWindow.open({
			modal : true
		});
	})
	//BUTTON FOR FACEBOOK LOGIN
	Ti.Facebook.appid = '138860876249474';
	Ti.Facebook.permissions = ['publish_stream'];

	Ti.Facebook.addEventListener('login', function(e) {
		if(e.success) {
			alert('Logged in'), homeWin.open()
		}
	});
	Ti.Facebook.addEventListener('logout', function(e) {
		alert('Logged out');
	});

	// Use wide button style -- constant not supported on Android yet.
	var buttonStyle;
	if(Ti.Platform.name === 'android') {
		buttonStyle = 'wide';
	} else {
		buttonStyle = Ti.Facebook.BUTTON_STYLE_WIDE;
	}
	var facebookLoginButton = Ti.Facebook.createLoginButton({
		top : '310dp',
		width : 300,
		height : 50,
		style : buttonStyle,
	})
	// Add the button. Note that it doesn't need a click event listener.
	//loginWin.add(ShootNSellLabel);
	loginWin.add(facebookLoginButton);

	loginWin.add(ivleLoginButton);
	//loginWin.add(facebookLoginButton);
	loginWin.open();

	// WEBVIEW FOR IVLE LOGIN
	var ivleloginWeb = Titanium.UI.createWebView({
		url : 'https://ivle.nus.edu.sg/api/login/?apikey=' + apikey
	});

	var string;
	var token;
	var xhr;

	ivleloginWeb.addEventListener('load', function(e) {
		if(ivleloginWeb.url.indexOf('/api/login/login_result.ashx') > 0) {
			if(ivleloginWeb.url.indexOf('&r=0') > 0) {
				string = JSON.stringify(e), token = string.substring(string.indexOf('<body>') + 6, string.indexOf('</body>')), Ti.App.Properties.setString("token", token),
				// verify user and get username and email
				// get username
				xhr = Ti.Network.createHTTPClient();
				xhr.open("GET", "https://ivle.nus.edu.sg/api/Lapi.svc/UserName_Get?APIKey=" + apikey + "&Token=" + token);
				xhr.onload = function() {
					var output = this.responseText;
					Ti.App.Properties.setString("name", output.substring(1, output.length - 1));

					//alert(Ti.App.Properties.getString('name'));

					// get email
					var xhr2 = Ti.Network.createHTTPClient();
					xhr2.open("GET", "https://ivle.nus.edu.sg/api/Lapi.svc/UserEmail_Get?APIKey=" + apikey + "&Token=" + token);
					xhr2.onload = function() {
						var output2 = this.responseText;
						Ti.App.Properties.setString("email", output2.substring(1, output2.length - 1));

						//alert(Ti.App.Properties.getString('email'));

						createUser(Ti.App.Properties.getString('name'), Ti.App.Properties.getString('email'));
					}
					xhr2.send();
				}
				xhr.send();

			}
		}

	});

	var overlay = Ti.UI.createView({
		backgroundColor : '#0000CC',
		top : 3,
		left : 0,
		height : '62dp',
		borderWidth : '5',
		borderColor : '#FFFFFF',
		width : 'auto',
		opacity : 0.92
	});

	overlay.add(Ti.UI.createLabel({
		text : 'ShootNSell IVLE Login',
		textAlign : 'center',
		//verticalAlign : 'center', // this not working... need to do some research
		top : 0,
		left : 0,
		height : '60dp',
		width : '100%',
		font : {
			fontSize : '26dp',
			fontWeight : 'bold'
		}
	}));

	var ivleLoginWindow = Titanium.UI.createWindow({
		navBarHidden : true
	});
	ivleLoginWindow.add(ivleloginWeb);
	ivleLoginWindow.add(overlay);
}

//functions
function login(email) {
	Cloud.Users.login({
		login : email,
		password : 'test_password'
	}, function(e) {
		if(e.success) {
			var user = e.users[0];
			//alert('Welcome to ShootNSell!');
			homeWin.open();
		} else {
			//alert('2 Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

function createUser(name, email) {
	// create user/ login if exist
	Cloud.Users.create({
		email : email,
		username : email,
		first_name : name,
		last_name : name,
		password : 'test_password',
		password_confirmation : 'test_password',
		//photo : 'profile.png',
		custom_fields : '{ "other_details" : "Handphone, etc..."}'
	}, function(e) {
		Ti.API.info('Function entered')
		if(e.success) {
			var user = e.users[0];

			//alert('Welcome to ShootNSell!');
			homeWin.open();

		} else {
			//alert('1 Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));

			//login function
			login(email);
		}
	});
}