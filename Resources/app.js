
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
	width: 200,
	height: 40,
	left: 100,
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
	width: 200,
	left:200,
	top: 68
});

var domainLabel = Titanium.UI.createLabel({
	text:'Domian* :',
	font:{fontSize:25},
	color: 'black',
	left: 25,
	top: 140,
	textAlign:'left'
});

var domainPicker = Ti.UI.createPicker({
	width: 200,
	left: 200,
	top:138
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
	font:{fontSize:35},
	backgroundColor: '#297CCF',
	left: 25,
	top: 240,
	width: 150,
	height: 40
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

/*// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
*/