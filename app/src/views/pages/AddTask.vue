<template>
	<div class="add-task">
    	<div class="app-box">
			<div class="app-box_header">
				<h6>New task</h6>
			</div>
			<div class="app-box_inside container-fluid">

				<div class="row edit-task-content-wrapper app-box_inside-row">
					<div class="col app-box_inside-col">
						<textarea-autosize v-model="taskContent" placeholder="Enter task..."></textarea-autosize>
					</div>
				</div>

				<div class="row app-box_inside-row">
					<div class="col app-box_inside-col">
						<h6>Add tags: </h6>
						<vue-tags-input placeholder="Enter tags..." v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"/>
					</div>
				</div>

				<div class="row app-box_inside-row app-box_inside-row-wrap">
					<div class="col app-box_inside-col">
						<h6>Set start:</h6>
						<datetime placeholder="Set start..." v-model="taskStart" value-zone="local"></datetime>
					</div>
				</div>

				<div class="row app-box_inside-row app-box_inside-row-wrap">
					<div class="col app-box_inside-col">
						<h6>Set finish:</h6>
						<datetime placeholder="Set finish..." v-model="taskEnd" value-zone="local"></datetime>
					</div>
				</div>

				<div class="row app-box_inside-row app-box_inside-row-wrap">
					<div class="col app-box_inside-col">
						<h6>Set priority:</h6>
						<span>(1-9)</span>
						<div class="edit-task-priority"><input placeholder="Set..." v-model="taskPriority" min="1" max="9" type="number"></input></div>
					</div>
				</div>

				<div class="app-box_save-buttons">
					<b-button class="btn btn-light m-2" @click="sendItem">Save task</b-button>
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
	LuxonSettings.defaultLocale = 'en-UK';

  	let userID = ''; 
  	let userRef = '';
  	let userTagsRef = '';
  	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			userID  = firebase.auth().currentUser.uid;
			userRef = db.ref('users/'+userID+'/tasks/');
			userTagsRef = db.ref('users/'+userID+'/tags/');
		}
	});

	export default {
		name: 'AddTask',
		components: { VueTagsInput, Datetime },
		data () {
	      return {
	        taskContent: '',
	        taskPriority: '',
	        taskStart: '',
	        taskEnd: '',
	        tag: '',
      		tags: [],

	      }
	    },
	    methods: {
	      	sendItem () {
	      		if (this.taskContent) {
					if (userRef) {
						let today = Date.now();
						let dateStart = '';
						let dateEnd = '';
						let taskTags = [];
						if (this.taskStart) {dateStart = new Date(this.taskStart).getTime();}
						if (this.taskEnd) {dateEnd = new Date(this.taskEnd).getTime();}
						if (this.taskStart && this.taskEnd) {
							if (this.taskStart > this.taskEnd) {
								alert('Start date must be earlier than end date');
								return false;
							}
						}
						if (this.taskPriority) {this.taskPriority = parseInt(this.taskPriority);}
						if (this.tags) {
							for (var i = 0; i < this.tags.length; i++) { 
  								taskTags[i] = {'text': this.tags[i].text};
							}
						}

						let taskKey = userRef.push().key;
						let userRefUpd = db.ref('users/'+userID+'/tasks/'+taskKey);

						userRefUpd.update({
							content: this.taskContent,
							content_low: this.taskContent.toLowerCase(),
							priority: this.taskPriority,
							state: 'new',
							tags: taskTags,
							date_created: today,
							date_updated: today,
							date_start: dateStart,
							date_end: dateEnd
				        })

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
									let tagTasks = userTagTasks;
									tagTasks.push(taskKey);
									let userTagsRefUpd = db.ref('users/'+userID+'/tags/'+userTagKey);
									userTagsRefUpd.update({
										tasks: tagTasks
							        })
								} else {
									let tagTasks = [];
									tagTasks.push(taskKey);
									userTagsRef.push({
										name: tagContent,
										tasks: tagTasks
							        })
								}
							});
							
						}



				        this.taskContent = '',
				        this.taskPriority = '',
				        this.taskStart = '',
				        this.taskEnd = '',
				        this.tags = '',
				        this.$router.replace('Dashboard')
					} else {
						alert('There was an error, try again.');
					}
				} else {
					alert('Fill the task');
				}
	    	}
	    }
	}
</script>


