<template>
  <v-container class="py-4">

    <!-- Header -->
    <div class="d-flex align-center justify-space-between mb-6">
      <h2 class="text-h6 font-weight-medium">
        Dashboard de Vendas
      </h2>

      <!-- Botão histórico -->
      <v-btn
        to="/history"
        variant="text"
        prepend-icon="mdi-history"
      >
        Histórico
      </v-btn>
    </div>

    <!-- Card total de vendas -->
    <v-row dense class="mb-6" align="stretch">
      <v-col cols="12" md="4">
        <v-card elevation="2" rounded="lg" class="pa-4 text-center">
          <v-icon size="36" color="primary">mdi-cart</v-icon>
          <div class="text-subtitle-2 font-weight-medium mt-2">Total de Vendas</div>
          <div class="text-h5 font-weight-bold mt-1">{{ sales.length }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Loading -->
    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
      rounded
      class="mb-4"
    />

    <!-- Tabela de vendas -->
    <SalesTable :sales="sales" />

    <!-- Alerta de erro -->
    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      class="mt-4"
    >
      {{ error }}
    </v-alert>

    <!-- Empty state -->
    <v-alert
      v-if="!loading && !sales.length && !error"
      type="info"
      variant="tonal"
      class="mt-4"
    >
      Nenhuma venda registrada até o momento.
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
    console.error('Erro ao carregar vendas:', err)
    error.value = 'Erro ao carregar vendas'
  } finally {
    loading.value = false
  }
})
</script>
