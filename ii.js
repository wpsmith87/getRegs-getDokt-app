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

/// state

var state = {
    items: []
};

var counter = 0

var theForm = $(document).find(".js-doktsearch-form");

/// url var

var DOKT_SEARCH_URL = 'https://cors-anywhere.herokuapp.com/https://api.data.gov/regulations/v3/docket.json';

/// display var

var RESULT_HTML_TEMPLATE = (


'<div class="js-doktresult-form" value="'+ counter +'">' +
'<button class="deleteDokt">'+'Delete Docket'+'</button>'+
'<h2>Search Number:</h2>'+'<p><span class="searchNum"></span></p>'+
 '<br>'+
'<h2>Title:</h2>' + ' ' + '<p><span class="js-title"></span></p>' +
'<h2>Docket ID:</h2>' + ' ' + '<p><span class="js-docketId"></span></p>' +
'<h2>Major Rule:</h2>' + ' ' + '<p><span class="js-majorRule"></span></p>' +
'<h2>Impact On:</h2>' + ' ' + '<p><span class="js-impact"></span></p>' +
'<h2>Agency:</h2>' + ' ' + '<p><span class="js-postAgent"></span></p>' +
'<h2>Parent Agency:</h2>' + ' ' + '<p><span class="js-parentAgent"></span></p>' +
'<h2>Contact:</h2>' + ' ' + '<p>Email: <span class="js-contact"></span></p>' + ' ' + '<p>Fax: <span class="js-contactFax"></span></p>' + ' ' + '<p>City: <span class="js-city"></span></p>' +
'<h2>Stage of Rulemaking:</h2>' + ' ' + '<p><span class="js-stage"></span></p>' +
'<h2>Abstract:</h2>' + ' ' + '<p><span class="js-abstract"></span></p>'+
'<h2>Number of Comments:</h2>' + ' ' + '<p><span class="js-commentNum"></span></p>'+
'<br>'+
'</div>'


    );


function getMoreDataFromAPI(searchTerm, callback){
  var queri = {
        api_key: 'dhtjxRZF7HyxcgZCCUDKf556TxqUMoipvT1sTPPs',
        docketId: searchTerm
    }
    //////
     console.log('LOADED');
     /////
     console.log(searchTerm);
     //////
    $.getJSON(DOKT_SEARCH_URL, queri, callback).fail(function() { 
      $(theForm).find(".js-resultMessage").hide();
      $('.js-errorMessage').text("Unfortunately this content is not available yet, and/or, the requested Docket belongs to an agency that does not participate in the Federal eRulemaking Program."); 
       }); 


}

var addItem = function(state, item) {
    state.items.push(item);
};


function renderDoktResult(item) {
  var template = $(RESULT_HTML_TEMPLATE);

  //template.find(".js-doktInfo").text(item[0]);
  template.find(".searchNum").text(counter+1);
  template.find(".js-title").text(item.title);
  template.find(".js-docketId").text(item.docketId);

  if (item.majorRule.value!=undefined) {
template.find(".js-majorRule").text(item.majorRule.value);
}

  template.find(".js-impact").text(item.impactsAndEffects);
  template.find(".js-postAgent").text(item.agency);
  template.find(".js-parentAgent").text(item.parentAgency);
  template.find(".js-contact").text(item.contact[0].emailAddress);
  template.find(".js-contactFax").text(item.contact[0].fax);
  template.find(".js-city").text(item.contact[0].city);
  template.find(".js-stage").text(item.agendaStageOfRulemaking.value);
  template.find(".js-abstract").text(item.docketAbstract);
  template.find(".js-commentNum").text(item.numberOfComments); 
console.log('LOADED')
  return template;
}


function displayDoktSearchData(data) {
   console.log(data)
   console.log(data.docketAbstract)
  addItem(state,data);
  var results = state.items.map(function(item, index) {
    console.log(item);
    return renderDoktResult(item);
  });
  $(theForm).find(".js-resultMessage").show();
  $('.js-doktsearch-results').html(results);
  $(theForm).find(".js-errorMessage").hide();
  $('.js-resultMessage').text('Your Docket Seach is ready! Scroll down.') 
  console.log(counter);
  counter++
  $(watchDelete);

}


function watchDelete() {

  $(".deleteDokt").click(function () { 
      var index = $(this).closest('.js-doktresult-form').attr('value');
      $(this).closest('div').remove();
      state.items.splice(index,1);
      $(theForm).find(".js-resultMessage").hide();
       });

}

function watchSubmito() {
   $('.js-doktsearch-form').submit(function(event) {
    event.preventDefault();
  var queriTarget = $(event.currentTarget).find('.js-doktquery-text');
  var queri = queriTarget.val();
    // clear out the input
    queriTarget.val("");
    $(theForm).find(".js-errorMessage").show();
    getMoreDataFromAPI(queri, displayDoktSearchData);
  });
}
$(watchSubmito);

