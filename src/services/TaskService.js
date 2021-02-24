class TaskService {

    static save(payload) {
        let tasks = this.list();
        let id = this.getActualId();
        tasks.push({
            id,
            ...payload
        });
        localStorage.setItem('TASKS', JSON.stringify(tasks));
    }

    static delete(id) {
        let tasks = [...this.list()];
        tasks.splice(tasks.find(t => t.id === id), 1);

        localStorage.setItem('TASKS', JSON.stringify(tasks));
    }
    
    static list() {
        return JSON.parse(localStorage.getItem('TASKS')) || [];
    }

    static getActualId(){
        let tasks = this.list();
        if(tasks === null){
            return 1;
        }else{
            let idActual = 0;
            tasks.forEach(t => {
                if(t.id > idActual) idActual = t.id;
            })
            idActual = idActual+1;
            return idActual;
        }
    }

}

export default TaskService;