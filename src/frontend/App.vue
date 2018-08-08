<template>
  <div>
    <div class="container">
      <div class="top">
        <transition name="fade">
          <div v-if="server" class="server-status panel">
            Server: <span :class="{ offline: !server.online }">{{ server.online ? 'Online' : 'Offline' }}</span>
            <template v-if="server.online">
              Current Module: <span>{{ server.module_name }}</span>
              Players: <span>{{ server.current_players }} / {{ server.max_players }}</span>
            </template>
          </div>
        </transition>

        <div class="user-links panel">
          <!-- <a href="/">Log in</a>
          <span class="separator"></span>
          <a href="/">Sign up</a> -->

          Hello, <a href="/">Riari</a>
          <font-awesome-icon icon="angle-down" size="xs"></font-awesome-icon>
        </div>
      </div>

      <div class="row main-bar">
        <div class="col-xs-3 text-center">
          <img src="./static/images/logo.png">
        </div>
        <div class="col-xs-9">
          <nav class="panel">
            <a href="/">News</a>
            <a href="/">Forum</a>
            <a href="/">Player Characters</a>
            <a href="/">Events</a>
            <a href="/">Gallery</a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios'

@Component({})
export default class App extends Vue {
  server: object = null

  mounted () {
    axios.get('/api/server-status')
      .then(response => {
        console.log(response)
        this.server = Object.assign({}, { online: true }, response.data)
      })
      .catch(error => {
        this.server = { online: false }
      })
  }
}
</script>

<style lang="scss">
@import "~flexboxgrid/dist/flexboxgrid.min.css";
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

.top {
  position: absolute;
  top: 0;
  right: 1em;

  .panel {
    display: inline-block;
    height: 1.4em;
    padding: .4em 1em .6em 1em;
    margin-left: 1.2em;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .server-status {
    span {
      display: inline-block;
      color: $color-primary;

      &:not(:last-child) {
        margin-right: .6em;
      }

      &.offline {
        color: #e46938;
      }
    }
  }

  .user-links {
    padding: .4em 1em .6em 1em;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    text-align: right;

    a {
      color: $color-cta;

      &:hover {
        color: #fff;
      }
    }

    svg {
      margin-left: .2em;
      color: rgba(255, 255, 255, .5);
    }

    .separator {
      display: inline-block;
      height: 1em;
      width: 1px;
      margin: 0 .6em;
      vertical-align: middle;
      background: rgba(255, 255, 255, .2);
    }
  }
}

.main-bar {
  position: relative;
  top: 3em;
  width: 100%;
  height: 60px;

  nav {
    height: 60px;
    margin: 12px 0;
    padding: 0 .5em;
    border-radius: 3px;
    background: transparentize($color-background, .1);
    box-shadow: 0 0 10px rgba(0, 0, 0, .35);

    a {
      display: inline-block;
      padding: 0 1em;
      line-height: 58px;
      font-size: 20px;
    }
  }
}
</style>
