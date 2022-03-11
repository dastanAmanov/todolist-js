let elTemplate = document.querySelector('#template').content;
let list = document.querySelector('#list')
let elForm = document.querySelector('#form');
let elInput = elForm.querySelector('#input');
let themeBtn = document.querySelector('#theme-btn')

//Counter
let allCount = document.querySelector('#all-count')
let completedCount = document.querySelector('#completed-count')
let unCompletedCount = document.querySelector('#uncompleted-count')

let localArr = JSON.parse(window.localStorage.getItem('todos'));
let todos = localArr || [];

elForm.addEventListener('submit', evt =>{
    evt.preventDefault()
    let obj = {
        id: new Date().getTime(),
        txt: elInput.value.trim(),
        isCompleted: false

    }
    elInput.value = null
    todos.unshift(obj)
    renderTodo(todos, list)
    window.localStorage.setItem('todos', JSON.stringify(todos))
})

const renderTodo = (arr, element) => {
    element.innerHTML = null
    let findcompleted = arr.filter(f => f.isCompleted == true)

    arr.forEach(item => {
        let cloneTemp = elTemplate.cloneNode(true)
        let elCheckbox = cloneTemp.querySelector('#input-checkbox')
        let delBtn = cloneTemp.querySelector('#delete-btn')
        let content = cloneTemp.querySelector('#text-item')

        content.textContent = item.txt
        delBtn.dataset.id = item.id
        elCheckbox.dataset.id = item.id
        elCheckbox.checked = item.isCompleted
       
        if(item.isCompleted){
            content.style.color = '#dc143c'
            content.style.textDecoration = 'line-through'
        }
        function deleteBtn(e){
            element.innerHTML = null
            let btnId = e.target.dataset.id
            let findElem = todos.findIndex(elem => elem.id == btnId) 
            todos.splice(findElem, 1)
            
            window.localStorage.setItem('todos', JSON.stringify(todos))
            renderTodo(todos, list)
        }
        function Checkbox(e){
            let checkboxId = e.target.dataset.id
            let findelem = todos.find(f => f.id == checkboxId)
            findelem.isCompleted = !findelem.isCompleted

            window.localStorage.setItem('todos', JSON.stringify(todos))
            renderTodo(todos, list)
        }

        elCheckbox.addEventListener('click', Checkbox)
        delBtn.addEventListener('click', deleteBtn)       
        
        element.appendChild(cloneTemp)
    })
    allCount.textContent = todos.length
    completedCount.textContent = findcompleted.length
    unCompletedCount.textContent = todos.length - findcompleted.length
}
renderTodo(todos, list)
