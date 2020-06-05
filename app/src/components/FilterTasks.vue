
<template>
	<div class="filter">

  		<div class="app-box">
			<div class="app-box_header">
				<h6>Filter</h6>
			</div>
			<div class="app-box_inside">
				<div class="app-box_inside-row">

					<div class="app-box_inside-col app-box_inside-content container-fluid">

						<div class="row">
							<div class="filter-col-elem col-12 col-sm-6 col-xl-3">
								<p>Task Created</p>
								<datetime placeholder="After" value-zone="local"></datetime>
								<datetime placeholder="Before" value-zone="local"></datetime>
							</div>
							<div class="filter-col-elem col-12 col-sm-6 col-xl-3">
								<p>Task Updated</p>
								<datetime placeholder="After" value-zone="local"></datetime>
								<datetime placeholder="Before" value-zone="local"></datetime>
							</div>
							<div class="filter-col-elem col-12 col-sm-6 col-xl-3">
								<p>Task Start</p>
								<datetime placeholder="After" value-zone="local"></datetime>
								<datetime placeholder="Before" value-zone="local"></datetime>
							</div>
							<div class="filter-col-elem col-12 col-sm-6 col-xl-3">
								<p>Task End</p>
								<datetime placeholder="After" value-zone="local"></datetime>
								<datetime placeholder="Before" value-zone="local"></datetime>
							</div>
						</div>

						<div class="row">
							<div class="col-12 col-sm-4">
								Content
							</div>
							<div class="col-12 col-sm-4">
								Priority
							</div>
							<div class="col-12 col-sm-4">
								State
							</div>
						</div>

					</div>

				</div>
			</div>
		</div>
          
	</div>
</template>

<script>

	import {firebase, db} from '../config.js';
	import { Datetime } from 'vue-datetime';
	import 'vue-datetime/dist/vue-datetime.css';
	import { Settings as LuxonSettings } from 'luxon';
	LuxonSettings.defaultLocale = 'en-UK';
		
	export default {
		name: 'FilterTasks',
		components: { Datetime },

	}

</script>