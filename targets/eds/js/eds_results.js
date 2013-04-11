Drupal.behaviors.roblib_search_eds = {
    attach: function(context, settings) { 
        $url = settings.roblib_search_eds.search_url;
        jQuery.getJSON($url, function(data) {
            var items = [];     
            if(data.length < 1){
                jQuery('#' + 'roblib-search-content-eds').empty().append('No Results');     
            } else {
                jQuery.each(data.records, function(key, val) {
                    items.push('<div class ="roblib-search-row">');                    
                    jQuery.each(val.RecordInfo.BibEntity.Titles, function(key2, val2){
                         items.push('<div class="roblib-title eds">');
                         items.push(val2.TitleFull+'</div>');
                    })                   
                    items.push('</div>');
                });     
            }            
            jQuery('#' + 'roblib-search-content-eds').empty().append(items.join(''));
        });
    }
  
}



