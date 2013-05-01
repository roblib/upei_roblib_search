Drupal.behaviors.roblib_search_solr_site= {
    attach: function(context, settings) { 
        url = settings.roblib_search_solr_site.search_url;
        jQuery.getJSON(url, function(data) {
            var items = [];     
            if(data.length < 1){
                jQuery('#' + 'roblib-search-content-solr-site').empty().append('No Results');     
            } else {
                jQuery.each(data.response.docs, function(key, val) {                    
                    items.push('<div class ="roblib-search-row">');
                    items.push('<div class="roblib-title solr-site">');
                    items.push('<a href="'+val.url+'">' + val.label + '</a>');
                    items.push('</div>')
                    items.push('</div>');
                });     
            }            
            jQuery('#roblib-search-content-solr-site').empty().append(items.join(''));          
        });
    }
  
}

