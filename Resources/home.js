// after login successful, go to home page

var Cloud = require('ti.cloud');
Cloud.debug = true;

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var windowHeight = Ti.Platform.displayCaps.platformHeight;
var windowWidth = Ti.Platform.displayCaps.platformWidth;

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
var priceOverlayleft = ['55dp', '155dp', '255dp']; //tableLeftSetting[i] +  othersTableSetting.imageLength - othersTableSetting.priceOverlayLength
var othersTableSetting = {
    imageLength : '90dp',
    imageTop : '10dp',
    priceOverlayLength : '50dp',
};
var labelRotation = Titanium.UI.create2DMatrix({
	rotate : 45,
});
labelRotation = labelRotation.translate(-5,-17);
var rowData = [];

var loadingIndicator = Ti.UI.createActivityIndicator({
	font : {
		fontFamily : 'Helvetica Neue',
		fontSize : '26dp',
		fontWeight : 'bold'
	},
	message : 'Loading...',
	style : Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
});

loadingIndicator.show();

Cloud.Users.login({
	login : 'jessicalee_88@hotmail.com',
	password : 'test_password'
}, function(e) {
	if (e.success) {
		
		var user = e.users[0];
		//alert('Success Login: ' + 'id: ' + user.id + ' ' + 'first name: ' + user.first_name + ' ' + 'last name: ' + user.last_name);
		Cloud.Posts.query({
			page : 1,
			per_page : 12,
			order : "-created_at" 
			//where : {  // *** CHECK IF DELETED IS TRUE
			//	"bookTitle" : { '$ne' : ""}
			//}
		}, function(e) {
			if (e.success) {
				//alert('Success getting data: ' + 'Count: ' + e.posts.length);
				var resultLength =  e.posts.length
				for (var i = 0; i <= resultLength; i+=3) {

					var homeTableRow = Ti.UI.createTableViewRow({
				    	height : '100dp',
				    });
				      
				    for(var r = 0; r < 3; r++){
				    	var currentPointer = i+r;
				    	if(resultLength - currentPointer < 1){
				    		break;
				    	}
				    	var post = e.posts[currentPointer];
				    	//alert('id: ' + post.id + ' ' + 'id: ' + post.id + ' ' + 'title: ' + post.title + ' ' + 'content: ' + post.content + ' ' + 'updated_at: ' + post.updated_at);
				    	//allSellingResult[i] = post;
				    	
				    	var columnView = Ti.UI.createView({
				    		backgroundImage : post.photo.urls.square_75,
					    	top : othersTableSetting.imageTop,
					        left : tableLeftSetting[r],
					        width : othersTableSetting.imageLength,
					        height : othersTableSetting.imageLength,
					        pointer : currentPointer.toString(),
					        postID : post.id
					    });
					    var moduleOverlay = Ti.UI.createView({
							backgroundColor : 'Black',
							left : tableLeftSetting[r],
							bottom : '0dp',
							height : '20dp',
							width : othersTableSetting.imageLength,
							opacity : 0.50
						});
						moduleOverlay.add(Ti.UI.createLabel({
							text : post.custom_fields.moduleCode,
							textAlign : 'center',
							color : '#FFFFFF',
							font : {
								fontSize : '15dp',
								fontWeight : 'bold'
							}
						}));
						var priceOverlay = Ti.UI.createView({
							backgroundImage: 'images/priceOverlay.png',
							top :othersTableSetting.imageTop,
							left : priceOverlayleft[r],
							width : othersTableSetting.priceOverlayLength,
							height : othersTableSetting.priceOverlayLength,
						});
						priceOverlay.add(Ti.UI.createLabel({
							text : post.custom_fields.price,
							color : '#FFFFFF',
							font : {
								fontSize : '14.5dp',
								fontWeight : 'bold'
							},
							transform : labelRotation,
						}));
						homeTableRow.add(columnView);
						homeTableRow.add(moduleOverlay);
						homeTableRow.add(priceOverlay);
				    };
				    //rowData.push(homeTableRow);
				    rowData[i/3] = homeTableRow;
				};	
				var homeTableView = Ti.UI.createTableView({
					data : rowData,
					separatorColor : 'transparent'
				});

				winHome.add(homeTableView); 
				loadingIndicator.hide();
				
				homeTableView.addEventListener('click', function(e){
					if(e.source.postID){
						//alert ('You had click on ' + e.source.pointer );
						loadingIndicator.show();
						var sellingViewDetailsWin = Ti.UI.createWindow({
							url: 'sellingViewDetails.js',
							backgroundColor: '#FFFFFF',
							modal: true, 
							exitOnClose: true
						});
						sellingViewDetailsWin.postID = e.source.postID;
						loadingIndicator.hide();
						sellingViewDetailsWin.open();
					};
				});
			} else {
				loadingIndicator.hide();
				alert('Error in query: ' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
		
	} else {
		alert('Error in login: ' + ((e.error && e.message) || JSON.stringify(e)));
	}
	
}); 



