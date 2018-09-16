<template>
  <span>
    <a
      href="#"
      class="account panel"
      @click="toggleUserMenu"
      @mouseenter.native="showUserMenu"
      @mouseleave.native="hideUserMenu"
    >
      Hello, <span :style="{ color: usernameColor }">{{ user.name }}</span> <icon name="chevron-down"></icon>
    </a>
    <transition name="fade">
      <div
        v-show="isVisible"
        @mouseenter="showUserMenu"
        @mouseleave="hideUserMenu"
        class="user-menu"
      >
        <ul>
          <li><router-link to="/user/account">Account settings <icon name="settings"></icon></router-link></li>
          <li><a @click="logOut($event)" href="#">Log out <icon name="log-out"></icon></a></li>
        </ul>
      </div>
    </transition>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    user: {
      type: Object,
      required: true
    }
  }
})
export default class UserMenu extends Vue {
  hideTimeout = null
  isVisible = false

  get usernameColor () {
    return this.user.roles.length ? this.user.roles[0].colour : '#fff'
  }

  toggleUserMenu (event) {
    event.preventDefault()
    this.isVisible ? this.hideUserMenu() : this.showUserMenu()
  }

  showUserMenu () {
    this.isVisible = true

    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout)
    }
  }

  hideUserMenu () {
    this.hideTimeout = setTimeout(() => this.isVisible = false, 500)
  }

  logOut (event) {
    event.preventDefault()
    this.$store.dispatch('logOut')
    this.$toasted.show("Logged out. See you around!", { type: 'success' })
    this.isVisible = false
  }
}
</script>

<style lang="scss">
@import "../../scss/variables";

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
    svg {
      width: 22px;
      height: 22px;
      margin: -2px -2px 0 0;
      color: #fff;
      opacity: .3;
    }
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
</style>
