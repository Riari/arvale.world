<template>
  <transition name="fade">
    <div v-if="server" class="server-status panel">
      Server: <span :class="{ offline: !server.online }">{{ server.online ? 'Online' : 'Offline' }}</span>
      <template v-if="server.online">
        Current Module: <span>{{ server.module_name }}</span>
        Players: <span>{{ server.current_players }} / {{ server.max_players }}</span>
      </template>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import NWNService from '../../services/NWNService'

@Component
export default class ServerStatus extends Vue {
  service: NWNService
  server: object = null
  checkInterval = null

  mounted () {
    this.service = new NWNService()

    this.checkServerStatus()
    this.checkInterval = setInterval(() => this.checkServerStatus(), 60000)
  }

  destroyed () {
    clearInterval(this.checkInterval)
  }

  checkServerStatus () {
    this.service.getServerStatus()
      .then(response => {
        const server = response.data
        server.online = true
        this.server = Object.assign({}, this.server, server)
      })
      .catch(error => this.server = { online: false })
  }
}
</script>

<style lang="scss">
@import "../../scss/variables";

.server-status {
  span {
    display: inline-block;
    color: $color-primary;

    &:not(:last-child) {
      margin-right: .6em;
    }

    &.offline {
      color: #e46938;
    }
  }
}
</style>
