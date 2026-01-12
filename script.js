// selecting DOM elements
const input = document.getElementById('todo-input');
const AddBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

// Function to store the Todos on the localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// create a dom node for a todo object then append it on the array
function createTodoNode(todo, index) {
    const li = document.createElement('li');
    // chechbox to toggle completion
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = !!todo.completed;

    //This is Arrow function
    checkBox.addEventListener("change", () => {
        todo.completed = checkBox.checked;
        textSpan.style.textDecoration = todo.completed ? 'line-through' : "";
        // TODO:Visual feedback: strike-through when completed
        saveTodos();
    });

    //Text of Todo
    const textSpan = document.createElement("span");
    textSpan.style.margin = '0 8px';
    textSpan.textContent = todo.text;
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }
    //Add double-click event listner to edit the text
    textSpan.addEventListener("dblclick", () => {
        const newtext = prompt("Edit todo", todo.text);
        if (newtext != null) {
            todo.text = newtext.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    })

    //delete todo button
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    })

    li.appendChild(checkBox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li


}

// Render the whole todo list on the screen from the todo array
function render() {
    list.innerHTML = '';

    //Recreating each items
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });

}

function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return
    }

    //Push a new todo object
    todos.push({ text, completed: false });
    render();
    saveTodos();
}

AddBtn.addEventListener("click", addTodo);
input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        addTodo();
    }
})
render();