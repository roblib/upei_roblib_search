Drupal.behaviors.roblib_search_eds = {
  attach: function (context, settings) {
    $url = settings.roblib_search_eds.search_url;
    profile = settings.roblib_search_eds.eds_profile;
    jQuery.getJSON($url, function (data) {
      var items = [];
      var numberOfDocs = 0;
      try {
        numberOfDocs = data.numFound;
      } catch (err) {
        // do nothing leave docLength at 0
      }
      if (numberOfDocs < 1) {
        jQuery('#' + 'roblib-search-content-eds').empty().append('No Results');
        jQuery('.' + 'pane-roblib-search-eds-roblib-search-eds-results').hide();
      } else {
        var counter = 0;
        var divs = new Array();
        var content = new Array();
        var queries = [];
        jQuery.each(data.queries, function (key7, query) {
          queries.push(query.query);
        })
        var query_str = data.queries[0].query;
        var href_str = 'http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&scope=site&type=1&custid=uprince&groupid=main&profid=lite&mode=bool&lang=en&bquery=';

        jQuery.each(data.documents, function (key, val) {
          id = 'roblib-search-eds-' + counter;
          divs[counter++] = id;
          if (typeof val.Items !== 'undefined') {
            items.push('<div class ="roblib-search-row" id="' + id + '">');
            if (typeof val.Items.Title !== 'undefined') {
              items.push('<div class="roblib-title eds">');
              items.push('<a href="http://proxy.library.upei.ca/login?url=' + val.PLink + '&scope=site">' + val.Items.Title.Data + '</a></div>');
            }
            val.PubType == 'Book' ? pubType = 'Print Book' : pubType = val.PubType;

            pubYear = val.RecordInfo.BibRelationships.IsPartOfRelationships["date"];
            !pubYear ? pubYear = " " : pubYear = pubYear[0]["Y"];

            items.push('<div class="eds-type"><span class="eds-pubyear">' + pubYear + '</span> - ' + pubType + '</div>');

            var roblib_authors =[];
            jQuery.each(val.RecordInfo.BibRelationships.HasContributorRelationships, function (key3, author) {
              roblib_authors.push(author.NameFull);
            })

            items.push('<div class="eds-sor">');
            roblib_authors = roblib_shorten(roblib_authors.join('; '), 50, " ");
            items.push(roblib_authors);
            items.push('</div>');

            var url;
            !val.Items.URL ? url = " " : url = val.Items.URL.Data;
            if(url) {
              items.push('<div class="eds-url">' + url + '</div>');
            }

            if(pubType == "Print Book") {
              anNumber = val.An.split(".");
              if (anNumber[0] && anNumber[0] == 'upei') {
                catalogUrl = '<a href="http://islandpines.roblib.upei.ca/eg/opac/record/' + anNumber[1] +
                  '">View in UPEI Catalogue</a>';
                items.push('<div class="eds-catalog-link">' + catalogUrl + '</div>');
              }
            }
            items.push('</div>');
          } else {
            items.push('<div class="roblib-eds-unauthorized">You must login to view this result, <a href="http://proxy.library.upei.ca/login?url=' + href_str + query_str + '" id="eds-unauthorized-result">click here to login</a></div>'  );
          }
        });
        jQuery('#' + 'roblib-search-content-eds').empty().append(items.join(''));
      }

      jQuery('#roblib-search-eds-more').empty().append('<a href="http://proxy.library.upei.ca/login?url=' + href_str + query_str + '" id="eds-see_all_results">See all results (' + data.recordCount + ')</a>');
      jQuery('#roblib-eds-books-more-results').empty().append('<a href="http://proxy.library.upei.ca/login?url=' + href_str + query_str + '" id="eds-see_all_results-button">See all results (' + data.recordCount + ')</a>');
      jQuery('#roblib-eds-books-toc').empty().append('<a href="http://proxy.library.upei.ca/login?url=' + href_str + query_str + '" id="eds-see_all_results">Books (' + data.recordCount + ')</a>');

    });
  }
}


function roblib_intersects(a, b) {
  var d = {};
  var results = [];
  for (var i = 0; i < b.length; i++) {
    d[b[i]] = true;
  }
  for (var j = 0; j < a.length; j++) {
    if (d[a[j]])
      results.push(a[j]);
  }
  return results;
}

function roblib_shorten(str, maxLen, separator) {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen)) + ' et al.';
}


