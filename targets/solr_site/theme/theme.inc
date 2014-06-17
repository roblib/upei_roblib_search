<?php

/*
 * all we do here is pass a url to some javascript so results can be loaded 
 * indepentantly
 */

function roblib_search_solr_site_preprocess_roblib_search_solr_site(&$variables) {
    global $base_url;
   if (!isset($query)) {
    if (isset($_GET['roblib_query'])) {
      $query = $_GET['roblib_query'];
    }
    else {
      return '';
    }
  }
  $spinner_path = $base_url . '/' . drupal_get_path('module', 'roblib_search') . '/img/'.'spinner.gif';
  $variables['spinner_path'] = $spinner_path;
  $search_url = $base_url .'/roblib_search/solr_site/ajax/'.urlencode($query);
  drupal_add_js(drupal_get_path('module', 'roblib_search_solr_site') . '/js/solr_site_results.js');
  drupal_add_js(array('roblib_search_solr_site' => array('search_url' => $search_url,
    'search_query' => urlencode($query))), array('type' => 'setting'));

}
?>
