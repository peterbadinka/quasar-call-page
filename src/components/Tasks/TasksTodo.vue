<template>
	<div>
		<list-header
			bgColor="bg-orange-4 text-left"
			>Todo</list-header>

		<q-list 
			separator
			bordered>

			<task
				v-for="(task, key) in tasksTodo"
		  	:key="key"
		  	:task="task"
		  	:id="key"></task>

		</q-list>
	</div>
</template>

<script>
	export default {
		props: ['tasksTodo'],
		components: {
			'task' : require('components/Tasks/Task').default,
			'list-header' : require('components/Shared/ListHeader').default,
		}
	}
</script>