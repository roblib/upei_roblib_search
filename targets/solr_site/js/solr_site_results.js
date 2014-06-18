Drupal.behaviors.roblib_search_solr_site_results = {
  attach: function(context, settings) {
    $url = settings.roblib_search_solr_site_results.search_url;
    jQuery.getJSON($url, function(data) {
      var items = [];
      var numberOfDocs = 0;
      try {
        numberOfDocs = data.response.docs.length;
      } catch (err) {
        // do nothing leave docLength at 0
      }
      if (numberOfDocs < 1) {
        jQuery('#' + 'roblib-search-content-solr-site-results').empty().append('No Results');

      } else {

        jQuery('#' + 'roblib-search-content-solr-site-results').empty();

        jQuery.each(data.response.docs, function(key, val) {
          items.push('<div class ="roblib-search-row">\n\
                        <div class="roblib-title results">\n\
                          <a href="' + val.url + '">' + val.label + '</a></div></div>');

        });
        jQuery('#' + 'roblib-search-content-solr-site-results').empty().append(items.join(''));
      }
    });
  }

}
