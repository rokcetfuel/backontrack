<template>
	<div class="tags">
    	
		<div class="tags-wrapper">

				<span class="single-tag-wrapper" 
				v-for="(tagObj, tagObjKey) in tags" 
				@click="chooseTag(tagObj.id, tagObjKey)" 
				:class="{ active: tagObj.isTagActive  }" >
					<a>#{{tagObj.tag.name}}</a>
				</span>
	
		</div>

	</div>
</template>

<script>

import {firebase, db} from '../config.js'

let userID = '';
let userTagsRef = '';
let tags = [];

export default {
  	name: 'Tags',
  	props: ['filtersinUse'],
  	data () {
  		return {
  			tags: [],
  		}
  	},
  	watch: { 
	  	filtersinUse: function(newVal, oldVal) {
	      	if (oldVal) {
		      	for (var a = 0; a < this.tags.length; a++) {
					this.tags[a].isTagActive = false;
		  		}
		  	}
	    }
	},
  	beforeMount () {
		if (firebase.auth().currentUser) {
			userID = firebase.auth().currentUser.uid;
			userTagsRef = db.ref('users/'+userID+'/tags/').orderByChild('name');
			userTagsRef.on('value', (snapshot) => {
				let tagsArray = []; let i = 0;
				snapshot.forEach(function(child) {
					if (child.val().tasks) {
						tagsArray[i] = { 'isTagActive':false, 'id':child.key, 'tag':child.val() };
						i++;
					}
				});
				this.tags = tagsArray.reverse();
			});
		}
	},
	methods: {
	  	chooseTag(what, key) {
	  		for (var a = 0; a < this.tags.length; a++) {
				this.tags[a].isTagActive = false;
	  		}
		  	this.tags[key].isTagActive = true;
	  		this.$emit('choosingTag', what);
	  	}
	}
}
</script>
