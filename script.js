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
}


const deleteTask = (e) => {
e.target.parentElement.remove();
}

deleteBtn.forEach( (e) => e.addEventListener("click", deleteTask));
