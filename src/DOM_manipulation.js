import {nuovoProgetto} from './project.js';
import {addTask} from './task.js';
import { formatDate,isToday,isAfter,isBefore } from 'date-fns';

export function addNewProjectContent(){
    const cont=document.querySelector('.container');
    cont.innerHTML="";
    const np=document.createElement('div');
    np.classList.add('new-project');
    const h1=document.createElement('h1');
    h1.textContent="New Project";
    np.appendChild(h1);
    const form=document.createElement('form');
    form.action='#';
    const it1=document.createElement('div');
    it1.classList.add('form-item');
    const label1=document.createElement('label');
    label1.for="name";
    label1.textContent='Project Name';
    it1.appendChild(label1);
    const inp=document.createElement('input');
    inp.type='text';
    inp.name='name';
    inp.id='name';
    inp.required=true;
    it1.appendChild(inp);
    form.appendChild(it1);

    const it2=document.createElement('div');
    it2.classList.add('form-item');
    const label2=document.createElement('label');
    label2.for="prio";
    label2.textContent='Priority';
    it2.appendChild(label2);
    const sel=document.createElement('select');
    sel.name='prio';
    sel.id='prio';
    const opt=document.createElement('option');
    opt.value='high';
    opt.text='High';
    opt.selected=true;
    const opt2=document.createElement('option');
    opt2.value='med';
    opt2.text='Medium';
    const opt3=document.createElement('option');
    opt3.value='low';
    opt3.text='Low';
    sel.append(opt,opt2,opt3);
    it2.appendChild(sel);
    const btn=document.createElement('button');
    btn.type='button';
    btn.textContent="Create";
    btn.addEventListener('click',nuovoProgetto);
    form.append(it2,btn);
    np.appendChild(form);
    
    cont.appendChild(np);
}

export function updateProjects(){
    const projCont=document.querySelector('.project-list');
    projCont.innerHTML="";
    if(!localStorage.length==0){
        for (let index = 1; index < localStorage.length; index++) {
            let element = localStorage.getItem(localStorage.key(index))
            let item=document.createElement('div');
            element=JSON.parse(element);
            item.classList.add('project-item');
            item.addEventListener('click',viewTasks);
            let span=document.createElement('span');
            span.classList.add('material-symbols-outlined');
            span.textContent='tag';
            if(element["priority"]==='high'){
                span.style.color='red';
            }
            else if( element["priority"]==='med'){
                span.style.color='yellow';
            }
            else{
                span.style.color='green';
            }
            item.appendChild(span);
            let p=document.createElement('p');
            p.innerText=element["name"];
            let span2=document.createElement('span');
            span2.classList.add('material-symbols-outlined');
            span2.id='del';
            span2.innerText='delete';
            span2.onclick=removeProject;
            item.appendChild(p);
            item.appendChild(span2);
            projCont.appendChild(item);
        }
    }
}
export function addTaskContent(){
    const cont=document.querySelector('.container');
    cont.innerHTML="";
    const taskCont=document.createElement('div');
    taskCont.classList.add('task-content');
    const h1=document.createElement('h1');
    h1.textContent='New task';
    taskCont.appendChild(h1);
    const form=document.createElement('form');
    form.action='#';
    const itm1=document.createElement('div');
    itm1.classList.add('form-item');
    const lbl1=document.createElement('label');
    lbl1.for='name-task';
    lbl1.textContent='Name';
    const inp1=document.createElement('input');
    inp1.type='text';
    inp1.id='name-task';
    inp1.name='name-task';
    itm1.append(lbl1,inp1);
    form.appendChild(itm1);

    const itm2=document.createElement('div');
    itm2.classList.add('form-item');
    const lbl2=document.createElement('label');
    lbl2.for='desc-task';
    lbl2.textContent='Description';
    const inp2=document.createElement('input');
    inp2.type='text';
    inp2.id='desc-task';
    inp2.name='desc-task';
    itm2.append(lbl2,inp2);
    form.appendChild(itm2);

    const itm3=document.createElement('div');
    itm3.classList.add('form-item');
    const lbl3=document.createElement('label');
    lbl3.for='date-task';
    lbl3.textContent='Due Date';
    const inp3=document.createElement('input');
    inp3.type='date';
    inp3.id='date-task';
    inp3.name='date-task';
    itm3.append(lbl3,inp3);
    form.appendChild(itm3);

    const itm4=document.createElement('div');
    itm4.classList.add('form-item');
    const lbl4=document.createElement('label');
    lbl4.for='prio-task';
    lbl4.textContent='Priority';
    itm4.appendChild(lbl4);
    const inp4=document.createElement('select');
    inp4.id='prio-task';
    inp4.name='prio-task';
    const opt=document.createElement('option');
    opt.value='high';
    opt.text='High';
    opt.selected=true;
    const opt2=document.createElement('option');
    opt2.value='med';
    opt2.text='Medium';
    const opt3=document.createElement('option');
    opt3.value='low';
    opt3.text='Low';
    inp4.append(opt,opt2,opt3);
    itm4.appendChild(inp4);
    form.appendChild(itm4);

    const itm5=document.createElement('div');
    itm5.classList.add('form-item');
    const lbl5=document.createElement('label');
    lbl5.for='proj-task';
    lbl5.textContent='Project';
    const inp5=document.createElement('select');
    inp5.id='proj-task';
    inp5.name='proj-task';
    if(localStorage.length>0){
        for(let i =0;i<localStorage.length;i++){
            let opt=document.createElement('option');
            opt.value=localStorage.key(i);
            opt.text=localStorage.key(i);
            inp5.appendChild(opt);
        }
    }
    itm5.append(lbl5,inp5);
    form.appendChild(itm5);

    const itm6=document.createElement('div');
    itm6.classList.add('form-item');
    const inp6=document.createElement('button');
    inp6.type='button';
    inp6.textContent='Create Task';
    inp6.addEventListener('click',addTask);
    itm6.append(inp6);
    form.appendChild(itm6);
    taskCont.appendChild(form);
    cont.appendChild(taskCont);
}

