# Task Board Starter Code

## USER STORY

As a project team member with multiple tasks to organize, I want a task board so that I can add individual project tasks, manage their state of progress and track overall project progress accordingly.

## ACCEPTANCE CRITERIA

Given a task board to manage a project:

1. When I open the task board, then the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed).
2. When I view the task board for the project, then each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red).
3. When I click on the button to define a new task, then I can enter the title, description and deadline date for the new task into a modal dialog.
4. When I click the save button for that task, then the properties for that task are saved in localStorage.
5. When I drag a task to a different progress column, then the task's progress state is updated accordingly and will stay in the new column after refereshing.
6. When I click the delete button for a task, then the task is removed from the task board and will not be added back after refreshing.
7. When I refresh the page, then the saved tasks persist.
