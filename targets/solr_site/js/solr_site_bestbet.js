Drupal.behaviors.roblib_search_solr_site_bestbet = {
    attach: function(context, settings) {
        $url = settings.roblib_search_solr_site_bestbet.search_url;
        jQuery.getJSON($url, function(data) {
            var items = [];
            var numberOfDocs = 0;
            try {
                numberOfDocs = data.response.docs.length;
            } catch (err) {
                // do nothing leave docLength at 0
            }
            if (numberOfDocs < 1) {
                jQuery('#' + 'roblib-search-content-solr-site-bestbet').empty().append('No Results');
            } else {

              jQuery('#' + 'roblib-search-content-solr-site-bestbet').empty();

                jQuery.each(data.response.docs, function(key, val) {
                  items.push('<div class ="roblib-search-row">\n\
                                <div class="roblib-title solr_site">\n\
                                <a href="' + val.url + '">' + val.label + '</a></div></div>');

                });
              jQuery('#' + 'roblib-search-content-solr-site-bestbet').empty().append(items.join(''));
            }
        });
    }

}

