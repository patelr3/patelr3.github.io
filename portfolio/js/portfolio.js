function main() {
  // Set useful vars
  var navButtons = $('.menuButton');
  var dropdownButtons = $('.dropdownButton');
  var menuButtons = $('.menu button');
  var pages = $('.page');
  
  // Set page and button mappings
  var pageMap = new Map();
  for (var i = 0; i < menuButtons.length; i++) {
    pageMap.set(menuButtons[i], pages[i]);
  }
  
  // Adjust the page display so that it is displayed vertically
  // after the menu bar
  $('.pages').css('margin-top', $('#menu').css('height'));
  $(window).resize(function () {
    var pageMarginTop = $('#menu').css('height');
    $('.pages').css('margin-top', pageMarginTop);
  });
  
  // Navigate to specific display based on last menu button clicked
  // Look for button click on menu
  $('.menu button').on('click', function () {
    var parentClasses = $(this).parent().attr('class');
    // Clear previous selection
    for (var i = 0; i < navButtons.length; i++) {
      $(navButtons[i]).removeClass('selected');
    }
    for (var i = 0; i < dropdownButtons.length; i++) {
      $(dropdownButtons[i]).removeClass('selected');
    }
    for (var i = 0; i < pages.length; i++) {
      $(pages[i]).css('display', 'none');
    }
    
    // Show the correct page
    $(pageMap.get(this)).css('display', 'block');
    
    // Handle different cases: menuButton, dropdown, dropdownButton
    if (parentClasses == 'navButtons') {
      $(this).addClass('selected');
    } else if (parentClasses == 'dropdown') {
      $(this).addClass('selected');
    } else {
      $(this).parent().parent().find('.menuButton').addClass('selected');
      $(this).addClass('selected');
    }
  });
  
  // Handle dropdown mouse leave transition
  var timeoutID;
  $('.dropdown').on('mouseleave', function () {
    $(this).find('.dropdownContent').css('display', 'block');
    var dd = $(this).find('dropdownContent')[0];
    timeoutID = setTimeout(function () {
      $('.dropdownContent').css('display', 'none');
    }, 200);
  });
  
  $('.dropdown').on('mouseenter', function() {
    clearTimeout(timeoutID);
    $(this).find('.dropdownContent').css('display', 'block');
  });
}

// Run main
$(document).ready(main);