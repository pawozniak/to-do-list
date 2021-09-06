document.addEventListener('DOMContentLoaded', function(){
    // Select relevant node elements
    const newTaskToAdd = document.querySelector('#task-input');
    const newTaskPriority = document.querySelector('#task-input-priority');
    const addTaskButton = document.querySelector('#add-task-button');
    const taskList = document.querySelector('#task-list');
    const removeFinishedTasks = document.querySelector('#remove-finished-tasks-button');
    const markAllFinishedTasksAsComplete = document.querySelector('#mark-all-finished-tasks-as-complete-button');
    const unmarkAllTasks = document.querySelector('#unmark-all-tasks-button');
    const alertDiv = document.querySelector('.validation-alert');


    // Set task counter
    let taskCounter = 0;
    // Update task counter
    const taskCounterSpan = document.querySelector('.task-counter-number');
    taskCounterSpan.innerText = taskCounter;

    // Update task counter function - to use every time task number may be affected
    function updateTaskCounter(){
        // Calculate number of tasks left to complete
        let allTasksNum = taskList.querySelectorAll('.new-task').length;
        let completedTasksNum = taskList.querySelectorAll('.task-completed').length;
        let taskCounter = allTasksNum - completedTasksNum;
        // Update task counter
        taskCounterSpan.innerText = taskCounter;
    };

    // Add a new task
    addTaskButton.addEventListener('click', () => {
        if(newTaskToAdd.value.match(/^.{5,100}$/)&&newTaskPriority.value.match(/^([1-9]|10)$/)){
            // Create a new task list item
            let newTaskOnList = document.createElement('li');
            newTaskOnList.classList.add('new-task');
            newTaskOnList.classList.add('row');

            // Assign priority attribute to task
            newTaskOnList.dataset.priority = newTaskPriority.value;

            // Create task description div (with task name and task priority)
            let newTaskDescriptionDiv = document.createElement('div');
            newTaskDescriptionDiv.classList.add('col-10');

            let newTaskDescriptionDivRow = document.createElement('div');
            newTaskDescriptionDivRow.classList.add('row');
            newTaskDescriptionDiv.appendChild(newTaskDescriptionDivRow);

            let newDivHeader = document.createElement('h4');
            newDivHeader.classList.add("task-description");
            newDivHeader.classList.add("task-name");
            newDivHeader.classList.add("col-9");
            newDivHeader.innerHTML = newTaskToAdd.value;
            newTaskDescriptionDivRow.appendChild(newDivHeader);


            let newDivHeaderPriority = document.createElement('div');
            newDivHeaderPriority.classList.add('task-description');
            newDivHeaderPriority.classList.add('task-priority');
            newDivHeaderPriority.classList.add('col-3');
            newDivHeaderPriority.innerHTML = `priority: ${newTaskPriority.value}`;
            newTaskDescriptionDivRow.appendChild(newDivHeaderPriority);

            // Define new task buttons div
            let newButtonsDiv = document.createElement('div');
            newButtonsDiv.classList.add('col-2');
            newButtonsDiv.classList.add('d-flex');
            newButtonsDiv.classList.add('justify-content-center');
            newButtonsDiv.classList.add('align-items-start');

            // Define delete task button
            let newButtonDelete = document.createElement('button');
            newButtonDelete.classList.add('delete-button');
            newButtonDelete.classList.add('btn');
            newButtonDelete.classList.add('btn-link');
            newButtonDelete.classList.add('p-0');
            newButtonDelete.classList.add('float-right');
            let newButtonDeleteIcon = document.createElement('span');
            newButtonDeleteIcon.classList.add('bi-x-lg');
            
            // Define complete task button
            let newButtonComplete = document.createElement('button');
            newButtonComplete.classList.add('complete-button');
            newButtonComplete.classList.add('btn');
            newButtonComplete.classList.add('btn-link');
            newButtonComplete.classList.add('p-0');
            newButtonComplete.classList.add('float-right');
            let newButtonCompleteIcon = document.createElement('span');
            newButtonCompleteIcon.classList.add('bi-check-lg');

            // Append complete and delete buttons
            newButtonDelete.appendChild(newButtonDeleteIcon);
            newButtonsDiv.appendChild(newButtonDelete);
            newButtonComplete.appendChild(newButtonCompleteIcon);
            newButtonsDiv.appendChild(newButtonComplete);

            // Append new task list and delete, complete buttons
            taskList.appendChild(newTaskOnList);
            newTaskOnList.appendChild(newTaskDescriptionDiv);
            newTaskOnList.appendChild(newButtonsDiv);

            // Sort tasks based on priority
            let taskListAll = document.querySelectorAll('.new-task');
            let taskListAllArray = Array.prototype.slice.call(taskListAll,0);
            taskListAllArray.sort((a,b)=>{
                return a.dataset.priority.localeCompare(b.dataset.priority, undefined, {numeric: true});
            });
            taskListAllArray.forEach(element => {
                taskList.prepend(element);
            });

            // Reset input values for new task name and priority
            newTaskToAdd.value = '';
            newTaskPriority.value = '';
            updateTaskCounter();

            // Delete task button for a new task
            newButtonDelete.addEventListener('click', (e) =>{
                e.currentTarget.parentElement.parentElement.remove();
                updateTaskCounter();
            });

            // Complete task button for a new task
            newButtonComplete.addEventListener('click', (e)=>{
                if(e.currentTarget.parentElement.parentElement.classList.contains('task-completed')){
                    e.currentTarget.parentElement.parentElement.classList.remove('task-completed');
                    let taskDescription = e.currentTarget.parentElement.parentElement.querySelectorAll('.task-description');
                    newButtonCompleteIcon.classList.add('bi-check-lg');
                    newButtonCompleteIcon.classList.remove('bi-arrow-counterclockwise');
                    taskDescription.forEach(element => {
                        element.classList.remove('task-completed-highlight');
                    });
                }else{
                    e.currentTarget.parentElement.parentElement.classList.add('task-completed');
                    let taskDescription = e.currentTarget.parentElement.parentElement.querySelectorAll('.task-description');
                    newButtonCompleteIcon.classList.remove('bi-check-lg');
                    newButtonCompleteIcon.classList.add('bi-arrow-counterclockwise');
                    taskDescription.forEach(element => {
                        element.classList.add('task-completed-highlight');
                    });
                }; 
            });

            // Reset scroll position
            let listTasksSection = document.querySelector('.list-tasks-section');
            listTasksSection.scrollTop = 0;
            updateTaskCounter();
        }else{
            // Show validation alert
            alertDiv.classList.remove('collapse');
        }
    })

    // Remove all completed tasks
    removeFinishedTasks.addEventListener('click', ()=> {
        let completedTasks = taskList.querySelectorAll('.task-completed');
        completedTasks.forEach(element => {
            element.remove();
        });
        updateTaskCounter();
    })

    // Mark all task as completed
    markAllFinishedTasksAsComplete.addEventListener('click', ()=>{
        let taskListAll = document.querySelectorAll('.new-task');
        let checkCompletedkButtonIconArr = document.querySelectorAll('.new-task .bi-check-lg');

        taskListAll.forEach(element => {
            element.classList.add('task-completed');
            let taskDescription = document.querySelectorAll('.task-description');
            if(checkCompletedkButtonIconArr.length>0){
                checkCompletedkButtonIconArr.forEach(element => {
                    element.classList.add('bi-arrow-counterclockwise');
                    element.classList.remove('bi-check-lg');
                });
            }
            taskDescription.forEach(element => {
                element.classList.add('task-completed-highlight');
            });
        });
        updateTaskCounter();
    });

    // Unmark all tasks
    unmarkAllTasks.addEventListener('click', ()=> {
        let taskListAll = document.querySelectorAll('.new-task');
        let taskDescription = document.querySelectorAll('.task-description');
        let checkDeleteButtonIconArr = document.querySelectorAll('.new-task .bi-arrow-counterclockwise');
        taskListAll.forEach(element => {
            element.classList.remove('task-completed');
            if(checkDeleteButtonIconArr.length>0){
                checkDeleteButtonIconArr.forEach(element => {
                    element.classList.add('bi-check-lg');
                    element.classList.remove('bi-arrow-counterclockwise');
                });
            }      
            taskDescription.forEach(element => {
                element.classList.remove('task-completed-highlight');
            });
        });
        updateTaskCounter();
    });

    // Hide validation alert
    document.addEventListener('click', (event) => {
        let targetElement = event.target;
        do {
            if (targetElement === addTaskButton) {
                return;
            }
            targetElement = targetElement.parentNode;
        } while (targetElement);
        alertDiv.classList.add('collapse');
    })
});