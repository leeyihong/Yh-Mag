// after login successful, go to home page
var win = Titanium.UI.currentwindow;
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// create 'home' tab and window
/*var winHome = Titanium.UI.createWindow({  
    title:'Home',
    backgroundColor:'#fff',
    url:"home.js"
});*/

var tabHome = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Home',
    //window:win
});

// create 'search' tab and window
var winSearch= Titanium.UI.createWindow({  
    title:'Search',
    backgroundColor:'#fff',
    url: "search.js"
});

var tabSearch = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Search',
    window:winSearch
});


// create 'transaction' tab and window
var winTransact = Titanium.UI.createWindow({  
    title:'Transaction',
    backgroundColor:'#fff',
    url: "transact.js"
});

var tabTransact = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Transaction',
    window:winTransact
});

// create 'profile' tab and window
var winProfile = Titanium.UI.createWindow({  
    title:'Profile',
    backgroundColor:'#fff',
    url: "profile.js"
});

var tabProfile = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Profile',
    window:winProfile
});


//  add tabs
tabGroup.addTab(tabHome);  
tabGroup.addTab(tabSearch);  
tabGroup.addTab(tabTransact);  
tabGroup.addTab(tabProfile);

// open tab group
tabGroup.open();
