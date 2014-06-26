<?php

/**
 * @file roblib-search-eds-article.tpl.php
 * Search ebscohost for articles
 *
 * Variables available:
 * - $variables: all array elements of $variables can be used as a variable. e.g. $base_url equals $variables['base_url']
 *
 *
 */
?>
<div class ="roblib-search-more" id="roblib-search-eds-article-more"></div>
<div class ="roblib-search-content eds-article" id="roblib-search-content-eds-articles">
  <img src="<?php print (empty($spinner_path) ? ' ' : $spinner_path); ?>"/> 
  
</div>
<?php
/**
 * Alternate way to create link back to ebscohost.
 <form action="" id = 'roblib-search-eds-articles' method="post" style="width: 375px; overflow: auto;" onsubmit="return ebscoHostSearchGo(this);">
  <input id="ebscohosturl" name="ebscohosturl" type="hidden" value="http://search.ebscohost.com/login.aspx?direct=true&amp;site=ehost-live&amp;scope=site&amp;type=0&amp;custid=uprince&amp;profid=eds&amp;groupid=main&amp;mode=and&amp;cli0=RV&amp;clv0=N&amp;lang=en" />
  <input id="ebscohostsearchsrc" name="ebscohostsearchsrc" type="hidden" value="url" /> <input id="ebscohostsearchmode" name="ebscohostsearchmode" type="hidden" value="+" />
  <input id="ebscohostkeywords" name="ebscohostkeywords" type="hidden" value="" />
      <div><input id="ebscohostsearchtext" name="ebscohostsearchtext" value="history" type="hidden" size="23" style="font-size: 9pt; padding-left: 5px; margin-left: 0px;" /> <input type="submit" value="Search" style="font-size: 9pt; padding-left: 5px;" /></div>
    </div>

</form>
*/
?>


