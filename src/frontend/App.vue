<template>
  <div>
    <app-view></app-view>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
  beforeCreate () {
    this.$store.dispatch('initialise')
  }

  mounted () {
    this.$Progress.finish()
  }

  created () {
    this.$Progress.start()

    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        this.$Progress.parseMeta(meta)
      }

      this.$Progress.start()

      next()
    })

    this.$router.afterEach((to, from) => {

      this.$Progress.finish()
    })
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Cinzel+Decorative|Neuton:400,400i,700");
@import "scss/variables";
@import "scss/grid/main";

html, body {
  padding: 0;
  margin: 0;
  background: #12151d url('./static/images/bg.jpg') no-repeat top center;
  background-size: 100%;
  font-family: Neuton, sans-serif;
  font-size: 18px;
}

h1, h2, h3 {
  font-family: 'Neuton', sans-serif;
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

@media screen and (max-width: 41em) {
  h1 {
    font-size: 1.8em;
  }

  h2 {
    font-size: 1.5em;
  }

  h3 {
    font-size: 1.2em;
  }
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

table {
  width: 100%;
  text-align: left;

  th, td {
    padding: .5em 1em;
    border-bottom: 1px solid rgba(255, 255, 255, .1);
  }

  td.actions {
    a {
      display: inline-block;
      margin-right: .5em;
    }
  }
}

code {
  padding: .2em;
  background: rgba(255, 69, 69, 0.3);
  font-size: 1rem;
  color: #ffbdbd;
}

pre {
  code {
    display: block;
    padding: .5em;
    border-radius: 3px;
    background: rgb(36, 37, 37);
    color: rgb(233, 233, 233);
  }
}

@media screen and (max-width: 41em) {
  .row-gutterless-xs {
    & > div {
      padding: 0;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.text-muted {
  color: rgba(255, 255, 255, .5);
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.container {
  position: relative;
  margin: 0 auto;
}

.empty {
  padding: 2em;
  margin: .5em 0;
  border-radius: 5px;
  background: rgba(255, 255, 255, .05);
  font-size: 1.2em;
  text-align: center;

  svg {
    width: 48px;
    height: 48px;
    color: $color-muted;
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

.inputWrapper {
  position: relative;

  .input {
    padding: .8em 1.2em;
    margin: .5em 0;
    border: none;
    border-radius: 2px;
    background: #fff;
    font-size: .9em;
    font-family: 'Neuton', sans-serif;
    color: $color-background;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 2px 4px;
    box-sizing: border-box;
    transition: box-shadow .2s;

    &::placeholder {
      color: $color-background;
      opacity: .65;
    }

    &:focus {
      outline: none;
      box-shadow: #21469480 0px 0px 0px 3px;
    }

    &--fullWidth {
      width: 100%;
    }

    &--error {
      box-shadow: #c9002180 0px 0px 0px 3px;
    }
  }

  .inputError {
    z-index: 1000;
    position: absolute;
    left: 100%;
    top: 50%;
    padding: .4em .6em;
    margin-left: 15px;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 2px 4px;
    background: #c90021ee;
    font-size: .9em;
    color: #fff;
    white-space: nowrap;
    transform: translateY(-50%);
  }
}

@keyframes slide {
	0% { transform: translateX(-100%); }
	100% { transform: translateX(100%); }
}
</style>
