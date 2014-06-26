<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function roblib_search_preprocess_roblib_search_other_sources(&$variables) {
  global $base_url;
  if (!isset($query)) {
    if (isset($_GET['roblib_query'])) {
      $query = $_GET['roblib_query'];
    }
    else {
      $query =  '';
    }
  }
  $variables['query']  = urlencode($query);
}
?>
