/**
 * @author Yi Hong
 */

var Cloud = require('ti.cloud');
Cloud.debug = true;

var sellingViewDetailsWin = Ti.UI.currentWindow;
//sellingViewDetailsWin.title = 'ShootNSell';

var postID = sellingViewDetailsWin.postID;
//alert(postID);

var sellingViewDetailsData = [];
Cloud.Posts.show({
    post_id: postID
}, function (e) {
    if (e.success) {
        var post = e.posts[0];
        //alert('Success: ' + 'id: ' + post.id + ' ' + 'title: ' + post.title + ' ' + 'content: ' + post.content + ' ' + 'updated_at: ' + post.updated_at);
        var sellingViewDetailsRow = Ti.UI.createTableViewRow();
        var imageView = Ti.UI.createImageView({
    		image :post.photo.urls.small_240,
	    	top : '10dp',
	    	width : '200dp',
	    	height : '200dp'
	    });
	    sellingViewDetailsRow.add(imageView);
	    sellingViewDetailsData[0] = sellingViewDetailsRow
	    
	    var sellingViewDetailsTable = Ti.UI.createTableView({
	    	data : sellingViewDetailsData,
	    	separatorColor : 'transparent'
	    });
	    sellingViewDetailsWin.add(sellingViewDetailsTable);
    } else {
        alert('Error: ' +  ((e.error && e.message) || JSON.stringify(e)));
    }
});


/*
var viewOne  = Ti.UI.createView({
    backgroundColor:'#999',
    height:'auto'
});
var headerLabel = Ti.UI.createLabel({
    font:{fontFamily:'Helvetica Neue',fontSize:18,fontWeight:'bold'},
    text:'Custom Header - first label',
    color:'#222',
    textAlign:'left',
    top:0,
    left:10,
    width:300,
    height:30
});
var viewTwo  = Ti.UI.createView({
    backgroundColor:'#990',
    height:'auto'
});
var headerLabel2 = Ti.UI.createLabel({
    font:{fontFamily:'Helvetica Neue',fontSize:24,fontWeight:'bold'},
    text:'Custom Header - Second label',
    color:'#222',
    textAlign:'left',
    top:0,
    left:10,
    width:300,
    height:30
});
viewOne.add(headerLabel);
viewTwo.add(headerLabel2);
 
var settingsTableData = [];
settingsTableData[0] = Ti.UI.createTableViewSection({
    headerView:viewOne
});
settingsTableData[0].add(Ti.UI.createTableViewRow({title:'ROW ONE'}));
settingsTableData[0].add(Ti.UI.createTableViewRow({title:'ROW TWO'}));
settingsTableData[1] = Ti.UI.createTableViewSection({
    headerView:viewTwo
});
settingsTableData[1].add(Ti.UI.createTableViewRow({title:'ROW ONE'}));
settingsTableData[1].add(Ti.UI.createTableViewRow({title:'ROW TWO'}));
 
 
var table = Ti.UI.createTableView({
    data: settingsTableData
});
sellingViewDetailsWin.add(table);
 
sellingViewDetailsWin.open();*/