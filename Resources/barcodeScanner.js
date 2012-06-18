/**
 * @author Yi Hong
 */
/*--- SCANNER WINDOW ---*/
var bacodeScanningWin = Ti.UI.currentWindow;

var label = Ti.UI.createLabel();
bacodeScanningWin.add(label);
//bacodeScanningWin.open();

var titaniumBarcode = require('com.mwaysolutions.barcode');

titaniumBarcode.scan({
  success:function(data) {
    if(data && data.barcode) {
      var label = Titanium.UI.createLabel({
        text:'Barcode: ' + data.barcode,
        textAlign:'center',
        width:'auto'
      });

      bacodeScanningWin.add(label);
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