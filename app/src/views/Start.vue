<template>
  <div class="start">
  <img class="start-background">
    <router-view></router-view>
    <a :href="pexelsUrl" target="_blank" class="start-credit">Check out the picture at Pexels.</a>
  </div>
</template>

<script>
 
import { pexels } from '../config.js';

export default {
  name: 'Start',
  data () {
    return {
      pexelsImg: '',
      pexelsUrl: '',
    }
  },
  mounted: function () {
    pexels.getCuratedPhotos(20, 1).then(result => {
      console.log(result);
      var random = Math.floor(Math.random()*20+1);
      var backgroundImg = document.getElementsByClassName("start-background")[0];
      this.pexelsImg = result.photos[random].src.large2x;
      this.pexelsUrl = result.photos[random].url;
      backgroundImg.src = this.pexelsImg;
      backgroundImg.style.opacity = "0.6";
    });
  }
}

</script>

