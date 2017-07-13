Drupal.behaviors.roblib_search_solr_site_results = {
  attach: function(context, settings) {
    url = settings.roblib_search_solr_site_results.search_url;
    query = settings.roblib_search_solr_site_results.search_query;
    baseUrl = settings.roblib_search_solr_site_results.base_url;
    default_site_type = settings.roblib_search_solr_site_results.default_site_type + '/';
    jQuery.getJSON(url, function(data) {
      var items = [];
      var numberOfDocs = 0;
      try {
        numberOfDocs = data.response.docs.length;
      } catch (err) {
        // do nothing leave docLength at 0
      }
      if (numberOfDocs < 1) {
        jQuery('#' + 'roblib-search-content-solr-site-results').empty().append('No Results');
        jQuery('.' + 'pane-roblib-search-solr-site-roblib-search-solr-site-results').hide();
      } else {

        jQuery('#' + 'roblib-search-content-solr-site-results').empty();
        var counter = 0;
        var divs = new Array();
        var content = new Array();
        jQuery.each(data.response.docs, function(key, val) {
          id = 'roblib_search_solr_results_' + counter;
          content[counter] = val.teaser;
          divs[counter++] = id;
          items.push('<div class ="roblib-search-row" id="'+ id +'">\n\
                        <div class="roblib-title results">\n\
                          <a href="' + val.url + '">' + val.label + '</a></div></div>');
        });

        jQuery('#' + 'roblib-search-content-solr-site-results').empty().append(items.join(''));
      }
        if (numberOfDocs > 0)
        {
            jQuery('#' + 'roblib-search-solr-site-results-more').empty().append('<a href="'+ baseUrl + '/search/' + default_site_type + query +'"' + '>see all results</a>');
        }
    });
  }

}
