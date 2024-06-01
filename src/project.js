import { it } from "date-fns/locale";
import { updateProjects } from "./DOM_manipulation";

class Project{
    taskList=[];
    name="";
    priority="";

    constructor(name,priority,taskList){
        this.name=name;
        this.priority=priority;
        this.taskList=taskList;
    }

    get priority(){return this.priority;}
    set priority(p){this.priority=p;}
    get name(){return this.name;}
    set name(name){this.name=name;}
    get taskList(){return this.taskList;}

}

if(!localStorage.getItem('inbox')){
    const inbox=new Project('inbox','high',[]);
    localStorage.setItem('inbox',JSON.stringify(inbox));
}

export function nuovoProgetto(){
    let res=document.querySelector('form');
    res=Array.from(res.elements);
    let nome= res[0].value;
    let prio=res[1].value;
    const prog = new Project(nome,prio,[]);
    localStorage.setItem(nome,JSON.stringify(prog));
    const cont=document.querySelector('.container');
    updateProjects();
    cont.innerHTML="";
}

