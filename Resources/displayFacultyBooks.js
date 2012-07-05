// create new window

var Cloud = require('ti.cloud');
Cloud.debug = true;

var displayFacultyBookWin = Ti.UI.currentWindow;
var facultyName = displayFacultyBookWin.facultyName ;

var loadingIndicator = Ti.UI.createActivityIndicator({
	font : {
		fontFamily : 'Helvetica Neue',
		fontSize : '26dp',
		fontWeight : 'bold'
	},
	message : 'Loading...',
	style : Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
});

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
			where : {faculty :  facultyName, bookStatus : 	"onSales" },
			order : "-created_at"
		}, function(e) {
			if (e.success) {
				//alert("Total Result is " +  e.posts.length);
				loadingIndicator.show();
				var resultLength =  e.posts.length
				if (resultLength === 0 ) {
					var noResult = Ti.UI.createLabel({
						text : "No result found",
						color : '#000014',
						font : {
							fontSize : '15dp',
							fontWeight : 'bold'
						}
					});
					displayFacultyBookWin.add(noResult);
					loadingIndicator.hide();
					return
				};
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
				    		backgroundImage :post.photo.urls.square_75,
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
		
				displayFacultyBookWin.add(homeTableView); 
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

/*
var homeWin = Titanium.UI.createWindow({
	backgroundColor : '#FFFFFF',
	url: 'home.js'
});


// access ti properties to get the view name

var pageTitle = Ti.App.Properties.getString('title');

var heading = Titanium.UI.createLabel({
	width: 'auto',
	height: '30dp',
	top: '10dp',
	left: '10dp',
	color: '#000014',
	font: {fontSize: '15dp', fontFamily: 'Helvetica',
	fontWeight:'bold'},
	text: pageTitle
})

bookWin.add(heading);

var book = Titanium.UI.createImageView({
	image: 'images/light_home.png',
	width: '100dp',
	height:	'133dp',
	left: '10dp',
	top: '50dp'
})

var priceDisplay = Ti.UI.createView({
	backgroundColor : '#FFFACD',
	bottom : '0dp',
	left : '0dp',
	height : '15dp',
	//borderWidth : '5',
	//borderColor : '#FFFFFF',
	width : '100dp',
	opacity : 0.20
});

var price = Ti.UI.createLabel({
	text : '$10',
	textAlign : 'center',
	top : 0,
	left : 0,
	height : '15dp',
	width : '100%',
	font : {
		fontSize : '10dp',
		fontWeight : 'bold'
	}
});

bookWin.add(heading);
bookWin.add(book);
priceDisplay.add(price);
book.add(priceDisplay);
*/
// access database to get books according to date upload
	// overlay- price of book 
/*	
// back button
var back = Titanium.UI.createButton({
	title: 'Back',
	font: {fontsize: 25},
	bottom: '20dp',
	right: '110dp',
	width: '100dp',
	height: '30dp'
})
bookWin.add(back);

back.addEventListener('click', function(e){
	homeWin.open();
});

bookWin.open();*/
