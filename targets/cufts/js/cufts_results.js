Drupal.behaviors.roblib_search_cufts = {
    attach: function(context, settings) {
        url = settings.roblib_search_cufts.search_url;
        jQuery.getJSON(url, function(data) {
            var items = [];
            if (data.length < 1) {
                jQuery('#' + 'roblib-search-content-cufts').empty().append('No Results');
            } else {
                jQuery.each(data.journals, function(key, val) {
                    var item_str = '<div class ="roblib-search-row">';
                    item_str += '<div class="roblib-title cufts">';
                    item_str += '<a href = "' + val.url + '">' + val.title + '</a>';
                    item_str += '</div>';

                    item_str += '<div class="cufts-issns">ISSN: ';
                    jQuery.each(val.issns, function(key2, val2) {
                        var newIssn = "";
                        var issn = val2.toString();
                        if (issn.length == 8)
                        {
                            newIssn = issn.substr(0, 4) + '-' + issn.substr(4, 4);
                        }
                        else
                        {
                            newIssn = issn;
                        }
                        item_str += newIssn + ',';
                    });
                    item_str += '</div>';

                    item_str += '<div class="cufts-fulltext-coverages">';

                    jQuery.each(val.fulltext_coverages, function(key3, val3) {
                        item_str += val3;
                    });

                    item_str += '</div>';

                    item_str += '</div>';
                    items.push(item_str);


                });
            }
            var originURL = settings.roblib_search_cufts.url;
            var originSuffix = settings.roblib_search_cufts.suffix;
            var newSuffix = originSuffix.replace("&format=json", "");
            if (parseInt(data.numOfResults) > 0)
            {
                jQuery('#' + 'roblib-search-content-cufts').empty().append(items.join(''));
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



