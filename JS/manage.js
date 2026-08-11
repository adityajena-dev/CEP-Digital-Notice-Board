const teacherNoticeContainer =
    document.getElementById("teacherNoticeContainer");


const params =
    new URLSearchParams(window.location.search);

const groupCode =
    params.get("groupCode");


const backLink =
    document.getElementById("backLink");


const editModal =
    document.getElementById("editModal");


const editTitle =
    document.getElementById("editTitle");


const editDescription =
    document.getElementById("editDescription");


const editCategory =
    document.getElementById("editCategory");


const editDeadline =
    document.getElementById("editDeadline");


const cancelEdit =
    document.getElementById("cancelEdit");


const saveEdit =
    document.getElementById("saveEdit");


let currentEditId = null;


// ========================
// BACK LINK
// ========================

if (groupCode) {

    backLink.href =
        `teacher.html?groupCode=${encodeURIComponent(groupCode)}`;

}


// ========================
// LOAD NOTICES
// ========================

displayNotices();


async function displayNotices() {

    teacherNoticeContainer.innerHTML = "";


    if (!groupCode) {

        teacherNoticeContainer.innerHTML =
            "<h3>No group selected.</h3>";

        return;

    }


    try {

        const response = await fetch(
            `http://localhost:3000/api/notices?groupCode=${encodeURIComponent(groupCode)}`
        );


        if (!response.ok) {

            throw new Error(
                "Failed to fetch notices."
            );

        }


        const notices =
            await response.json();


        if (notices.length === 0) {

            teacherNoticeContainer.innerHTML =
                "<h3>No Notices</h3>";

            return;

        }


        notices.forEach((notice) => {

            const formattedDate =
                new Date(notice.deadline)
                    .toLocaleDateString("en-GB", {

                        day: "numeric",
                        month: "short",
                        year: "numeric"

                    });


            teacherNoticeContainer.innerHTML += `

                <div class="notice-card">

                    <h2>
                        📢 ${notice.title}
                    </h2>

                    <p class="category">
                        📂 ${notice.category}
                    </p>

                    <p class="date">
                        📅 ${formattedDate}
                    </p>

                    <p class="description">
                        ${notice.description}
                    </p>


                    <button
                        onclick="editNotice('${notice._id}')"
                    >
                        ✏ Edit
                    </button>


                    <button
                        onclick="deleteNotice('${notice._id}')"
                    >
                        🗑 Delete
                    </button>

                </div>

            `;

        });


    } catch (error) {

        console.error(error);

        teacherNoticeContainer.innerHTML =
            "<h3>Unable to load notices.</h3>";

    }

}


// ========================
// DELETE NOTICE
// ========================

async function deleteNotice(id) {

    if (!confirm(
        "Are you sure you want to delete this notice?"
    )) {

        return;

    }


    try {

        const response =
            await fetch(
                `http://localhost:3000/api/notices/${id}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(data.message);

            return;

        }


        alert(
            "Notice deleted successfully!"
        );


        displayNotices();


    } catch (error) {

        console.error(error);

        alert(
            "Failed to delete notice."
        );

    }

}


// ========================
// OPEN EDIT MODAL
// ========================

function editNotice(id) {

    window.location.href =
        `edit.html?id=${encodeURIComponent(id)}&groupCode=${encodeURIComponent(groupCode)}`;

}


// ========================
// CANCEL EDIT
// ========================

cancelEdit.addEventListener(
    "click",
    () => {

        editModal.style.display =
            "none";

        currentEditId = null;

    }
);


// ========================
// SAVE EDIT
// ========================

saveEdit.addEventListener(
    "click",
    async () => {

        const title =
            editTitle.value.trim();


        const description =
            editDescription.value.trim();


        const category =
            editCategory.value;


        const deadline =
            editDeadline.value;


        if (
            title === "" ||
            description === "" ||
            deadline === ""
        ) {

            alert(
                "Please fill all the fields."
            );

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


        try {

            const response =
                await fetch(
                    `http://localhost:3000/api/notices/${currentEditId}`,
                    {

                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            title,
                            description,
                            category,
                            deadline

                        })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                alert(data.message);

                return;

            }


            alert(
                "Notice updated successfully!"
            );


            editModal.style.display =
                "none";


            currentEditId = null;


            displayNotices();


        } catch (error) {

            console.error(error);

            alert(
                "Failed to update notice."
            );

        }

    }
);