<template>
  <ul class="pagination">
    <li v-for="page in pages" :key="page" :class="{ selected: page == currentPage }">
      <router-link :to="{ path, query: { page }}">
        {{ page }}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    currentPage: Number,
    path: String,
    pages: Number
  }
})
export default class Pagination extends Vue {
}
</script>

<style lang="scss">
@import "../scss/variables";

ul.pagination {
  display: block;
  margin: 1em 0;
  padding: 0;
  text-align: center;

  li {
    display: inline-block;

    &.selected {
      a, a:hover {
        background: $color-secondary;
        color: $color-background;
        cursor: default;
      }
    }

    a {
      display: inline-block;
      padding: .1em .6em .3em .6em;
      margin: .5em;
      border-radius: 3px;
      background: rgba(255, 255, 255, .05);

      &:hover {
        background: rgba(255, 255, 255, .1);
      }
    }
  }
}
</style>

