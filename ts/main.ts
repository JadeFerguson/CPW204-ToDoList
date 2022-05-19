class ToDoItem {
    title:string;
    dueDate:Date;
    isCompleted:boolean;

    /*
    constructor(desiredTitle:string) {
        this.title = desiredTitle;
    } */
}

window.onload = function() {
    let addItem = document.getElementById("add");
    addItem.onclick = main;

}

function main() {
    if(isValid()) {
        let item = getToDoItem();
        displayToDoItem(item);
    }
}

/**
 * Check form data is valid
 */
function isValid():boolean {
    // FIXXX
    return true;
}

/**
 * Get all input off form and wrap in
 * a ToDoItem object
 */
function getToDoItem():ToDoItem {
    let myItem = new ToDoItem();

    // Get title
    let titleInput = getInput("title");
    myItem.title = titleInput.value;

    // Get due date
    let dueDateInput = getInput("due-date");
    myItem.dueDate = new Date(dueDateInput.value);

    // Get isCompleted
    let isCompleted = getInput("is-complete");
    myItem.isCompleted = isCompleted.checked;

    return myItem;
}

function getInput(id):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}

/**
 * Display given ToDoItem on the web page
 */
function displayToDoItem(item:ToDoItem):void {
    // Puts title into h3
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;

    // Put in paragraph into h3
    let itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate.toString();

    let itemDiv = document.createElement("div");
    if(item.isCompleted) {
        itemDiv.classList.add("completed");
    }

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
}

// Task: Allow user to mark a ToDoItem as completed
// Task: Store ToDoItems in web storage