const textElement = document.querySelector('#text');

const completedElement = document.querySelector('#completed');
const incompletedElement = document.querySelector('#incompleted');
const lastUpdated = document.querySelector('#last-updated');
const removeTodoElement = document.querySelector('#remove-todo');

const todoId = location.hash.substring(1);

let todos = getTodos();

let todo = todos.find(todo => {
    return todo.id == todoId
})

console.log(todo);

if (todo === undefined) {
    location.assign('./index.html');
}

textElement.value = todo.text;

todo.completed ? completedElement.checked = true : incompletedElement.checked = true;

lastUpdated.textContent = generateLastUpdate(todo.updatedAt);

textElement.addEventListener('input', function (e) {
    todo.text = e.target.value;
    todo.updatedAt = moment().valueOf();
    lastUpdated.textContent = generateLastUpdate(todo.updatedAt);
    saveTodos(todos);
})

completedElement.addEventListener('change', function (e) {
    todo.completed = e.target.checked;
    todo.updatedAt = moment().valueOf();
    lastUpdated.textContent = generateLastUpdate(todo.updatedAt);
    saveTodos(todos);
})

incompletedElement.addEventListener('change', function (e) {
    todo.completed = false;
    saveTodos(todos);
})

removeTodoElement.addEventListener('click', function (e) {
    removeTodo(todoId);
    saveTodos(todos);
    location.assign('./index.html');
})

//Tao thay doi khi window voi storage
window.addEventListener('storage', function (e) {
    if (e.key === 'todos') {
        todos = JSON.parse(e.newValue);
        todo = todos.find(todo => {
            return todo.id == todoId
        })
        if (todo === undefined) {
            location.assign('./index.html');
        }

        textElement.value = todo.text;

        todo.completed ? completedElement.checked = true : incompletedElement.checked = true;

        lastUpdated.textContent = generateLastUpdate(todo.updatedAt);
    }
})



