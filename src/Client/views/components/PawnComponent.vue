<template>
    <inline-svg :src="icon" class="pawnIcon" :class="[pawnData.selected ? 'selected' : '']" @click="pawnClicked"></inline-svg>
</template>

<script>
import { ref, watch, inject, computed } from 'vue'
import InlineSvg from 'vue-inline-svg'

export default ({
  name: 'PawnComponent',
  components: { InlineSvg },
  props: {
    pawnData: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const settings = inject('settings')
    const pawnsPath = computed(() => settings.PawnsResourcePathInPublicFolder)
    const icon = ref(null)

    watch(() => props.pawnData, (newPawnDataValue) => {
      icon.value = newPawnDataValue.svgName ? `${pawnsPath.value}${newPawnDataValue.svgName}` : null
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

<style scoped>
    .pawnIcon {
      position: absolute;
      display: block;
      /* Use viewport units that depend on the size of the screen */
      width: 10vw;
      height: 10vw; /* Adjust the height to maintain the aspect ratio */
      max-width: 100px; /* Maximum size to prevent it from getting too large */
      max-height: 100px; /* Maximum height to match the max-width */
    }

    /* Use media queries for responsiveness */
    @media (max-width: 768px) {
        .pawnIcon {
            width: 15vw;
            height: 15vw;
            max-width: 75px;
            max-height: 75px;
        }
    }

    .selected circle {
      fill: white;
    }
</style>
