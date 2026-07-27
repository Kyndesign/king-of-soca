/* =====================================================================
   Landing page behavior.
   Mailing list: the form posts to Mailchimp once MC_ACTION_URL in
   index.html is replaced with the real embedded-form action URL
   (Mailchimp -> Audience -> Signup forms -> Embedded forms).
   Until then, submits are intercepted with a friendly notice.
   ===================================================================== */
(function () {
  "use strict";

  var form = document.querySelector(".signup");
  var msg = document.querySelector(".signup__msg");
  if (!form) return;

  var wired = form.getAttribute("action") && form.getAttribute("action").indexOf("list-manage.com") !== -1;

  form.addEventListener("submit", function (e) {
    var email = form.querySelector('input[type="email"]');
    if (!email.value || email.value.indexOf("@") === -1) {
      e.preventDefault();
      if (msg) { msg.textContent = "Please enter a valid email address."; msg.hidden = false; }
      email.focus();
      return;
    }
    if (!wired) {
      e.preventDefault();
      if (msg) { msg.textContent = "Sign-ups open soon. Please check back."; msg.hidden = false; }
      return;
    }
    if (msg) { msg.textContent = "Thank you. Please confirm via the Mailchimp window."; msg.hidden = false; }
  });
})();
