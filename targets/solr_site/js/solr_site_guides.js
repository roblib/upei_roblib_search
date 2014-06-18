Drupal.behaviors.roblib_search_solr_site_guides = {
  attach: function(context, settings) {
    $url = settings.roblib_search_solr_site_guides.search_url;
    jQuery.getJSON($url, function(data) {
      var items = [];
      var numberOfDocs = 0;
      try {
        numberOfDocs = data.response.docs.length;
      } catch (err) {
        // do nothing leave docLength at 0
      }
      if (numberOfDocs < 1) {
        jQuery('#' + 'roblib-search-content-solr-site-guides').empty().append('No Results');
          jQuery('.' + 'pane-roblib-search-solr-site-roblib-search-solr-site-guides').hide();
      } else {

        jQuery('#' + 'roblib-search-content-solr-site-guides').empty();

        jQuery.each(data.response.docs, function(key, val) {
         items.push('<div class ="roblib-search-row">\n\
                        <div class="roblib-title guides">\n\
                          <a href="' + val.url + '">' + val.label + '</a></div></div>');
        });
        jQuery('#' + 'roblib-search-content-solr-site-guides').empty().append(items.join(''));
      }
    });
  }

}
