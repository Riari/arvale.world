<template>
  <router-view></router-view>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
  beforeCreate () {
    this.$store.dispatch('initialise')
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Cinzel+Decorative|Neuton:400,400i,700");
@import "~flexboxgrid/dist/flexboxgrid.min.css";
@import "scss/variables";

html, body {
  padding: 0;
  margin: 0;
  background: $color-background url('./static/images/bg.jpg') no-repeat top center;
  background-size: cover;
  font-family: Neuton, sans-serif;
  font-size: 18px;
}

h1, h2, h3 {
  font-family: 'Noto Sans', sans-serif;
  color: #fff;
}

h1 {
  font-size: 3em;
}

h2 {
  font-size: 2.2em;
}

h3 {
  font-size: 1.4em;
}

a {
  text-decoration: none;

  svg {
    width: 18px;
    height: 18px;
    margin-top: -2px;
    vertical-align: middle;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.text-center {
  text-align: center;
}

.container {
  position: relative;
}

.panel {
  padding: 2em;
  border-radius: 3px;
  background: transparentize($color-background, .1);
  box-shadow: 0 0 10px rgba(0, 0, 0, .35);
  color: #fff;

  a {
    color: rgba(255, 255, 255, .75);
    text-decoration: none;

    &:hover {
      color: #fff;
    }
  }
}

.toasted-container {
  .toasted.primary {
    padding: .5em 2em;
    border: 1px solid rgba(0, 0, 0, .2);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 2px 4px;
    font-size: 1.3em;
  }
}
</style>
