<template>
  <div>
    <div class="container">
      <div class="top-bar">
        <img src="./static/images/logo.png">
        <nav>
          <a href="/">News</a>
          <a href="/">Forum</a>
          <a href="/">Player Characters</a>
          <a href="/">Events</a>
          <a href="/">Gallery</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class App extends Vue {
  climbable = true
}
</script>

<style lang="scss">
@import "scss/variables";
@import url("https://fonts.googleapis.com/css?family=Cinzel+Decorative|Neuton:400,400i,700");

html, body {
  padding: 0;
  margin: 0;
  background: $color-background url('./static/images/bg.jpg') no-repeat top center;
  background-size: cover;
  font-family: Neuton, sans-serif;
  font-size: 18px;
}

.container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
}

.top-bar {
  position: relative;
  top: 80px;
  width: 100%;
  height: 60px;

  img {
    float: left;
  }

  nav {
    float: right;
    margin: 10px 0;
    height: 60px;
    width: 80%;
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .35);
    background: transparentize(lighten($color-background, 5%), .1);

    a {
      display: inline-block;
      padding: 0 1em;
      line-height: 58px;
      font-family: Neuton, serif;
      font-size: 20px;
      color: rgba(255, 255, 255, .75);
      text-decoration: none;

      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
