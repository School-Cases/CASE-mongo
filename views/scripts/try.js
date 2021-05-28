console.log('hello');

// document.querySelectorAll(".removeButton").addEventListener("click", () => {
//     console.log('kååå');
// })
let id;
document.querySelectorAll(".removeButton").forEach(remove => {
        remove.addEventListener("click", (e) => {
            console.log(e.target.closest(".nyhet").id);
            id = e.target.closest(".nyhet").id;
            
        })
    });