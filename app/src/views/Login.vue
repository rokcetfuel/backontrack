<template>
	<div class="login">
	<b-container fluid>
	<b-row>
	    <b-col class="login-content">
	    	<h1 class="login-name">Log in</h1>
	    	<router-link to="/hello" class="login-back btn btn-light">Go back</router-link>
	    	<router-link to="/register" class="login-back btn btn-light">Create an account</router-link>
	    	<b-form class="login-form">
				<b-form-group>
					<b-form-input id="login_email" v-model="email" type="email" placeholder="Email"></b-form-input>
				</b-form-group>
				<b-form-group>
					<b-form-input id="login_password" v-model="password" type="password" placeholder="Password"></b-form-input>
				</b-form-group>
				<b-form-group class="text-center">
					<b-button class="btn btn-light m-2" @click="login">Login</b-button>
					<b-button class="btn m-2" @click="socialLogin" variant="danger">Sign in with Google</b-button>
				</b-form-group>
			</b-form>
		</b-col>
	</b-row>
	</b-container>
	</div>
</template>

<script>
	import { firebase, db } from '../config.js';

	let usersRef = db.ref('users');

	export default {
		name: 'Login',
		data() {
			return {
				email: '',
				password: ''
			};
		},
		methods: {
			login() {
				firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
					this.$router.replace('Home')
				}).catch((err) => {
					alert('Oops. ' + err.message)
				});
			},
			socialLogin() {
				const provider = new firebase.auth.GoogleAuthProvider();
				firebase.auth().signInWithPopup(provider).then((result) => {
					if (result.additionalUserInfo.isNewUser) {
						let userID = firebase.auth().currentUser.uid;
						let userEmail = firebase.auth().currentUser.email;
						let today = Date.now();
						usersRef.child(userID).update({
				       		"user_email": userEmail,
			          		"user_created": today
				   		});
					}
					this.$router.replace('Home')
				}).catch((err) => {
					alert('Something went wrong... ' + err.message)
				});
			}
		}
	}
</script>





