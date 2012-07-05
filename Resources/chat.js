//window for private chat
var chatWin = Ti.UI.currentWindow;

var Cloud = require('ti.cloud');
Cloud.debug = true;

alert(Ti.App.Properties.getString('userid'));

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
	bottom : '20dp',
	width : '60dp',
	height : '30dp'
});
chatWin.add(sendBtn);

//update msg to database
sendBtn.addEventListener('click', function(e) {
	//create a new msg
	Cloud.Chats.create({
		to_ids : ids.join(','),
		message : message.value
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
});