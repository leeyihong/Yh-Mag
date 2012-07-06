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
})

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

var user;
Cloud.Users.login({
	login : Ti.App.Properties.getString('email'),
	password : 'test_password'
}, function(e) {
	if (e.success)
		user = e.users[0];

	alert("ok, send now");
});

//BRYAN: use of custom object to create message. 'Chat' refers to real-time IM. 'Message' are still in Beta.
//update msg to database
sendBtn.addEventListener('click', function(e) {
	Cloud.Objects.create({
		classname : 'messages',
		fields : {
			post_id : chatWin.postId.id,
			from_id : Ti.App.Properties.getString('userid'),
			to_id : chatWin.to_id.id,
			content : message.value,
			is_reply : false
		}
	}, function(e) {
		if (e.success) {
			message.value = 'RESULT: ' + JSON.stringify(e);
			alert('Success: ' + e.messages[0].id);
		} else {
			alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

});

//add existing messages into table

var previousMessagesTable = Ti.UI.createTableView({
	top : '50dp',
	bottom : '80dp'
});

Cloud.Objects.query({
	classname : 'messages',
	page : 1,
	per_page : 100,
	where : {
		post_id : chatWin.postId.id
	}
}, function(e) {
	if (e.success) {
		alert('Success:\\n' + 'Count: ' + e.messages.length);

		var fromUser, toUser;

		for (var i = 0; i < e.messages.length; i++) {
			var message = e.messages[i];
			//alert('id: ' + message.id + '\\n' + 'make: ' + message.content);

			var messageRow = Ti.UI.createTableViewRow();

			if (!fromUser)
				fromUser = getUser(message.from_id);
			if (!toUser)
				toUser = getUser(message.to_id);

			var messageUserLabel = Ti.UI.createLabel({
				left:'5dp',
				right:'5dp',
				top:'5dp',
				font:{
					fontWeight: 'bold',
					fontSize:'14dp'
				},
				color:'#000000'
			});
			
			if(message.from_id === Ti.App.Properties.getString('userid'))
				messageUserLabel.text = 'Me';
			else
				messageUserLabel.text = fromUser.username;
			
			var messageContentLabel = Ti.UI.createLabel({
				left:'5dp',
				right:'5dp',
				top: '22dp',
				text:message.content,
				font:{
					fontSize:'14dp'
				},
				color:'#000000'
			});

			if (message.is_reply) {
				messageUserLabel.textAlign = 'right';
				messageContentLabel.textAlign = 'right';
			} else {
				messageUserLabel.textAlign = 'left';
				messageContentLabel.textAlign = 'left';
			}
			
			messageRow.add(messageUserLabel);
			messageRow.add(messageContentLabel);
			
			previousMessagesData.push(messageRow);

		}
		previousMessagesTable.setData(previousMessagesData);
	} else {
		alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
	}
});

chatWin.add(previousMessagesTable);

function getUser(user_id) {
	Cloud.Users.show({
		user_id : user_id
	}, function(e) {
		if (e.success) {
			var user = e.users[0];
			return user;
		} else {
			return null;
		}
	});
}
