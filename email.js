const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br>Email: ${email.value}<br>Phone Number: ${phone.value}<br>Message: ${mess.value}`;

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "anandhmadurai17@gmail.com",
        Password: "2B8B1D948AD917842F99B871DC3DAC7B049E",
        To: 'anandhmadurai17@gmail.com',
        From: "anandhmadurai17@gmail.com",
        Subject: subject.value,
        Body: bodyMessage
    }).then(
        message => {
            if (message === "OK") {
                Swal.fire({
                    title: "Success!",
                    text: "Message sent successfully!",
                    icon: "success"
                }).then(() => {
                    // Clear the form after successful submission
                    form.reset();
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        }
    );
}

function showError(input, message) {
    const errorTxt = input.parentElement.querySelector(".error-txt");
    errorTxt.textContent = message;
    errorTxt.style.display = "block";
}

function hideError(input) {
    const errorTxt = input.parentElement.querySelector(".error-txt");
    errorTxt.style.display = "none";
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/; // Assuming 10-digit phone number
    return phoneRegex.test(phone);
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value.trim() === "") {
            item.classList.add("error");
            showError(item, `${item.placeholder} can't be blank`);
        } else {
            item.classList.remove("error");
            hideError(item);

            // Additional validation for email and phone
            if (item === email && !isValidEmail(item.value.trim())) {
                item.classList.add("error");
                showError(item, "Invalid email address");
            } else if (item === phone && !isValidPhone(item.value.trim())) {
                item.classList.add("error");
                showError(item, "Invalid phone number");
            }
        }
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
    const errors = document.querySelectorAll(".error");
    if (errors.length === 0) {
        sendEmail();
    }
});
