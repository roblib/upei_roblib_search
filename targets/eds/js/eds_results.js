Drupal.behaviors.roblib_search_eds = {
    attach: function(context, settings) { 
        $url = settings.roblib_search_eds.search_url;
        jQuery.getJSON($url, function(data) {
            var items = [];     
            if(data.length < 1){
                jQuery('#' + 'roblib-search-content-eds').empty().append('No Results');     
            } else {
                jQuery.each(data.records, function(key, val) {
                    
                    //items.push('<a class="roblib-search-eds-tn" href="'+val.ImageInfo.thumb+'"/>');
                    //jQuery.each(val.RecordInfo.BibEntity.Titles, function(key2, val2){
                    if (typeof val.Items !== 'undefined') {
                         items.push('<div class ="roblib-search-row">');   
                        if (typeof val.Items.Ti !== 'undefined') {
                            jQuery.each(val.Items.Ti, function(key2, val2){
                                items.push('<div class="roblib-title eds">');
                                items.push('<a href="'+val.PLink+'">'+val2.Data+'</a></div>');
                            }) 
                        }
                        jQuery.each(val.RecordInfo.BibRelationships.HasContributorRelationships, function(key3, authors){
                            items.push('<div class="eds-sor">'+authors.NameFull+'</div>');
                        }) 
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
                                items.push('<div class="eds-type">'+typpub.Data+'</div>');                        
                            })   
                        }              
                    
                        items.push('<div class="eds-db">'+val.DbLabel+'</div>');
                   
                        items.push('</div>');
                    }
                });     
            }            
            jQuery('#' + 'roblib-search-content-eds').empty().append(items.join(''));
            var queries = [];
            jQuery.each(data.queries, function(key7, query){
                queries.push(query.query);
            }) 
            jQuery('#roblib-search-eds-more').empty().append('See all ' + data.recordCount + ' results');
        });
    }  
}
