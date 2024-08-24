const OTPinputs = document.querySelectorAll("input");
const button = document.querySelector("button");

window.addEventListener("load", () => {
    OTPinputs[0].focus();
});

OTPinputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        const currentInput = input;
        const nextInput = input.nextElementSibling;
        
        // Ensure only one character is entered
        if (currentInput.value.length > 1) {
            currentInput.value = currentInput.value.charAt(0);
        }
        
        // Enable the next input if there is a value in the current one
        if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
            nextInput.removeAttribute("disabled");
            nextInput.focus();
        }

        // Check if all inputs are filled and enable the button
        const allFilled = Array.from(OTPinputs).every(inp => inp.value.length === 1);
        if (allFilled) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    input.addEventListener("keyup", (e) => {
        // Handle Backspace key press to move focus to the previous input
        if (e.key === "Backspace" && input.value === "") {
            if (input.previousElementSibling) {
                input.setAttribute("disabled", true);
                input.previousElementSibling.focus();
            }
        }
    });

    // Disable all inputs except the first one by default
    if (index > 0) {
        input.setAttribute("disabled", true);
    }
});

// Handle button click
button.addEventListener("click", () => {
    const allFilled = Array.from(OTPinputs).every(inp => inp.value.length === 1);

    // Check if all OTP inputs are filled
    if (allFilled) {
        alert("Verification successful!");

        // Clear all OTP input fields and reset the state
        OTPinputs.forEach((input, index) => {
            input.value = "";
            input.setAttribute("disabled", true);
        });

        // Enable the first input again and set focus
        OTPinputs[0].removeAttribute("disabled");
        OTPinputs[0].focus();

        // Deactivate the button
        button.classList.remove("active");
    }
});
