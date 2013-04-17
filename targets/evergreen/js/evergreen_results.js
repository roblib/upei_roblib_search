Drupal.behaviors.roblib_search_evergreen = {
    attach: function(context, settings) { 
        url = settings.roblib_search_evergreen.search_url;
        jQuery.getJSON(url, function(data) {
            var items = [];     
            if(data.length < 1){
                jQuery('#' + 'roblib-search-content-evergreen').empty().append('No Results');     
            } else {
                jQuery.each(data, function(key, val) {
                    
                    items.push('<div class ="roblib-search-row">');
                    items.push('<div class="roblib-title evergreen">');
                    if (typeof val.title !== 'undefined') {                    
                        items.push('<a href = "'+val.url+'">'+val.title);
                    }
                    if (typeof val.subtitle !== 'undefined') {
                        items.push(' ' + val.subtitle);
                    } 
                    items.push('</a></div>');
                    if (typeof val.sor !== 'undefined') {
                        items.push('<div class="evergreen-sor">' + val.sor +'</div>');
                    } 
                    if (typeof val.date !== 'undefined') {
                        items.push('<div class="evergreen-date">' + val.date + '</div>')
                    }      
                    if(typeof val.holdings !== 'undefined'){
                        items.push('<div class="evergreen-holdings">');
                        jQuery.each(val.holdings, function(key2, val2){
                            roblibEvergreenAddHoldings(val2, items);
                        })
                        items.push('</div>')
                    }
                    if(typeof val.electronic_holdings !== 'undefined'){
                        items.push('<div class="evergreen-holdings">');
                        jQuery.each(val.electronic_holdings, function(key2, val2){
                            roblibEvergreenAddElectronicHoldings(val2, items);
                        })
                        items.push('</div>')
                    }
                    items.push('</div>');
                });     
            }            
            jQuery('#roblib-search-content-evergreen').empty().append(items.join(''));
            jQuery('#roblib-search-evergreen-more').empty().append('<a href = "' + data.catalogBaseSearchUrl + '">See all ' + data.numberOfRecords + ' results</a>');
        });
    }
  
}

function roblibEvergreenAddHoldings(holdings, items){
    items.push('<div class="evergreen-holdings-item">' + holdings.call_number + ' - ' + holdings.location +' (' + holdings.availability + ')</div>');  
}
function roblibEvergreenAddElectronicHoldings(holdings, items){
    items.push('<div class="evergreen-holdings-item"><a href="' + holdings.url + '">' + holdings.label + '</div>');  
}


