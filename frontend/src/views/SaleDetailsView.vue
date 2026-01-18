<template>
  <v-container>
    <v-btn
      variant="text"
      @click="$router.back()"
      class="mb-4"
    >
      Voltar
    </v-btn>

    <v-progress-linear
      v-if="loading"
      indeterminate
      class="mb-4"
    />

    <v-alert
      v-if="error"
      type="error"
    >
      {{ error }}
    </v-alert>

    <v-card v-if="sale">
      <v-card-title>
        Venda #{{ sale.codigoVenda }}
      </v-card-title>

      <v-card-text>
        <p><strong>Cliente:</strong> {{ sale.clienteNome }}</p>
        <p><strong>Email:</strong> {{ sale.entregaEmail }}</p>
        <p><strong>Data:</strong> {{ sale.dataVenda }}</p>
        <p><strong>Valor Total:</strong> R$ {{ sale.valorTotal }}</p>
        <p><strong>Status:</strong> {{ sale.descricaoStatus }}</p>
        <p><strong>Código NF:</strong> {{ sale.codigoNotaFiscal }}</p>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary">
          Enviar DANFE por email
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getSaleById } from '../api/sales.api'

const route = useRoute()

const sale = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const saleId = route.params.saleId
    const { data } = await getSaleById(saleId)
    sale.value = data
  } catch (err) {
    error.value = 'Erro ao carregar detalhes da venda'
  } finally {
    loading.value = false
  }
})
</script>
