
<template>
	<div class="account">
		<div class="app-box">
			<div class="app-box_header">
				<h6>Account</h6>
				<b-button class="btn btn-light" @click="logout">Log out</b-button>
			</div>
			<div class="app-box_inside">
				<div class="app-box_inside-row">
					<div class="app-box_inside-col app-box_inside-brand">
						<p>e-mail</p>
					</div>
					<div class="app-box_inside-col app-box_inside-content">
						<p>{{user.email}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import { firebase, db } from '../../config.js';

	let user = {
		id: '',
		email: ''
	};

	firebase.auth().onAuthStateChanged(function(fuser) {
		if (fuser) {
			user.id = fuser.uid;
			user.email = fuser.email;
		} 
	});

	export default {
		name: 'Account',
		data () {
	      return {
	        user: {
	        	id: user.id,
	        	email: user.email
	        }
	      }
	    },
		methods: {
			logout: function() {
				firebase.auth().signOut().then(() => {
					this.$router.replace('hello')
				})
			}
		}
	}
</script>

