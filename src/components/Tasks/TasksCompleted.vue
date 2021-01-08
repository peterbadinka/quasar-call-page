<template>
	<div class="q-mt-lg">
		<list-header
			bgColor="bg-green-4 text-left">Completed</list-header>
		<q-list 
			separator
			bordered>

			<task
				v-for="(task, key) in tasksCompleted"
		  	:key="key"
		  	:task="task"
		  	:id="key"></task>

		</q-list>
	</div>
</template>

<script>
	export default {
		props: ['tasksCompleted'],
		components: {
			'task' : require('components/Tasks/Task').default,
			'list-header' : require('components/Shared/ListHeader').default,
		}
	}
</script>