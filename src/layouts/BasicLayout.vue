<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BasicLayout',
  data() {
    return {
      menus: [],
      collapsed: false,
      title: 'aa',
      settings: {
        layout: 'sidemenu',
        theme: 'dark'
      },
      query: {},
      isMobile: false
    }
  }
})
</script>
