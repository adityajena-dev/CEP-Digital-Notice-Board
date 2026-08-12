const API_URL =
    "https://cep-digital-notice-board-backend.onrender.com";

const noticeContainer =
    document.getElementById("noticeContainer");

const params =
    new URLSearchParams(window.location.search);

const groupCode =
    params.get("groupCode");


if (!groupCode) {

    noticeContainer.innerHTML =
        "<h3>No group selected.</h3>";

} else {

    loadNotices();

}


async function loadNotices() {

    try {

        const response = await fetch(
            `${API_URL}/api/notices?groupCode=${encodeURIComponent(groupCode)}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch notices.");
        }

        let notices = await response.json();


        // Remove expired notices

        const today = new Date();

        today.setHours(0, 0, 0, 0);


        notices = notices.filter((notice) => {

            const deadline =
                new Date(notice.deadline);

            deadline.setHours(0, 0, 0, 0);

            return deadline >= today;

        });


        if (notices.length === 0) {

            noticeContainer.innerHTML =
                "<h3>No Notices Available</h3>";

            return;

        }


        noticeContainer.innerHTML = "";


        notices.forEach((notice) => {

            const formattedDate =
                new Date(notice.deadline)
                    .toLocaleDateString("en-GB", {

                        day: "numeric",
                        month: "short",
                        year: "numeric"

                    });


            noticeContainer.innerHTML += `

                <div class="notice-card">

                    <h2>📢 ${notice.title}</h2>

                    <p class="category">
                        ${notice.category}
                    </p>

                    <p class="date">
                        📅 ${formattedDate}
                    </p>

                    <p class="description">
                        ${notice.description}
                    </p>

                </div>

            `;

        });


    } catch (error) {

        console.error(error);

        noticeContainer.innerHTML =
            "<h3>Unable to load notices.</h3>";

    }

}