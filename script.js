// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
  let userData = inputBox.value; //getting the user entered value
  if (userData.trim() != 0) {
    //if user value arent only spaces
    addBtn.classList.add("active"); //activate the button
  } else {
    addBtn.classList.remove("active"); //remove active
  }
};

showTasks(); //calling the function

//if user click on the add button
addBtn.onclick = () => {
  let userData = inputBox.value;
  let getLocalstorage = localStorage.getItem("New Todo"); //getting local storage
  if (getLocalstorage == null) {
    listArr = []; // Creating a blank array
  } else {
    listArr = JSON.parse(getLocalstorage); //transforming json string into js object
  }
  listArr.push(userData); //pushing or adding user data
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //tranforming js object into js string
  showTasks(); //calling the function
  addBtn.classList.remove("active");
};

// funtion to add task inside ul tag
function showTasks() {
  let getLocalstorage = localStorage.getItem("New Todo"); //getting local storage
  if (getLocalstorage == null) {
    listArr = []; // Creating a blank array
  } else {
    listArr = JSON.parse(getLocalstorage); //transforming json string into js object
  }
  const pendingNum = document.querySelector(".pendingNum");
  pendingNum.textContent = listArr.length; //passing pending number
  if (listArr.length > 0) {
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }
  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag += `<li>
      ${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span>
    </li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //clear input field after adding value
}

// delete task funtion
function deleteTask(index) {
  let getLocalstorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalstorage);
  listArr.splice(index, 1); //delete or remove the particular indexed list
  //   update the localstorage after removing the li
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //tranforming js object into js string
  showTasks(); //calling the function
}

// delete all tasks funtion
deleteAllBtn.onclick = () => {
  listArr = []; //empty array
  // update the localstorage after deleting the li
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //tranforming js object into js string
  showTasks(); //calling the function
};
