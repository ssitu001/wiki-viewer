$(document).ready(function() {
  
  //when enter is pressed
  $('#search').on('keydown',function( event ) {
    if ( event.which == 13 ) {
     event.preventDefault();
      var searchTerm = $('#search').val();
      getWiki(searchTerm);
      $('#search').val('');
    }
  });  
    
  //when search button is clicked instead  
  $('#searchButton').on('click', function () {
        var searchTerm = $("#search").val();
        getWiki(searchTerm);
        $('#search').val('');
  });

  
  //api call
  function getWiki(userSearch) {  
          $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&maxlag=&uselang=&search="+userSearch+"&callback=&formatversion=1&callback=?",
            dataType: "json",
            success: function (data) {
              //console.log(data);
              //empty div before new results are appended
                $('div.container').empty();

                topTenResults(data);
            },
            error: function (errorMessage) {
              console.log(errorMessage);
            }
        });
    };

  function topTenResults (arr) {
    arr = arr.slice(1);
    var terms = arr.slice(-3)[0];
    var des = arr.slice(-2)[0];
    var links = arr.slice(-1)[0];

    for (var i = 0; i < terms.length; i++) {
        $("div.container").append('<a href="' + links[i] + '" target= "_blank"><div class="results"><span class="searchInput">' + terms[i] + '</span></br>' + des[i] + '.........' + '</div></a>')  
    }
  }
  
});
         