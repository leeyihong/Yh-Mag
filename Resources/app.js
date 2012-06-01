
var loginWin = Titanium.UI.createWindow({
	backgroundColor:'#FFFFFF'
}); 

var loginLabel = Titanium.UI.createLabel({
	text:'UserID* :',
	font:{fontSize:20},
	color: 'black',
	left: 20,
	top: 20,
	textAlign:'left'
});

var loginField = Titanium.UI.createTextField({
	hintText: 'U1234567',
	font: {
                fontSize: 15,
           },
   verticalAlign: 'centre',
	width: 150,
	height: 40,
	left: 140,
	top: 20
});

var passwordLabel = Titanium.UI.createLabel({
	text:'Password* :',
	font:{fontSize:20},
	color: 'black',
	left: 20,
	top: 70,
	textAlign:'left'
});

var passwordField = Titanium.UI.createTextField({
	passwordMask: 'true',
	font: {
                fontSize: 15,
           },
	width: 150,
	height: 40,
	left:140,
	top: 68
});

var domainLabel = Titanium.UI.createLabel({
	text:'Domian* :',
	font:{fontSize:20},
	color: 'black',
	left: 20,
	top: 120,
	textAlign:'left'
});

var domainPicker = Ti.UI.createPicker({
	width: 150,
	height: 40,
	left: 140,
	top:118
});

var domainChoices = [];
domainChoices[0]=Ti.UI.createPickerRow({title:'NUSSTU'});
domainChoices[1]=Ti.UI.createPickerRow({title:'NUSSTF'});
domainChoices[2]=Ti.UI.createPickerRow({title:'NUSEXT'});
domainChoices[3]=Ti.UI.createPickerRow({title:'GUEST'});

domainPicker.add(domainChoices);
domainPicker.selectionIndicator = true;

var loginButton = Titanium.UI.createButton({
	title: 'LOGIN',
	font:{fontSize:20},
	backgroundColor: '#29A3A3',
	left: 20,
	top: 170,
	width: 150,
	height: 38,
	borderColor: null,
	borderRadius:0,
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
});

loginButton.addEventListener('click',function(e)
{
   Titanium.API.info("You clicked on the Login Button! HEHE :P");
});

loginWin.add(loginLabel);
loginWin.add(loginField);
loginWin.add(passwordLabel);
loginWin.add(passwordField);
loginWin.add(domainLabel);
loginWin.add(domainPicker);
loginWin.add(loginButton);

loginWin.open();
