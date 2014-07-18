<?php

/**
 * @file roblib-search-other-sources.tpl.php
 *
 *
 * @see template_preprocess_roblib_search_other_sources()
 */
?>

<div class ="roblib-search-content other-sources" id="roblib-search-content-other-sources">
  <div class="roblib-search-row" id="roblib-search-google-scholar">
     <a href="http://scholar.google.ca/scholar?q=<?php print ($query); ?>">Google Scholar</a>
  </div>
  <div class="roblib-search-row" id="roblib-search-google-cse-carleton">
    <a href="http://www.google.com/cse?cx=015121753026627038989:9jvssbo3xgo&ie=UTF-8&q=<?php print ($query); ?>&sa=Search">Canadian Government Sites</a>
  </div>
  <div class="roblib-search-row" id="roblib-search-filmsondemand">
    <a href="http://digital.films.com/PortalSearch.aspx?rd=lo&q=<?php print ($query); ?>">Films on Demand</a>
  </div>
</div>