<template>
  <button :class="classesCompiled" :disabled="loading">
    <template v-if="!loading">
      <slot></slot>
    </template>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    classes: {
      type: Array,
      default: () => { return [] }
    },
    fullWidth: Boolean,
    loading: Boolean
  }
})
export default class Button extends Vue {
  get classesCompiled () {
    let base = ['button']

    if (this.loading) {
      base.push('button--loading')
    }

    if (this.fullWidth) {
      base.push('button--fullWidth')
    }

    return [ ...this.classes, ...base ]
  }
}
</script>

<style lang="scss">
@import "../../scss/variables";

.button {
  height: 44px;
  padding: .8em 2em;
  margin: 1em 0 0 0;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, .2);
  background: linear-gradient(
    to right,
    darken($color-button-bg, 8%) 0%,
    $color-button-bg 50%,
    darken($color-button-bg, 8%) 100%
  );
  color: #fff;
  font-family: 'Noto Sans', sans-serif;
  font-size: .8em;
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 0 1px 0 rgba(0, 0, 0, .2);
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 2px 4px, inset 0 0 3px lighten($color-button-bg, 15%);
  box-sizing: border-box;

  &--loading {
    animation-name: buttonLoading;
    animation-duration: 1s;
  }

  svg {
    width: 18px;
    height: 18px;
    margin-top: -2px;
    vertical-align: middle;
  }

  &:not(:disabled):hover {
    background: linear-gradient(
      to right,
      darken($color-button-bg, 5%) 0%,
      lighten($color-button-bg, 5%) 50%,
      darken($color-button-bg, 5%) 100%
    );
  }

  &:not(:disabled):active {
    margin-top: 1.1em;
    background: linear-gradient(
      to bottom,
      darken($color-button-bg, 15%) 0%,
      darken($color-button-bg, 5%) 100%
    );
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 2px 4px, inset 0 0 3px lighten($color-button-bg, 15%);
  }

  &--fullWidth {
    width: 100%;
  }
}

@keyframes buttonLoading {
  0% {
    height: 44px;
    box-shadow:
      rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,
      rgba(0, 0, 0, 0.1) 0px 2px 4px,
      inset 0 0 3px lighten($color-button-bg, 15%),
      inset 0px 0px 0px 0px rgba(0, 0, 0, 0.3);
  }
  20% {
    height: 22px;
  }
  100% {
    height: 22px;
    box-shadow:
      rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,
      rgba(0, 0, 0, 0.1) 0px 2px 4px,
      inset 0 0 3px lighten($color-button-bg, 15%),
      inset 450px 0px 0px 0px rgba(0, 0, 0, 0.3);
  }
}
</style>
