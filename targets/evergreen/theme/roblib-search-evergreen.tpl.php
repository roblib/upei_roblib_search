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

<div class ="roblib-search-content-evergreen">  
   <?php foreach($results as $result): ?>
    <div class ="roblib-search-row">

  <div class="rolib-title evergreen"><a href = "<?php print $result['url']; ?>"><?php print $result['title']; ?></a>
  </div>
    </div>
  <?php endforeach; ?>
 <div class ="roblib-search-more">Search the Catalog</div>
</div>