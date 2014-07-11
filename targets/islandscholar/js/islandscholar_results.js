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
                jQuery('.' + 'pane-roblib-search-islandscholar-roblib-islandscholar-results').hide();
            } else {
                var counter = 0;
                var divs = new Array();
                var content = new Array();
                jQuery.each(data.response.docs, function(key, val) {
                    id = 'roblib-search-islandscholar-' + counter;
                    content[counter] = '';
                    if(typeof val['mods.abstract'] !== 'undefined' ){
                        content[counter] = val['mods.abstract'][0];
                    }
                    divs[counter++] = id;
                    items.push('<div class ="roblib-search-row" id="' + id + '">\n\
                                <div class="roblib-title islandscholar">\n\
                                <a href="http://www.islandscholar.ca/fedora/repository/' + val.PID +'">' + val.Title_sorted + '</a></div>');
                    try {
                     items.push('<div class="islandscholar-authors">');
                    jQuery.each(val["mods.author"], function(key2, val2){
                        items.push('<span class="islandscholar-author">' + val2 + ';</span> ')
                    })
                    items.push('</div>')
                    } catch (e){

                    }
                    try {
                        items.push('<div class="islandscholar-source">');

                        try{
                            if (typeof val["mods.hostTitle"][0] !== 'undefined') {
                                items.push('<span class="islandscholar-hostTitle">' + val["mods.hostTitle"][0] + '</span> ')
                            }

                        } catch (err){

                        }
                        try{
                            jQuery.each(val.dateIssued, function(key2, val2){
                                items.push('<span class="islandscholar-citation">' + val2 + '</span> ')
                            })
                        }  catch(err){

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
                        jQuery.each(val.genre, function(key2, val2){
                            items.push('<div class="islandscholar-label">' + val2 + '</div> ')
                        })
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


                jQuery('#roblib-search-content-islandscholar').empty().append(items.join(''));
                qtipify(divs, content, 'Abstract');
                var number = data.response.numFound;
                var query = encodeURIComponent(data.responseHeader.params.q);//.'milk';
                var scholarUrl = "http://www.islandscholar.ca/islandora/solr/search/"
                jQuery('#roblib-search-islandscholar-more').empty().append('<a id="islandscholar-see-more-result"' +
                    ' href="http://www.islandscholar.ca/islandora/solr/search/' + query + '">see all ' + number + ' results</a>');

            }
        });
    }

}

