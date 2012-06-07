var loginWin = Titanium.UI.createWindow({
backgroundColor:'#FFFFFF'
});

var homeWin = Titanium.UI.createWindow({
backgroundColor:'#FFFFFF',
url: 'home.js'
});

// BUTTON FOR IVLE LOGIN
var ivleLoginButton = Titanium.UI.createButton({
	title: 'Login with IVLE',
	font:{fontSize:20},
	top: 170,
	height: 50,
	width: 262
});
ivleLoginButton.addEventListener('click', function(e){
	ivleLoginWindow.open({modal:true});
})

//BUTTON FOR FACEBOOK LOGIN
Ti.Facebook.appid = '138860876249474';
Ti.Facebook.permissions = ['publish_stream'];

Ti.Facebook.addEventListener('login', function(e) {
    if (e.success) {
        alert('Logged in'),
    	homeWin.open()
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
    top: 250,
	width: 300,
	height: 50,
    style : buttonStyle,
})

// Add the button.  Note that it doesn't need a click event listener.
//loginWin.add(ShootNSellLabel);
loginWin.add(facebookLoginButton);

loginWin.add(ivleLoginButton);

loginWin.open();

// WEBVIEW FOR IVLE LOGIN
var ivleloginWeb = Titanium.UI.createWebView({url:'https://ivle.nus.edu.sg/api/login/?apikey=OcV2lfcOa6uMsjtuI1Z4Q'});

ivleloginWeb.addEventListener('load', function(e){
	if(ivleloginWeb.url.indexOf('/api/login/login_result.ashx') > 0){
			if (ivleloginWeb.url.indexOf('&r=0') > 0){
				homeWin.open()
			}
	}
})

var overlay = Ti.UI.createView({
	backgroundColor:'#0000CC',
	top: 3,
    left: 0,
	height: 62,
	borderWidth: 5,
	borderColor: '#FFFFFF',
	width:'auto',
	opacity:0.92
});
overlay.add(Ti.UI.createLabel({
	text: 'ShootNSell IVLE Login',
	textAlign: 'center',
	verticalAlign: 'center',// this not working... need to do some research
	top: 0,
    left: 0,
	height: 60,
	width:'100%',
	font: {
		fontSize:26,
		fontWeight:'bold'
	}
}));

var ivleLoginWindow = Titanium.UI.createWindow(); 

ivleLoginWindow.add(ivleloginWeb);
ivleLoginWindow.add(overlay);
