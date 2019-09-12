<?php

/**
 * @file roblib-search-passthru.tpl.php
 */
?>

<div class="roblib-search-content " id="roblib-search-content-passthru">
  <img src="<?php print (empty($spinner_path) ? ' ' : $spinner_path); ?>"/>
</div>
<div class="roblib-search-row"
     id="roblib-search-passthru-eds-more"></div>
<div class="roblib-search-row"
     id="roblib-search-passthru-islandscholar-more"></div>
<div class="roblib-search-row" id="roblib-search-passthru-evergreen-more"></div>
<div class="roblib-search-row" id="roblib-search-google-scholar">
  <a href="http://scholar.google.ca/scholar?q=<?php print ($query); ?>">Google
    Scholar</a>
</div>
<div class="roblib-search-row" id="roblib-search-google-cse-carleton">
  <a
    href="http://www.google.com/cse?cx=015121753026627038989:9jvssbo3xgo&ie=UTF-8&q=<?php print ($query); ?>&sa=Search">Canadian
    Government Sites</a>
</div>
<div class="roblib-search-row" id="roblib-search-filmsondemand">
  <a
    href="https://video-alexanderstreet-com.proxy.library.upei.ca/channel/academic-video-online?q=<?php print ($query); ?>">Academic Video Online</a>
</div>


