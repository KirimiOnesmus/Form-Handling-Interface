document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('userForm');
    const formSummary = document.getElementById('formSummary');
    const emailError = document.getElementById('emailError');
    const formError = document.getElementById('formError');

    // Function to validate email format
    function validateEmail(email) {
        const regex = /^\S+@\S+\.\S+$/;
        return regex.test(email);
    }

    // Function to display form data
    function displayFormData(formData) {
        formSummary.innerHTML = `
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Contact Method:</strong> ${formData.contactMethod}</p>
            <p><strong>Terms Accepted:</strong> ${formData.terms ? 'Yes' : 'No'}</p>
        `;
    }

    // Function to validate form
    function validateForm(formData) {
        let isValid = true;
        emailError.textContent = '';
        formError.textContent = '';

        if (!formData.name) {
            isValid = false;
            formError.textContent = 'Please fill out the required fields.';
        }

        if (formData.email && !validateEmail(formData.email)) {
            isValid = false;
            emailError.textContent = 'Invalid email format';
        }

        if (!formData.contactMethod) {
            isValid = false;
            formError.textContent = 'Please select a contact method.';
        }

        if (!formData.terms) {
            isValid = false;
            formError.textContent = 'You must accept the terms and conditions.';
        }

        return isValid;
    }

    // Event listener for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = {
            name: form.name.value,
            email: form.email.value,
            contactMethod: form.contactMethod.value,
            terms: form.terms.checked
        };

        if (validateForm(formData)) {
            displayFormData(formData);
            formError.textContent = '';
        }
    });

    // Real-time feedback for email input
    form.email.addEventListener('input', () => {
        if (validateEmail(form.email.value)) {
            emailError.textContent = '';
        } else {
            emailError.textContent = 'Invalid email format';
        }
    });
});
