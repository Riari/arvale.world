<template>
  <div class="panel" :class="classesCompiled">
    <h3 v-if="title">
      <icon v-if="icon" :name="icon"></icon> {{ title }}
    </h3>

    <div class="spinner" v-if="loading">
      <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
        <path opacity="0.2" fill="#86cf61" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
          s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
          c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
        <path fill="#86cf61" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
          C22.32,8.481,24.301,9.057,26.013,10.047z">
          <animateTransform attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="0.5s"
            repeatCount="indefinite"/>
        </path>
      </svg>
    </div>

    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Watch, Component } from 'vue-property-decorator'

@Component({
  props: {
    title: String,
    icon: String,
    loading: Boolean,
    classes: {
      type: Array,
      default: () => []
    }
  }
})
export default class Panel extends Vue {
  classesCompiled = []

  @Watch('loading')
  onLoadingChanged () {
    this.compileClasses()
  }

  created () {
    this.compileClasses()
  }

  compileClasses () {
    const classes = []

    classes.push(...this.classes)

    if (this.loading) {
      classes.push('loading')
    }

    this.classesCompiled = classes
  }
}
</script>

<style lang="scss">
@import "../../scss/variables";

.panel {
  position: relative;
  padding: 1.5em;
  border-radius: 3px;
  background: transparentize($color-background, .06);
  box-shadow: 0 0 10px rgba(0, 0, 0, .35);
  color: #fff;
  text-align: left;

  &.loading {
    overflow: hidden;
  }

  &.loading:after {
    content: '';
    position: absolute;
    top: 0;
    right: -100%;
    bottom: 0;
    left: -100%;
    transform: translateX(100%);
    z-index: 1;
    animation: slide 1s infinite;

    /*
    CSS Gradient - complete browser support from http://www.colorzilla.com/gradient-editor/
    */
    background: -moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(128,186,232,0) 99%, rgba(125,185,232,0) 100%); /* FF3.6+ */
    background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(255,255,255,0)), color-stop(50%,rgba(255,255,255,0.1)), color-stop(99%,rgba(128,186,232,0)), color-stop(100%,rgba(125,185,232,0))); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.1) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.1) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.1) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* IE10+ */
    background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,0.1) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* W3C */
  }

  &:not(:first-child) {
    margin-top: 1em;
  }

  .spinner {
    text-align: center;
  }

  h2 {
    margin-top: 0;
    font-family: 'Cinzel Decorative';
  }

  h3 {
    margin-top: -.3em;
    font-size: 1.2em;

    svg {
      float: right;
      margin-top: .1em;
      color: $color-muted;
    }
  }

  a {
    color: $color-secondary;
    text-decoration: none;

    &.dangerous {
      color: #e66d77;
    }

    &:hover {
      color: #fff;
    }
  }

  hr {
    margin: 1em 0;
    height: 2px;
    border: none;
    background-color: rgba(255, 255, 255, .1);
  }

  .menu {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: .25em -1.5em;

      a {
        display: block;
        padding: .6em 1.5em .8em 1.5em;
        background: rgba(0, 0, 0, .2);

        &:hover {
          background: rgba(0, 0, 0, .3);
        }

        &.router-link-exact-active {
          background: $color-secondary;
          color: $color-background;
        }

        svg {
          margin: .2em 0 0 0;
          float: right;
          color: #899cc7;
        }
      }
    }
  }
}
</style>

