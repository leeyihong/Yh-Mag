// initiate the window for 'search' tab
var searchWin = Ti.UI.currentWindow;
var currentTab = Ti.UI.currentTab;
/*
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
searchWin.add(facultyTable);*/
var facultiesList = [
{facultyLogo:'images/fass.png', faculty:"Arts & Social Sciences", hasChild: true,},
{facultyLogo:'images/biz.png', faculty:"Business", hasChild: true},
{facultyLogo:'images/computing.png', faculty:"Computing", hasChild: true},
{facultyLogo:'images/dentistry.png', faculty:"Dentistry", hasChild: true},
{facultyLogo:'images/sde.png', faculty:"Design & Environment", hasChild: true},
{facultyLogo:'images/engineering.png', faculty:"Engineering", hasChild: true},
{facultyLogo:'images/law.png', faculty:"Law", hasChild: true},
{facultyLogo:'images/medicine.png', faculty:"Medicine", hasChild: true},
{facultyLogo:'images/sci.png', faculty:"Science", hasChild: true}]; 

var data = [];

for (var i=0; i<facultiesList.length; i++){
	var row = Ti.UI.createTableViewRow({});
	
	var facultyLogo =  Titanium.UI.createImageView({
		url:facultiesList[i].facultyLogo,
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

var facultyTable = Titanium.UI.createTableView({});

facultyTable.setData(data);
searchWin.add(facultyTable);

var bookWin= Titanium.UI.createWindow({  
	backgroundColor:'#fff',
	url: 'displayBooks.js',
});
	
// allow user to select faculty to view all books
// create table view event listener
var facultyTitle;
facultyTable.addEventListener('click', function(e){
	facultyTitle = e.rowData.title;
	Ti.App.Properties.setString("title", facultyTitle);
	bookWin.open();
});