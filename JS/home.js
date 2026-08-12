const API_URL =
    "https://cep-digital-notice-board-backend.onrender.com";

const create =
    document.getElementById("create");

const join =
    document.getElementById("join");

const teacherAccess =
    document.getElementById("teacherAccess");


const createBtn =
    document.getElementById("createBtn");

const joinBtn =
    document.getElementById("joinBtn");

const teacherBtn =
    document.getElementById("teacherBtn");


const createForm =
    document.getElementById("createForm");

const joinForm =
    document.getElementById("joinForm");

const teacherForm =
    document.getElementById("teacherForm");


// ========================
// CREATE GROUP
// ========================

create.addEventListener("click", async (event) => {

    event.preventDefault();


    const groupName =
        document.getElementById("groupName")
            .value
            .trim();


    const groupCode =
        document.getElementById("groupCode")
            .value
            .trim();

    const teacherPassword =
        document.getElementById("teacherPassword")
        .value
        .trim();


    if (
    groupName === "" ||
    groupCode === "" ||
    teacherPassword === ""
) {

        alert("⚠ Please fill all the fields.");

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/groups`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        name: groupName,
                        code: groupCode,
                        teacherPassword: teacherPassword

                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert("⚠ " + data.message);

            return;

        }


        // Open Teacher Dashboard

        window.location.href =
            `../HTML/teacher.html?groupCode=${encodeURIComponent(groupCode)}`;


    } catch (error) {

        console.error(
            "Error creating group:",
            error
        );

        alert(
            "⚠ Unable to connect to the server."
        );

    }

});


// ========================
// SHOW CREATE FORM
// ========================

createBtn.addEventListener("click", () => {

    document.getElementById(
        "welcomeTitle"
    ).style.display = "none";


    document.getElementById(
        "line"
    ).style.display = "none";


    createForm.style.display =
        "block";

    joinForm.style.display =
        "none";

    teacherForm.style.display =
        "none";


    createBtn.style.display =
        "none";

    joinBtn.style.display =
        "none";

    teacherBtn.style.display =
        "none";

});


// ========================
// JOIN GROUP
// ========================

join.addEventListener("click", async (event) => {

    event.preventDefault();


    const joinCode =
        document.getElementById("joinCode")
            .value
            .trim();


    if (joinCode === "") {

        alert(
            "⚠ Please enter the group code."
        );

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/groups/join`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        code: joinCode

                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert("⚠ " + data.message);

            return;

        }


        // Open Student Notices

        window.location.href =
            `../HTML/student.html?groupCode=${encodeURIComponent(data.group.code)}`;


    } catch (error) {

        console.error(
            "Error joining group:",
            error
        );

        alert(
            "⚠ Unable to connect to the server."
        );

    }

});


// ========================
// SHOW JOIN FORM
// ========================

joinBtn.addEventListener("click", () => {

    document.getElementById(
        "welcomeTitle"
    ).style.display = "none";


    document.getElementById(
        "line"
    ).style.display = "none";


    joinForm.style.display =
        "block";

    createForm.style.display =
        "none";

    teacherForm.style.display =
        "none";


    joinBtn.style.display =
        "none";

    createBtn.style.display =
        "none";

    teacherBtn.style.display =
        "none";

});


// ========================
// SHOW TEACHER FORM
// ========================

teacherBtn.addEventListener("click", () => {

    document.getElementById(
        "welcomeTitle"
    ).style.display = "none";


    document.getElementById(
        "line"
    ).style.display = "none";


    teacherForm.style.display =
        "block";

    createForm.style.display =
        "none";

    joinForm.style.display =
        "none";


    teacherBtn.style.display =
        "none";

    createBtn.style.display =
        "none";

    joinBtn.style.display =
        "none";

});


// ========================
// TEACHER ACCESS
// ========================

teacherAccess.addEventListener(
    "click",
    async (event) => {

        event.preventDefault();


        const teacherCode =
            document.getElementById("teacherCode")
                .value
                .trim();


        const teacherPassword =
            document.getElementById("teacherPasswordAccess")
                .value
                .trim();


        if (
            teacherCode === "" ||
            teacherPassword === ""
        ) {

            alert(
                "⚠ Please enter the group code and teacher password."
            );

            return;

        }


        try {

            const response =
                await fetch(
                    `${API_URL}/api/groups/teacher-access`,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            code: teacherCode,
                            teacherPassword:
                                teacherPassword

                        })

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                alert(
                    "⚠ " + data.message
                );

                return;

            }


            // Teacher authenticated successfully

            window.location.href =
                `../HTML/teacher.html?groupCode=${encodeURIComponent(data.group.code)}`;


        } catch (error) {

            console.error(
                "Error accessing teacher group:",
                error
            );

            alert(
                "⚠ Unable to connect to the server."
            );

        }

    }
);