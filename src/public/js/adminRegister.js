document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        let formValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const contact = document.getElementById('contact');

        if (name.value.trim() === '') {
            document.getElementById('nameError').style.display = 'block';
            formValid = false;
        } else {
            document.getElementById('nameError').style.display = 'none';
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email.value)) {
            document.getElementById('emailError').style.display = 'block';
            formValid = false;
        } else {
            document.getElementById('emailError').style.display = 'none';
        }

        if (password.value.length < 6) {
            document.getElementById('passwordError').style.display = 'block';
            formValid = false;
        } else {
            document.getElementById('passwordError').style.display = 'none';
        }

        if (contact.value.trim() === '') {
            document.getElementById('contactError').style.display = 'block';
            formValid = false;
        } else {
            document.getElementById('contactError').style.display = 'none';
        }

        if (!formValid) {
            event.preventDefault();
        }
    });
});
