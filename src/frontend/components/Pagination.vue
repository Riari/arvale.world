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
      a {
        border-color: #fff;

        &:hover {
          border-color: inherit;
        }
      }
    }

    a {
      display: inline-block;
      padding: .1em .5em .2em .5em;
      margin: .5em;
      border-radius: 3px;
      border: 1px solid rgba(255, 255, 255, .1);

      &:hover {
        border-color: rgba(255, 255, 255, .5);
      }
    }
  }
}
</style>

