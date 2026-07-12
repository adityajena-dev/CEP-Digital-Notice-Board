postBtn.addEventListener("click", () => {

    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const deadline = document.getElementById("deadline").value;

    const notice = {
        title,
        description,
        category,
        deadline,
    };

    let notices = JSON.parse(localStorage.getItem("notices")) || [];

    notices.unshift(notice);

    localStorage.setItem("notices", JSON.stringify(notices));
    console.log(notices);

    document.getElementById("title").value= "";
    document.getElementById("description").value= "";
    document.getElementById("category").selectedIndex= 0;
    document.getElementById("deadline").value = "";
});