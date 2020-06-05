<template>
	<div class="edit-task">
    	<div class="app-box">
			<div class="app-box_header">
				<h6>Edit task</h6>
			</div>
			<div class="app-box_inside container-fluid">

				<div class="row edit-task-content-wrapper app-box_inside-row">
					<div class="col app-box_inside-col">
						<textarea-autosize v-model="taskContent" placeholder="Enter task..."></textarea-autosize>
					</div>
				</div>

				<div class="row app-box_inside-row">
					<div class="col app-box_inside-col">
						<h6>Tags: </h6>
						<vue-tags-input placeholder="Enter tags..." v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"/>
					</div>
				</div>

				<div class="row app-box_inside-row app-box_inside-row-wrap">
					<div class="col app-box_inside-col">
						<h6>Start:</h6>
						<datetime placeholder="Set start..." v-model="taskStart" value-zone="local"></datetime>
					</div>
				</div>

				<div class="row app-box_inside-row app-box_inside-row-wrap">
					<div class="col app-box_inside-col">
						<h6>Finish:</h6>
						<datetime placeholder="Set finish..." v-model="taskEnd" value-zone="local"></datetime>
					</div>
				</div>

				<div class="row app-box_inside-row app-box_inside-row-wrap">
					<div class="col app-box_inside-col">
						<h6>Priority:</h6>
						<span>(1-9)</span>
						<div class="edit-task-priority"><input placeholder="Set..." v-model="taskPriority" min="1" max="9" type="number"></input></div>
					</div>
				</div>

				<div class="row app-box_inside-row app-box_inside-row-wrap">
					<div class="col app-box_inside-col">
						<p><span>Created:</span> {{taskCreated}}</p>
						<p><span>Last updated:</span> {{taskUpdated}}</p>
					</div>
				</div>

				<div class="app-box_save-buttons">
					<b-button class="btn btn-light m-2" @click="sendItem">Save task</b-button>
					<b-button class="btn btn-danger m-2" @click="deleteItem">Delete task</b-button>
				</div>

			</div>
		</div>
	</div>
</template>

<script>

	import VueTagsInput from '@johmun/vue-tags-input';
	import { Datetime } from 'vue-datetime';
	import 'vue-datetime/dist/vue-datetime.css';
	import {firebase, db} from '../../config.js';
	import { Settings as LuxonSettings } from 'luxon';
	import moment from 'moment';
	LuxonSettings.defaultLocale = 'en-UK';

  	let userID = ''; 
  	let userTaskRef = '';
  	let userTagsRef = '';
  	let taskID = ''

	export default {
		name: 'EditTask',
		components: { VueTagsInput, Datetime },
		data () {
	      return {
	        taskContent: '',
	        taskPriority: '',
	        taskCreated: '',
			taskUpdated: '',
	        taskStart: '',
	        taskEnd: '',
	        tag: '',
      		tags: [],
	      }
	    },
	    beforeMount () {
			if (firebase.auth().currentUser) {
				taskID = this.$route.params.taskKey;
				userID = firebase.auth().currentUser.uid;
				userTaskRef = db.ref('users/'+userID+'/tasks/'+taskID);
				userTaskRef.on('value', (snapshot) => {
					let userTask = snapshot.val();
					if (userTask) {
						this.taskContent = userTask.content;
						this.taskPriority = userTask.priority;
						this.taskCreated = moment(userTask.date_created).format('MMM DD, YYYY');
						this.taskUpdated = moment(userTask.date_updated).format('MMM DD, YYYY');
						this.taskStart = new Date(userTask.date_start).toJSON();
						this.taskEnd = new Date(userTask.date_end).toJSON();
						this.tags = userTask.tags;
					}
				});
			}

		},
	    methods: {
	      	sendItem () {
	      		if (this.taskContent) {
	      			taskID = this.$route.params.taskKey;
					userID = firebase.auth().currentUser.uid;
	      			userTaskRef = db.ref('users/'+userID+'/tasks/'+taskID);
	      			userTagsRef = db.ref('users/'+userID+'/tags/');
					if (userTaskRef) {
						let today = Date.now();
						let dateStart = '';
						let dateEnd = '';
						let taskTags = [];
						if (this.taskStart) {dateStart = new Date(this.taskStart).getTime();}
						else {dateStart = today}
						if (this.taskEnd) {dateEnd = new Date(this.taskEnd).getTime();}
						if (this.taskPriority) {this.taskPriority = parseInt(this.taskPriority);}
						if (this.tags) {
							for (var i = 0; i < this.tags.length; i++) { 
  								taskTags[i] = {'text': this.tags[i].text};
							}
						}

						userTaskRef.update({
							content: this.taskContent,
							content_low: this.taskContent.toLowerCase(),
							priority: this.taskPriority,
							state: 'new',
							tags: taskTags,
							date_updated: today,
							date_start: dateStart,
							date_end: dateEnd
				        })

						userTagsRef.once('value').then(function(snapshot) {
				        	let userTagsPast = snapshot.val();
  							for (var key in userTagsPast) {
							    if (userTagsPast.hasOwnProperty(key)) {
							    	let userTagPast = userTagsPast[key];
							    	let userTagTasksPast = userTagPast.tasks
							    	let newTagTasks = [];
							    	for (var keyHere in userTagTasksPast) {
							    		if (userTagTasksPast.hasOwnProperty(keyHere)) {
							    			if (userTagTasksPast[keyHere] != taskID) {
							    				newTagTasks.push(userTagTasksPast[keyHere]);
							    			}
							    		}
							    	}
							    	let userTagRef = db.ref('users/'+userID+'/tags/'+key);
							    	userTagRef.update({
										tasks: newTagTasks
							        })
							    }
							}
							for (var i = 0; i < taskTags.length; i++) {
					       		let tagContent = taskTags[i].text;
					       		let userTags = '';
						        userTagsRef.once('value').then(function(snapshot) {
						        	userTags = snapshot.val();
						        	let tagExists = false;
									let userTagTasks = '';
									let userTagKey = '';
									let userTag = '';
		  							for (var key in userTags) {
									    if (userTags.hasOwnProperty(key)) {
									    	userTag = userTags[key];
									    	if (tagContent == userTag.name) {
									    		tagExists = true;
									    		userTagKey = key;
									    		userTagTasks = userTag.tasks;
									    	} 
									    }
									}
									if (tagExists) {
										let tagTasks = [];
										if (userTagTasks) {tagTasks = userTagTasks;}
										tagTasks.push(taskID);
										let userTagsRefUpd = db.ref('users/'+userID+'/tags/'+userTagKey);
										userTagsRefUpd.update({
											tasks: tagTasks
								        })
									} else {
										let tagTasks = [];
										tagTasks.push(taskID);
										userTagsRef.push({
											name: tagContent,
											tasks: tagTasks
								        })
									}
								});
							}
						});

				        this.$router.go(-1);
					} else {
						alert('There was an error, try again.');
					}
				} else {
					alert("Task can't be empty");
				}
	    	},
	    	deleteItem() {
	    		taskID = this.$route.params.taskKey;
				userID = firebase.auth().currentUser.uid;
	    		userTaskRef = db.ref('users/'+userID+'/tasks/'+taskID);
				let ask = confirm("Are you sure you want to delete this task?");
				if (ask) {userTaskRef.remove();} 
				this.$router.replace('/dashboard')
	    	}
	    }
	}
</script>

