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
    addDeleteEventListeners();
    saveData();
  }
  inputBox.value = "";
}

function addDeleteEventListeners() {
  let deleteButtons = document.querySelectorAll('.deleteButton');
  deleteButtons.forEach(button => {
    button.addEventListener('click', deleteTask);
  });
}


window.onload = function() {
  let savedData = localStorage.getItem("data");
  if (savedData) {
    listContainer.innerHTML = savedData;
  }
  addDeleteButtonsToListItems();
  addDeleteEventListeners();
}

function addDeleteButtonsToListItems() {
  let listItems = document.querySelectorAll('#list-container li');
  listItems.forEach(item => {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton';
    item.appendChild(deleteButton);
  });
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
    else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  }, false);

  function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
  }

  function showTasks() {
    listContainer.innerHTML = localStorage.getItem("data");
  }
  showTasks()

  const removeitem = function () {
    localStorage.removeItem("data");
    listContainer.innerHTML = "";
  }

  const deleteTask = (e) => {
    e.target.parentElement.remove();
    saveData();
  }
  showTasks()
  
  const clearAll = function () {
    localStorage.clear();
    listContainer.innerHTML = "";
  }
