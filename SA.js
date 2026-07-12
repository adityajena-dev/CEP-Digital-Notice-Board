let notices = JSON.parse(localStorage.getItem("notices")) || [];

const noticeContainer = document.getElementById("noticeContainer");

if (notices.length === 0) {
    noticeContainer.innerHTML = `
    <h3> No Notices Available </h3>
    `;
}
else{
    notices.forEach((notice) => {

    const formattedDate = new Date(notice.deadline).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }
);
    noticeContainer.innerHTML += `
        <div class="notice-card">
            <h2>${notice.title}</h2>
            <p>${notice.category}</p>
            <p>${formattedDate}</p>
            <p>${notice.description}</p>
        </div>
    `;
});
}