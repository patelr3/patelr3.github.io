function main() {
  // Store the menu buttons
  var checkMenuButtons = $('.checkButton');
  
  // Handle new/load/rename/delete checklist
  $('.checkMenuButtons .checkButton').on('click', function() {
    // Figure out which button/action was done
    var menuButtonID = $(this).attr('id');
    var cDD = document.getElementById('checklistDrop');
    switch(menuButtonID) {
      case 'new':
        newChecklist(cDD);
        break;
      case 'rename':
        if(!renameChecklist(cDD)) {
          break;
        }
      case 'load':
        loadChecklist(cDD);
        break;
      case 'del':
        deleteChecklist(cDD);
        break;
      default:
        alert('There is an error with the checklist menu manager.');
    }
  });
  
  // Handle the checklist sections
  
  // Handle textarea clicks
  $('textarea').on('click', function() {
    var textarea = $(this)[0];
    if (!textarea.classList.contains('edit')) {
      var checkmark = $(this).parent().parent().find('.checkmark')[0];
      if (checkmark.classList.contains('after')) {
        checkmark.classList.remove('after');
      } else {
        checkmark.classList.add('after');
      }
    }
  });
  
  // Handle the checklist steps
  $('.listButtons .listButton').on('click', function () {
    // Figure out which button/action was done
    var listButtonID = $(this).attr('id');
    switch(listButtonID) {
      case 'add':
        break;
      case 'edit':
        // Change button state
        $(this).toggleClass('pressed');
        
        // Change text area state
        var textarea = $(this).parent().parent().find('textarea')[0];
        if (textarea.classList.contains('edit')) {
          textarea.readOnly = true;
          textarea.classList.remove('edit');
        } else {
          textarea.readOnly = false;
          textarea.classList.add('edit');
        }
        break;
      case 'move':
        break;
      case 'remove':
        break;
      default:
        break;
    }
  });
  
  // Handle textarea resizes
  $('textarea').each(function () {
    this.setAttribute('style', 'height:' + (100) + '%;overflow-y:hidden;');
  }).on('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });
}

$(document).ready(main);

////////////////////////// HELPER FUNCTIONS /////////////////////////

/**
 * Creates a new checklist, names that checklist, and loads it
 */
function newChecklist(checklist) {
  // Get value for this checklist option
  var numChecklists = checklist.options.length;
  
  // Add option to checklist dropdown
  $('#checklistDrop').append($('<option>', {
    value: numChecklists,
    text: 'Checklist ' + numChecklists
  }));
  
  // Make new option as the selected option
  checklist.value = numChecklists;
  
  // Try renaming
  if (!renameChecklist(checklist)) {
    checklist.remove(checklist.selectedIndex);
    return false;
  }
  
  // Try loading
  loadChecklist(checklist);
}

/**
 * Renames the current selected checklist
 */
function renameChecklist(checklist) {
  if ($('#checklistDrop option').length == 0) {
    alert('There are no checklists to rename!');
    return false;
  }
  
  // Prompt user
  var newChecklistName = prompt('Please enter the new checklist name', 'Checklist Name');
  if (newChecklistName === null) {
    return false;
  }
  
  // Rename checklist
  checklist.options[checklist.selectedIndex].text = newChecklistName;
  return true;
}

/**
 * Loads a checklist according to the selected option by the user
 */
function loadChecklist(checklist) {
  // No checklists case
  if (checklist.options.length == 0) {
    alert('There are no checklists to load!');
    return false;
  }
  
  // Logs the loaded checklist
  console.log('checklist: ' + $('#checklistDrop').val() + ' ' + checklist.options[checklist.selectedIndex].text);
  return true;
}

/**
 * Deletes a checklist from the available options, along
 * with all the settings stored to the checklist
 */
function deleteChecklist(checklist) {
  if (checklist.options.length == 0) {
    alert('There are no checklists to delete!');
    return false;
  }
  
  if (confirm('Are you sure you want to delete the ' + checklist.options[checklist.selectedIndex].text + ' checklist?'
      + ' This will delete all contents of the checklist and you will not be able to retrieve it again.'))
    checklist.remove(checklist.selectedIndex);
  return true;
}

/**
 * Sends an error message
 */
function error() {
  alert('There was an unexpected error. Please restart the application (refresh).')
}