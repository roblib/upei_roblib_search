Drupal.behaviors.roblib_search_cufts = {
    attach: function(context, settings) { 
        $url = settings.roblib_search_cufts.search_url;
        jQuery.getJSON($url, function(data) {
            var items = [];     
            if(data.length < 1){
            jQuery('#' + 'roblib-search-content-cufts').empty().append('No Results');     
        } else {
            jQuery.each(data.journals, function(key, val) {
                items.push('<div class ="roblib-search-row">');
                items.push('<div class="roblib-title cufts">');
                items.push('<a href = "'+val.url+'">'+val.title+'</a></div>');
                items.push('</div>');
            });     
        }            
        jQuery('#' + 'roblib-search-content-cufts').empty().append(items.join(''));
        });
}
  
}



