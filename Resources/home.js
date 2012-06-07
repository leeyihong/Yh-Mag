// after login successful, go to home page

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


// create 'home' tab and window
var winHome = Titanium.UI.createWindow({  
    title:'Home',
    backgroundColor:'#fff',
    url:"home.js"
});
var tabHome = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Home',
    window:winHome
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