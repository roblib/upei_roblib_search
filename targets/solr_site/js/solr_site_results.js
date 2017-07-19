Drupal.behaviors.roblib_search_solr_site_results = {
  attach: function (context, settings) {
    url = settings.roblib_search_solr_site_results.search_url;
    query = settings.roblib_search_solr_site_results.search_query;
    baseUrl = settings.roblib_search_solr_site_results.base_url;
    default_site_type = settings.roblib_search_solr_site_results.default_site_type + '/';
    jQuery.getJSON(url, function (data) {
      var items = [];
      total_found = data.response.numFound;
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
        jQuery.each(data.response.docs, function (key, val) {
          id = 'roblib_search_solr_results_' + counter;
          content[counter] = val.teaser;
          divs[counter++] = id;
          items.push('<div class ="roblib-search-row" id="' + id + '">\n\
                        <span class="roblib-title results">\n\
                          <a href="' + val.url + '">' + val.label + '</a></span>' +
            '\n\<span class="roblib-solr-bundle">(' + val.bundle_name + ')</span> <span class="roblib-solr-teaser"> ' + val.teaser + '</span></div>');
        });
        jQuery('#' + 'roblib-search-content-solr-site-results').empty().append(items.join(''));
      }
      if (numberOfDocs > 0) {
        results_url = '<a href="' + baseUrl + '/search/' + default_site_type + query + '?f[0]=(-bundle:bestbet)"' + '>see all results ('
          + total_found + ') </a>';
        move_me_div_url = '<a href="' + baseUrl + '/search/' + default_site_type + query + '?f[0]=(-bundle:bestbet)"' + '>Website & Guides ('
          + total_found + ') </a>';
        jQuery('#' + 'roblib-search-solr-site-results-more').empty().append(results_url);
        jQuery('#' + 'roblib-solr-more-results-results').empty().append(results_url);
        jQuery('#' + 'roblib-solr-search-toc-results').empty().append(move_me_div_url);
      }
    });
  }

}
