
<template>
  <div>
    <RouterView />
  <AppNotifications />
  </div>

</template>

<script lang="ts" >
import {  RouterView } from 'vue-router'
import NProgress from 'nprogress'
import AppNotifications from './components/AppNotifications.vue'
export default {
  name: 'App',
  components: { AppNotifications ,RouterView },
}
</script>