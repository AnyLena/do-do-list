const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const deleteBtn = document.querySelectorAll(".deleteButton");

function addTask() {
   if (inputBox.value === ''){
    alert("You must write something!")
   }
   else {
    let li= document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let btn = document.createElement("button");
    btn.innerHTML = "X";
    btn.classList.add("deleteButton")
    li.appendChild(btn);
    btn.addEventListener("click", deleteTask);
  }
  inputBox.value = "";
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  }
    else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
    }
  }, false);


const deleteTask = (e) => {
  e.target.parentElement.remove();
}
