
<template>
	<div class="sort">

  		<div class="app-box">
			<div class="app-box_header">
				<h6>Sort by</h6>
			</div>
			<div class="app-box_inside">

				<div class="app-box_inside-row">

					<div class="app-box_inside-col app-box_inside-content">
						<a class="sorting-icon" v-bind:class="{ active: isAscActive }" @click="sortDirection('asc')">
							<font-awesome-icon icon="sort-numeric-down"/> Ascending 
						</a>
						<a class="sorting-icon"  v-bind:class="{ active: isDescActive }" @click="sortDirection('desc')">
							<font-awesome-icon icon="sort-numeric-up"/> Descending 
						</a>
					</div>
				</div>

				<div class="app-box_inside-row">
					
					<div class="app-box_inside-col app-box_inside-content">
					
							<a class="sorting-element" v-bind:class="{ active: isTCActive }" @click="sortBy('date_created')">
								Task created
							</a>
							<a class="sorting-element" v-bind:class="{ active: isTUActive }" @click="sortBy('date_updated')">
								Task updated
							</a>
							<a class="sorting-element" v-bind:class="{ active: isTSActive }" @click="sortBy('date_start')">
								Task starts
							</a>
							<a class="sorting-element" v-bind:class="{ active: isTEActive }" @click="sortBy('date_end')">
								Task ends
							</a>
							<a class="sorting-element" v-bind:class="{ active: isCAActive }" @click="sortBy('content_low')">
								Alphabetically
							</a>
							<a class="sorting-element" v-bind:class="{ active: isPRActive }" @click="sortBy('priority')">
								Priority
							</a>
							<a class="sorting-element" v-bind:class="{ active: isSTActive }" @click="sortBy('state')">
								State
							</a>

					</div>
				</div>


			</div>
		</div>
          
	</div>
</template>

<script>

	import {firebase, db} from '../config.js';
		
	export default {
		name: 'SortTasks',
		props: ['filtersinUse'],
		data() {
			return {
				isAscActive: true,
				isDescActive: false,
				isTCActive: true,
				isTUActive: false,
				isTSActive: false,
				isTEActive: false,
				isCAActive: false,
				isPRActive: false,
				isSTActive: false
			}
		},
		watch: { 
		  	filtersinUse: function(newVal, oldVal) {
		      	if (oldVal) {
			      	this.isAscActive = true,
					this.isDescActive = false,
					this.isTCActive = true,
					this.isTUActive = false,
					this.isTSActive = false,
					this.isTEActive = false,
					this.isCAActive = false,
					this.isPRActive = false,
					this.isSTActive = false
			  	}
		    }
		},
		methods: {
		  	sortBy(what) {
		  		if (what == 'date_created') {
		  			this.isTCActive = true
					this.isTUActive = false
					this.isTSActive = false
					this.isTEActive = false
					this.isCAActive = false
					this.isPRActive = false
					this.isSTActive = false
		  		} else if (what == 'date_updated') {
		  			this.isTCActive = false
					this.isTUActive = true
					this.isTSActive = false
					this.isTEActive = false
					this.isCAActive = false
					this.isPRActive = false
					this.isSTActive = false
		  		} else if (what == 'date_start') {
		  			this.isTCActive = false
					this.isTUActive = false
					this.isTSActive = true
					this.isTEActive = false
					this.isCAActive = false
					this.isPRActive = false
					this.isSTActive = false
		  		} else if (what == 'date_end') {
		  			this.isTCActive = false
					this.isTUActive = false
					this.isTSActive = false
					this.isTEActive = true
					this.isCAActive = false
					this.isPRActive = false
					this.isSTActive = false
		  		} else if (what == 'content_low') {
		  			this.isTCActive = false
					this.isTUActive = false
					this.isTSActive = false
					this.isTEActive = false
					this.isCAActive = true
					this.isPRActive = false
					this.isSTActive = false
		  		} else if (what == 'priority') {
		  			this.isTCActive = false
					this.isTUActive = false
					this.isTSActive = false
					this.isTEActive = false
					this.isCAActive = false
					this.isPRActive = true
					this.isSTActive = false
				} else if (what == 'state') {
		  			this.isTCActive = false
					this.isTUActive = false
					this.isTSActive = false
					this.isTEActive = false
					this.isCAActive = false
					this.isPRActive = false
					this.isSTActive = true
				} else {
					this.isTCActive = true
					this.isTUActive = false
					this.isTSActive = false
					this.isTEActive = false
					this.isCAActive = false
					this.isPRActive = false
					this.isSTActive = false
				}
		  		this.$emit('sortingBy', what)
		  	},
		  	sortDirection(what) {
		  		if (what == 'asc') {
		  			this.isAscActive = true
		  			this.isDescActive = false
		  		} else {
		  			this.isAscActive = false
		  			this.isDescActive = true
		  		}
		  		this.$emit('sortingDirection', what)
		  	}
		}
	}

</script>