<?php

/*
 * all we do here is pass a url to some javascript so results can be loaded
 * indepentantly
 */

function roblib_search_passthru_preprocess_roblib_search_passthru(&$variables) {
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
  $scholar_search_url = $base_url . '/roblib_search/passthru/scholar/ajax/' . urlencode($query);
  $evergreen_search_url = $base_url . '/roblib_search/passthru/evergreen/ajax/' . urlencode($query);

  drupal_add_js(drupal_get_path('module', 'roblib_search_passthru') . '/js/passthru_results.js');
  drupal_add_js(
    [
      'roblib_search_passthru' => [
        'scholar_search_url' => $scholar_search_url,
        'evergreen_search_url' => $evergreen_search_url,
      ],
    ],
    ['type' => 'setting']);
  //drupal_add_js(array('roblib_search_passthru' => array('scholar_search_url' => $scholar_search_url)), array('type' => 'setting'));

}

?>
