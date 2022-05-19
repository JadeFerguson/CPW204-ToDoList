var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = document.getElementById("add");
    addItem.onclick = main;
};
function main() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
    }
}
function isValid() {
    return true;
}
function getToDoItem() {
    var myItem = new ToDoItem();
    var titleInput = getInput("title");
    myItem.title = titleInput.value;
    var dueDateInput = getInput("due-date");
    myItem.dueDate = new Date(dueDateInput.value);
    var isCompleted = getInput("is-complete");
    myItem.isCompleted = isCompleted.checked;
    return myItem;
}
function getInput(id) {
    return document.getElementById(id);
}
function displayToDoItem(item) {
    var itemText = document.createElement("h3");
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate.toString();
    var itemDiv = document.createElement("div");
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
}
