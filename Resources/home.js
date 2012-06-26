// after login successful, go to home page

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var windowHeight = Ti.Platform.displayCaps.platformHeight;
var windowWidth = Ti.Platform.displayCaps.platformWidth;
Ti.API.info(windowHeight);
Ti.API.info(windowWidth);

//create the view to hold all of our UI controls
var view = Titanium.UI.createView({
	width: 300,
	height: 350,
	left: 10,
	top: 10,
	backgroundColor: '#fff',
	borderRadius: 5
});


// create 'home' tab and window
var winHome = Titanium.UI.createWindow({  
    title:'Home',
    backgroundColor:'#fff',
    width: 320,
	height: 480,
	top: 0,
	left: 0
    //url:"home.js"
});
var tabHome = Titanium.UI.createTab({  
    icon:'bookhouse.png',
    title:'Home',
    window:winHome
});

// create 'search' tab and window
var winSearch= Titanium.UI.createWindow({  
    title:'Search',
    backgroundColor:'#fff',
    url: 'search.js',
    width: 320,
	height: 480,
	top: 0,
	left: 0
});

var tabSearch = Titanium.UI.createTab({  
    icon:'search.png',
    title:'Search',
    window:winSearch
});

// create 'transaction' tab and window
var winTransact = Titanium.UI.createWindow({  
    title:'Transaction',
    backgroundColor:'#fff',
    url:'transact.js',
    width: 320,
	height: 480,
	top: 0,
	left: 0
});

var tabTransact = Titanium.UI.createTab({  
    icon:'transact.png',
    title:'Transact',
    window:winTransact
});

// create 'search' tab and window
var winProfile= Titanium.UI.createWindow({  
    title:'Profile',
    backgroundColor:'#fff',
    url: 'profile.js',
    width: 320,
	height: 480,
	top: 0,
	left: 0
});

var tabProfile = Titanium.UI.createTab({  
    icon:'profile.png',
    title:'Profile',
    window: winProfile
});

//add the view to our window
winHome.add(view);

//
//  add tabs
//
tabGroup.addTab(tabHome);  
tabGroup.addTab(tabSearch);  
tabGroup.addTab(tabTransact);  
tabGroup.addTab(tabProfile);  

tabGroup.open();

var facultiesList = [
"Arts & Social Sciences",
"Business",
"Computing",
"Dentistry",
"Design & Environment",
"Engineering",
"Law",
"Medicine",
"Science"]; 
for (var i=0; i<facultiesList.length; i++){
	var row = Ti.UI.createTableViewRow({});
	
	var textlabel = Ti.UI.createLabel({
		text: facultiesList[i],
		color: '#000014',
		font:{
			fontSize: '14dp', 
			fontFamily: 'Helvetica',
			fontWeight:'bold'
		},
		textAlign:'left',
		left:'10dp',
		height: '50dp'
	});
	row.add(textlabel);
	facultiesList[i] = row;
};
var facultyTable = Titanium.UI.createTableView({
	data:facultiesList,
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
		fontWeight:'bold'
	},
	color: '#000014',
}); 
winHome.add(facultyTable);