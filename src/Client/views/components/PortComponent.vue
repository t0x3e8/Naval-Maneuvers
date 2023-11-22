<template>
    <div id="port" class="my-2 container">
      <div class="row justify-content-end">
        <button class="btn btn-outline-primary" @click="refreshPortSetup">
          <i class="bi bi-arrow-repeat"></i> New port layout
        </button>
      </div>
      <div v-for="(columns, rowIndex) in board.cells" :key="`1${rowIndex}`" class="row g-0">
        <div v-for="(cell, colIndex) in columns" :key="`2${colIndex}`" class="col">
          <cell :cell-data="cell" class="cell" />
        </div>
      </div>
    </div>
  </template>

<script>
import { ref } from 'vue'
import PortBoard from '../../GameEngine/portBoard.js'
import Cell from './CellComponent.vue'

export default {
  name: 'PortComponent',
  components: { Cell },

  setup () {
    const board = ref(new PortBoard())

    const refreshPortSetup = () => {
      console.debug('event: \'refreshPortSetup\'')
      board.value = new PortBoard()
    }

    return { refreshPortSetup, board }
  }
}
</script>

<style>
  .cell {
    width: 100%;
    padding-bottom: 100%;
    border: 1px white solid;
  }
</style>
