<template>
    <div v-if="cellData.pawn && cellData.enemyPawn" class="boardCell splitCell" :class="classObject" @click="cellClicked">
      <pawn :pawn-data="cellData.pawn" class="w-50 h-50" />
      <pawn :pawn-data="cellData.enemyPawn" class="w-50 h-50" style="margin-top: 50%; margin-left: 50%" />
    </div>
    <div v-else class="boardCell" :class="classObject" @click="cellClicked">
      <pawn v-if="cellData.pawn" :pawn-data="cellData.pawn" />
    </div>
  </template>

<script>
import { defineComponent, computed, toRefs } from 'vue'
import { CellType } from './../../GameEngine/gameEnums.js'
import Pawn from './PawnComponent.vue'
// import { BOARD_CELL_CLICKED } from './../eventsTypes.js'

export default defineComponent({
  name: 'CellComponent',
  components: { Pawn },
  props: {
    cellData: {
      type: Object,
      required: true
    }
  },
  setup (props, { emit }) {
    const { cellData } = toRefs(props)

    const classObject = computed(() => {
      let cellDefaultStyle = ''

      switch (cellData.value.type) {
        case CellType.PLAYER_ONE_PORT:
          cellDefaultStyle = 'port1'
          break
        case CellType.PLAYER_TWO_PORT:
          cellDefaultStyle = 'port2'
          break
          // ... other cases
        default:
          break
      }

      if (cellData.value.inRange) {
        cellDefaultStyle += '-range'
      }

      return [cellDefaultStyle]
    })

    const isEnable = () => {
      return cellData.value.type !== CellType.HIDDEN
    }

    const cellClicked = () => {
      if (isEnable()) {
        // console.debug(`event-emit: ${BOARD_CELL_CLICKED}`)
        // emit(BOARD_CELL_CLICKED, {
        //   col: cellData.value.col,
        //   row: cellData.value.row
        // })
      }
    }

    return { classObject, cellClicked }
  }
})
</script>

  <style lang="scss" scoped>
    // ... Your existing styles
  </style>
