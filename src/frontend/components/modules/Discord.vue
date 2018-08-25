<template>
  <panel title="Discord Server" icon="message-square" :loading="loading">
    <transition name="fade">
      <div v-if="!loading">
        <ul class="discord-member-list">
          <li v-for="member in server.members" v-if="!member.bot" :key="member.id">
            <img :src="member.avatar_url" />
              <span class="member-details">
              {{ member.nick ? member.nick : member.username }}
              <span v-if="member.game" class="playing">
                Playing {{ member.game.name }}
              </span>
            </span>
          </li>
          <li v-if="totalMembers > maxMembers" class="others">
            <em>+ {{ totalMembers - maxMembers }} other(s)</em>
          </li>
        </ul>

        <hr>

        <div class="text-center">
          <a :href="server.instant_invite" target="_blank">Connect</a>
        </div>
      </div>
    </transition>
  </panel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DiscordService from '../../services/DiscordService'

@Component
export default class DiscordModule extends Vue {
  loading = true
  server: object
  totalMembers: number = 0
  maxMembers = 8

  created () {
    const service = new DiscordService()
    service.getServerStatus().then(response => {
      this.loading = false

      const server = response.data
      this.totalMembers = server.members.length
      server.members = server.members.slice(0, this.maxMembers)
      this.server = server
    })
  }
}
</script>

<style lang="scss">
.discord-member-list {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    height: 32px;
    margin: .5em 0;
    white-space: nowrap;

    &.others {
      margin-left: 40px;
      color: rgba(255, 255, 255, 0.5);
    }

    img {
      width: 32px;
      height: 32px;
      margin-right: .5em;
      border-radius: 16px;
      vertical-align: middle;
    }

    .member-details {
      display: inline-block;
      vertical-align: middle;
      margin-top: -.2em;

      .playing {
        display: block;
        font-size: .7em;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>
