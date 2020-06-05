<template>
	<div class="calendar">
	    
		<div class="calendar-day-switcher">
			<div class="calendar-day-switcher_arrow" @click="prevWeek()">
				<font-awesome-icon icon="arrow-left"/>
			</div>
			<div class="calendar-day-switcher_date">
				<span class="month">{{startOfWeekMonth}} </span>
				<span class="days">{{startOfWeekDisplay}}-{{endOfWeekDisplay}} </span>
				<span class="year">{{startOfWeekYear}}</span>
			</div>
			<div class="calendar-day-switcher_arrow"  @click="nextWeek()">
				<font-awesome-icon icon="arrow-right"/>
			</div>
		</div>

		<div class="calendar_back-to-current" v-if="notCurrentWeek" >
			<a @click="backToCurrentWeek()">Back to current week</a>
		</div>

		<div class="calendar-container">

			<div class="calendar-row">
				<div class="calendar-col cal-col-left">

					<!-- MONDAY -->

					<div class="calendar-col_header">
						<span class="day-numb">{{currentMonVar | formatDateDD}}</span>
						<span class="day-name">MON</span>
						<span class="day-today" v-if="currentMonVar.format('DD/MM/YYYY') == today">TODAY</span>
					</div>
					<div class="calendar-col_content">
						<div v-if="startingMonTasks.length" class="calendar-col_content-starting">
							<div class="cal-content_header">
								<font-awesome-icon icon="arrow-right"/> Starting
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in startingMonTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="progressMonTasks.length" class="calendar-col_content-inprogresss">
							<div class="cal-content_header">
								<font-awesome-icon icon="sync-alt"/> In progress
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in progressMonTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="endingMonTasks.length" class="calendar-col_content-ending">
							<div class="cal-content_header">
								<font-awesome-icon icon="arrow-left"/> Ending
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in endingMonTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="!startingMonTasks.length && !progressMonTasks.length && !endingMonTasks.length" class="calendar-col_content-starting">
							<div class="cal-content_header">Nothing here.</div>
						</div>
					</div>
				</div>

				<!-- TUESDAY -->

				<div class="calendar-col">
					<div class="calendar-col_header">
						<span class="day-numb">{{currentTueVar | formatDateDD}}</span>
						<span class="day-name">TUE</span>
						<span class="day-today" v-if="currentTueVar.format('DD/MM/YYYY') == today">TODAY</span>
					</div>
					<div class="calendar-col_content">
						<div v-if="startingTueTasks.length" class="calendar-col_content-starting">
							<div class="cal-content_header">
								<font-awesome-icon icon="arrow-right"/> Starting
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in startingTueTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="progressTueTasks.length" class="calendar-col_content-inprogresss">
							<div class="cal-content_header">
								<font-awesome-icon icon="sync-alt"/> In progress
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in progressTueTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="endingTueTasks.length" class="calendar-col_content-ending">
							<div class="cal-content_header">
								<font-awesome-icon icon="arrow-left"/> Ending
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in endingTueTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="!startingTueTasks.length && !progressTueTasks.length && !endingTueTasks.length" class="calendar-col_content-starting">
							<div class="cal-content_header">Nothing here.</div>
						</div>
					</div>
				</div>
			</div>

			<div class="calendar-row">

				<!-- WEDNESDAY -->

				<div class="calendar-col cal-col-left">
					<div class="calendar-col_header">
						<span class="day-numb">{{currentWedVar | formatDateDD}}</span>
						<span class="day-name">WED</span>
						<span class="day-today" v-if="currentWedVar.format('DD/MM/YYYY') == today">TODAY</span>
					</div>
					<div class="calendar-col_content">
						<div v-if="startingWedTasks.length" class="calendar-col_content-starting">
							<div class="cal-content_header">
								<font-awesome-icon icon="arrow-right"/> Starting
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in startingWedTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="progressWedTasks.length" class="calendar-col_content-inprogresss">
							<div class="cal-content_header">
								<font-awesome-icon icon="sync-alt"/> In progress
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in progressWedTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="endingWedTasks.length" class="calendar-col_content-ending">
							<div class="cal-content_header">
								<font-awesome-icon icon="arrow-left"/> Ending
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in endingWedTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="!startingWedTasks.length && !progressWedTasks.length && !endingWedTasks.length" class="calendar-col_content-starting">
							<div class="cal-content_header">Nothing here.</div>
						</div>
					</div>
				</div>

				<!-- THURSDAY -->

				<div class="calendar-col">
					<div class="calendar-col_header">
						<span class="day-numb">{{currentThuVar | formatDateDD}}</span>
						<span class="day-name">THU</span>
						<span class="day-today" v-if="currentThuVar.format('DD/MM/YYYY') == today">TODAY</span>
					</div>
					<div class="calendar-col_content">
						<div v-if="startingThuTasks.length" class="calendar-col_content-starting">
							<div class="cal-content_header">
								<font-awesome-icon icon="arrow-right"/> Starting
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in startingThuTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="progressThuTasks.length" class="calendar-col_content-inprogresss">
							<div class="cal-content_header">
								<font-awesome-icon icon="sync-alt"/> In progress
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in progressThuTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="endingThuTasks.length" class="calendar-col_content-ending">
							<div class="cal-content_header">
								<font-awesome-icon icon="arrow-left"/> Ending
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in endingThuTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="!startingThuTasks.length && !progressThuTasks.length && !endingThuTasks.length" class="calendar-col_content-starting">
							<div class="cal-content_header">Nothing here.</div>
						</div>
					</div>
				</div>
			</div>

			<div class="calendar-row">

				<!-- FRIDAY -->

				<div class="calendar-col cal-col-left">
					<div class="calendar-col_header">
						<span class="day-numb">{{currentFriVar | formatDateDD}}</span>
						<span class="day-name">FRI</span>
						<span class="day-today" v-if="currentFriVar.format('DD/MM/YYYY') == today">TODAY</span>
					</div>
					<div class="calendar-col_content">
						<div v-if="startingFriTasks.length" class="calendar-col_content-starting">
							<div class="cal-content_header">
								<font-awesome-icon icon="arrow-right"/> Starting
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in startingFriTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="progressFriTasks.length" class="calendar-col_content-inprogresss">
							<div class="cal-content_header">
								<font-awesome-icon icon="sync-alt"/> In progress
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in progressFriTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="endingFriTasks.length" class="calendar-col_content-ending">
							<div class="cal-content_header">
								<font-awesome-icon icon="arrow-left"/> Ending
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in endingFriTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="!startingFriTasks.length && !progressFriTasks.length && !endingFriTasks.length" class="calendar-col_content-starting">
							<div class="cal-content_header">Nothing here.</div>
						</div>
					</div>
				</div>

				<!-- SATURDAY -->

				<div class="calendar-col">
					<div class="calendar-col_header">
						<span class="day-numb">{{currentSatVar | formatDateDD}}</span>
						<span class="day-name">SAT</span>
						<span class="day-today" v-if="currentSatVar.format('DD/MM/YYYY') == today">TODAY</span>
					</div>
					<div class="calendar-col_content">
						<div v-if="startingSatTasks.length" class="calendar-col_content-starting">
							<div class="cal-content_header">
								<font-awesome-icon icon="arrow-right"/> Starting
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in startingSatTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="progressSatTasks.length" class="calendar-col_content-inprogresss">
							<div class="cal-content_header">
								<font-awesome-icon icon="sync-alt"/> In progress
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in progressSatTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="endingSatTasks.length" class="calendar-col_content-ending">
							<div class="cal-content_header">
								<font-awesome-icon icon="arrow-left"/> Ending
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in endingSatTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="!startingSatTasks.length && !progressSatTasks.length && !endingSatTasks.length" class="calendar-col_content-starting">
							<div class="cal-content_header">Nothing here.</div>
						</div>
					</div>
				</div>
			</div>

			<div class="calendar-row">

				<!-- SUNDAY -->

				<div class="calendar-col cal-col-left">
					<div class="calendar-col_header">
						<span class="day-numb">{{currentSunVar | formatDateDD}}</span>
						<span class="day-name">SUN</span>
						<span class="day-today" v-if="currentSunVar.format('DD/MM/YYYY') == today">TODAY</span>
					</div>
					<div class="calendar-col_content">
						<div v-if="startingSunTasks.length" class="calendar-col_content-starting">
							<div class="cal-content_header">
								<font-awesome-icon icon="arrow-right"/> Starting
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in startingSunTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="progressSunTasks.length" class="calendar-col_content-inprogresss">
							<div class="cal-content_header">
								<font-awesome-icon icon="sync-alt"/> In progress
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in progressSunTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="endingSunTasks.length" class="calendar-col_content-ending">
							<div class="cal-content_header">
								<font-awesome-icon icon="arrow-left"/> Ending
							</div>
							<div>
								<div class="cal-task-row" v-for="taskObj in endingSunTasks">
									<div class="cal-task-state" v-if="taskObj.task.state == 'done'">
										<font-awesome-icon :icon="['far', 'check-square']" />
									</div>
									<div class="cal-task-state" v-else>
										<font-awesome-icon :icon="['far', 'square']" />
									</div>
									<router-link class="cal-task-link" :to="'/edit-task/'+taskObj.id">
										<div class="cal-task-text">{{taskObj.task.content}}</div>
									</router-link>
								</div>
							</div>
						</div>
						<div v-if="!startingSunTasks.length && !progressSunTasks.length && !endingSunTasks.length" class="calendar-col_content-starting">
							<div class="cal-content_header">Nothing here.</div>
						</div>
					</div>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	import moment from 'moment'
	import {firebase, db} from '../../config.js'

	/* 

	1. Make array of tasks
	2. For each day check:
	(first format all dates to ddmmyyyy)
	 - what starts, (date_start = current date )
	 - what is in between (tasks datestart < current < datend)
	 - and what ends (date_end = current date )



	*/

	let userID = '';
	let userTasksRef = '';
	let userTaskRef = '';
	let userTasks = '';
	let tasks = '';

