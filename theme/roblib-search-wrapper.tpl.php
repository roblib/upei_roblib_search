<?php

/**
 * @file islandora-solr-wrapper.tpl.php
 * Islandora solr search results wrapper template
 *
 * Variables available:
 * - $variables: all array elements of $variables can be used as a variable. e.g. $base_url equals $variables['base_url']
 * - $base_url: The base url of the current website. eg: http://example.com .
 * - $user: The user object.
 *
 * 
 * - $results: Rendered search results (primary profile)
 * 
 *
 * @see template_preprocess_roblib_search_wrapper()
 */
?>

<div class ="roblib-search-content-wrapper">
  
  <?php foreach($results as $result): ?>
  <div><?php print $result; ?>
  </div>
  <?php endforeach; ?>
 
</div>