function removeProject(e){
    e.stopPropagation();
    let parent=e.currentTarget.parentNode;
    let proj = parent.querySelector('p');
    if(confirm('Do you really wish to delete this project?')){
        localStorage.removeItem(proj.innerText);
    }
    updateProjects();
}
export function viewTasks(e){
    const key=e.currentTarget.querySelector('p').textContent;
    let proj=localStorage.getItem(key);
    proj=JSON.parse(proj);
    const cont=document.querySelector('.container');
    cont.innerHTML='';
    const taskCont=document.createElement('div');
    taskCont.classList.add('tasks-content');
    const h1=document.createElement('h1');
    h1.textContent=key;
    taskCont.appendChild(h1);
    const taskIt=document.createElement('div');
    taskIt.classList.add("task-items");
    const ol=document.createElement('ol');
    for(let i=0;i<proj["taskList"].length;i++){
        let task=JSON.parse(proj["taskList"][i]);
        let li=document.createElement('li');
        let upper=document.createElement('div');
        upper.classList.add('upper');
        let left=document.createElement('div');
        left.classList.add('left');
        let span=document.createElement('span');
        span.classList.add('material-symbols-outlined');
        span.textContent='circle';
        span.onclick=()=>{
            span.textContent='check';
            span.style.color='green';
            li.style.backgroundColor='gray';
        };
        span.style.cursor='pointer';
        if(task["priority"]==='high'){
            span.style.color='red';
        }
        else if(task["priority"]==='med'){
            span.style.color='yellow';
        }
        else{
            span.style.color='green';
        }
        left.appendChild(span);
        let h3= document.createElement('h3');
        h3.classList.add('task-name');
        h3.innerText=task["title"];
        left.appendChild(h3);
        upper.appendChild(left);
        let right=document.createElement('div');
        right.classList.add('right');
        let span2=document.createElement('span');
        span2.classList.add('material-symbols-outlined');
        span2.textContent='delete';
        span2.style.cursor='pointer';
        span2.addEventListener('click',removeTask);
        right.appendChild(span2);
        upper.appendChild(right);
        li.appendChild(upper);
        let p1=document.createElement('p');
        p1.innerText=task["description"];
        li.appendChild(p1);
        let p2=document.createElement('p');
        let date=new Date(task["dueDate"]);
        let d= formatDate(date,"do MMM y");
        p2.innerText="Due: "+d;
        li.appendChild(p2);
        ol.appendChild(li);
    }
    taskIt.appendChild(ol);
    taskCont.appendChild(taskIt);
    cont.appendChild(taskCont);
}

