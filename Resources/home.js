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
    icon:'images/light_home.png',
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
    icon:'images/light_search.png',
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
    icon:'images/light_coins.png',
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
	left: 0,
	exitOnClose: true
});

var tabProfile = Titanium.UI.createTab({  
    icon:'images/light_pictures.png',
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

var rowData = [];
 
for(i=0;i<5;i++) {
    var homeTableRow = Ti.UI.createTableViewRow({
    	height : '100dp'
    });
    var column1View = Ti.UI.createImageView({
    	image: 'logo.png',
    	top : '8dp',
        left : '20dp',
        width : "85dp",
        height : '85dp',
        backgroundColor : "blue"
    });
    var column2View = Ti.UI.createImageView({
    	image: 'logo.png',
    	top : '8dp',
        left : "120dp",
        width : "85dp",
        height : '85dp',
        backgroundColor : "red"
    });
    var column3View = Ti.UI.createImageView({
    	image: 'logo.png',
    	top : '8dp',
        left : "220dp",
        width : "85dp",
        height : '85dp',
        backgroundColor : "green"
    });
    /*
    var column4View = Ti.UI.createImageView({
    	image: 'logo.png',
        left : "75%",
        width : "25%",
        backgroundColor : "yellow"
    });*/
    homeTableRow.add(column1View);
    homeTableRow.add(column2View);
    homeTableRow.add(column3View);
    //homeTableRow.add(column4View);
    rowData.push(homeTableRow);
};
 
var homeTableView = Ti.UI.createTableView({
    data : rowData,
});
 /*
homeTableView.addEventListener('click',function(e){
    alert(e.row.children[0].backgroundColor);
    alert(e.row.children[1].backgroundColor);
    alert(e.row.children[2].backgroundColor);
    alert(e.row.children[3].backgroundColor);
    
});*/

winHome.add(homeTableView);
