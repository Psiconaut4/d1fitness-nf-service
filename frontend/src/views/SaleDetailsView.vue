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
        <v-btn color="primary" @click="showModal = true">
          Enviar DANFE por email
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="showModal" max-width="400">
        <v-card>
            <v-card-title>
                Enviar DANFE
            </v-card-title>
            <v-card-text>
                <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                />
            </v-card-text>

            <v-card-actions>
                <v-spacer />

                <v-btn
                variant="text"
                @click="showModal = false"
                >
                Cancelar
                </v-btn>

                <v-btn
                color="primary"
                :loading="sending"
                @click="handleSendDanfe"
                >
                Enviar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getSaleById } from '../api/sales.api'
import { sendDanfeByEmail } from '../api/danfe.api'

const route = useRoute()

const showModal = ref(false)
const email = ref('')
const sending = ref(false)
const success = ref(null)
const sale = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const saleId = route.params.saleId
    const { data } = await getSaleById(saleId)
    sale.value = data
    email.value = data.entregaEmail
  } catch (err) {
    error.value = 'Erro ao carregar detalhes da venda'
  } finally {
    loading.value = false
  }
})

async function handleSendDanfe() {
    if (!email.value) {
        error.value = 'Por favor, insira um email válido.'
        return
    }

    sending.value = true
    error.value = null
    success.value = null

    try {
        await sendDanfeByEmail(sale.value.codigoNotaFiscal, {
            email: email.value,
        })

        success.value = 'DANFE enviado com sucesso!'
        showModal.value = false
    } catch (err) {
        error.value = 'Erro ao enviar DANFE. Tente novamente.'
    } finally {
        sending.value = false
    }
}
</script>
