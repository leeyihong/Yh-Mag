// initiate the window for 'search' tab
var searchWin = Ti.UI.currentWindow;
var currentTab = Ti.UI.currentTab;

var facultiesList = [
"Arts & Social Sciences",
"Business",
"Computing",
"Dentistry",
"Design & Environment",
"Engineering",
"Law",
"Medicine",
"Science"]; 
for (var i=0; i<facultiesList.length; i++){
	var row = Ti.UI.createTableViewRow({});
	
	var textlabel = Ti.UI.createLabel({
		text: facultiesList[i],
		color: '#000014',
		font:{
			fontSize: '14dp', 
			fontFamily: 'Helvetica',
			fontWeight:'bold'
		},
		textAlign:'left',
		left:'10dp',
		height: '50dp'
	});
	row.add(textlabel);
	facultiesList[i] = row;
};
var facultyTable = Titanium.UI.createTableView({
	data:facultiesList,
	font:{
		fontSize: '14dp', 
		fontFamily: 'Helvetica',
		fontWeight:'bold'
	},
	color: '#000014',
}); 
searchWin.add(facultyTable);