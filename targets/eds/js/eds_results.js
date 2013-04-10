Drupal.behaviors.roblib_search_cufts = {
    attach: function(context, settings) { 
        $url = settings.roblib_search_eds.search_url;
        jQuery.getJSON($url, function(data) {
            var items = [];     
            if(data.length < 1){
            jQuery('#' + 'roblib-search-content-eds').empty().append('No Results');     
        } else {
            jQuery.each(data.journals, function(key, val) {
                items.push('<div class ="roblib-search-row">');
                items.push('<div class="roblib-title eds">');
                items.push('<a href = "'+val.url+'">'+val.title+'</a></div>');
                items.push('</div>');
            });     
        }            
        jQuery('#' + 'roblib-search-content-eds').empty().append(items.join(''));
        });
}
  
}



