<template>
  <span :class="classes">
    <template v-if="route">
      <router-link :to="route">
        <slot></slot>
      </router-link>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: tag => ['primary', 'secondary', 'warning', 'danger'].includes(tag)
    },
    route: String
  }
})
export default class Tag extends Vue {
  get classes () {
    const classes = ['tag']

    classes.push(this.type)

    return classes
  }
}
</script>

<style lang="scss">
@import "../../scss/variables";

.tag {
  display: inline-block;
  padding: .1em .6em .2em .6em;
  border-radius: 3px;
  background: rgba(255, 255, 255, .1);
  font-size: .9em;
  vertical-align: middle;

  &.primary {
    color: $color-primary;
  }

  &.secondary {
    color: $color-secondary;
  }

  &.warning {
    color: $color-warning;
  }

  &.danger {
    color: $color-danger;
  }
}
</style>
