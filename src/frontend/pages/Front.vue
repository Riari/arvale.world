<template>
  <div class="row">
    <div class="col-xs-3">
      <discord-module></discord-module>
    </div>
    <div class="col-xs-6">
      <news-module></news-module>
    </div>
    <div class="col-xs-3">
      <user-module></user-module>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DiscordModule from '../components/modules/Discord.vue'
import NewsModule from '../components/modules/News.vue'
import UserModule from '../components/modules/User.vue'

@Component({
  components: { DiscordModule, NewsModule, UserModule }
})
export default class Front extends Vue {
}
</script>
