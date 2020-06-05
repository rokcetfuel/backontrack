<template>
  <div class="sidebar">
  	<div class="sidebar-container">
  		<div class="sidebar-top">

  			<router-link to="/dashboard/sort">
		  		<div class="sidebar-element" @click="toggleSidebar">
		  			<div class="sidebar-element_icon">
		  				<font-awesome-icon icon="sort-amount-down"/>
		  			</div>
		  			<div class="sidebar-element_content">
		  				<a>Sort</a>
		  			</div>
		  		</div>
		  	</router-link>

  			<router-link to="/dashboard/tags">
		  		<div class="sidebar-element" @click="toggleSidebar">
		  			<div class="sidebar-element_icon">
		  				<font-awesome-icon icon="tags"/>
		  			</div>
		  			<div class="sidebar-element_content">
		  				<a>Tags</a>
		  			</div>
		  		</div>
		  	</router-link>

  			<router-link to="/calendar">
		  		<div class="sidebar-element" @click="toggleSidebar">
		  			<div class="sidebar-element_icon">
		  				<font-awesome-icon icon="calendar"/>
		  			</div>
		  			<div class="sidebar-element_content">
			        	<a>Weekly</a>
		  			</div>
		  		</div>
	  		</router-link>

	  	</div>
	  	<router-link to="/account">
		  	<div class="sidebar-bottom">
		  		<div class="sidebar-element" @click="toggleSidebar">
		  			<div class="sidebar-element_icon">
		  				<font-awesome-icon icon="user"/>
		  			</div>
		  			<div class="sidebar-element_content">
		  				<a>Account</a>
		  			</div>
		  		</div>
		  	</div>
	  	</router-link>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  methods: {
  	toggleSidebar: function() {
  		this.$emit("sidebarState");
  	}
  }
}
</script>

