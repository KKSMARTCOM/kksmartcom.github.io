// Validation des formulaires avec jQuery Validate
function validateEmail(e) {
  return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(e);
}

jQuery(function () {
  jQuery(".main_contact_form").validate({
    rules: {
      your_name: { required: true, maxlength: 40 },
      your_email: { required: true, email: true },
      your_text: { maxlength: 1000 },
      terms: { required: true }
    },
    messages: {
      your_name: { required: "Your name is required", maxlength: "Max length 40 characters" },
      your_email: { email: "Your email is invalid", required: "Email is required" },
      your_text: { maxlength: "Max length 1000 characters" },
      terms: { required: null }
    },
    submitHandler: function (e) {
      $(e).find(".main-btn").attr("disabled", true);
      sendAjaxForm(e);
    }
  });

  jQuery(".subscribe_form_handler").validate({
    rules: { your_email: { required: true, email: true } },
    messages: { your_email: { email: "Incorrect email. Please doublecheck.", required: "Email is required" } },
    submitHandler: function (e) { console.log("submit") }
  });

  jQuery(".main_contact_form2").validate({
    rules: {
      your_name: { required: true, maxlength: 40 },
      your_email: { required: true, email: true },
      your_text: { maxlength: 1000 },
      terms: { required: true }
    },
    messages: {
      your_name: { required: "Your name is required", maxlength: "Max length 40 characters" },
      your_email: { email: "Your email is invalid", required: "Email is required" },
      your_text: { maxlength: "Max length 1000 characters" },
      terms: { required: null }
    },
    submitHandler: function (e) {
      $(e).find(".main-btn").attr("disabled", true);
      sendAjaxForm(e);
    }
  });
});
