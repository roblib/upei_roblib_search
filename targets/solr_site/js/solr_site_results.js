Drupal.behaviors.roblib_search_solr_site = {
    attach: function(context, settings) {
        url = settings.roblib_search_solr_site.search_url;
        query = settings.roblib_search_solr_site.search_query;
        jQuery.getJSON(url, function(data) {
            var items = [];
            var numberOfDocs = 0;
            try {
                numberOfDocs = data.response.docs.length;
            } catch (err) {
                // do nothing leave docLength at 0
            }
            if (numberOfDocs < 1) {
                jQuery('#' + 'roblib-search-content-solr-site').empty().append('No Results');
                //<section class="panel-pane pane-block pane-roblib-search-solr-site-roblib-search-solr-site-results block">

                jQuery('.' + 'pane-roblib-search-solr-site-roblib-search-solr-site-results').hide();
            } else {
                jQuery.each(data.response.docs, function(key, val) {
                    items.push('<div class ="roblib-search-row">\n\
                                <div class="roblib-title solr-site">\n\
                                <a href="' + val.url + '">' + val.label + '</a></div></div>');
                    //items.push('<div class ="roblib-solr-site-teaser">' + val.teaser + '</div>')
                });
                jQuery('#roblib-search-content-solr-site').empty().append(items.join(''));
                var number = data.response.numFound;
                var scholarUrl = "http://www.islandscholar.ca/islandora/solr/search/"
                jQuery('#' + 'roblib-search-solr-site-more').empty().append('<a id="solr-site-see-more-result"' +
                    'href="/search/site/' + query + '">see all ' + number + ' results</a>');


            }
        });
    }

}

