(function(){
    console.clear();
    "use strict";
    function todolistManager() {
        let addTask = document.querySelector(".cmp-todolistManager__taskManager__taskBox__addTask");
        let tasks = document.querySelector(".cmp-todolistManager__taskManager__taskBox__tasks");
        let clearAll = document.querySelector(".cmp-todolistManager__taskManager__messageBox--clear");
        let message = document.querySelector(".cmp-todolistManager__taskManager__messageBox--span");
        let searchForm = document.querySelector(".cmp-todolistManager__taskManager__searchBox__search");

        function updateMessage() {
            const taskLength = tasks.children.length;
            message.textContent = `you have ${taskLength} pending tasks.`
            
        }
        updateMessage();
        addTask.addEventListener("submit", (event) => {
            event.preventDefault();
            const value = addTask.task.value.trim();
            if(value.length){
                tasks.innerHTML += `<li class="cmp-todolistManager__taskManager__taskBox__tasks--list">
                                        <span>${value}</span>
                                        <i class="fa-solid fa-trash-can cmp-todolistManager__taskManager__taskBox__tasks--list--delete"></i>
                                    </li>`;
                addTask.reset();
                updateMessage();
            }
        });

        tasks.addEventListener("click", (event) => {
            if(event.target.classList.contains("cmp-todolistManager__taskManager__taskBox__tasks--list--delete")){
                event.target.parentElement.remove();
                updateMessage();
            }
        });

        clearAll.addEventListener("click", (event) => {
            const taskItems = tasks.querySelectorAll("li");
            taskItems.forEach(item => {
                item.remove();
            });
            updateMessage()
        });

        function filterTask(searchTerm){
             Array.from(tasks.children)
            .filter((item) => {
                return !item.textContent.toLowerCase().includes(searchTerm);
            })
            .forEach((item) => {
                item.classList.add("cmp-todolistManager__taskManager__taskBox__tasks--list--hide");
            })

            Array.from(tasks.children)
            .filter((item) => {
                return item.textContent.toLowerCase().includes(searchTerm);
            })
            .forEach((item) => {
                item.classList.remove("cmp-todolistManager__taskManager__taskBox__tasks--list--hide");
            })
        }

        searchForm.addEventListener("keyup", (event) => {
            const searchTerm = searchForm.task.value.trim().toLowerCase();
            filterTask(searchTerm);
        });

        searchForm.addEventListener("click", (event) => {
            if(event.target.classList.contains("cmp-todolistManager__taskManager__searchBox__search--reset")){
                searchForm.reset();
                const searchTerm = searchForm.task.value.trim();
                filterTask(searchTerm);
                }
        })
    }
    todolistManager();
}());