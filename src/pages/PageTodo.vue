<template>
  <q-page class="q-pa-md">
		
		<no-tasks
			v-if="!Object.keys(tasksTodo).length"></no-tasks>

		<tasks-todo
			v-else
			:tasksTodo="tasksTodo" />

		<tasks-completed 
			v-if="Object.keys(tasksCompleted).length"
			:tasksCompleted="tasksCompleted" />

		<div class="absolute-bottom text-center q-mb-lg">
			<q-btn
				@click="showAddTask = true"
			  round
			  color="primary"
			  size="24px"
			  icon="add"
			/>
		</div>

		<q-dialog v-model="showAddTask">
		  <add-task @close="showAddTask = false" />
		</q-dialog>
  </q-page>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {
				showAddTask: false
			}
		},
		computed: {
			...mapGetters('tasks', ['tasksTodo', 'tasksCompleted'])
		},
		mounted() {
			this.$root.$on('showAddTask', () => {
				this.showAddTask = true
			})
		},
		components: {
			'add-task' : require('components/Tasks/Modals/AddTask').default,
			'tasks-todo' : require('components/Tasks/TasksTodo').default,
			'tasks-completed' : require('components/Tasks/TasksCompleted').default,
			'no-tasks' : require('components/Tasks/NoTasks').default,
		}
	}
</script>

<style>
	
</style>