function removeTask(e) {
    e.stopPropagation();
    let parent = e.currentTarget.parentNode.parentNode;
    let taskName = parent.querySelector('.left h3').textContent;

    let projName = document.querySelector('h1').textContent;

    let proj = localStorage.getItem(projName);
    if (!proj) {
        console.error('Project not found in localStorage');
        return;
    }
    proj = JSON.parse(proj);

    let taskList = proj.taskList;

    if (confirm('Do you really wish to delete this task?')) {
        let taskIndex = taskList.findIndex(task => {
            let taskObj = JSON.parse(task);
            return taskObj.title === taskName;
        });
        
        if (taskIndex !== -1) {
            taskList.splice(taskIndex, 1);
            console.log('Task found and removed');
            proj.taskList = taskList;
            localStorage.setItem(projName, JSON.stringify(proj));
            e.currentTarget.parentNode.parentNode.parentNode.style.display='none';
            
        } else {
            console.log('Task not found in the task list');
        }
    }
}

function selectTasks(time){
    let selectedTasks=[];
    for (let i = 0; i < localStorage.length; i++){
        let proj=localStorage.getItem(localStorage.key(i));
        proj=JSON.parse(proj);
        let tl= proj.taskList;
        for(let t of tl){
            let taskObj = JSON.parse(t);
            if(time==='today'){
                if(isToday(new Date(taskObj['dueDate']))){
                    selectedTasks.push(taskObj);
                }
            }
            if(time === 'upcoming'){
                let today=new Date();
                let nextWeek= new Date();
                nextWeek.setDate(nextWeek.getDate() + 7);
                if(isAfter(taskObj['dueDate'],today) && isBefore(taskObj['dueDate'],nextWeek)){
                    selectedTasks.push(taskObj);
                }
            }
            if(time === 'this month'){
                let today=new Date();
                let nextMonth= new Date();
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                if(isAfter(taskObj['dueDate'],today) && isBefore(taskObj['dueDate'],nextMonth)){
                    selectedTasks.push(taskObj);
                }
            }
        }
    }
    return selectedTasks;
}

export function viewSpecificTimeTasks(e){
    let tasksToShow=[];
    const key=e.currentTarget.querySelector('p').textContent;
    tasksToShow=selectTasks(key);

    const cont=document.querySelector('.container');
    cont.innerHTML='';
    const taskCont=document.createElement('div');
    taskCont.classList.add('tasks-content');
    const h1=document.createElement('h1');
    h1.textContent=key;
    taskCont.appendChild(h1);
    const taskIt=document.createElement('div');
    taskIt.classList.add("task-items");
    const ol=document.createElement('ol');
    for(let task of tasksToShow){
        let li=document.createElement('li');
        let upper=document.createElement('div');
        upper.classList.add('upper');
        let left=document.createElement('div');
        left.classList.add('left');
        let span=document.createElement('span');
        span.classList.add('material-symbols-outlined');
        span.textContent='circle';
        if(task["priority"]==='high'){
            span.style.color='red';
        }
        else if(task["priority"]==='med'){
            span.style.color='yellow';
        }
        else{
            span.style.color='green';
        }
        left.appendChild(span);
        let h3= document.createElement('h3');
        h3.classList.add('task-name');
        h3.innerText=task["title"];
        left.appendChild(h3);
        upper.appendChild(left);
        let right=document.createElement('div');
        right.classList.add('right');
        upper.appendChild(right);
        li.appendChild(upper);
        let p1=document.createElement('p');
        p1.innerText=task["description"];
        li.appendChild(p1);
        let p2=document.createElement('p');
        let date=new Date(task["dueDate"]);
        let d= formatDate(date,"do MMM y");
        p2.innerText="Due: "+d;
        li.appendChild(p2);
        ol.appendChild(li);
    }
    taskIt.appendChild(ol);
    taskCont.appendChild(taskIt);
    cont.appendChild(taskCont);    
}

