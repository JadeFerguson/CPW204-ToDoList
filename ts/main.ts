// @ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date()); // Set to today's date

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

    // Load saved items
    loadSavedItems();
}

function main() {
    if(isValid()) {
        let item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}

function loadSavedItems() {
    let itemArray = getToDoItems(); // Reads from web storage
    
    for(let i = 0; i < itemArray.length; i++) {
        let currItem = itemArray[i];
        displayToDoItem(currItem);
    }
    
}

/**
 * Check form data is valid
 */
function isValid():boolean {
    let isValid:boolean = true;

    clearErrorSpans();

    let title:HTMLInputElement = <HTMLInputElement>document.getElementById("title");
    let todoTitle:string = title.value;

    let date:HTMLInputElement = <HTMLInputElement>document.getElementById("due-date");
    let todoDate:string = date.value;

    if (todoTitle == "") { //parseFloat will turn milesDriven into a number
        isValid = false;
        title.nextElementSibling.innerHTML = 
            "Title is required";
    }

    if (todoDate == "") { //parseFloat will turn milesDriven into a number
        isValid = false;

        date.nextElementSibling.innerHTML = 
            "Date is required";
    }
    return isValid;
    
}

function clearErrorSpans() {
    let errorSpans = document.querySelectorAll("span");
    for (let i = 0; i < errorSpans.length; i++) {
        let spanBox = <HTMLInputElement>errorSpans[i];
        spanBox.innerHTML = "*";
    }
    
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
    //itemDate.innerText = item.dueDate.toDateString();
    let dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();

    // ex. <div> class="todo completed"></div> or <div class="todo"></div>
    let itemDiv = document.createElement("div");

    itemDiv.onclick = markAsComplete;

    itemDiv.classList.add("todo");
    if(item.isCompleted) {
        itemDiv.classList.add("completed");
    }

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if(item.isCompleted) {
        let completedToDos = document.getElementById("complete-items");
        completedToDos.appendChild(itemDiv);
    }

    else {
        let incompleteToDos = document.getElementById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}

function markAsComplete() {
    let itemDiv = <HTMLElement>this; // once have htmlElement can add class of div
    itemDiv.classList.add("completed");

    let completedItems = document.getElementById("complete-items");
    completedItems.appendChild(itemDiv);
}

function saveToDo(item:ToDoItem):void {
    let currItems = getToDoItems();

    if(currItems == null) { // No items found
        currItems = new Array();
    }

    currItems.push(item); // Add the new item to the curr item list

    let currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}

const todokey = "todo";

/**
 * Get stored ToDo items or return null if none are found
 */
function getToDoItems():ToDoItem[] {
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem[] = JSON.parse(itemString);
    return item;
}

