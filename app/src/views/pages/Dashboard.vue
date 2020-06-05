
<template>
	<div class="dashboard">

		<router-view :filtersinUse="filtersinUse" @choosingTag="updateTags" @sortingBy="updateSorting" @sortingDirection="updateSortingDirection"></router-view>

  		<div class="app-box">
			<div class="app-box_header">
				<h6>{{helloText}}</h6>
				<b-button v-if="filtersinUse" class="btn btn-light m-2" @click="resetFilters">Reset filters</b-button>
			</div>
			<div class="app-box_inside">
				<div class="app-box_tasks-container">
					<div class="app-box_task" v-for="taskObj in tasks">

						<div class="app-box_task-main">

							<div class="app-box_task-state" @click="taskDone(taskObj.task, taskObj.id)" >
								<div v-if="taskObj.task.state == 'done'">
									<font-awesome-icon :icon="['far', 'check-square']" />
								</div>
								<div v-else>
									<font-awesome-icon :icon="['far', 'square']" />
								</div>
							</div>

							<div class="app-box_task-content" @click="taskDone(taskObj.task, taskObj.id)">{{taskObj.task.content}}</div>

							<a :class="{ active: taskObj.showDetails }" class="task-icon" @click="detailsView(taskObj)">
								<font-awesome-icon icon="info-circle"/>
							</a>

							<router-link :to="'/edit-task/'+taskObj.id" class="task-icon task-icon-sm">
								<font-awesome-icon icon="ellipsis-h"/>
							</router-link>

						</div>

						<div v-if="taskObj.showDetails" class="app-box_task-small">

							<div class="app-box_task-dates">
								{{taskObj.task.date_created | formatDate}} 
								<span v-if="taskObj.task.date_start || taskObj.task.date_end"> | </span>
								<span v-if="taskObj.task.date_start" class="app-box_task-date-start">
								Start: {{taskObj.task.date_start | formatDate}}</span>
								<span v-if="taskObj.task.date_end" class="app-box_task-date-end">
								Finish: {{taskObj.task.date_end | formatDate}}</span>
							</div>

							<div class="app-box_task-tags">
								<span v-if="taskObj.task.priority">#{{taskObj.task.priority}} | </span>
								<span v-for="tag in taskObj.task.tags">	#{{tag.text}}</span>
							</div>

						</div>

					</div>
				</div>
			</div>
		</div>
          
	</div>
</template>

