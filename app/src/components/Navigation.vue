<template>
  <div class="navigation">

  	<div class="navbar-container">
  		<div class="navbar-start">
	  		<div class="navbar-toggle hidden-lg-up">
	  			<a class="navbar-toggle_icon" @click="toggleSidebar">
	  				<div class="navbar-toggle_icon-bar one"></div>
	  				<div class="navbar-toggle_icon-bar two" ></div>
	  				<div class="navbar-toggle_icon-bar three"></div>
	  			</a>
	  		</div>
	  		<div class="navbar-title">
	  			<h6 @click="closeSidebar(); resetF();">
	  			<router-link to="/dashboard">BackOnTrack</router-link>
	  			</h6>
	  		</div>
	  	</div>
	  	<div class="navbar-end">
	  		<div class="navbar-content">
	  			<div class="navbar-content_add" @click="closeSidebar">
	  				<router-link to="/add-task">
	  					<font-awesome-icon icon="plus-circle"/>
	  				</router-link>
	  			</div>
	  		</div>
	  	</div>
  	</div>
  </div>
</template>

<script>
	import Dashboard from '../views/pages/Dashboard.vue'

	export default {
	  name: 'Navigation',
	  methods: {
	  	toggleSidebar: function() {
	  		this.$emit("sidebarState");
	  	},
	  	closeSidebar: function() {
	  		this.$emit("sidebarStateClosed");
	  	},
	  	resetF: function() {
	  		this.$emit("resetFilters");
	  	}
	  }
	}
</script>