export default {
  name: 'Calendar',
  data() {
  	return {
  		today: moment().format('DD/MM/YYYY'),
  		currentStartOfWeek: '',
  		startOfWeek: '',
		endOfWeek: '',
		startOfWeekDisplay: '',
		startOfWeekMonth: '',
		startOfWeekYear: '',
		endOfWeekDisplay: '',
		currentMonVar: '',
		currentTueVar: '',
		currentWedVar: '',
		currentThuVar: '',
		currentFriVar: '',
		currentSatVar: '',
		currentSunVar: '',
		notCurrentWeek: false,
		tasks: [],
		startingMonTasks: [],
		startingTueTasks: [],
		startingWedTasks: [],
		startingThuTasks: [],
		startingFriTasks: [],
		startingSatTasks: [],
		startingSunTasks: [],
		progressMonTasks: [],
		progressTueTasks: [],
		progressWedTasks: [],
		progressThuTasks: [],
		progressFriTasks: [],
		progressSatTasks: [],
		progressSunTasks: [],
		endingMonTasks: [],
		endingTueTasks: [],
		endingWedTasks: [],
		endingThuTasks: [],
		endingFriTasks: [],
		endingSatTasks: [],
		endingSunTasks: [],
  	}
  },
  beforeMount () {

  	this.startOfWeek = moment().startOf('isoWeek').toDate();
	this.endOfWeek   = moment().endOf('isoWeek').toDate();
	this.startOfWeekDisplay = moment(this.startOfWeek).format('DD');
	this.startOfWeekMonth = moment(this.startOfWeek).format('MMMM');
	this.startOfWeekYear = moment(this.startOfWeek).format('YYYY');
	this.endOfWeekDisplay = moment(this.endOfWeek).format('DD');

	this.currentMonVar = moment(this.startOfWeek);
	this.currentTueVar = moment(this.startOfWeek).add(1, 'days');
	this.currentWedVar = moment(this.startOfWeek).add(2, 'days');
	this.currentThuVar = moment(this.startOfWeek).add(3, 'days');
	this.currentFriVar = moment(this.startOfWeek).add(4, 'days');
	this.currentSatVar = moment(this.startOfWeek).add(5, 'days');
	this.currentSunVar = moment(this.startOfWeek).add(6, 'days');

	this.currentStartOfWeek = moment( this.startOfWeek ).format('x');

  	if (firebase.auth().currentUser) {
		let userID = firebase.auth().currentUser.uid;
		let userTasksRef = db.ref('users/'+userID+'/tasks/');
		userTasksRef.on('value', (snapshot) => {
			let tasksArray = []; let i = 0;
			snapshot.forEach(function(child) {
				tasksArray[i] = { 'id': child.key, 'task': child.val() };
				i++;
			});
			this.tasks = tasksArray;
			this.checkDaysTasks(this.currentMonVar);
			this.checkDaysTasks(this.currentTueVar);
			this.checkDaysTasks(this.currentWedVar);
			this.checkDaysTasks(this.currentThuVar);
			this.checkDaysTasks(this.currentFriVar);
			this.checkDaysTasks(this.currentSatVar);
			this.checkDaysTasks(this.currentSunVar);
		});
	}
  },
  methods: {
  	prevWeek() {
  		this.startOfWeek = moment(this.startOfWeek).subtract(7, 'days').toDate();
  		this.endOfWeek = moment(this.endOfWeek).subtract(7, 'days').toDate();
  		this.startOfWeekDisplay = moment(this.startOfWeek).format('DD');
		this.startOfWeekMonth = moment(this.startOfWeek).format('MMMM');
		this.startOfWeekYear = moment(this.startOfWeek).format('YYYY');
		this.endOfWeekDisplay = moment(this.endOfWeek).format('DD');

		this.currentMonVar = moment(this.startOfWeek);
		this.currentTueVar = moment(this.startOfWeek).add(1, 'days');
		this.currentWedVar = moment(this.startOfWeek).add(2, 'days');
		this.currentThuVar = moment(this.startOfWeek).add(3, 'days');
		this.currentFriVar = moment(this.startOfWeek).add(4, 'days');
		this.currentSatVar = moment(this.startOfWeek).add(5, 'days');
		this.currentSunVar = moment(this.startOfWeek).add(6, 'days');

		let compareStartOfWeek = moment( this.startOfWeek ).format('x');
		if (compareStartOfWeek == this.currentStartOfWeek) {this.notCurrentWeek = false;} 
		else {this.notCurrentWeek = true;}

		this.checkDaysTasks(this.currentMonVar);
		this.checkDaysTasks(this.currentTueVar);
		this.checkDaysTasks(this.currentWedVar);
		this.checkDaysTasks(this.currentThuVar);
		this.checkDaysTasks(this.currentFriVar);
		this.checkDaysTasks(this.currentSatVar);
		this.checkDaysTasks(this.currentSunVar);

  	},
  	nextWeek() {
  		this.startOfWeek = moment(this.startOfWeek).add(7, 'days').toDate();
  		this.endOfWeek = moment(this.endOfWeek).add(7, 'days').toDate();
  		this.startOfWeekDisplay = moment(this.startOfWeek).format('DD');
		this.startOfWeekMonth = moment(this.startOfWeek).format('MMMM');
		this.startOfWeekYear = moment(this.startOfWeek).format('YYYY');
		this.endOfWeekDisplay = moment(this.endOfWeek).format('DD');

		this.currentMonVar = moment(this.startOfWeek);
		this.currentTueVar = moment(this.startOfWeek).add(1, 'days');
		this.currentWedVar = moment(this.startOfWeek).add(2, 'days');
		this.currentThuVar = moment(this.startOfWeek).add(3, 'days');
		this.currentFriVar = moment(this.startOfWeek).add(4, 'days');
		this.currentSatVar = moment(this.startOfWeek).add(5, 'days');
		this.currentSunVar = moment(this.startOfWeek).add(6, 'days');

		let compareStartOfWeek = moment( this.startOfWeek ).format('x');
		if (compareStartOfWeek == this.currentStartOfWeek) {this.notCurrentWeek = false;} 
		else {this.notCurrentWeek = true;}

		this.checkDaysTasks(this.currentMonVar);
		this.checkDaysTasks(this.currentTueVar);
		this.checkDaysTasks(this.currentWedVar);
		this.checkDaysTasks(this.currentThuVar);
		this.checkDaysTasks(this.currentFriVar);
		this.checkDaysTasks(this.currentSatVar);
		this.checkDaysTasks(this.currentSunVar);
		
  	},
  	backToCurrentWeek() {
  		this.notCurrentWeek = false;
	  	this.startOfWeek = moment().startOf('isoWeek').toDate();
		this.endOfWeek   = moment().endOf('isoWeek').toDate();
		this.startOfWeekDisplay = moment(this.startOfWeek).format('DD');
		this.startOfWeekMonth = moment(this.startOfWeek).format('MMMM');
		this.startOfWeekYear = moment(this.startOfWeek).format('YYYY');
		this.endOfWeekDisplay = moment(this.endOfWeek).format('DD');
		
		this.currentMonVar = moment(this.startOfWeek);
		this.currentTueVar = moment(this.startOfWeek).add(1, 'days');
		this.currentWedVar = moment(this.startOfWeek).add(2, 'days');
		this.currentThuVar = moment(this.startOfWeek).add(3, 'days');
		this.currentFriVar = moment(this.startOfWeek).add(4, 'days');
		this.currentSatVar = moment(this.startOfWeek).add(5, 'days');
		this.currentSunVar = moment(this.startOfWeek).add(6, 'days');

		this.checkDaysTasks(this.currentMonVar);
		this.checkDaysTasks(this.currentTueVar);
		this.checkDaysTasks(this.currentWedVar);
		this.checkDaysTasks(this.currentThuVar);
		this.checkDaysTasks(this.currentFriVar);
		this.checkDaysTasks(this.currentSatVar);
		this.checkDaysTasks(this.currentSunVar);
	},
	checkDaysTasks(day) {
		
		let thatDay = day.format('DD/MM/YYYY');
		let thatDayMilis = day.format('x');
		let thatDayNum = moment(day).isoWeekday();
		let startingArray = [];
		let progressArray = [];
		let endingArray = [];

		for (var i = 0; i < this.tasks.length; i++) {

			if (this.tasks[i].task.date_start) {
				let dateStart = moment(this.tasks[i].task.date_start).format('DD/MM/YYYY');
				if (dateStart == thatDay) {
					startingArray.push(this.tasks[i]);
				}
			}

			if (this.tasks[i].task.date_start && this.tasks[i].task.date_end) {
				let dateStart = this.tasks[i].task.date_start;
				let dateEnd = this.tasks[i].task.date_end;
				if (thatDayMilis > dateStart && thatDayMilis < dateEnd) {
					progressArray.push(this.tasks[i]);
				}
			}

			if (this.tasks[i].task.date_end) {
				let dateEnd = moment(this.tasks[i].task.date_end).format('DD/MM/YYYY');
				if (dateEnd == thatDay) {
					endingArray.push(this.tasks[i]);
				}
			}
		}

		if (thatDayNum == 1) {
			this.startingMonTasks = startingArray;
			this.progressMonTasks = progressArray;
			this.endingMonTasks = endingArray;
		} else if (thatDayNum == 2) {
			this.startingTueTasks = startingArray;
			this.progressTueTasks = progressArray;
			this.endingTueTasks = endingArray;
		} else if (thatDayNum == 3) {
			this.startingWedTasks = startingArray;
			this.progressWedTasks = progressArray;
			this.endingWedTasks = endingArray;
		} else if (thatDayNum == 4) {
			this.startingThuTasks = startingArray;
			this.progressThuTasks = progressArray;
			this.endingThuTasks = endingArray;
		} else if (thatDayNum == 5) {
			this.startingFriTasks = startingArray;
			this.progressFriTasks = progressArray;
			this.endingFriTasks = endingArray;
		} else if (thatDayNum == 6) {
			this.startingSatTasks = startingArray;
			this.progressSatTasks = progressArray;
			this.endingSatTasks = endingArray;
		} else if (thatDayNum == 7) {
			this.startingSunTasks = startingArray;
			this.progressSunTasks = progressArray;
			this.endingSunTasks = endingArray;
		} 
		
	}
  }
}
</script>






