var Cloud = require('ti.cloud');
Cloud.debug = true;

var chatlistWin = Ti.UI.currentWindow;

var chatlistTable = Ti.UI.createTableView({

});

var chatlistData = [];

Cloud.Objects.query({
	classname : 'messages',
	page : 1,
	per_page : 100,
	where : {
		'to_id.id' : Ti.App.Properties.getString('userid'),
		'is_reply' : false
	},
	order : "-updated_at"
}, function(e) {
	if (e.success) {
		if (e.messages.length === 0){
			alert('You have no message at the moment... ');
			chatlistWin.close();
		}
		
		for (var i = 0; i < e.messages.length; i++) {
			var message = e.messages[i];

			//check if the message belongs to u
			if ((message.from_id.id !== Ti.App.Properties.getString('userid')) && (message.to_id.id !== Ti.App.Properties.getString('userid')))
				return;

			var messageRow = Ti.UI.createTableViewRow();

			var messageUserLabel = Ti.UI.createLabel({
				text : message.from_id.username,
				left : '5dp',
				right : '5dp',
				top : '5dp',
				font : {
					fontWeight : 'bold',
					fontSize : '14dp'
				},
				color : '#000000'
			});

			var messageContentLabel = Ti.UI.createLabel({
				left : '5dp',
				right : '5dp',
				top : '22dp',
				text : post.content,
				font : {
					fontSize : '14dp'
				},
				color : '#000000'
			});

			messageUserLabel.textAlign = 'left';
			messageContentLabel.textAlign = 'left';

			messageRow.add(messageUserLabel);
			messageRow.add(messageContentLabel);

			chatlistData.push(messageRow);

		}
		chatlistTable.setData(chatlistData);
	} else {
		alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
	}
});

chatlistWin.add(chatlistTable); 