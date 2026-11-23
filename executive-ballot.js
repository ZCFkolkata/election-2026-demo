// Executive Committee Candidates

const candidates = [
    "B Khupsuanthang",
    "David Lalrawngbawl",
    "Donglianlal Tungnung",
    "Dongminlian Hangluah",
    "Ginlunmang Thangngeu",
    "Ginthianlal Khaute",
    "Hangluah Ginsuanpau",
    "H Khaigindam",
    "Himanshu Khatait",
    "Kamkhenpau Ngaihte",
    "KK Vaiphei",
    "Lalmelhiat Vaiphei",
    "Lalngailian Khaute",
    "Dr. L.Lamminthang",
    "LM Gangte",
    "Manglianthang Milun",
    "N Pau Sang Mung",
    "Paumasa",
    "S Khupsuanthang",
    "Sandip Chowdhury",
    "Thangbawi Naulak",
    "Thangzamang",
    "T Khailalsang Gangte",
    "T Mathew Zou",
    "Zamkhanlal Simte"
];


// All eight ballot positions

const positions = [
    "chairman",
    "vice-chairman",
    "secretary",
    "assistant-secretary",
    "finance-secretary",
    "assistant-finance",
    "mission-secretary",
    "assistant-mission"
];


// Populate every dropdown

positions.forEach(position => {

    const dropdown = document.getElementById(position);

    candidates.forEach(candidate => {

        const option = document.createElement("option");

        option.value = candidate;
        option.textContent = candidate;

        dropdown.appendChild(option);

    });

});


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



// Listen for changes in every dropdown

positions.forEach(position => {

    document.getElementById(position).addEventListener(
        "change",
        updateDropdowns
    );

});

// Review Ballot

document.getElementById("review-ballot").addEventListener("click", function () {

    const reviewSection = document.getElementById("ballot-review");
    const reviewDetails = document.getElementById("review-details");

    // Check whether all positions are filled

    for (const position of positions) {

        const dropdown = document.getElementById(position);

        if (dropdown.value === "") {
            alert("Please select a candidate for all eight positions.");
            dropdown.focus();
            return;
        }

    }

    // Prepare the review details

    reviewDetails.innerHTML = "";

    positions.forEach(position => {

        const dropdown = document.getElementById(position);

        const label = document.querySelector(
            `label[for="${position}"]`
        );

        const item = document.createElement("p");

        item.textContent = label.textContent + ": " + dropdown.value;

        reviewDetails.appendChild(item);

    });

    // Display the review section

    reviewSection.style.display = "block";

    reviewSection.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


// Allow voters to edit their selections

document.getElementById("edit-ballot").addEventListener("click", function () {

    document.getElementById("ballot-review").style.display = "none";

});

// Demo Ballot Submission

document.getElementById("submit-ballot").addEventListener("click", function () {

    const confirmSubmission = confirm(
        "Are you sure you want to submit your ballot?"
    );

    if (!confirmSubmission) {
        return;
    }

    alert(
        "Demonstration Submission Successful!\n\n" +
        "Your ballot has been submitted successfully.\n" +
        "No actual votes have been recorded or counted."
    );

    // Disable further changes after demo submission

    positions.forEach(position => {
        document.getElementById(position).disabled = true;
    });

    document.getElementById("submit-ballot").disabled = true;
    document.getElementById("edit-ballot").disabled = true;

});
