Drupal.behaviors.roblib_search_passthru = {
  attach: function (context, settings) {
    scholar_url = settings.roblib_search_passthru.scholar_search_url;
    evergreen_url = settings.roblib_search_passthru.evergreen_search_url;
    jQuery.getJSON(scholar_url, function (data) {
     var scholar_numfound = data.response.numFound;
     var query = encodeURIComponent(data.responseHeader.params.q);
     jQuery('#roblib-search-passthru-islandscholar-more').empty().append('<a id="passthru-islandscholar-see-more-result"' +
     ' href="http://www.islandscholar.ca/islandora/search/' + query + '?type=dismax">Islandscholar Results (' + scholar_numfound + ')</a>');

     });
    jQuery.getJSON(evergreen_url, function (data) {
      var evergreen_numfound = data.numberOfRecords;
      jQuery('#roblib-search-passthru-evergreen-more').empty().append('<a href = "' + data.catalogBaseSearchUrl + '">PEI Collection (' +
        evergreen_numfound +')</a>');
    });
    jQuery('#roblib-search-content-passthru').empty();
  }
}
