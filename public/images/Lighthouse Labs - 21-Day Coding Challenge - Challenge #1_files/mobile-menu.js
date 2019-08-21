/* global $ */

$(function() {
  var $menuButton = $('.menu-button');
  var $nav = $('.nav-container');

  $menuButton.click(function(){
    $menuButton.toggleClass('selected');
    $nav.toggleClass('selected');
  });
});
