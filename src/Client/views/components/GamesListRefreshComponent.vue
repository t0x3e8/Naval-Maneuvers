<template>
    <button class="btn btn-link w-100" @click="refresh">
      <b-tooltip target="refreshButton" placement="top">
        Click to refresh list
      </b-tooltip>
      <div id="refreshButton">
        <progress class="progress progress-success" :value="value" :max="maxValue" style="width: 100%; height: 4px;"></progress>
      </div>
    </button>
  </template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
// import { REFRESH_GAMES_LIST } from './../eventsTypes.js'

export default defineComponent({
  name: 'GamesListRefreshComponent',
  setup (_, { emit }) {
    const maxValue = ref(60)
    const value = ref(60)
    const interval = 1000
    let timer = null

    const refresh = () => {
    //   console.debug(`event-emit: ${REFRESH_GAMES_LIST}`)
    //   emit(REFRESH_GAMES_LIST)
    //   value.value = maxValue.value
    }

    onMounted(() => {
      timer = setInterval(() => {
        if (value.value === 0) {
          refresh()
        } else {
          value.value -= 1
        }
      }, interval)
    })

    onBeforeUnmount(() => {
      clearInterval(timer)
    })

    return { maxValue, value, refresh }
  }
})
</script>

  <style scoped>
  /* Add any custom styles here */
  </style>
