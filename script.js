const createBtn = document.getElementById("createBtn");
const joinBtn = document.getElementById("joinBtn");
const createForm = document.getElementById("createForm");
const joinForm = document.getElementById("joinForm");

createBtn.addEventListener("click", () => {
    createForm.style.display = "block";
    joinForm.style.display = "none";
    createBtn.style.display = "none";
    joinBtn.style.display = "none";
});

joinBtn.addEventListener("click", () => {
    joinForm.style.display = "block";
    createForm.style.display = "none";
    joinBtn.style.display = "none";
    createBtn.style.display = "none";
});