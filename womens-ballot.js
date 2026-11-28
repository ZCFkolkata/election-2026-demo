// Women's Wing Ballot — Demonstration Mode

// All six ballot positions
const positions = [
    "chairperson",
    "vice-chairperson",
    "secretary",
    "assistant-secretary",
    "finance-secretary",
    "assistant-finance"
];


// Load candidates from Supabase
async function loadCandidates() {

    const reviewButton = document.getElementById("review-ballot");

    reviewButton.disabled = true;

    try {

        const { data, error } = await supabaseClient
            .from("demo_candidates")
            .select("candidate_name")
            .eq("election_category", "womens")
            .eq("is_active", true)
            .order("candidate_name", { ascending: true });

        if (error) throw error;

        if (!data || data.length === 0) {
            throw new Error("No candidates are currently available.");
        }

        positions.forEach(position => {

            const dropdown = document.getElementById(position);

            data.forEach(candidate => {

                const option = document.createElement("option");

                option.value = candidate.candidate_name;
                option.textContent = candidate.candidate_name;

                dropdown.appendChild(option);

            });

        });

        reviewButton.disabled = false;

        positions.forEach(position => {

            document.getElementById(position).addEventListener(
                "change",
                updateDropdowns
            );

        });

    } catch (error) {

        console.error("Candidate loading error:", error);

        alert(
            "Unable to load candidates from the database. Please refresh the page."
        );

    }

}


// Prevent duplicate candidate selections
function updateDropdowns() {

    const selectedCandidates = positions.map(position =>
        document.getElementById(position).value
    );

    positions.forEach(position => {

        const dropdown = document.getElementById(position);

        Array.from(dropdown.options).forEach(option => {

            if (option.value === "") return;

            option.disabled =
                selectedCandidates.includes(option.value) &&
                dropdown.value !== option.value;

        });

    });

}


// Review Ballot
document.getElementById("review-ballot").addEventListener("click", function () {

    const reviewSection = document.getElementById("ballot-review");
    const reviewDetails = document.getElementById("review-details");

    // Check whether all six positions are filled
    for (const position of positions) {

        const dropdown = document.getElementById(position);

        if (dropdown.value === "") {

            alert("Please select a candidate for all six positions.");

            dropdown.focus();

            return;

        }

    }

    // Display selected candidates
    reviewDetails.innerHTML = "";

    positions.forEach(position => {

        const dropdown = document.getElementById(position);

        const label = document.querySelector(`label[for="${position}"]`);

        const item = document.createElement("p");

        item.textContent = label.textContent + ": " + dropdown.value;

        reviewDetails.appendChild(item);

    });

    reviewSection.style.display = "block";

    reviewSection.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// Allow editing selections
document.getElementById("edit-ballot").addEventListener("click", function () {

    document.getElementById("ballot-review").style.display = "none";

});

// Submit Women's Wing Ballot
document.getElementById("submit-ballot").addEventListener("click", async function () {

    const submitButton = this;

    // Collect selected candidates
    const selections = {};

    for (const position of positions) {

        const dropdown = document.getElementById(position);

        if (dropdown.value === "") {
            alert("Please complete all six positions.");
            return;
        }

        selections[position] = dropdown.value;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    try {

        const { error } = await supabaseClient
            .from("demo_submissions")
            .insert({
                election_category: "womens",
                selections: selections
            });

        if (error) {
            throw error;
        }

        alert("Your selections have been submitted successfully!");

        positions.forEach(position => {
            document.getElementById(position).disabled = true;
        });

        document.getElementById("edit-ballot").disabled = true;
        submitButton.textContent = "Submitted";

    } catch (error) {

        console.error("Submission error:", error);

        alert("Unable to submit your selections. Please try again.");

        submitButton.disabled = false;
        submitButton.textContent = "Submit Ballot";

    }

});


// Start loading candidates
loadCandidates();
