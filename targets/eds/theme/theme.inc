<?php

/*
 * all we do here is pass a url to some javascript so the results can be
 * loaded async
 */

function roblib_search_eds_preprocess_roblib_search_eds(&$variables) {
  global $base_url;
  if (!isset($query)) {
    if (isset($_GET['roblib_query'])) {
      $query = $_GET['roblib_query'];
    }
    else {
      return '';
    }
  }
  $spinner_path = $base_url . '/' . drupal_get_path('module', 'roblib_search') . '/img/' . 'spinner.gif';
  $variables['spinner_path'] = $spinner_path;
  $search_url = $base_url . '/roblib_search/eds/ajax/' . urlencode($query);
  drupal_add_js(drupal_get_path('module', 'roblib_search_eds') . '/js/eds_results.js');
  drupal_add_js(array('roblib_search_eds' => array('search_url' => $search_url)), array('type' => 'setting'));

}

function roblib_search_eds_preprocess_roblib_search_eds_articles(&$variables) {
  global $base_url;
  if (!isset($query)) {
    if (isset($_GET['roblib_query'])) {
      $query = $_GET['roblib_query'];
    }
    else {
      return '';
    }
  }
  $spinner_path = $base_url . '/' . drupal_get_path('module', 'roblib_search') . '/img/' . 'spinner.gif';
  $variables['spinner_path'] = $spinner_path;
  $search_url = $base_url . '/roblib_search/eds/articles/' . urlencode($query);
  drupal_add_js(drupal_get_path('module', 'roblib_search_eds') . '/js/eds_results_article.js');
  drupal_add_js(array('roblib_search_eds_articles' => array('search_url' => $search_url)), array('type' => 'setting'));

}

?>
