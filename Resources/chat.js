//window for private chat
var chatWin = Ti.UI.currentWindow;

var Cloud = require('ti.cloud');
Cloud.debug = true;

var ids = [], previousMessagesData = [];

ids.push(chatWin.to_id);
//ids.push(Ti.App.Properties.getString('userid'));

// page title
var heading = Titanium.UI.createLabel({
	width : 'auto',
	height : '30dp',
	top : '10dp',
	left : '10dp',
	color : '#000014',
	font : {
		fontSize : '15dp',
		fontFamily : 'Helvetica',
		fontWeight : 'bold'
	},
	text : 'CHAT'
});

heading.text = chatWin.postId.title;

chatWin.add(heading);

//adding remaining UI
var message = Titanium.UI.createTextArea({
	font : {
		fontSize : '14dp',
	},
	width : '230dp',
	height : 'auto',
	bottom : '20dp',
	left : '10dp',
	hintText : 'Message'
});
chatWin.add(message);

// send button
var sendBtn = Ti.UI.createButton({
	title : 'Send',
	font : {
		fontsize : '16dp',
		fontWeight : 'bold'
	},
	right : '10dp',
	bottom : '27dp',
	width : '60dp',
	height : '40dp'
});
chatWin.add(sendBtn);

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

var user;
Cloud.Users.login({
	login : Ti.App.Properties.getString('email'),
	password : 'test_password'
}, function(e) {
	if (e.success)
		user = e.users[0];
});

var replying = false;

//BRYAN: use of custom object to create message. 'Chat' refers to real-time IM. 'Message' are still in Beta.
//update msg to database
sendBtn.addEventListener('click', function(e) {
	loadingIndicator.show();

	Cloud.Objects.create({
		classname : 'messages',
		fields : {
			'post' : chatWin.postId,
			'from_id' : user,
			'to_id' : chatWin.to_id,
			'content' : message.value,
			'is_reply' : replying
		}
	}, function(e) {
		if (e.success)
			refresh();
		else
			alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));

		message.value = '';
		Ti.UI.Android.hideSoftKeyboard();
	});

});

//add existing messages into table

var previousMessagesTable = Ti.UI.createTableView({
	top : '50dp',
	bottom : '80dp'
});

function refresh() {
	previousMessagesData = [];

	Cloud.Objects.query({
		classname : 'messages',
		page : 1,
		per_page : 100,
		order : "created_at",
		where : {
			'post.id' : chatWin.postId.id
		}
	}, function(e) {
		if (e.success) {
			//alert('Success:\\n' + 'Count: ' + e.messages.length);

			if (e.messages.length > 0)
				replying = true;

			for (var i = 0; i < e.messages.length; i++) {
				var message = e.messages[i];
				//alert('id: ' + message.id + '\\n' + 'make: ' + message.content);

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

				var messageDateLabel = Ti.UI.createLabel({
					text : prettyDate(message.created_at),
					left : '5dp',
					right : '5dp',
					top : '5dp',
					font : {
						fontSize : '12dp'
					},
					textAlign : 'right',
					color : '#666666'
				});

				if (message.from_id.id === Ti.App.Properties.getString('userid'))
					messageUserLabel.text += ' (You)';

				var messageContentLabel = Ti.UI.createLabel({
					left : '5dp',
					right : '5dp',
					top : '22dp',
					text : message.content,
					font : {
						fontSize : '14dp'
					},
					color : '#000000'
				});

				messageUserLabel.textAlign = 'left';
				messageContentLabel.textAlign = 'left';

				messageRow.add(messageUserLabel);
				messageRow.add(messageContentLabel);
				
				messageRow.add(messageDateLabel);
				
				previousMessagesData.push(messageRow);

			}
			previousMessagesTable.setData(previousMessagesData);

			loadingIndicator.hide();
		} else {
			alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

chatWin.add(previousMessagesTable);

refresh();

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
