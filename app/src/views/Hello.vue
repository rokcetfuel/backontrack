<template>
  <div class="hello">
    <b-container>
    	<b-row>
    		<b-col cols="12" class="text-center">
    			<!--<b-row>
    				<b-col sm="4"></b-col>
    				<b-col sm="4" class="floating">
              <img src="../assets/img/logo512.png" class="hello-logo">
            </b-col>
    				<b-col sm="4"></b-col>
    			</b-row> -->
          <b-row>
            <b-col sm="1"></b-col>
            <b-col sm="10">
              <h1 class="hello-name">Back On Track</h1>
              <p class="hello-text">In other words, get stuff done.</p>
              <router-link class="btn btn-light hello-login" to="/login">Log in</router-link>
              <router-link class="btn btn-light hello-register" to="/register">Register</router-link>
            </b-col>
            <b-col sm="1"></b-col>
          </b-row>
		    </b-col>
	    </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'Hello'
}

</script>

