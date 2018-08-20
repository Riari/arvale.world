<template>
  <div class="admin container">
    <div class="label panel">Admin Console</div>

    <div class="top">
      <server-status></server-status>

      <div class="panel">
        <router-link to="/">Return to front page &nbsp; <icon name="home"></icon></router-link>
      </div>

      <user-menu :user="$store.state.auth.user"></user-menu>
    </div>

    <nav class="panel">
      <router-link to="/admin">Dashboard</router-link>
      <router-link to="/admin/users">Users</router-link>
    </nav>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ServerStatus from '../top-bar/ServerStatus.vue'
import UserMenu from '../top-bar/UserMenu.vue'

@Component({
  components: { ServerStatus, UserMenu }
})
export default class AdminViewport extends Vue {
}
</script>

<style lang="scss">
@import "../../scss/variables";

.label.panel {
  position: absolute;
  top: 0;
  left: 1em;
  height: 1.4em;
  padding: .4em 1em .6em 1em;
  border-radius: 0;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  text-transform: uppercase;
  background: #333;
}

.admin {
  padding-top: 3.6em;

  nav {
    margin: 0 .85em;
    padding: 0 1.5em;
    font-size: 1.2em;
    line-height: 60px;

    a {
      &:not(:first-child) {
        margin-left: 1em;
      }

      &.router-link-exact-active {
        color: #fff;
      }
    }
  }

  .actions {
    height: 44px;
    padding: 1em;
    text-align: right;

    .button {
      margin-top: 0;

      &:not(:disabled):active {
        margin-top: .1em;
      }
    }
  }

  .content {
    top: auto;
    margin: 1.2em 1em;
  }
}
</style>
