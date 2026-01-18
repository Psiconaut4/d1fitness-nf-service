<template>
  <v-container>

    <!-- Voltar -->
    <v-btn
      variant="text"
      class="mb-4"
      @click="$router.back()"
    >
      Voltar
    </v-btn>

    <!-- Loading -->
    <v-progress-linear
      v-if="loading"
      indeterminate
      class="mb-4"
    />

    <!-- Erro -->
    <v-alert
      v-if="error"
      type="error"
      class="mb-4"
    >
      {{ error }}
    </v-alert>

    <!-- Sucesso -->
    <v-alert
      v-if="success"
      type="success"
      class="mb-4"
    >
      {{ success }}
    </v-alert>

    <!-- Card da venda -->
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
        <v-btn
          color="primary"
          @click="showModal = true"
        >
          Enviar DANFE por email
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Modal -->
    <SendDanfeModal
      v-if="sale"
      v-model="showModal"
      :invoice-id="sale.codigoNotaFiscal"
      :default-email="sale.entregaEmail"
      @success="handleSuccess"
    />

  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getSaleById } from '../api/sales.api'
import SendDanfeModal from '../components/SendDanfeModal.vue'

const route = useRoute()

const sale = ref(null)
const loading = ref(true)
const error = ref(null)
const success = ref(null)
const showModal = ref(false)

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

function handleSuccess() {
  success.value = 'DANFE enviada com sucesso'
}
</script>
