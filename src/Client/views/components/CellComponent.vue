<template>
  <div v-if="cellData.pawn && cellData.enemyPawn" class="boardCell" :class="classObject" @click="cellClicked">
    <!-- Custom classes for width and height might be needed -->
    <pawn :pawn-data="cellData.pawn" class="pawn-size" />
    <pawn :pawn-data="cellData.enemyPawn" class="pawn-size pawn-position" />
  </div>
  <div v-else class="boardCell" :class="classObject" @click="cellClicked">
    <pawn v-if="cellData.pawn" :pawn-data="cellData.pawn" class="pawnCell"/>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'
import { CellType } from './../../GameEngine/gameEnums.js'
import Pawn from './PawnComponent.vue'

export default defineComponent({
  name: 'CellComponent',
  components: { Pawn },
  props: {
    cellData: {
      type: Object,
      required: true
    }
  },
  setup (props) {
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
        case CellType.PLAYER_ONE_BATTERY:
          cellDefaultStyle = 'battery1'
          break
        case CellType.PLAYER_TWO_BATTERY:
          cellDefaultStyle = 'battery2'
          break
        case CellType.SEA:
          cellDefaultStyle = 'sea'
          break
        case CellType.NEUTRAL:
          cellDefaultStyle = 'neutral'
          break
        case CellType.PLAYER_ONE_ENTRANCE:
        case CellType.PLAYER_TWO_ENTRANCE:
          cellDefaultStyle = 'entrance'
          break
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

<style lang="scss">
  $sea-color: #1e88e5;
  $port1-color: #43a047;
  $port-entrance-color: #546e7a;
  $port2-color: #1b5e20;
  $neutral-color: #1155ff;

  .pawn-size {
    width: 50%;
    height: 50%;
  }
  .pawn-position {
    margin-top: 50%;
    margin-left: 50%;
  }
  .pawnCell {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .boardCell {
    position: relative;
    border-radius: 0%;
  }
  .port1,
  .battery1 {
    background-color: $port1-color;
  }
  .port1-range {
    background-color: darken($port1-color, 30%);
    cursor: pointer;
  }
  .port2,
  .battery2 {
    background-color: $port2-color;
  }
  .port2-range {
    background-color: darken($port2-color, 30%);
    cursor: pointer;
  }
  .neutral {
    background-color: $neutral-color;
  }
  .neutral-range {
    background-color: darken($neutral-color, 30%);
    cursor: pointer;
  }
  .sea {
    background-color: $sea-color;
  }
  .sea-range {
    background-color: darken($sea-color, 30%);
    cursor: pointer;
  }
  .entrance {
    background-color: $port-entrance-color;
  }
  .entrance-range {
    background-color: darken($port-entrance-color, 30%);
    cursor: pointer;
  }
  </style>
