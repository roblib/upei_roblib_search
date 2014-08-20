Drupal.behaviors.roblib_search_eds = {
    attach: function(context, settings) { 
        $url = settings.roblib_search_eds.search_url;
        profile = settings.roblib_search_eds.eds_profile;
        jQuery.getJSON($url, function(data) {
            var items = [];
            var numberOfDocs = 0;
            try {
                numberOfDocs = data.records.length;
            } catch (err) {
                // do nothing leave docLength at 0
            }
            if(numberOfDocs < 1){
                jQuery('#' + 'roblib-search-content-eds').empty().append('No Results');
                jQuery('.' + 'pane-roblib-search-eds-roblib-search-eds-results').hide();
            } else {
                var counter = 0;
                var divs = new Array();
                var content = new Array();
                jQuery.each(data.records, function(key, val) {
                    id = 'roblib-search-eds-' + counter;
                    edsPopulatePopupDivs(content, val, counter);
                    divs[counter++] = id;
                    if (typeof val.Items !== 'undefined') {
                         items.push('<div class ="roblib-search-row" id="' + id + '">');
                        if (typeof val.Items.Ti !== 'undefined') {
                            jQuery.each(val.Items.Ti, function(key2, val2){
                                items.push('<div class="roblib-title eds">');
                                items.push('<a href="'+val.PLink+'&scope=site">'+val2.Data+'</a></div>');
                            }) 
                        }
                        items.push('<div class="eds-sor">');
                        jQuery.each(val.RecordInfo.BibRelationships.HasContributorRelationships, function(key3, authors){
                            items.push(authors.NameFull+';'+' ');
                        })
                        items.push('</div>');
                        if (typeof val.Items.Src !== 'undefined') {
                            jQuery.each(val.Items.Src, function(key4, source){                        
                                items.push('<div class="eds-src">'+source.Data+'</div>');                        
                            })   
                        }
                        if (typeof val.Items.PubIrInfo !== 'undefined') {
                            jQuery.each(val.Items.PubIrInfo, function(key5, pubinfo){                        
                                items.push('<div class="eds-pubinfo">'+pubinfo.Data+'</div>');                        
                            })   
                        }
                        if (typeof val.Items.TypPub !== 'undefined') {
                            jQuery.each(val.Items.TypPub, function(key6, typpub){                        
                                items.push('<div class="eds-type"><span class="eds-label">'+typpub.Label+'</span>: '+typpub.Data+'</div>');
                            })   
                        }              
                    
                        items.push('<div class="eds-db">'+val.DbLabel+'</div>');
                   
                        items.push('</div>');
                    }
                });
                jQuery('#' + 'roblib-search-content-eds').empty().append(items.join(''));
                qtipify(divs, content, 'Notes');
            }            

            var queries = [];
            jQuery.each(data.queries, function(key7, query){
                queries.push(query.query);
            }) 
            var query_str = data.queries[0].query;
            //var host = "http://eds-api.ebscohost.com";
            //var get = "/edsapi/rest/Search?query=history&searchmode=all&resultsperpage=20&pagenumber=1&sort=relevance&highlight=y&includefacets=y&facetfilter=1%2cSourceType%3aMagazines%2cSourceType%3aNews%2cSourceType%3aAcademic+Journals%2cSourceType%3aConference+Materials&view=detailed";
            var href_str = 'http://search.ebscohost.com/login.aspx?direct=true&site=ehost-live&scope=site&type=1&custid=uprince&groupid=main&profid=' + profile + '&mode=bool&lang=en&bquery=';
            jQuery('#roblib-search-eds-more').empty().append('<a href="'+href_str+query_str+'" id="see_all_results">See all results</a>');

        });
    }  
}

function edsPopulatePopupDivs(content, val, counter){
    content[counter] = '';
    try{
        jQuery.each(val.DetailedRecord, function(key, value){
            if (content.length < 5 &&
                (value.Group == 'PubInfo' || value.Group =="TypPub" || value.Group == "TypeDoc" || value.Group =="Su" || value.Group == "Au")) {
                content[counter] += '<div class="eds-popup-content"><span class="eds-popup-label">' + value.Label  + ': </span>' ;
                content[counter] += '<span class="eds-popup-value"> ' + value.Data +'</span></div>';(value.Group =='Ab' || value.Group == 'Note' )
            } else if (content[counter].length < 5 && (value.Group == "Note" || value.Group== "Ab")) {
                content[counter] += '<div class="eds-popup-content"><span class="eds-popup-label">' + value.Label  + ': </span>' ;
                content[counter] += '<span class="eds-popup-value"> ' + value.Data +'</span></div>';
            } else if (content[counter].length < 3 && (value.Group == 'TOC' || value.Group == 'Src')) {
                content[counter] += '<div class="eds-popup-content"><span class="eds-popup-label">' + value.Label  + ': </span>' ;
                content[counter] += '<span class="eds-popup-value"> ' + value.Data +'</span></div>';
            } else if (content[counter].length < 1 && value.Group == 'Ti') {
                content[counter] += '<div class="eds-popup-content"><span class="eds-popup-label">' + value.Label  + ': </span>' ;
                content[counter] += '<span class="eds-popup-value"> ' + value.Data +'</span></div>';
            }
        })
    } catch (err) {
        // do nothing as there is no data to work with
    }
}

