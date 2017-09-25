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
        docs = data.documents;
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


            if (typeof val.Items.Src !== 'undefined') {
              jQuery.each(val.Items.Src, function (key4, source) {
                items.push('<div class="eds-src"><span class="eds-label">In:</span> ' + source.Data + '</div>');
              })
            }
            if (typeof val.PLink !== 'undefined' && typeof val.PDF !== 'undefined' && val.PDF == 'pdflink') {
              items.push('<div class="eds-db eds-pdf-link"><a href="' + val.PLink + '&scope=site">PDF Full Text</a></div>');
            }
            if (typeof val.PLink !== 'undefined' && typeof val.HTML !== 'undefined' && val.HTML == '1') {
              items.push('<div class="eds-db eds-pdf-link"><a href="' + val.PLink + '&scope=site">HTML Full Text</a></div>');
            }

            items.push('</div>');
          }
        });
        jQuery('#' + 'roblib-search-content-eds-articles').empty().append(items.join(''));
      }

      var queries = [];
      jQuery.each(data.queries, function (key7, query) {
        queries.push(query.query);
      })
      var query_str = data.queries[0].query;
      var href_str = 'http://search.ebscohost.com/login.aspx?direct=true&site=eds-live&scope=site&type=1&custid=uprince&groupid=main&profid=' + articles_profile + '&mode=bool&lang=en&bquery=';
      jQuery('#roblib-search-eds-article-more').empty().append('<a href="http://proxy.library.upei.ca/login?url=' + href_str + query_str + '" id="eds-article-see-all-results">See all results (' + data.recordCount + ')</a>');
      jQuery('#roblib-eds-articles-more-results').empty().append('<a href="http://proxy.library.upei.ca/login?url=' + href_str + query_str + '" id="eds-article-see-all-results-button">See all results (' + data.recordCount + ')</a>');
      jQuery('#roblib-eds-articles-toc').empty().append('<a href="http://proxy.library.upei.ca/login?url=' + href_str + query_str + '" id="eds-article-see-all-results-toc">Articles (' + data.recordCount + ')</a>');

    });
  }
}

