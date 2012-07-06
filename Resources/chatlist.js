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
		if (e.messages.length === 0) {
			alert('You have no message at the moment... ');
			//chatlistWin.close();
		}

		for (var i = 0; i < e.messages.length; i++) {
			var message = e.messages[i];

			//check if the message belongs to u
			if ((message.from_id.id !== Ti.App.Properties.getString('userid')) && (message.to_id.id !== Ti.App.Properties.getString('userid')))
				return;

			var messageRow = Ti.UI.createTableViewRow({
				hasChild : true,
				to_id : message.from_id,
				postId : message.post
			});

			var messageUserLabel = Ti.UI.createLabel({
				text : message.from_id.username,
				left : '5dp',
				right : '5dp',
				top : '23dp',
				font : {
					fontWeight : 'bold',
					fontSize : '12dp'
				},
				color : '#000000'
			});

			var messagePostLabel = Ti.UI.createLabel({
				text : message.post.title,
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
				top : '38dp',
				bottom : '5dp',
				text : message.content,
				font : {
					fontSize : '14dp'
				},
				color : '#000000'
			});

			var messageDataLabel = Ti.UI.createLabel({
				left : '5dp',
				right : '5dp',
				top : '5dp',
				bottom : '5dp',
				text : prettyDate(message.created_at),
				textAlign : 'right',
				font : {
					fontSize : '12dp'
				},
				color : '#666666'
			});

			messageUserLabel.textAlign = 'left';
			messageContentLabel.textAlign = 'left';

			messageRow.add(messageUserLabel);
			messageRow.add(messagePostLabel);
			messageRow.add(messageContentLabel);

			messageRow.add(messageDataLabel);

			chatlistData.push(messageRow);

		}
		chatlistTable.setData(chatlistData);

		chatlistTable.addEventListener('click', function(e) {
			var chatWin = Titanium.UI.createWindow({
				backgroundColor : '#FFFFFF',
				to_id : e.row.to_id,
				postId : e.row.postId,
				url : 'chat.js',
			});

			chatWin.open();
		});
		
		getReceivingMessages();
	} else {
		alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
	}
});

chatlistWin.add(chatlistTable);

function getReceivingMessages() {
	Cloud.Objects.query({
		classname : 'messages',
		page : 1,
		per_page : 100,
		where : {
			'from_id.id' : Ti.App.Properties.getString('userid'),
			'is_reply' : false
		},
		order : "-updated_at"
	}, function(e) {
		if (e.success) {
			if (e.messages.length === 0) {
				alert('You have no message at the moment... ');
				//chatlistWin.close();
			}

			for (var i = 0; i < e.messages.length; i++) {
				var message = e.messages[i];

				//check if the message belongs to u
				if ((message.from_id.id !== Ti.App.Properties.getString('userid')) && (message.to_id.id !== Ti.App.Properties.getString('userid')))
					return;

				var messageRow = Ti.UI.createTableViewRow({
					hasChild : true,
					to_id : message.from_id,
					postId : message.post
				});

				var messageUserLabel = Ti.UI.createLabel({
					text : message.from_id.username,
					left : '5dp',
					right : '5dp',
					top : '23dp',
					font : {
						fontWeight : 'bold',
						fontSize : '12dp'
					},
					color : '#000000'
				});

				var messagePostLabel = Ti.UI.createLabel({
					text : message.post.title,
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
					top : '38dp',
					bottom : '5dp',
					text : message.content,
					font : {
						fontSize : '14dp'
					},
					color : '#000000'
				});

				var messageDateLabel = Ti.UI.createLabel({
					left : '5dp',
					right : '5dp',
					top : '5dp',
					bottom : '5dp',
					text : prettyDate(message.created_at),
					textAlign : 'right',
					font : {
						fontSize : '12dp'
					},
					color : '#666666'
				});

				messageUserLabel.textAlign = 'left';
				messageContentLabel.textAlign = 'left';

				messageRow.add(messageUserLabel);
				messageRow.add(messagePostLabel);
				messageRow.add(messageContentLabel);

				messageRow.add(messageDateLabel);

				chatlistData.push(messageRow);

			}
			chatlistTable.setData(chatlistData);

			chatlistTable.addEventListener('click', function(e) {
				var chatWin = Titanium.UI.createWindow({
					backgroundColor : '#FFFFFF',
					to_id : e.row.to_id,
					postId : e.row.postId,
					url : 'chat.js',
				});

				chatWin.open();
			});
		} else {
			alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

function prettyDate(date_str) {
	var time_formats = [[60, 'just now', 1], // 60
	[120, '1 minute ago', '1 minute from now'], // 60*2
	[3600, 'minutes', 60], // 60*60, 60
	[7200, '1 hour ago', '1 hour from now'], // 60*60*2
	[86400, 'hours', 3600], // 60*60*24, 60*60
	[172800, 'yesterday', 'tomorrow'], // 60*60*24*2
	[604800, 'days', 86400], // 60*60*24*7, 60*60*24
	[1209600, 'last week', 'next week'], // 60*60*24*7*4*2
	[2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
	[4838400, 'last month', 'next month'], // 60*60*24*7*4*2
	[29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
	[58060800, 'last year', 'next year'], // 60*60*24*7*4*12*2
	[2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
	[5806080000, 'last century', 'next century'], // 60*60*24*7*4*12*100*2
	[58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
	];
	var time = ('' + date_str).replace(/-/g, "/").replace(/[TZ]/g, " ").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	if (time.substr(time.length - 4, 1) == ".")
		time = time.substr(0, time.length - 4);
	var seconds = (new Date - new Date(time)) / 1000;
	var token = 'ago', list_choice = 1;
	if (seconds < 0) {
		seconds = Math.abs(seconds);
		token = 'from now';
		list_choice = 2;
	}
	var i = 0, format;
	while ( format = time_formats[i++])
	if (seconds < format[0]) {
		if ( typeof format[2] == 'string')
			return format[list_choice];
		else
			return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
	}
	return time;
};
