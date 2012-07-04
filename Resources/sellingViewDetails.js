/**
 * @author Yi Hong
 */

var Cloud = require('ti.cloud');
Cloud.debug = true;

var sellingViewDetailsWin = Ti.UI.currentWindow;
var postID = sellingViewDetailsWin.postID;

/*	    
var productDetailsList = [
{heading: "Image : ", details: "notting" },
{heading: "Title : ", details:  'post.custom_fields.bookTitle' },
{heading: "Subtitle : ", details:  'post.custom_fields.bookSubtitle' },
{heading: "Author : ", details:  'post.custom_fields.author' },
{heading: "Publisher : ", details:  'post.custom_fields.publisher' },
{heading: "Date of Publish : ", details:  'post.custom_fields.publishedDate' },
{heading: "Edition : ", details:  'post.custom_fields.edition' },
{heading: "Condition : ", details:  'post.custom_fields.condition' },
{heading: "Faculty : ", details:  'post.custom_fields.faculty' },
{heading: "Module Code : ", details:  'post.custom_fields.moduleCode' },
{heading: "Price : ", details:  'post.custom_fields.price' },

];	*/

var sellingViewDetailsData = [];
Cloud.Posts.show({
    post_id: postID
}, function (e) {
    if (e.success) {
        var post = e.posts[0];
        //alert('Success: ' + 'id: ' + post.id + ' ' + 'title: ' + post.title + ' ' + 'content: ' + post.content + ' ' + 'updated_at: ' + post.updated_at);
        
        var sellingViewDetailsRow = Ti.UI.createTableViewRow();
        
        //IMAGE
        var imageView = Ti.UI.createImageView({
    		image :post.photo.urls.small_240,
	    	top : '10dp',
	    	width : '200dp',
	    	height : '200dp'
	    });
	    sellingViewDetailsRow.add(imageView);
	    sellingViewDetailsData[0] = sellingViewDetailsRow
	    
	    //BOOKDETAILS
	    var productHeaderView = Ti.UI.createView({
	    	height : '30dp'
	    });
	    productHeaderView.add(Ti.UI.createLabel({
	    	text : 'Product Details',
	    	font : {
				fontSize : '16dp',
				fontFamily : 'Helvetica',
				fontWeight : 'bold'
			},
			top : '10dp'
	    }));
	    var productHeader = Ti.UI.createTableViewSection({
	    	headerView : productHeaderView,
	    	height : '40dp'
	    });
	    
	    for(var i = 1; i < 11; i++){
	    	
		    var rowlabel = Ti.UI.createLabel({
				font : {
					fontSize : '14dp',
					fontFamily : 'Helvetica',
					fontWeight : 'bold'
				},
				color : '#000014',
				left : '10dp',
			});
			var bookDetailsRow = Ti.UI.createTableViewRow({});
			
			if (i == 1){
				rowlabel.text = "Title : " + post.custom_fields.bookTitle;
			} else if (i == 2) {
				rowlabel.text = "Subtitle : " + post.custom_fields.bookSubtitle;
			} else if (i == 3) {
				rowlabel.text = "Author : " + post.custom_fields.author;
			} else if (i == 4) {
				rowlabel.text = "Publisher : " + post.custom_fields.publisher;
			} else if (i == 5) {
				rowlabel.text = "Date of Publish : " + post.custom_fields.publishedDate;
			} else if (i == 6) {
				rowlabel.text = "Edition : " + post.custom_fields.edition;
			} else if (i == 7) {
				rowlabel.text = "Condition : " + post.custom_fields.condition;
			} else if (i == 8) {
				rowlabel.text = "Faculty : " + post.custom_fields.faculty;
			} else if (i == 9) {
				rowlabel.text = "Module Code : " + post.custom_fields.moduleCode
			} else if (i == 10) {
				rowlabel.text = "Price : " + post.custom_fields.price
			}
			
			bookDetailsRow.add(rowlabel);
			productHeader.add(bookDetailsRow);
			sellingViewDetailsData[1] = productHeader;
	    };

	    var sellingViewDetailsTable = Ti.UI.createTableView({
	    	data : sellingViewDetailsData,
	    	separatorColor : 'transparent'
	    });
	    sellingViewDetailsWin.add(sellingViewDetailsTable);
    } else {
        alert('Error: ' +  ((e.error && e.message) || JSON.stringify(e)));
    }
});