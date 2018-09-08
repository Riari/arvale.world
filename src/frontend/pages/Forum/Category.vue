<template>
  <div class="row">
    <div class="col-xs-9">
      <panel :title="category.name" :loading="loading">
        <div v-if="category.children && category.children.length">
          <hr>
          <h3>Subcategories</h3>
          <forum-category-row v-for="child in category.children" :key="child.id" :category="child" :link="true" :showDetails="true"></forum-category-row>
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
