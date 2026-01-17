<template>
  <v-container>
    <v-progress-linear
      v-if="loading"
      indeterminate
      class="mb-4"
    />
    <SalesTable :sales="sales" />

    <v-alert
      v-if="error"
      type="error"
      class="mt-4"
    >
      {{ error }}
    </v-alert>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getSales } from '../api/sales.api'
import SalesTable from '../components/SalesTable.vue'

const sales = ref([])
const error = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await getSales()
    sales.value = data.vendas
  } catch (err) {
    console.error('Erro:', err)
    error.value = 'Erro ao carregar vendas'
  } finally {
    loading.value = false
  }
})
</script>
