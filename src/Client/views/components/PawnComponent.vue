<template>
    <component :is="icon" class="pawnIcon" :class="[pawnData.selected ? 'selected' : '']" @click="pawnClicked" />
  </template>

<script>
import { defineComponent, ref, watch, toRefs } from 'vue'
import _ from 'underscore'
// import { BOARD_CELL_CLICKED } from './../eventsTypes.js'

export default defineComponent({
  name: 'PawnComponent',
  props: {
    pawnData: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props, { emit }) {
    const { pawnData } = toRefs(props)
    const icon = ref(null)

    watch(pawnData, (newValue) => {
      if (_.isNull(newValue.svgName) || _.isUndefined(newValue.svgName)) {
        icon.value = null
      } else {
        icon.value = () => import(
            /* webpackMode: "eager" */
            `./pawns/${newValue.svgName}`
        )
      }
    }, { immediate: true })

    const pawnClicked = () => {
    //   console.debug(`event-emit: ${BOARD_CELL_CLICKED}`)
    //   emit(BOARD_CELL_CLICKED, {
    //     col: pawnData.value.col,
    //     row: pawnData.value.row
    //   })
    }

    return { icon, pawnClicked }
  }
})
</script>

  <style module>
    .pawnIcon {
      position: absolute;
      display: block;
    }

    .selected circle {
      fill: white;
    }
  </style>
