<?php

/*
 *
 */

/**
 * @param $variables
 */
function roblib_search_solr_site_preprocess_roblib_search_solr_site_bestbet(&$variables) {
  roblib_search_solr_site_preprocessor($variables, 'bestbet');
}

/**
 * @param $variables
 */
function roblib_search_solr_site_preprocess_roblib_search_solr_site_results(&$variables) {
  roblib_search_solr_site_preprocessor($variables, 'results');
}

/**
 * @param $variables
 */
function roblib_search_solr_site_preprocess_roblib_search_solr_site_databases(&$variables) {
  roblib_search_solr_site_preprocessor($variables, 'databases');
}

/**
 * @param $variables
 */
function roblib_search_solr_site_preprocess_roblib_search_solr_site_guides(&$variables) {
  roblib_search_solr_site_preprocessor($variables, 'guides');
}


/**
 * @param array $variables
 * @param string $type
 *
 * @return string
 */
function roblib_search_solr_site_preprocessor(&$variables, $type) {
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
  $variables['type'] = $type;
  $query = urlencode($query);
  $search_url = $base_url . '/roblib_search/solr_site/' . $type . '/' . $query;
  drupal_add_js(drupal_get_path('module', 'roblib_search_solr_site') . '/js/solr_site_' . $type . '.js');
  $key = 'roblib_search_solr_site_' . $type;
  $default_module = variable_get('search_default_module','node');
  drupal_add_js(array($key => array('search_url' => $search_url, 'search_query' => $query,
  'base_url' => $base_url, 'default_site_type' => $default_module)), array('type' => 'setting'));
}
