/// Create today 

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yy = today.getFullYear().toString().substr(2);

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = mm + '/' + dd + '/' + yy;

//////
console.log(today);
/////

/// dct: type default var 

var type = 'FR';

/// pd: days default var

var days = '01/01/70-' + today;

/// url var

var DOC_SEARCH_URL = 'https://cors-anywhere.herokuapp.com/https://api.data.gov/regulations/v3/documents';

/// display var

var RESULT_HTML_TEMPLATE = (


'<div class="row">' +

'<div class="js-result-form">' +
 '<br>'+
'<h2>Title:</h2>' + ' ' + '<p><span class="js-title"></span></p>' +
'<h2>Docket ID:</h2>' + ' ' + '<p><span class="js-docketId"></span></p>' + ' ' + '<h6>Copy the Docket ID and use <a href="dokt.html" target="_blank">getDokt</a> for more details.</h6>' +
'<h2>Posted Date:</h2>' + ' ' + '<p><span class="js-postDate"></span></p>' +
'<h2>Agency:</h2>' + ' ' + '<p><span class="js-postAgent"></span></p>' +
'<h2>Open for Comment:</h2>' + ' ' + '<p><span class="js-comment"></span></p>' +
'<h2>Summary:</h2>' + ' ' + '<p><span class="js-summary"></span></p>'+
'<br>'+
'</div>'+

'</div>'



);


function getDataFromAPI(searchTerm, callback){
    var query = {  
        api_key: 'dhtjxRZF7HyxcgZCCUDKf556TxqUMoipvT1sTPPs',
        countsOnly: 0,
        encoded: 0,
        s: searchTerm,
        dct: type,
        dkt: 'R',
        pd: days,
        rpp: 25
    }
    //////
     console.log('LOADED');
     /////
     console.log(searchTerm);
     //////
    $.getJSON(DOC_SEARCH_URL, query, callback);  
}


function renderResult(item) {
  
  var template = $(RESULT_HTML_TEMPLATE);


  template.find(".js-title").text(item.docketTitle);
  template.find(".js-docketId").text(item.docketId);
  template.find(".js-postDate").text(item.postedDate);
  template.find(".js-postAgent").text(item.agencyAcronym);
  template.find(".js-comment").text(item.openForComment);
  template.find(".js-summary").text(item.summary);
  return template;
}


function displaySearchData(data) {
	 console.log(data)
  var totalRecords = data.totalNumRecords; 
   console.log(totalRecords)
  var length = data.documents.length
   console.log(length)
  var results = data.documents.map(function(item, index) {
  	console.log(item);
      return renderResult(item);
  });
$('.js-search-results').html(results); 
$('.js-resultSumms').text('Total Number of Records:' + ' ' + totalRecords);
}


function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query-text');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromAPI(query, displaySearchData);
  });

}
$(watchSubmit);


