$(document).ready(function () {
      $('#submitButton').click(function (evt) {
        var testForm = null,
          firstName = '',
          lastName = '';

        evt.preventDefault();
        evt.stopPropagation();

        testForm = document.getElementById('testForm');
        firstName = testForm.firstName.value;
        lastName = testForm.lastName.value;

        $.ajax({
          url: '/form',
          type: 'POST',
          data: {firstName: firstName, lastName: lastName},
          success: function(jsonData){
            console.dir(jsonData);
          }
        });
    });
});