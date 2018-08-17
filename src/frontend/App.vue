<template>
  <layout :heading="$route.meta.title">
    <template slot="content">
      <router-view></router-view>
    </template>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Layout from './components/Layout.vue'

@Component({
  components: {
    Layout
  }
})
export default class App extends Vue {
  mounted () {
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
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
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
</style>
