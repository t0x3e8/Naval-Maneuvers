<!-- <template>
    <div class="row">
      <div class="col-10 col-md-5 mx-auto py-5">
        <NewPlayer @join-player="joinPlayer" />
      </div>
    </div>
  </template>

<script>
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NewPlayer from './components/NewPlayerComponent.vue'

export default {
  name: 'SignUpView',
  components: { NewPlayer },
  setup () {
    const store = useStore()
    const router = useRouter()

    const joinPlayer = async (payload) => {
      console.debug('event-on: join-player')

      await store.dispatch('signUpPlayer', payload)
      router.push({ name: 'setup' })
    }

    onMounted(() => {
      // If you need to listen for an event, consider using a global event bus or provide/inject.
    })

    return {
      joinPlayer
    }
  }
}
</script>

  <style scoped>
  .row {
    font-size: 100%;
  }
  </style> -->
