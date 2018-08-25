<template>
  <div class="container">
    <div class="top">
      <server-status></server-status>

      <div v-if="canUser('administrate')" class="admin-links panel">
        <router-link to="/admin">Admin console &nbsp; <icon name="sliders"></icon></router-link>
      </div>

      <div v-show="!isUserAuthenticated" class="user-links panel">
        <router-link to="/user/login">Log in</router-link>
        <span class="separator"></span>
        <router-link to="/user/signup">Sign up</router-link>
      </div>
      <user-menu v-show="isUserAuthenticated" :user="user">
      </user-menu>
    </div>

    <div class="row main-bar">
      <div class="col-xs-3 text-center">
        <router-link class="logo" to="/">
          <img src="../static/images/logo.png">
        </router-link>
      </div>
      <div class="col-xs-9">
        <nav class="panel">
          <router-link to="/">News</router-link>
          <router-link to="/forum">Forum</router-link>
        </nav>
      </div>
    </div>

    <div class="content">
      <h1>{{ $route.meta.title }}</h1>
      <div class="leaf">
        <img src="../static/images/leaf.png">
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import { UserStateMixin } from '../mixins/UserState'
import ServerStatus from './top-bar/ServerStatus.vue'
import UserMenu from './top-bar/UserMenu.vue'

@Component({
  components: { ServerStatus, UserMenu }
})
export default class Viewport extends mixins(UserStateMixin) {
}
</script>

<style lang="scss">
@import "../scss/variables";

.top {
  position: absolute;
  top: 0;
  right: 1em;
  height: 100px;

  .panel {
    display: inline-block;
    height: 1.4em;
    padding: .4em 1em .6em 1em;
    margin-left: 1.2em;
    border-radius: 0;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;

    a {
      color: rgba(255, 255, 255, .75);
    }
  }

  .admin-links,
  .user-links {
    .separator {
      display: inline-block;
      height: 1em;
      width: 1px;
      margin: 0 .6em;
      vertical-align: middle;
      background: rgba(255, 255, 255, .2);
    }
  }

  .user-links {
    padding: .4em 1em .6em 1em;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    text-align: right;

    a {
      color: $color-highlight;

      &:hover {
        color: #fff;
      }
    }

    svg {
      margin-left: .2em;
      color: rgba(255, 255, 255, .5);
    }
  }
}

.main-bar {
  position: relative;
  top: 3.4em;
  width: 100%;
  height: 60px;

  a.logo {
    transition: filter .2s;

    &:hover {
      filter: brightness(1.05);
    }
  }

  nav {
    height: 60px;
    margin: 4px 0;
    padding: 0 .5em;
    border-radius: 3px;
    background: transparentize($color-background, .1);
    box-shadow: 0 0 10px rgba(0, 0, 0, .35);

    a {
      display: inline-block;
      padding: 0 1em;
      line-height: 58px;
      font-size: 20px;
      color: rgba(255, 255, 255, .75);
    }
  }
}

.content {
  position: relative;
  top: 60px;
  margin: 0 1em;

  h1 {
    margin: .8em 0 0 0;
    font-family: 'Cinzel Decorative', cursive;
    text-align: center;
    text-shadow: 0 0 3px rgba(34, 46, 77, 0.4), 0 0 50px rgba(34, 46, 77, 0.5);
  }

  .leaf {
    margin: .2em 0 1.2em 0;
    text-align: center;
  }
}
</style>
