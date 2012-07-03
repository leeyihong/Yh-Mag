// after login successful, go to home page

var Cloud = require('ti.cloud');
Cloud.debug = true;

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

var allSellingResult = [];
var tableLeftSetting = ['15dp', '115dp', '215dp', ];
var othersTableSetting = {
	columnImage: 'logo.png',
	columnTop : '10dp',
    columnWidth : "90dp",
    columnHeight : '90dp',
    overlayBottom : '0dp',
	overlayHeight : '20dp',
	overlayWidth : '90dp',
	overlayOpacity : 0.50
};
var rowData = [];

Cloud.Users.login({
	login : 'jessicalee_88@hotmail.com',
	password : 'test_password'
}, function(e) {
	if (e.success) {
		var user = e.users[0];
		alert('Success Login:\\n' + 'id: ' + user.id + '\\n' + 'first name: ' + user.first_name + '\\n' + 'last name: ' + user.last_name);
		Cloud.Posts.query({
			page : 1,
			per_page : 9,
			where : {
				"bookTitle" : { '$ne' : ""}
			}
		}, function(e) {
			if (e.success) {
				alert('Success getting data:\\n' + 'Count: ' + e.posts.length);
				for (var i = 0; i <= e.posts.length-3; i+=3) {
					
					//allSellingResult[i] = post;
					//alert('id: ' + post.id + '\\n' + 'id: ' + post.id + '\\n' + 'title: ' + post.title + '\\n' + 'content: ' + post.content + '\\n' + 'updated_at: ' + post.updated_at);
					
					var homeTableRow = Ti.UI.createTableViewRow({
				    	height : '100dp',
				    });
				      
				    for(var r = 0; r < 3; r++){
				    	var currentPointer = i+r;
				    	var post = e.posts[currentPointer];
				    	
				    	var columnView = Ti.UI.createImageView({
					    	image: e.posts[currentPointer].photo.urls.square_75,
					    	top : '10dp',
					        left : tableLeftSetting[r],
					        width : "90dp",
					        height : '90dp',
					        backgroundColor : "blue"
					    });
					    var moduleOverlay = Ti.UI.createView({
							backgroundColor : 'Black',
							left : tableLeftSetting[r],
							bottom : '0dp',
							height : '20dp',
							width : '90dp',
							opacity : 0.50
						});
						moduleOverlay.add(Ti.UI.createLabel({
							text : e.posts[currentPointer].custom_fields.moduleCode,
							textAlign : 'center',
							color : '#FFFFFF',
							font : {
								fontSize : '15dp',
								fontWeight : 'bold'
							}
						}));
						homeTableRow.add(columnView);
						homeTableRow.add(moduleOverlay);
				    };
				    //rowData.push(homeTableRow);
				    rowData[i/3] = homeTableRow;
				};	
				var homeTableView = Ti.UI.createTableView({
					data : rowData,
					separatorColor : 'transparent'
				});

				winHome.add(homeTableView); 

			} else {
				alert('Error in query:\\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	} else {
		alert('Error in login:\\n' + ((e.error && e.message) || JSON.stringify(e)));
	}
}); 



