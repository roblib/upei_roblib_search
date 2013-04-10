<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function roblib_search_evergreen_preprocess_roblib_search_evergreen(&$variables) {
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
  $search_url = $base_url .'/roblib_search/evergreen/ajax/'.urlencode($query);
  drupal_add_js(drupal_get_path('module', 'roblib_search_evergreen') . '/js/evergreen_results.js');
  drupal_add_js(array('roblib_search_evergreen' => array('search_url' => $search_url)), array('type' => 'setting'));
}
?>
