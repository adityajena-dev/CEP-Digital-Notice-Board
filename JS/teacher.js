const API_URL =
    "https://cep-digital-notice-board-backend.onrender.com";
const postBtn = document.getElementById("postBtn");
const manageBtn = document.getElementById("manageBtn");
const teacherNoticeContainer = document.getElementById("teacherNoticeContainer");

// Get group code from URL
const params = new URLSearchParams(window.location.search);
const groupCode = params.get("groupCode");


// ========================
// MANAGE NOTICES NAVIGATION
// ========================

const manageLink = document.getElementById("manageLink");

if (manageLink && groupCode) {

    manageLink.href =
        `manage.html?groupCode=${encodeURIComponent(groupCode)}`;

}


// ========================
// POST NOTICE
// ========================

postBtn.addEventListener("click", async (event) => {

    event.preventDefault();

    const title =
        document.getElementById("title").value.trim();

    const description =
        document.getElementById("description").value.trim();

    const category =
        document.getElementById("category").value;

    const deadline =
        document.getElementById("deadline").value;


    // Check fields

    if (
        title === "" ||
        description === "" ||
        deadline === ""
    ) {

        alert("Please fill all the fields.");
        return;

    }


    // Check deadline

    const today =
        new Date().toISOString().split("T")[0];

    if (deadline < today) {

        alert("Deadline cannot be in the past.");
        return;

    }


    // Check group

    if (!groupCode) {

        alert("No group selected.");
        return;

    }


    // Notice object

    const notice = {

        title,
        description,
        category,
        deadline,
        groupCode

    };


    try {

        const response =
            await fetch(`${API_URL}/api/notices`,  {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(notice)

            });


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message || "Failed to post notice"
            );

        }


        // Clear form

        document.getElementById("title").value = "";

        document.getElementById("description").value = "";

        document.getElementById("category").selectedIndex = 0;

        document.getElementById("deadline").value = "";


        alert("Notice Posted Successfully!");


    } catch (error) {

        console.error(error);

        alert("Failed to post notice.");

    }

});