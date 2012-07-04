// initiate the window for 'search' tab
var searchWin = Ti.UI.currentWindow;
var currentTab = Ti.UI.currentTab;

var searchBar = Titanium.UI.createSearchBar({
	hintText : 'Search by Module Code, eg. IS1234',
	font : {
		fontSize : '14dp',
		fontFamily : 'Helvetica',
	},
    barColor:'#000', 
    showCancel:true,
    height:'40dp',
    top:0,
});
searchWin.add(searchBar);

var facultiesList = [
{facultyLogo:'images/fass.png', faculty:"Arts and Social Sciences", hasChild: true,},
{facultyLogo:'images/biz.png', faculty:"Business", hasChild: true},
{facultyLogo:'images/computing.png', faculty:"Computing", hasChild: true},
{facultyLogo:'images/dentistry.png', faculty:"Dentistry", hasChild: true},
{facultyLogo:'images/sde.png', faculty:"Design and Environment", hasChild: true},
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

var facultyTable = Titanium.UI.createTableView({
	top : '40dp'
});

facultyTable.setData(data);
searchWin.add(facultyTable);
	
facultyTable.addEventListener('click', function(e){
	var facultyBookWin= Titanium.UI.createWindow({  
		backgroundColor:'#FFFFFF',
		url: 'displayFacultyBooks.js',
		modal : true,
		exitOnClose : true
	});
	facultyBookWin.facultyName = e.rowData.title;
	currentTab.open(facultyBookWin);
});