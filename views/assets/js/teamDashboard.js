// const addNewsButton = document.getElementById("addNewsButton");

// addNewsButton.addEventListener("click", (e) => {
//     document.getElementById("createNews").classList.remove("hidden");

//     let addButton = e.target;
//     addButton.classList.add("hidden");

//     document.getElementById("createNewsSubmit").addEventListener("click", () => {
//         addButton.classList.remove("hidden");
//     })
// })

document.querySelector(".membersButton").addEventListener("click", (e) => {
    document.querySelector(".members").classList.remove("hidden");

    document.querySelector(".membersArrow").style.transform = "rotate('90deg');"
});