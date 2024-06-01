class Task{
    title="";
    description="";
    dueDate;
    priority="";

    constructor(title,desc,d,prio){
        this.title=title;
        this.description=desc;
        this.dueDate=d;
        this.priority=prio;
    }
    
    get title(){return this.title;}
    set title(title){this.title=title;}
    get description(){return this.description;}
    set description(desc){this.description=desc;}
    get dueDate(){return this.date;}
    set dueDate(d){this.dueDate=d;}
    get priority(){return this.priority;}
    set priority(p){this.priority=p;}

}

export function addTask(){
    let form=document.querySelector('form');
    let res=Array.from(form.elements);
    let nome= res[0].value;
    let desc= res[1].value;
    let date= res[2].value;
    let prio= res[3].value;
    let proj= res[4].value;
    const t=new Task(nome,desc,date,prio);
    let p=localStorage.getItem(proj);
    p=JSON.parse(p);    
    p.newTask = function(task){
        p.taskList.push(JSON.stringify(task));
    };
    p.newTask(t);
    localStorage.setItem(proj,JSON.stringify(p));
    form.reset();
}