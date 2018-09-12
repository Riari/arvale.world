<template>
  <div class="forum-category-index row">
    <div class="col-xs-9">
      <panel :title="category.name" :loading="loading">
        <router-link to="/forum">← Return to forum index</router-link>
        <div v-if="category.children && category.children.length">
          <hr>
          <div class="row">
            <div class="col-xs-5">
              <div class="title">Subcategories</div>
            </div>
            <div class="col-xs-2 thread-count-header">
              Threads
            </div>
            <div class="col-xs-2 post-count-header">
              Posts
            </div>
            <div class="col-xs-3 latest-post-header">
              Latest post
            </div>
          </div>
          <forum-category-row
            v-for="child in category.children"
            :key="child.id"
            :category="child"
          ></forum-category-row>
        </div>
        <v-button :route="{ name: 'forum-category-create-thread', params: { id: category.id } }">
          Create thread
        </v-button>
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
import ForumCategoryRow from '../../components/Forum/CategoryRow.vue'

@Component({ components: { ForumCategoryRow } })
export default class ForumCategory extends Vue {
  loading = true

  category = {
    name: null,
    children: null
  }

  created () {
    const service = new ForumCategoryService()
    service.getByID(parseInt(this.$route.params.id)).then(response => {
      const category = response.data
      this.$title = category.name
      this.category = category
      this.loading = false
    })
  }
}
</script>

<style lang="scss">
.forum-category-index {
  .forum-category {
    padding: .5em 1.5em;
    font-size: 1em;
  }
}
</style>
