<template>
  <div class="create-ml page">
    <HotTable :settings="settings"></HotTable>
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'

export default {
  name: 'home',
  components: {
    HotTable
  },
  data () {
    return {
      settings: {
        data: [
          ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
          ['2016', 10, 11, 12, 13],
          ['2017', 20, 11, 14, 13],
          ['2018', 30, 15, 12, 13]
        ],
        colHeaders: true,
        rowHeaders: true
      }
    }
  }
}
</script>
<style scoped>
.create-ml {
}
</style>
