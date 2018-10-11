$(function () {

    // Get the form.
    var form = $('#rsvp-form');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        if (form.valid()) {

            $('#button-confirmation-rspv').hide();
            $('#button-close-rsvp').hide();
            $('#loading-rspv').show();

            // Serialize the form data.
            var formData = $(form).serialize();

            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
                .done(function (response) {
                    // Make sure that the formMessages div has the 'alert-success' class.
                    $(formMessages).removeClass('alert alert-danger');
                    $(formMessages).addClass('alert alert-success');

                    // Set the message text.
                    $(formMessages).text('Confirmação de presença registrada com sucesso. Muito obrigado');

                    // Clear the form.
                    $('#cname').val('');
                    $('#cevents').val('');
                    $('#cguests').val('');
                    $('#cguestinfo').val('');

                    $('#button-confirmation-rspv').show();
                    $('#button-close-rsvp').show();
                    $('#loading-rspv').hide();
                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the 'alter-danger' class.
                    $(formMessages).removeClass('alert alert-success');
                    $(formMessages).addClass('alert alert-danger');

                    // Set the message text.
                    if (data.responseText !== '') {
                        $(formMessages).text(data.responseText);
                    } else {
                        $(formMessages).text('Oops! Um erro ocorreu ao enviar a sua confirmação.');
                    }

                    $('#button-confirmation-rspv').show();
                    $('#button-close-rsvp').show();
                    $('#loading-rspv').hide();
                });

        }

    });

});
