// Women's Wing Candidates

const candidates = [
    "Angela Laldingngheti",
    "Blessy Hoihching",
    "Blessy Kimthianching",
    "Chingbiaklian",
    "Chinghauniang Khaute",
    "Chinghuaikim",
    "Chinjanei",
    "Chinglunkim",
    "Chiinzoukim Tungnung",
    "Chingngaihlun",
    "Chingthiankim",
    "Grace Thiengneipar",
    "Hoihremmawi",
    "L Nunni",
    "Mary Dim Ngaih Lun",
    "Mercy Chingngaihlun",
    "Lhingngaihching",
    "Nianghuaikim",
    "Ngaikhanting",
    "Ngaineikim Khongsai",
    "Niang Hau Ciin",
    "Niangluansiam",
    "Niangthiankim",
    "Ninglunching Chowdhury",
    "Paungaihching",
    "Ruth Lhingngaineng",
    "Ruth Nunnem Vaiphei",
    "V L Thlamuani",
    "Vungngaihkim"
];


// All six ballot positions

const positions = [
    "chairperson",
    "vice-chairperson",
    "secretary",
    "assistant-secretary",
    "finance-secretary",
    "assistant-finance"
];


// Populate all dropdowns

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


// Listen for dropdown changes

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

        const label = document.querySelector(
            `label[for="${position}"]`
        );

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


// Allow voters to edit selections

document.getElementById("edit-ballot").addEventListener("click", function () {

    document.getElementById("ballot-review").style.display = "none";

});
