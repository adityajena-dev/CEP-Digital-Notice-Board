const API_URL =
    "https://cep-digital-notice-board-backend.onrender.com";

const editForm =
    document.getElementById("editForm");

const cancelBtn =
    document.getElementById("cancelBtn");


// Get ID and group code from URL

const params =
    new URLSearchParams(window.location.search);

const noticeId =
    params.get("id");

const groupCode =
    params.get("groupCode");


// Check URL

if (!noticeId || !groupCode) {

    alert("Invalid notice information.");

    window.location.href = "index.html";

}


// ========================
// LOAD NOTICE
// ========================

async function loadNotice() {

    try {

        const response =
            await fetch(
                `${API_URL}/api/notices?groupCode=${encodeURIComponent(groupCode)}`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to fetch notices."
            );

        }


        const notices =
            await response.json();


        const notice =
            notices.find(
                item => item._id === noticeId
            );


        if (!notice) {

            alert("Notice not found.");

            window.location.href =
                `manage.html?groupCode=${encodeURIComponent(groupCode)}`;

            return;

        }


        // Fill form

        document.getElementById("title").value =
            notice.title;

        document.getElementById("description").value =
            notice.description;

        document.getElementById("category").value =
            notice.category;

        document.getElementById("deadline").value =
            notice.deadline;


    } catch (error) {

        console.error(error);

        alert("Failed to load notice.");

    }

}


// Load notice

loadNotice();


// ========================
// UPDATE NOTICE
// ========================

editForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const title =
        document.getElementById("title").value.trim();

    const description =
        document.getElementById("description").value.trim();

    const category =
        document.getElementById("category").value;

    const deadline =
        document.getElementById("deadline").value;


    // Validation

    if (
        title === "" ||
        description === "" ||
        deadline === ""
    ) {

        alert("Please fill all the fields.");

        return;

    }


    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    if (deadline < today) {

        alert(
            "Deadline cannot be in the past."
        );

        return;

    }


    const updatedNotice = {

        title,
        description,
        category,
        deadline

    };


    try {

        const response =
            await fetch(
                `${API_URL}/api/notices/${noticeId}`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(updatedNotice)

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to update notice."
            );

        }


        alert(
            "Notice updated successfully!"
        );


        // Return to Manage Notices

        window.location.href =
            `manage.html?groupCode=${encodeURIComponent(groupCode)}`;


    } catch (error) {

        console.error(error);

        alert(
            "Failed to update notice."
        );

    }

});


// ========================
// CANCEL
// ========================

cancelBtn.addEventListener("click", () => {

    window.location.href =
        `manage.html?groupCode=${encodeURIComponent(groupCode)}`;

});