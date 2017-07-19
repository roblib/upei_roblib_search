Drupal.behaviors.roblib_search_islandscholar = {
    attach: function (context, settings) {
        url = settings.roblib_search_islandscholar.search_url;
        jQuery.getJSON(url, function (data) {
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
                jQuery.each(data.response.docs, function (key, val) {
                    id = 'roblib-search-islandscholar-' + counter;
                    content[counter] = '';
                    if (typeof val['mods_abstract_s'] !== 'undefined') {
                        content[counter] = val['mods_abstract_s'][0];
                    } else {
                        content[counter] = 'No abstract available';
                    }
                    divs[counter++] = id;
                    items.push('<div class ="roblib-search-row" id="' + id + '">\n\
                                <div class="roblib-title islandscholar">\n\
                                <a href="http://www.islandscholar.ca/fedora/repository/' + val.PID + '">' + val['dc.title'] + '</a></div>');
                    try {
                        items.push('<div class="islandscholar-authors">');
                        jQuery.each(val["mods_author_lastname_first_ms"], function (key2, val2) {
                            items.push('<span class="islandscholar-author">' + val2 + ';</span> ')
                        })
                        items.push('</div>')
                    } catch (e) {

                    }

                    items.push('<div class="islandscholar-source">');


                    if (typeof val.mods_relatedItem_host_titleInfo_title_s !== 'undefined') {
                        items.push('<span class="islandscholar-hostTitle">' + val.mods_relatedItem_host_titleInfo_title_s + '</span> ')
                    }


                    if (typeof val.mods_canonical_date_issued_s !== 'undefined') {
                        items.push('<span class="islandscholar-citation">' + val.mods_canonical_date_issued_s + '</span> ')
                    }


                    if (typeof val.mods_part_detail_volume_number_s !== 'undefined') {
                        items.push('<span class="islandscholar-citation">Vol. </span><span class="islandscholar-citation">' + val.mods_part_detail_volume_number_s + '</span> ')
                    }


                    if (typeof val.mods_part_detail_issue_number_s !== 'undefined') {
                        items.push('<span class="islandscholar-citation">Issue </span><span class="islandscholar-citation">' + val.mods_part_detail_issue_number_s + ',</span> ')
                    }


                    if (typeof val.mods_part_extent_start_s !== 'undefined') {
                        items.push('<span class="islandscholar-citation">p</span><span class="islandscholar-citation">' + val.mods_part_extent_start_s + '</span>')
                    }


                    if (typeof val.mods_part_extent_end_s !== 'undefined') {
                        items.push('<span class="islandscholar-citation">-</span><span class="islandscholar-citation">' + val.mods_part_extent_end_s + ',</span>')
                    }

                    if (typeof val.mods_genre_s !== 'undefined') {
                        items.push('<div class="islandscholar-label">' + val.mods_genre_s + '</div> ');
                    }

                    if (jQuery.inArray('PDF', val.fedora_datastreams_ms) > 0) {
                        items.push('<div>full text</div>');
                    }

                    items.push('</div>');

                    items.push('</div>');
                });


                jQuery('#roblib-search-content-islandscholar').empty().append(items.join(''));
                qtipify(divs, content, 'Abstract');
                var number = data.response.numFound;
                var query = encodeURIComponent(data.responseHeader.params.q);//.'milk';
                jQuery('#roblib-search-islandscholar-more').empty().append('<a id="islandscholar-see-more-result"' +
                    ' href="http://www.islandscholar.ca/islandora/search/' + query + '?type=dismax">see all results</a>');

            }
        });
    }

}

