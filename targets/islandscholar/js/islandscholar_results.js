Drupal.behaviors.roblib_search_islandscholar = {
    attach: function(context, settings) {
        url = settings.roblib_search_islandscholar.search_url;
        jQuery.getJSON(url, function(data) {
            var items = [];
            var numberOfDocs = 0;
            try {
                numberOfDocs = data.response.docs.length;
            } catch (err) {
                // do nothing leave docLength at 0
            }
            if (numberOfDocs < 1) {
                jQuery('#' + 'roblib-search-content-islandscholar').empty().append('No Results');
                jQuery('.' + 'pane-roblib-search-islandscholar-site-roblib-search-islandscholar-results').hide();
            } else {
                jQuery.each(data.response.docs, function(key, val) {
                    items.push('<div class ="roblib-search-row">\n\
                                <div class="roblib-title islandscholar">\n\
                                <a href="http://www.islandscholar.ca/fedora/repository/' + val.PID +'">' + val.Title_sorted + '</a></div>');
                    try {
                     items.push('<div class="islandscholar-authors">');
                    jQuery.each(val.author, function(key2, val2){
                        items.push('<span class="islandscholar-author">' + val2 + ';</span> ')
                    })
                    items.push('</div>')
                    } catch (e){

                    }
                    try {
                        items.push('<div class="islandscholar-source">');
                        jQuery.each(val.genre, function(key2, val2){
                            items.push('<span class="islandscholar-label">' + val2 + '</span> ')
                        })
                        try{
                            jQuery.each(val["mods.hostTitle"], function(key2, val2){
                                items.push('<span class="islandscholar-hostTitle">' + val2 + '</span> ')
                            })
                        } catch (err){

                        }
                        try{
                            jQuery.each(val["mods.volume"], function(key2, val2){
                                items.push('<span class="islandscholar-citation">Vol. </span><span class="islandscholar-citation">' + val2 + '</span> ')
                            })
                        } catch (err){

                        }
                        try{
                            jQuery.each(val["mods.issue"], function(key2, val2){
                                items.push('<span class="islandscholar-citation">Issue </span><span class="islandscholar-citation">' + val2 + ',</span> ')
                            })
                        } catch (err){

                        }
                        try{
                            jQuery.each(val["mods.pageStart"], function(key2, val2){
                                items.push('<span class="islandscholar-citation">p</span><span class="islandscholar-citation">' + val2 + '</span>')
                            })
                        } catch (err){

                        }
                        try{
                            jQuery.each(val["mods.pageEnd"], function(key2, val2){
                                items.push('<span class="islandscholar-citation">-</span><span class="islandscholar-citation">' + val2 + ',</span>')
                            })
                        } catch (err){

                        }
                        try{
                            if(jQuery.inArray('OBJ',val.hasDatastreams) > 0){
                                items.push('<div>full text</div>') ;
                            }
                        } catch (err){

                        }
                        items.push('</div>')
                    } catch (e){

                    }
                    items.push('</div>');
                });

                var number = parseInt(data.rows);
                jQuery('#roblib-search-content-islandscholar').empty().append(items.join(''));

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

        jQuery('#roblib-search-solr-site-more').empty().append('<a id="islandscholar_see_more_result">see ' + items.length + ' more results</a>');
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