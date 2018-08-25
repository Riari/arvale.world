import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

const options = {
  color: '#fff',
  failedColor: '#c11948',
  thickness: '3px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  inverse: false
}

Vue.use(VueProgressBar, options)
