Drupal.behaviors.roblib_search_cufts = {
    attach: function(context, settings) {
        url = settings.roblib_search_cufts.search_url;
        jQuery.getJSON(url, function(data) {
            var items = [];
            if (data.length < 1) {
                jQuery('#' + 'roblib-search-content-cufts').empty().append('No Results');
            } else {
                jQuery.each(data.journals, function(key, val) {
                    items.push('<div class ="roblib-search-row">');
                    items.push('<div class="roblib-title cufts">');
                    items.push('<a href = "' + val.url + '">' + val.title + '</a></div>');
                    items.push('</div>');
                });
            }
            var originURL = settings.roblib_search_cufts.url;
            var originSuffix = settings.roblib_search_cufts.suffix;
            var newSuffix = originSuffix.replace("&format=json", "");
            if(parseInt(data.numOfResults)>0)
            {
                jQuery('#' + 'roblib-search-content-cufts').empty().append(items.join(''));
                jQuery('#' + 'roblib-search-cufts-more').empty().append('<a href="'+originURL+newSuffix+'">see all '+data.numOfResults+' results</a>');
            }
            else
                {
                jQuery('#' + 'roblib-search-content-cufts').empty().append('<p>no result</p>');
                jQuery('#' + 'roblib-search-cufts-more').empty();
                }
            });
    }
}



