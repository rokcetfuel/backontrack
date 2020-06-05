<template>
  <div class="home" v-bind:class="{ 'sidebar-open': sidebarOpen }">
    <Navigation @resetFilters="updateFilters" @sidebarState="updateSidebar" @sidebarStateClosed="closeSidebar"/>
    <Sidebar @sidebarState="updateSidebar"/>
    <div class="main">
      <router-view :navResetFilters="navResetFilters"></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'Home',
  components: {
    Navigation,
    Sidebar
  },
  data: function() {
    return {
      sidebarOpen: false,
      navResetFilters: false,
    }
  },
  methods: {
    updateSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    closeSidebar () {
      this.sidebarOpen = false;
    },
    updateFilters() {
      this.navResetFilters = !this.navResetFilters;
    }
  }
}
</script>
