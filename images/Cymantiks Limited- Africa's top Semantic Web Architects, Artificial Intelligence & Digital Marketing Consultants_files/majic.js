// magic.js
$(document).ready(function() {

    // process the form
    $('form').submit(function(event) {
		$('#statusmsg').removeClass('has-error'); // remove the error class
		$('.help-block').remove(); // remove the error text

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {
            'name'              : $('input[name=name]').val(),
            'email'             : $('input[name=email]').val(),
            'subject'    		: $('input[name=subject]').val(),
            'body'    			: $('textarea[name=body]').val()
        };

        // process the form
        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : 'sendemail.php', // the url where we want to POST
            data        : formData, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
                        encode          : true
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                console.log(data); 

				// here we will handle errors and validation messages
				if ( ! data.success) {
					
					// handle errors for name ---------------
					if (data.errors.name) {
						$('#statusmsg').addClass('has-error'); // add the error class to show red input
						$('#statusmsg').append('<div class="help-block">' + data.errors.name + '</div>'); // add the actual error message under our input
					}

					// handle errors for email ---------------
					if (data.errors.email) {
						$('#statusmsg').addClass('has-error'); // add the error class to show red input
						$('#statusmsg').append('<div class="help-block">' + data.errors.email + '</div>'); // add the actual error message under our input
					}

					// handle errors for superhero alias ---------------
					if (data.errors.body) {
						$('#statusmsg').addClass('has-error'); // add the error class to show red input
						$('#statusmsg').append('<div class="help-block">' + data.errors.body + '</div>'); // add the actual error message under our input
					}

				} else {

					// ALL GOOD! just show the success message!
					$('form').append('<div class="alert alert-success">' + data.message + '</div>');

					// usually after form submission, you'll want to redirect
					// window.location = '/thank-you'; // redirect a user to another page
					alert('success'); // for now we'll just alert the user

				}

		})
		
		    // using the fail promise callback
    .fail(function(data) {

        // show any errors
        // best to remove for production
        console.log(data);
    });


		
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});