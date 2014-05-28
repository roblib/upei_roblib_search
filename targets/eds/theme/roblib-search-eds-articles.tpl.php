<?php

/**
 * @file roblib-search-eds-article.tpl.php
 * Search ebscohost for articles
 *
 * Variables available:
 * - $variables: all array elements of $variables can be used as a variable. e.g. $base_url equals $variables['base_url']
 *
 *
 * @see template_preprocess_roblib_search_wrapper()
 */
?>

<div class ="roblib-search-content eds-article" id="roblib-search-content-eds-articles">
  <img src="<?php print (empty($spinner_path) ? ' ' : $spinner_path); ?>"/> 
  
</div>
<div class ="roblib-search-more" id="roblib-search-eds-article-more"></div>