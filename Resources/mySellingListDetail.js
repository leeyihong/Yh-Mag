/**
 * @author Yi Hong
 */

var sellingListDetailwin = Ti.UI.currentWindow;
var mySellingData = sellingListDetailwin.sellingDetails;
var mySellingListRowNumber = sellingListDetailwin.mySellingListRowNumber;

//alert('Clicked number: ' + mySellingListRowNumber);
alert('Selling Data information about book ' + mySellingData[mySellingListRowNumber].custom_fields.bookTitle);
