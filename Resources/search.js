
var Cloud = require('ti.cloud');
Cloud.debug = true;

// initiate the window for 'search' tab
var searchWin = Ti.UI.currentWindow;
var currentTab = Ti.UI.currentTab;

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
});

var searchBar = Titanium.UI.createSearchBar({
	hintText : 'Search by Module Code, eg. IS1234',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
	},
    barColor:'#000', 
    showCancel:true,
    height:'40dp',
    top:0,
});
searchWin.add(searchBar);

searchBar.addEventListener('return', function(e){
	loadingIndicator.show();
	
	Cloud.Posts.query({
		page : 1,
		per_page : 12,
		order : "-created_at", 
		where : {  // *** CHECK IF DELETED IS TRUE
			"moduleCode" : { '$regex' : searchBar.value}, bookStatus : 	"onSales" ,
		}
	}, function(e) {
		if (e.success) {
			//alert('Success getting data: ' + 'Count: ' + e.posts.length);
			var resultLength =  e.posts.length
			if(resultLength > 0) facultyTable.hide();
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
				separatorColor : 'transparent',
				top: '50dp'
			});

			searchWin.add(homeTableView); 
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
	
});

var facultiesList = [
{facultyLogo:'images/fass.png', faculty:"Arts and Social Sciences", hasChild: true,},
{facultyLogo:'images/biz.png', faculty:"Business", hasChild: true},
{facultyLogo:'images/computing.png', faculty:"Computing", hasChild: true},
{facultyLogo:'images/dentistry.png', faculty:"Dentistry", hasChild: true},
{facultyLogo:'images/sde.png', faculty:"Design and Environment", hasChild: true},
{facultyLogo:'images/engineering.png', faculty:"Engineering", hasChild: true},
{facultyLogo:'images/law.png', faculty:"Law", hasChild: true},
{facultyLogo:'images/medicine.png', faculty:"Medicine", hasChild: true},
{facultyLogo:'images/sci.png', faculty:"Science", hasChild: true}]; 

var data = [];

for (var i=0; i<facultiesList.length; i++){
	var row = Ti.UI.createTableViewRow({});
	
	var facultyLogo =  Titanium.UI.createImageView({
		image:facultiesList[i].facultyLogo,
		width:'40dp',
		height:'40dp',
		left: '5dp',
		top:'5dp',
		bottom: '5dp'
	});
	 
	var faculty = Titanium.UI.createLabel({
		text:facultiesList[i].faculty,
		font:{fontSize:'14dp', fontFamily: 'Helvetica', fontWeight:'bold'},
		color: '#000014',
		width:'auto',
		textAlign:'left',
		left:'50dp',
		height:'50dp'
	});
	
	row.add(facultyLogo);
	row.add(faculty);
	row.hasChild = facultiesList[i].hasChild;
	row.className = 'faculties_row';
	row.title = facultiesList[i].faculty;
	data.push(row);
	//facultiesList[i] = row;
};

var facultyTable = Titanium.UI.createTableView({
	top : '40dp'
});

facultyTable.setData(data);
searchWin.add(facultyTable);
	
facultyTable.addEventListener('click', function(e){
	var facultyBookWin= Titanium.UI.createWindow({  
		backgroundColor:'#FFFFFF',
		url: 'displayFacultyBooks.js',
		modal : true,
	});
	facultyBookWin.facultyName = e.rowData.title;
	currentTab.open(facultyBookWin);
});