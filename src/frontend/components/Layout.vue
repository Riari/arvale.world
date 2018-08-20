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

        <div v-if="canUser('administrate')" class="admin-links panel">
          <router-link to="/admin">Admin dashboard &nbsp; <i data-feather="sliders"></i></router-link>
        </div>

        <div v-show="!isUserAuthenticated" class="user-links panel">
          <router-link to="/user/login">Log in</router-link>
          <span class="separator"></span>
          <router-link to="/user/signup">Sign up</router-link>
        </div>
        <router-link
          v-show="isUserAuthenticated"
          to="/user/account"
          class="account panel"
          @mouseenter.native="showUserMenu"
          @mouseleave.native="hideUserMenu"
        >
          Hello, <span>{{ user.name }}</span> <i data-feather="chevron-down"></i>
        </router-link>
        <transition name="fade">
          <div
            v-show="isUserMenuVisible"
            @mouseenter="showUserMenu"
            @mouseleave="hideUserMenu"
            class="user-menu"
          >
            <ul>
              <li><router-link to="/user/account">Account settings <i data-feather="settings"></i></router-link></li>
              <li><a @click="logOut()" href="#">Log out <i data-feather="log-out"></i></a></li>
            </ul>
          </div>
        </transition>
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
        <h1>{{ heading }}</h1>
        <div class="leaf">
          <img src="../static/images/leaf.png">
        </div>
        <slot name="content">
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import feather from 'feather-icons'
import { UserStateMixin } from '../mixins/UserState'
import NWNService from '../services/NWNService'

@Component({
  props: {
    heading: {
      type: String,
      required: true
    }
  }
})
export default class Layout extends mixins(UserStateMixin) {
  service: NWNService
  server: object = null
  checkServerStatusInterval = null
  hideUserMenuTimeout = null
  isUserMenuVisible = false

  mounted () {
    this.service = new NWNService()

    this.checkServerStatus()
    this.checkServerStatusInterval = setInterval(() => this.checkServerStatus(), 60000)

    this.$nextTick(() => feather.replace())
  }

  destroyed () {
    clearInterval(this.checkServerStatusInterval)
  }

  checkServerStatus () {
    this.service.getServerStatus()
      .then(response => {
        const server = response.data
        server.online = true
        this.server = Object.assign({}, this.server, server)
      })
      .catch(error => this.server = { online: false })
  }

  showUserMenu () {
    this.isUserMenuVisible = true

    if (this.hideUserMenuTimeout) {
      clearInterval(this.hideUserMenuTimeout)
    }
  }

  hideUserMenu () {
    this.hideUserMenuTimeout = setTimeout(() => this.isUserMenuVisible = false, 500)
  }

  logOut () {
    this.$store.dispatch('logOut')
    this.$toasted.show("Logged out. See you around!", { type: 'success' })
    this.isUserMenuVisible = false
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
    border-radius: 0;
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

  .account {
    position: relative;

    &:hover {
      background: transparentize(lighten($color-background, 10%), .1);

      svg {
        opacity: .5;
      }
    }

    &:active {
      background: transparentize(darken($color-background, 5%), .1);
    }
  }

  .account,
  .user-menu {
    span {
      color: $color-highlight;
    }

    svg {
      width: 22px;
      height: 22px;
      margin: -2px -2px 0 0;
      opacity: .3;
    }
  }

  .user-menu {
    z-index: 1000;
    position: absolute;
    top: 50px;
    right: 0;
    border-radius: 3px;
    background: $color-background;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .35);

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      text-align: right;

      li {
        white-space: nowrap;

        &:not(:last-child) {
          border-bottom: 1px solid lighten($color-background, 10%);
        }

        a {
          display: block;
          padding: .6em 1.2em .7em 1.2em;
          color: #fff;

          &:first-child {
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
          }

          &:last-child {
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
          }

          &:hover {
            background: lighten($color-background, 4%);
          }

          svg {
            width: 16px;
            height: 16px;
            margin: -3px -2px 0 4px;
          }
        }
      }
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
    margin: .6em 0 1.2em 0;
    text-align: center;
  }
}
</style>
