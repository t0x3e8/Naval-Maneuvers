<template>
    <div id="port" class="my-2 container">
      <div class="row justify-content-end" no-gutters>
        <button class="btn btn-outline-primary" @click="refreshPortSetup">
          <i class="bi bi-arrow-repeat"></i> New port layout
        </button>
      </div>
      <div v-for="(columns, rowIndex) in board.cells" :key="`1${rowIndex}`" class="row no-gutters">
        <div v-for="(cell, colIndex) in columns" :key="`2${colIndex}`" class="col">
          <cell :cell-data="cell" class="cell" />
        </div>
      </div>
    </div>
  </template>

<script>
import { defineComponent } from 'vue'
import Cell from './CellComponent.vue'
// import { REFRESH_PORT_LAYOUT } from './../eventsTypes.js'

export default defineComponent({
  name: 'PortComponent',
  components: { Cell },
  props: {
    board: {
      type: Object,
      default: () => ({})
    }
  },
  setup (_, { emit }) {
    const refreshPortSetup = () => {
    //   console.debug(`event-emit: ${REFRESH_PORT_LAYOUT}`)
    //   emit(REFRESH_PORT_LAYOUT)
    }

    return { refreshPortSetup }
  }
})
</script>

  <style>
    .cell {
      width: 100%;
      padding-bottom: 100%;
      border: 1px white solid;
    }
  </style>