<script>

	import {firebase, db} from '../../config.js'
	import SortTasks from '../../components/SortTasks.vue'
	import Tags from '../../components/Tags.vue'

	let userID = '';
	let userTasksRef = '';
	let userTaskRef = '';
	let userTasks = '';
	let tasks = '';
		
	export default {
		name: 'Dashboard',
		props: ['navResetFilters'],
		components: {
		    SortTasks,
		    Tags
		},
		data () {
		    return {
		        tasks: [],
		        helloText: 'No tasks yet.',
		        direction: 'asc',
		        lastSort: 'date_created',
		        lastTasks: '',
		        filtersinUse: false,
		    }
		},
		watch: { 
		  	navResetFilters: function(newVal, oldVal) {
			    this.resetFilters();
		    }
		},
		beforeMount () {
			if (firebase.auth().currentUser) {
				userID = firebase.auth().currentUser.uid;
				userTasksRef = db.ref('users/'+userID+'/tasks/').orderByChild('date_created');
				userTasksRef.on('value', (snapshot) => {
					let tasksArray = []; let i = 0;
					snapshot.forEach(function(child) {
						tasksArray[i] = { 'id': child.key, 'task': child.val(), 'showDetails': false };
						i++;
					});
					this.tasks = tasksArray.reverse();
					if (i>0) {this.helloText = 'Tasks'}
					this.lastSort = 'date_created'
				});
			}
		},
		methods: {
			taskDone (task, key) {
				userID = firebase.auth().currentUser.uid;
				userTaskRef = db.ref('users/'+userID+'/tasks/'+key);
				if (userTaskRef) {
					let newState = '';
					if (task.state == 'new') {newState = 'done'}
					else {newState = 'new'}
					userTaskRef.update({
						state: newState
			        })
				} else {
					alert('There was an error, try again.');
				}
			},
			updateSorting(sortby, chosentasks = this.lastTasks) {

				if (firebase.auth().currentUser) {
					userID = firebase.auth().currentUser.uid;
					userTasksRef = db.ref('users/'+userID+'/tasks').orderByChild(sortby);

					if (chosentasks == '') {
						chosentasks = [];
				    	userTasksRef.on('value', (snapshot) => {
							let i = 0;
							snapshot.forEach(function(child) {
								chosentasks[i] = child.key;
								i++;
							});
						});
					} 

					if (this.direction == 'desc') { // DESCENDING
						if (sortby == 'priority') {
							userTasksRef.on('value', (snapshot) => {
								let tasksWithP = []; let i = 0;
								let tasksNoP = []; let j = 0;
								snapshot.forEach(function(child) {
									for (var a = 0; a < chosentasks.length; a++) {
										if (chosentasks[a] == child.key) {
											if (child.val().priority != '') {
												tasksWithP[i] = { 'id': child.key, 'task': child.val(), 'showDetails': false };
												i++;
											} else {
												tasksNoP[j] = { 'id': child.key, 'task': child.val(), 'showDetails': false };
												j++;
											}
										}
							  		}
								});
								let tasksArray = tasksWithP.concat(tasksNoP);
								this.tasks = tasksArray.reverse();
							});
						} else {
							userTasksRef.on('value', (snapshot) => {
								let tasksArray = []; let i = 0;
								snapshot.forEach(function(child) {
									for (var a = 0; a < chosentasks.length; a++) {
										if (chosentasks[a] == child.key) {
											tasksArray[i] = { 'id': child.key, 'task': child.val(), 'showDetails': false };
											i++;
										}
									}
								});
								if (sortby == 'content_low' || sortby == 'date_start' || sortby == 'date_end') {
									this.tasks = tasksArray.reverse();
								} else {
									this.tasks = tasksArray;
								}
							});
						} 

					} else { // ASCENDING
						if (sortby == 'priority') {
							userTasksRef.on('value', (snapshot) => {
								let tasksWithP = []; let i = 0;
								let tasksNoP = []; let j = 0;
								snapshot.forEach(function(child) {
									for (var a = 0; a < chosentasks.length; a++) {
										if (chosentasks[a] == child.key) {
											if (child.val().priority != '') {
												tasksWithP[i] = { 'id': child.key, 'task': child.val(), 'showDetails': false };
												i++;
											} else {
												tasksNoP[j] = { 'id': child.key, 'task': child.val(), 'showDetails': false };
												j++;
											}
										}
									}
								});
								let tasksArray = tasksWithP.concat(tasksNoP);
								this.tasks = tasksArray;
							});
						} else {
							userTasksRef.on('value', (snapshot) => {
								let tasksArray = []; let i = 0;

								snapshot.forEach(function(child) {
									for (var a = 0; a < chosentasks.length; a++) {
										if (chosentasks[a] == child.key) {
											tasksArray[i] = { 'id': child.key, 'task': child.val(), 'showDetails': false };
											i++;
										}
									}
								});
								if (sortby == 'content_low' || sortby == 'date_start' || sortby == 'date_end') {
									this.tasks = tasksArray;
								} else {
									this.tasks = tasksArray.reverse();
								}
							});
						} 
					}
					this.lastSort = sortby;
					this.lastTasks = chosentasks;
					this.filtersinUse = true;
				}
		    },
		    updateSortingDirection(dir) {
		    	if (dir == 'asc') 		 {this.direction = 'asc'} 
		    	else if (dir == 'desc')  {this.direction = 'desc'} 
		    	else 					 {this.direction = 'asc'}
		    	this.updateSorting(this.lastSort, this.lastTasks);
		    },
		    updateTags(chosentag) {
		    	userID = firebase.auth().currentUser.uid;
				let userTagsRef = db.ref('users/'+userID+'/tags/'+chosentag+'/tasks/');
				let tagTasksArray = []; 

		    	userTagsRef.on('value', (snapshot) => {
					let i = 0;
					snapshot.forEach(function(child) {
						tagTasksArray[i] = child.val();
						i++;
					});
				});

				this.lastTasks = tagTasksArray;
		    	this.updateSorting(this.lastSort, tagTasksArray);
		    },
		    resetFilters() {
		    	if (firebase.auth().currentUser) {
					userID = firebase.auth().currentUser.uid;
					userTasksRef = db.ref('users/'+userID+'/tasks/').orderByChild('date_created');
					userTasksRef.on('value', (snapshot) => {
						let tasksArray = []; let i = 0;
						snapshot.forEach(function(child) {
							tasksArray[i] = { 'id': child.key, 'task': child.val(), 'showDetails': false };
							i++;
						});
						this.tasks = tasksArray.reverse();
						this.lastTasks = '';
						this.lastSort = 'date_created';
						this.filtersinUse = false;
					});
				}
		    },
		    detailsView(task) {
		    	task.showDetails = !task.showDetails;
		    }
		}
	}

</script>