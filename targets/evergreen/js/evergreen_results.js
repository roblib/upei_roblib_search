Drupal.behaviors.roblib_search_evergreen = {
    attach: function(context, settings) { 
        $url = settings.roblib_search_evergreen.search_url;
        jQuery.getJSON($url, function(data) {
            var items = [];     
            if(data.length < 1){
                jQuery('#' + 'roblib-search-content-evergreen').empty().append('No Results');     
            } else {
                jQuery.each(data, function(key, val) {
                    items.push('<div class ="roblib-search-row">');
                    items.push('<div class="roblib-title evergreen">');
                    items.push('<a href = "'+val.url+'">'+val.title+'</a></div>');
                    items.push('</div>');
                });     
            }            
            jQuery('#' + 'roblib-search-content-evergreen').empty().append(items.join(''));
        });
    }
  
}



