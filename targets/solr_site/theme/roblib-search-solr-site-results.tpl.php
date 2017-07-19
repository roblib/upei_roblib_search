<?php

/**
 * @file roblib-search-solr-site-results.tpl.php
 *
 *
 * Variables available:
 * - $variables: all array elements of $variables can be used as a variable. e.g. $base_url equals $variables['base_url']
 *
 */
?>
<?
// Get rid of warnings in admin interface
if (!isset($type)){
  $type = 'results';
}
?>
<div class ="roblib-search-more" id="roblib-search-solr-site-<?php echo $type;?>-more"></div>
<div class ="roblib-search-content solr-site-<?php echo $type;?>" id="roblib-search-content-solr-site-<?php echo $type;?>">
  <img src="<?php print (empty($spinner_path) ? ' ' : $spinner_path); ?>"/>
</div>

<div id="roblib-solr-more-results-<?php print($type)?>"  class="roblib-solr-more-button button"></div>
<div id="roblib-solr-search-toc-<?php print($type)?>" class="roblib-bento-toc moveme-please"></div>
