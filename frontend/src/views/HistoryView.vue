<template>
  <v-container>
    <h2 class="mb-4">Histórico de Envios</h2>

    <v-progress-linear v-if="loading" indeterminate />

    <v-btn
      variant="text"
      @click="$router.back()"
      class="mb-4"
    >
      Voltar
    </v-btn>

    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert>

    <v-table v-if="history.length">
      <thead>
        <tr>
          <th>NF</th>
          <th>Email</th>
          <th>Status</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in history" :key="item.sentAt">
          <td>{{ item.invoiceId }}</td>
          <td>{{ item.email }}</td>
          <td>
            <v-chip
              :color="item.status === 'SUCCESS' ? 'green' : 'red'"
              size="small"
            >
              {{ item.status }}
            </v-chip>
          </td>
          <td>{{ new Date(item.sentAt).toLocaleString() }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getSendHistory } from '../api/history.api'

const history = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const { data } = await getSendHistory()
    history.value = data
  } catch {
    error.value = 'Erro ao carregar histórico'
  } finally {
    loading.value = false
  }
})
</script>
