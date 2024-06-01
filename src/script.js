import './style.css';
import {viewTasks,addNewProjectContent, updateProjects, addTaskContent, viewSpecificTimeTasks} from './DOM_manipulation.js';



const addTask = document.querySelector('.add-task');
addTask.addEventListener('click',addTaskContent);

const inbox = document.querySelector('#inbox');
inbox.addEventListener('click',viewTasks);

const today = document.querySelector('#today');
today.addEventListener('click',viewSpecificTimeTasks);

const upcoming = document.querySelector('#upcoming');
upcoming.addEventListener('click',viewSpecificTimeTasks);


const thisMonth = document.querySelector('#month');
thisMonth.addEventListener('click',viewSpecificTimeTasks);

const newProject = document.getElementById('create-project');
newProject.addEventListener('click',addNewProjectContent);
window.addEventListener('storage',updateProjects);
addEventListener('DOMContentLoaded',updateProjects);