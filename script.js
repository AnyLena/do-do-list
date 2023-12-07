const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const deleteBtn = document.querySelectorAll(".deleteButton");
const editButton = document.querySelectorAll(".editButton");

form.addEventListener("submit", function (e) {
  e.preventDefault();

function addTask() {
   if (inputBox.value === ''){
    alert("You must write something!")
   }
   else {
    let li= document.createElement("li");
    li.innerHTML = `<p>${inputBox.value}</p>`;
    listContainer.appendChild(li);

    let pen = document.createElement("button");
    pen.innerHTML ="edit";
    pen.classList.add("editButton");
    pen.addEventListener("click", editTask);
    li.appendChild(pen);

    let btn = document.createElement("button");
    btn.innerHTML = "X";
    btn.classList.add("deleteButton")
    li.appendChild(btn);
    btn.addEventListener("click", deleteTask);
    addDeleteEventListeners();
    addEditEventListeners();
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

function addEditEventListeners() {
  let editButtons = document.querySelectorAll('.editButton');
  editButtons.forEach(button => {
    button.addEventListener('click', editTask);
  });
}
  
window.onload = function() {
  let savedData = localStorage.getItem("data");
  if (savedData) {
    listContainer.innerHTML = savedData;
  }
  // addDeleteButtonsToListItems();
  addDeleteEventListeners();
  addEditEventListeners();
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

  const editTask = (e) => {
    let item = e.target.parentNode.querySelector('p').innerHTML;

    let editInput = document.createElement("input");
    editInput.type ="text";
    editInput.value = item;
    editInput.classList.add("edit");
  
    editInput.addEventListener("keypress", saveItem);
    // editInput.addEventListener("click", saveItem);
  
    let pTags = e.target.parentNode.querySelectorAll('p');
    pTags.forEach(p => e.target.parentNode.removeChild(p));
  
    
    e.target.parentNode.prepend(editInput);
  
    editInput.select();
  }
  
  const saveItem = (e) => { 
    let inputValue = e.target.value;
    if (e.target.value.length > 0 && (e.keyCode === 13)) {

      let p = document.createElement ('p');
      p.innerHTML = inputValue;
      e.target.parentNode.prepend(p);
      e.target.parentNode.removeChild(e.target);
      saveData();
      alert("Saved!")
    }
  }