<template>
    <form @submit.stop.prevent="newNewGameSubmit" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="gameNameInput" class="form-label">Enter game name</label>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            id="gameNameInput"
            v-model.trim="gameName"
            :class="{ 'is-invalid': !isGameNameValid && gameName.length, 'is-valid': isGameNameValid }"
            required
          />
          <button
            class="btn btn-primary"
            type="submit"
            :disabled="!isGameNameValid"
          >Start new game</button>
        </div>
        <div v-if="!isGameNameValid && gameName.length" class="invalid-feedback">
          {{ invalidFeedback }}
        </div>
      </div>
    </form>
  </template>

<script>
import { defineComponent, ref, computed } from 'vue'
// import { CREATE_NEW_GAME } from './../eventsTypes.js'

export default defineComponent({
  name: 'NewGameComponent',
  props: {
    gameNameMaxLength: {
      type: Number,
      default: 16
    },
    gameNameMinLength: {
      type: Number,
      default: 2
    }
  },
  setup (props, { emit }) {
    const gameName = ref('')

    const isGameNameValid = computed(() => {
      if (!gameName.value.length) {
        return null
      }
      return (
        gameName.value.length >= props.gameNameMinLength &&
          gameName.value.length <= props.gameNameMaxLength
      )
    })

    const invalidFeedback = computed(() => {
      if (gameName.value.length > props.gameNameMaxLength) {
        return `Game name is too long. Max is ${props.gameNameMaxLength}`
      } else if (gameName.value.length < props.gameNameMinLength) {
        return `Game name is too short. Min is ${props.gameNameMinLength}`
      }
      return ''
    })

    const newNewGameSubmit = () => {
    //   if (isGameNameValid.value) {
    //     console.debug(`event-emit: ${CREATE_NEW_GAME}`)
    //     emit(CREATE_NEW_GAME, { name: gameName.value })
    //     gameName.value = ''
    //   }
    }

    return { gameName, isGameNameValid, invalidFeedback, newNewGameSubmit }
  }
})
</script>

  <style scoped>
  /* Add any custom styles here */
  </style>
