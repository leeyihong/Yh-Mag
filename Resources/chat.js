//window for private chat
var chatWin = Ti.UI.currentWindow;

var Cloud = require('ti.cloud');
Cloud.debug = true;

var ids = [];

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
			from_id : user.id,
			to_id : chatWin.to_id.id
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
/*

 Cloud.Chats.query({
 participate_ids : ids.join(','),

 order : "-created_at"
 }, function(e) {
 if (e.success) {
 for (var i = 0; i < e.chats.length; i++) {
 var chat = e.chats[i];
 alert('Success:\\n' + 'From: ' + chat.from.first_name + ' ' + chat.from.last_name + '\\n' + 'Updated: ' + chat.updated_at + '\\n' + 'Message: ' + chat.message);
 }
 } else {
 alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
 }
 });
 */
chatWin.add(previousMessagesTable);
