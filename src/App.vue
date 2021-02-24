<template>
  <div class="app">
    <div class="form">
      <b-row>
        <b-col cols="12">
          <b-form-textarea
            id="textarea"
            v-model="task.name"
            placeholder="O que vamos fazer hoje!?"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-col>
        <b-col cols="12 mt-4">
          <b-button 
            variant="info" 
            @click="addTask"
          >
            Adicionar Tarefa
          </b-button>
        </b-col>
        <b-col cols="12 mt-4">
          <b-table 
            striped hover 
            :items="tasks"
            :fields="tasksColumns"
          >
            <template #cell(actions)="row">
                <b-icon 
                  icon="check-square" 
                  scale="1.7" 
                  @click="finishTask(row.index)"
                  class="mr-4"
                  variant="success"
                ></b-icon>
                <b-icon 
                  icon="trash-fill" 
                  aria-hidden="true"
                  scale="1.6"
                  variant="danger" 
                  @click="deleteTask(row.index)" 
                  class="mr-4"
                ></b-icon>
            </template>
          </b-table>
        </b-col>
      </b-row>
      
    </div>
  </div>
</template>

<script>
import TaskService from './services/TaskService';

export default {
  name: 'App',
  components: {},
  data(){
    return {
      task: {
        name: null
      },
      tasks: [],
      tasksColumns: [
        { key: 'name', label: 'Tarefa' },
        { key: 'actions', label: 'Ação' }
      ]
    }
  },
  mounted() {
    this.listTasks();
  },
  methods: {

    addTask(){
      try{
        TaskService.save(this.task);
        this.$alertify.success('Tarefa adicionada com sucesso!');
        this.listTasks();
      }catch(e){
        this.$alertify.error('Erro ao adicionar Tarefa!');
      } finally {
        this.task.name = null;
      }
    },

    listTasks(){
      try {
        const content = TaskService.list();
        this.tasks = content;
      } catch (e) {
        this.$alertify.error('Erro ao carregar dados!');
      }
    },

    deleteTask(index){
      try {
        let task = this.tasks[index];
        TaskService.delete(task.id);
        this.listTasks();
      } catch (e) {
        this.$alertify.error('Erro ao remover tarefa!');
      }
    },

    finishTask(index){ 
      this.$alertify.success('Parabéns por finalizar sua tarefa!').delay(8);
      this.deleteTask(index);
    }


  }
}
</script>

<style>
.app{
  margin: 0 auto;
  text-align: center;
  margin-top:25px;
}
.form{
  max-width: 500px;
  margin: 0 auto;
  padding: 5px;
}
</style>
