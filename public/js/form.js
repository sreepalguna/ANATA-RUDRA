const enquiryForm = document.getElementById("enquiryForm");

enquiryForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = enquiryForm.querySelector("button[type='submit']");

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    const enquiry = {
        customer_name: document.getElementById("customerName").value.trim(),
        business_name: document.getElementById("businessName").value.trim(),
        email: document.getElementById("customerEmail").value.trim(),
        problem_category: document.getElementById("problemCategory").value,
        problem_description: document.getElementById("problemDescription").value.trim()
    };

    try {
        const response = await fetch("/api/submit-enquiry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(enquiry)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Submission failed");
        }

        alert("Your enquiry was submitted successfully!");
        enquiryForm.reset();

    } catch (error) {
        console.error(error);
        alert("Sorry! We couldn't submit your enquiry. Please try again.");
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Submit Enquiry";
    }
});