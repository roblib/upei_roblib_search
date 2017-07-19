<?php

/*
 * all we do here is pass a url to some javascript so results can be loaded 
 * indepentantly
 */

function roblib_search_islandscholar_preprocess_roblib_search_islandscholar(&$variables) {
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
  $search_url = $base_url .'/roblib_search/islandscholar/ajax/'.urlencode($query);
  drupal_add_js(drupal_get_path('module', 'roblib_search_islandscholar') . '/js/islandscholar_results.js');
  drupal_add_js(array('roblib_search_islandscholar' => array('search_url' => $search_url)), array('type' => 'setting'));
}
?>
