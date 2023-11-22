<template>
    <b-card no-body class="bg-light">
      <b-form novalidate @submit.prevent="onJoin">
        <b-form-group
          :invalid-feedback="invalidFeedback"
          label-for="playerNameInput"
          label="Enter player name"
          label-size="lg"
          :state="isPlayerNameValid"
        >
          <b-input-group class="pl-3">
            <b-form-input
              id="playerNameInput"
              v-model.trim="playerName"
              type="text"
              required
              :state="isPlayerNameValid"
            ></b-form-input>
            <b-input-group-append>
              <b-button
                size="sm"
                variant="primary"
                type="submit"
                :disabled="!isPlayerNameValid"
              >
                Join
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-form>
    </b-card>
  </template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'NewPlayerComponent',
  setup () {
    const playerName = ref('')
    const playerNameMaxLength = 16
    const playerNameMinLength = 2

    const isPlayerNameValid = computed(() => {
      if (!playerName.value.length) {
        return null
      }

      return (
        playerName.value.length > playerNameMinLength &&
          playerName.value.length < playerNameMaxLength
      )
    })

    const invalidFeedback = computed(() => {
      if (playerName.value.length >= playerNameMaxLength) {
        return `Player name is too long. Max is ${playerNameMaxLength}`
      } else if (playerName.value.length <= playerNameMinLength) {
        return `Player name is too short. Min is ${playerNameMinLength}`
      }

      return ''
    })

    // const eventBus = useEventBus() // Replace with your event bus initialization

    const onJoin = () => {
      // if (isPlayerNameValid.value) {
      //   console.debug('event-emit: join-player')
      //   eventBus.emit('join-player', { playerName: playerName.value })
      // }
    }

    return {
      playerName,
      isPlayerNameValid,
      invalidFeedback,
      onJoin
    }
  }
}
</script>
