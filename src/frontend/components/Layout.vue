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
          <template v-if="!$store.state.auth.isAuthenticated">
            <router-link to="user/login">Log in</router-link>
            <span class="separator"></span>
            <router-link to="user/signup">Sign up</router-link>
          </template>
          <template v-else>
            Hello, <router-link to="user">{{ $store.state.auth.user.name }}</router-link>
          </template>
        </div>
      </div>

      <div class="row main-bar">
        <div class="col-xs-3 text-center">
          <router-link to="/">
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
        <h1>{{ heading }}</h1>
        <slot name="content">
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import NWNService from '../services/NWNService'

@Component({
  props: {
    heading: {
      type: String,
      required: true
    }
  }
})
export default class Layout extends Vue {
  server: object = null

  mounted () {
    const service = new NWNService()
    service.getServerStatus()
      .then(response => {
        this.server = Object.assign({}, { online: true }, response.data)
      })
      .catch(error => {
        this.server = { online: false }
      })
  }
}
</script>

<style lang="scss">
@import "../scss/variables";

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

.content {
  position: relative;
  top: 60px;
  margin: 0 1em;

  h1 {
    text-align: center;
  }
}
</style>
