// initiate the window for 'transact' tab
var win = Titanium.UI.currentWindow;

win.backgroundColor = 'white'

var label = Ti.UI.createLabel();
win.add(label);
win.open();

var titaniumBarcode = require('com.mwaysolutions.barcode');

titaniumBarcode.scan({
  success:function(data) {
    if(data && data.barcode) {
      var label = Titanium.UI.createLabel({
        text:'Barcode: ' + data.barcode,
        textAlign:'center',
        width:'auto'
      });

      win.add(label);
    } else {
      alert(JSON.stringify(data));
    }
  },

  error:function(err) { 
    alert("Error!! " + err); 
  },

  cancel:function() { 
    alert("cancel"); 
  }
});