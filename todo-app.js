let todos = getTodos();

//Filter
const filters = {
    searchText: '',
    hideCompleted: false,
    sortBy: 'byEdited'
}

//Ham rendersTodo
renderTodos(todos, filters);

//Filter Data
document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
})

//Add todos
document.querySelector('#create-todo').addEventListener('submit', function (e) {
    e.preventDefault();
    if (e.target.elements.text.value.length === 0) {
        return document.querySelector('#error').textContent = 'Error: Vui lòng nhập nội dung vào ô input';
    }
    document.querySelector('#error').textContent = '';
    const id = uuidv4();
    todos.push({
        id: id,
        text: e.target.elements.text.value,
        completed: false,
        createdAt: moment().valueOf(),
        updatedAt: moment().valueOf()
    })
    saveTodos(todos);
    e.target.elements.text.value = '';
    renderTodos(todos, filters);
    location.assign(`./edit.html#${id}`);
})

//An cac task hoan thanh 
document.querySelector('#hide-completed').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
})

//Sap xep cac task
document.querySelector('#filter-by').addEventListener('change', function (e) {
    filters.sortBy = e.target.value;
    renderTodos(todos, filters);
})

window.addEventListener('storage', function (e) {
    if (e.key === 'todos') {
        todos = JSON.parse(e.newValue);
        renderTodos(todos, filters);
    }
})
