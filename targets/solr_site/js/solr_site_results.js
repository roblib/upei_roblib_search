Drupal.behaviors.roblib_search_solr_site = {
    attach: function(context, settings) {
        url = settings.roblib_search_solr_site.search_url;
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
                });
                var number = parseInt(data.rows);
                jQuery('#' + 'roblib-search-content-solr-site').empty();
                items = showMoreItems(items, number);
            }
        });
    }

}

function showMoreItems(items, number) {

    for (var i = 0; i < number; i++) {
        jQuery('#' + 'roblib-search-content-solr-site').append(items.pop());
    }
    
    if (items.length > 0)
    {

        jQuery('#roblib-search-solr-site-more').empty().append('<a id="see_more_result">see ' + items.length + ' more results</a>');
        jQuery('#see_more_result').click(function() {
            items = showMoreItems(items, number);
        });
    }
    else
    {
        jQuery('#roblib-search-solr-site-more').empty().append('no more results');
    }
  


    return items;
}