Drupal.behaviors.roblib_search_eds_articles = {
  attach: function (context, settings) {
    $url = settings.roblib_search_eds_articles.search_url;
    articles_profile = settings.roblib_search_eds_articles.eds_profile;
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
        jQuery('.' + 'pane-roblib-search-eds-roblib-search-eds-articles').hide();
      } else {
        var counter = 0;
        var divs = new Array();
        var content = new Array();
        var queries = [];
        jQuery.each(data.queries, function (key7, query) {
          queries.push(query.query);
        })
        var query_str = data.queries[0].query;
        var href_str = 'http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&scope=site&type=1&custid=uprince&groupid=main&profile=eds&mode=bool&lang=en&bquery=';
        jQuery.each(data.documents, function (key, val) {
          id = 'roblib-search-eds-article-' + counter;
          divs[counter++] = id;

          if (typeof val.Items !== 'undefined') {
            items.push('<div class ="roblib-search-row" id="' + id + '">');
            if (typeof val.Items.Title !== 'undefined') {
                items.push('<div class="roblib-title eds">');
                items.push('<a href="http://proxy.library.upei.ca/login?url=' + val.PLink + '&scope=site">' + val.Items.Title.Data + '</a></div>');
            }
            pubType = val.PubType;

            pubYear = val.RecordInfo.BibRelationships.IsPartOfRelationships["date"];
            !pubYear ? pubYear = " " : pubYear = pubYear[0]["Y"];

            items.push('<div class="eds-type"><span class="eds-pubyear">' + pubYear + '</span> - ' + pubType + '</div>');


            var roblib_authors = [];
            jQuery.each(val.RecordInfo.BibRelationships.HasContributorRelationships, function (key3, author) {
              roblib_authors.push(author.NameFull);
            })

            items.push('<div class="eds-sor">');
            roblib_authors = roblib_shorten(roblib_authors.join('; '), 50, " ");
            items.push(roblib_authors);
            items.push('</div>');


            if (typeof val.Items.TitleSource !== 'undefined') {
                items.push('<div class="eds-src"><span class="eds-label">In:</span> ' + val.Items.TitleSource.Data + '</div>');
            }
            if (typeof val.PLink !== 'undefined' && typeof val.PDF !== 'undefined' && val.PDF == 'pdflink') {
              items.push('<div class="eds-db eds-pdf-link"><a href="' + val.PLink + '&scope=site">PDF Full Text</a></div>');
            }
            if (typeof val.PLink !== 'undefined' && typeof val.HTML !== 'undefined' && val.HTML == '1') {
              items.push('<div class="eds-db eds-pdf-link"><a href="' + val.PLink + '&scope=site">HTML Full Text</a></div>');
            }

            items.push('</div>');
          } else {
            items.push('<div class ="roblib-search-row roblib-eds-unauthorized" id="\' + id + \'">You must login to view this result, <a href="http://proxy.library.upei.ca/login?url=' + href_str + query_str + '" id="eds-unauthorized-result">click here to login</a></div>'  );}
        });
        jQuery('#' + 'roblib-search-content-eds-articles').empty().append(items.join(''));
      }
      var non_upei_link = '';
      var upei_link = '<a href="' + href_str + query_str + '" id="eds-article-see-all-results">SEE ALL (' + data.recordCount + ')</a> ';
      if(!data.is_local_ip) {
        non_upei_link = '<a href="' + href_str + query_str + '" id="eds-article-non-upei-see_all_results">[Non-UPEI]</a>';
        upei_link = '<a href="http://proxy.library.upei.ca/login?url=' + href_str + query_str + '" id="eds-article-see-all-results">SEE ALL (' + data.recordCount + ')</a> ' + non_upei_link;
      }
      jQuery('#roblib-search-eds-article-more').empty().append(upei_link);
      jQuery('#roblib-eds-articles-more-results').empty().append(upei_link);
      jQuery('#roblib-eds-articles-toc').empty().append('<a href="' + href_str + query_str + '" id="eds-article-see-all-results-toc">Articles (' + data.recordCount + ')</a>');

    });
  }
}

