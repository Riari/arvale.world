<template>
  <div class="row">
    <div class="col-xs-9">
      <panel title="Forum index">
        <forum-category v-for="category in categories" :key="category.id" :category="category"></forum-category>
      </panel>
    </div>
    <div class="col-xs-3">
      <panel title="Latest threads" icon="activity">
      </panel>
      <panel title="Latest posts" icon="activity">
      </panel>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ForumCategoryService from '../../services/Forum/CategoryService'
import ForumCategory from '../../components/Forum/Category.vue'

@Component({
  title: 'Forum',
  components: {
    ForumCategory
  }
})
export default class ForumIndex extends Vue {
  categories = []

  created () {
    const service = new ForumCategoryService()
    service.list().then(response => this.categories = response.data)
  }
}
</script>
