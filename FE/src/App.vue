
<template>
  <RouterView />
  <AppNotifications />
</template>

<script setup>
import {  RouterView } from 'vue-router'
import { mapActions } from 'vuex'
import NProgress from 'nprogress'
import AppNotifications from '@/components/AppNotifications.vue'
export default {
  name: 'App',
  components: { AppNotifications ,RouterView },
  data () {
    return {
      showPage: false
    }
  },
  created () {
    NProgress.configure({
      speed: 200,
      showSpinner: false
    })
    this.$router.beforeEach(() => {
      this.showPage = false
      NProgress.start()
    })
  }
}
</script>