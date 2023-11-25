<template>
    <inline-svg :src="icon" class="pawnIcon" :class="[pawnData.selected ? 'selected' : '']"></inline-svg>
</template>

<script>
import { ref, watch, computed } from 'vue'
import InlineSvg from 'vue-inline-svg'
import { useSettingsStore } from './../../stores/settingsStore'

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
    const settingsStore = useSettingsStore()
    const pawnsPath = computed(() => settingsStore.PawnsResourcePathInPublicFolder)
    const icon = ref(null)

    watch(() => props.pawnData, (newPawnDataValue) => {
      icon.value = newPawnDataValue.svgName ? `${pawnsPath.value}/${newPawnDataValue.svgName}` : null
    }, { immediate: true })

    return { icon }
  }
})
</script>

<style scoped>
  .pawnIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
  }
</style>
