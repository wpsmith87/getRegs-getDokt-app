/// Create today 

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yy = today.getFullYear().toString().substr(2);

var fullYear = today.getFullYear().toString();

var halfYear = (fullYear-30);

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = mm + '/' + dd + '/' + yy;


backDate = mm + '/' + dd + '/' + halfYear.toString().substr(2);


console.log(halfYear);

//////
console.log(today);
/////

console.log(backDate)

/// dct: type default var 

var type = 'FR';

/// pd: days default var

var days = backDate + '-' + today;

/// url var

var DOC_SEARCH_URL = 'https://cors-anywhere.herokuapp.com/https://api.data.gov/regulations/v3/documents';

/// display var

var RESULT_HTML_TEMPLATE = (


'<div class="row">' +

'<div class="js-result-form">' +
 '<br>'+
'<h2>Title</h2>' + '<p><span class="js-title"></span></p>' +
'<h2>Docket ID</h2>' + ' ' + '<input id="js-docketId" class="js-docketId"/><button onclick="openDocketSearch()" class="autoSearch" data-copytarget="#js-docketId">COPY</button>' + 
'<br>'+
'<h6> * Click "COPY" and use <a href="dokt.html" target="_blank">getDokt</a> for more details.</h6>' +
'<h2>Posted Date</h2>' + ' ' + '<p><span class="js-postDate"></span></p>' +
'<h2>Agency</h2>' + ' ' + '<p><span class="js-postAgent"></span></p>' +
'<h2>Open for Comment</h2>' + ' ' + '<p><span class="js-comment"></span></p>' +
'<h2>Summary</h2>' + ' ' + '<p><span class="js-summary"></span></p>'+
'<br>'+
'</div>'+

'</div>'+
'<br>'



);


function getDataFromAPI(searchTerm, callback){
    var query = {  
        api_key: 'dhtjxRZF7HyxcgZCCUDKf556TxqUMoipvT1sTPPs',
        countsOnly: 0,
        encoded: 0,
        s: searchTerm,
        dct: type,
        dkt: 'R',
        a: 'IRS',
        rpp: 20,
        pd: days
       

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
  template.find(".js-docketId").val(item.docketId);
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
$('.js-resultSumms').show();
$(".loader").hide();
}

function hideLoader() {
  $(".loader").hide();
}

function openDocketSearch() {
   // var doktIdTarget = $(event.currentTarget).find('.js-docketId');
    // var doktId = doktIdTarget.val();
   $('.js-docketId').on("click", function(){

});
    var myWindow = window.open("dokt.html", "_blank");

}


function copyTarget() {

  (function() {

  'use strict';
  
  // click events
  document.body.addEventListener('click', copy, true);

  // event handler
  function copy(e) {

    // find target element
    var 
      t = e.target,
      c = t.dataset.copytarget,
      inp = (c ? document.querySelector(c) : null);
      
    // is element selectable?
    if (inp && inp.select) {
      
      // select text
      inp.select();

      try {
        // copy text
        document.execCommand('copy');
        inp.blur();
        
        // copied animation
        t.classList.add('copied');
        setTimeout(function() { t.classList.remove('copied'); }, 1500);
      }
      catch (err) {
        alert('please press Ctrl/Cmd+C to copy');
      }
      
    }
    
  }

})();

}


function watchSubmit() {
  hideLoader();
  $('.js-search-form').submit(function(event) {
$('.js-resultSumms').hide();
    $(".loader").show();
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query-text');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromAPI(query, displaySearchData);
  });
}

$(copyTarget);
$(watchSubmit);


