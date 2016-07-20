Drupal.behaviors.roblib_search_evergreen = {
    attach: function(context, settings) { 
        url = settings.roblib_search_evergreen.search_url;
        jQuery.getJSON(url, function(data) {
            var items = [];
            var numberOfDocs = 0;
            try {
                numberOfDocs = data.numberOfRecords;
            } catch (err) {
                numberOfDocs = 0;
            }
            if(numberOfDocs === undefined || numberOfDocs < 1){
                jQuery('#' + 'roblib-search-content-evergreen').empty().append('No Results');
                jQuery('.pane-roblib-search-evergreen-roblib-search-evergreen-results').hide();
            } else {
                var counter = 0;
                var divs = new Array();
                var content = new Array();
                jQuery.each(data, function(key, val) {
                    id = 'roblib_search_evergreen_' + counter;
                    populatePopupDivs(content, val, counter);
                    divs[counter++] = id;
                    items.push('<div class ="roblib-search-row" id="' + id + '">');
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
                jQuery('#roblib-search-content-evergreen').empty().append(items.join(''));
                qtipify(divs, content, 'More Info');
            }            

            jQuery('#roblib-search-evergreen-more').empty().append('<a href = "' + data.catalogBaseSearchUrl + '">See all results</a>');
        });
    }
  
}

function populatePopupDivs(content, val, counter){
    content[counter] = '';
    var placeOfPublication = '';
    if(typeof val.pop !== 'undefined'){
        content[counter] += '<div class="evergreen-publisher">Publisher: ' + val.pop ;
        placeOfPublication = '</div>';
    }
    if(typeof val.pop !== 'undefined' ){
        placeOfPublication = val.publisher + ' ' +placeOfPublication;
    }
    content[counter] += placeOfPublication;

    if(typeof val.numofpages !== 'undefined'){
        content[counter] += '<div class="evergreen-nop">Number of Pages: ' + val.numofpages +'</div>';
    }
    if(typeof val.date !== 'undefined'){
        content[counter] += '<div class="evergreen-popup-date">Publication Year: ' + val.date +'</div>';
    }
    var subjects = '';
    if(typeof val.subjectsa !== 'undefined'){
        subjects += val.subjectsa;
    }
    if(typeof val.subjectsb !== 'undefined'){
        subjects += ' ' + val.subjectsb;
    }
    if(typeof val.subjectsc !== 'undefined'){
        subjects += ' ' + val.subjectsc;
    }
    if(subjects){
        content[counter] += '<div class="evergreen-subjects">Subjects: ' + subjects + '</div>';
    }


}

function roblibEvergreenAddHoldings(holdings, items){
    items.push('<div class="evergreen-holdings-item">' + holdings.call_number + ' - ' + holdings.location +' (' + holdings.availability + ')</div>');  
}
function roblibEvergreenAddElectronicHoldings(holdings, items){
    items.push('<div class="evergreen-holdings-item"><a href="' + holdings.url + '">' + holdings.label + '</div>');  
}


