Drupal.behaviors.roblib_search_cufts = {
    attach: function(context, settings) {
        url = settings.roblib_search_cufts.search_url;
        jQuery.getJSON(url, function(data) {
            var items = [];
            var numberOfDocs = 0;
            try {
                numberOfDocs = data.journals.length;
            } catch (err) {
                // do nothing leave docLength at 0
            }
            if (numberOfDocs < 1) {
                jQuery('#' + 'roblib-search-content-cufts').empty().append('No Results');
                jQuery('.' + 'pane-roblib-search-cufts-roblib-search-cufts-results').hide();
            } else {
                var counter = 0;
                var divs = new Array();
                var content = new Array();
                jQuery.each(data.journals, function(key, val) {
                    id = 'roblib_cufts_results_' + counter;
                    content[counter] = "";
                    divs[counter] = id;
                    var item_str = '<div class ="roblib-search-row" id="' + id + '">';
                    item_str += '<div class="roblib-title cufts">';
                    item_str += '<a href = "' + val.url + '">' + val.title + '</a>';
                    item_str += '</div>';
                    jQuery.each(val.fulltext_coverages, function(key3, val3) {
                        if(typeof val3 !== 'undefined' && val3 != null ){
                            content[counter] += '<div class="cufts-coverage">' + val3 + "</div>";
                        }
                    });
                    counter++;
                    item_str += '</div>';
                    items.push(item_str);
                });
                jQuery('#' + 'roblib-search-content-cufts').empty().append(items.join(''));
                qtipify(divs, content, 'Coverage');
            }
            var originURL = settings.roblib_search_cufts.url;
            var originSuffix = settings.roblib_search_cufts.suffix;
            var newSuffix = originSuffix.replace("&format=json", "");
            if (parseInt(data.numOfResults) > 0)
            {
                jQuery('#' + 'roblib-search-cufts-more').empty().append('<a href="' + originURL + newSuffix + '">see all ' + data.numOfResults + ' results</a>');
            }
            else
            {
                jQuery('#' + 'roblib-search-content-cufts').empty().append('<p>no result</p>');
                jQuery('#' + 'roblib-search-cufts-more').empty();
            }
        });
    }
}



