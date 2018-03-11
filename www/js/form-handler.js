(function () {

  function init(){
    $('#submitButton').click(submitButtonHandler);
  }

  function submitButtonHandler (evt) {
     var testForm = document.getElementById('StudentForm');
     var testForm2 = document.getElementById('FacultyForm');
      //prevent form submission
      evt.preventDefault();
      evt.stopPropagation();

      $('#post-results-container').fadeOut();
      $('.ajaxLoader').css('display', 'inline-block');


      //make the AJAX call
      $.ajax({
        url: '/student',
        type: 'POST',
        data: {
          firstName: testForm.firstName.value,
          lastName: testForm.lastName.value
        },
        success: postSuccessHandler
      });
      $.ajax({
        url: '/faculty',
        type: 'POST',
        data2: {
          firstName: testForm2.firstName.value,
          lastName: testForm2.lastName.value
        },
        success: postSuccessHandler
      });
  }

  function postSuccessHandler (jsonData) {
    var $data = $('#post-results-container .data');
    var $data2 = $('#post-results-container2 .data');

    //reset the UI
    $data.html('');
    $('.ajaxLoader').hide();

    //update the UI with the data returned from the AJAX call 
    $.each(jsonData, function (key, val) {
      $data.append('<li><b>' +  key + '</b>'   + val + '</li>');
    });
    $.each(jsonData, function (key, val) {
      $data2.append('<li><b>' +  key + '</b>'   + val + '</li>');
    });
    $('#post-results-container').fadeIn();
    $('#post-results-container2').fadeIn();
  };

//init on document ready
$(document).ready(init);
})();