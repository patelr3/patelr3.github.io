function main() {
  //Get list of menu buttons
  var menuButtons = $('.menuButton');
  var displays = $('.displayOpt');
  
  // Add startup to menuButtons array
  menuButtons.push('lariStartup');
  
  // Change state on menu button clicks
  $('.menuButton').on('click', function() {
    // Menu buttons visually change in state when clicked/unclicked
    $('.menuButton').removeClass('active');
    $(this).toggleClass('active');
    
    // Change display screen based on menu setting
    var displayOpt = null;
    
    for (var i = 0; i < menuButtons.length; i++) {
      if ($(menuButtons[i]).hasClass('active')) {
        $(displays[i]).show();
      } else {
        $(displays[i]).hide();
      }
    }
  });
}

$(document).ready(main);