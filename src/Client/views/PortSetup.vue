<template>
    <div class="container-fluid mt-0">
        <div class="row g-0">
            <div class="col-1">
                <button class="btn btn-outline-primary" @click="refreshPortSetup">
                    <i class="bi bi-arrow-repeat"></i> Random port layout
                </button>
              </div>
            <div class="col-1">
                <button class="btn btn-outline-primary" @click="savePortSetup">
                    <i class="bi bi-arrow-repeat"></i> Save
                </button>
            </div>
        </div>
        <div class="row g-0">
            <div class="col-8">
              <h3>This will be your default Port setting in the next games.</h3>
            </div>
          </div>
        <div class="row g-0">
            <div class="col-8">
                <div id="port">
                    <div v-for="(columns, rowIndex) in board.cells" :key="`1${rowIndex}`" class="row g-0">
                        <div v-for="(cell, colIndex) in columns" :key="`2${colIndex}`" class="col">
                            <cell :cell-data="cell" class="cell" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import PortBoard from './../GameEngine/portBoard.js'
import Cell from './components/CellComponent.vue'
import { usePlayerStore } from '../stores/playerStore'

export default {
  name: 'PortSetupView',
  components: {
    Cell
  },
  setup () {
    const board = ref(new PortBoard())
    const playerStore = usePlayerStore()

    onMounted(() => {
      playerStore.loadPortSettings()
      const pawnsRestored = playerStore.defaultPortSettings
      board.value.initializePawns(pawnsRestored)
    })

    const refreshPortSetup = () => {
      console.debug('event: \'refreshPortSetup\'')
      board.value = new PortBoard()
      board.value.initializePawns()
    }

    const savePortSetup = () => {
      console.debug('event: \'savePortSetup\'')
      playerStore.defaultPortSettings = board.value.toPawnArray()
      playerStore.savePortSettings()
    }

    return { board, refreshPortSetup, savePortSetup }
  }
}
</script>

  <style scoped>
  .cell {
    width: 100%;
    padding-bottom: 100%;
    border: 1px white dashed;
  }
</style>
