<template>
  <v-container class="py-4">

    <!-- Header da tela -->
    <div class="d-flex align-center justify-space-between mb-6">
      <div class="d-flex align-center">
        <v-btn variant="text" icon="mdi-arrow-left" @click="$router.back()" />
        <div class="ml-3">
          <div class="d-flex align-center ga-2">
            <h2 class="text-h6 font-weight-medium">
              Venda #{{ sale?.codigoVenda || '...' }}
            </h2>

            <v-chip v-if="sale" size="small" :color="sale.descricaoStatus === 'Cancelada' ? 'error' : 'success'"
              variant="tonal">
              {{ sale.descricaoStatus }}
            </v-chip>
          </div>

          <span class="text-caption text-medium-emphasis">
            Nota Fiscal: {{ sale?.codigoNotaFiscal || '-' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <v-progress-linear v-if="loading" indeterminate color="primary" rounded class="mb-4" />

    <!-- Erro -->
    <v-alert v-if="error" type="error" variant="tonal" class="mb-4">
      {{ error }}
    </v-alert>

    <!-- Sucesso -->
    <v-alert v-if="success" type="success" variant="tonal" class="mb-4">
      {{ success }}
    </v-alert>

    <!-- Card principal -->
    <v-card v-if="sale" elevation="2" rounded="lg">
      <!-- Conteúdo -->
      <v-card-text class="pa-6">
        <v-row dense>

          <!-- Bloco: Cliente -->
          <v-col cols="12" md="6">
            <div class="section">
              <div class="section-title">
                <v-icon size="18">mdi-account</v-icon>
                <span>Dados do Cliente</span>
              </div>

              <div class="info-item">
                <span class="label">Nome</span>
                <span class="value">{{ sale.clienteNome }}</span>
              </div>

              <div class="info-item">
                <span class="label">E-mail</span>
                <span class="value">{{ sale.entregaEmail }}</span>
              </div>
            </div>
          </v-col>

          <!-- Bloco: Venda -->
          <v-col cols="12" md="6">
            <div class="section">
              <div class="section-title">
                <v-icon size="18">mdi-receipt</v-icon>
                <span>Dados da Venda</span>
              </div>

              <div class="info-grid">
                <div class="info-item">
                  <span class="label">Data</span>
                  <span class="value">{{ sale.dataVenda }}</span>
                </div>

                <div class="info-item">
                  <span class="label">Valor Total</span>
                  <span class="value text-success font-weight-bold">
                    R$ {{ sale.valorTotal }}
                  </span>
                </div>

                <div class="info-item">
                  <span class="label">Status</span>
                  <span class="value" :class="sale.descricaoStatus === 'Cancelada'
                    ? 'text-error'
                    : 'text-success'">
                    {{ sale.descricaoStatus }}
                  </span>
                </div>

                <div class="info-item">
                  <span class="label">Nota Fiscal</span>
                  <span class="value">{{ sale.codigoNotaFiscal }}</span>
                </div>
              </div>
            </div>
          </v-col>

        </v-row>
      </v-card-text>

      <v-divider />

      <!-- Ação principal -->
      <v-card-actions class="pa-4 justify-center">
        <v-btn color="primary" size="large" prepend-icon="mdi-send" @click="showModal = true">
          Enviar DANFE por e-mail
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Modal -->
    <SendDanfeModal v-if="sale" v-model="showModal" :invoice-id="sale.codigoNotaFiscal"
      :default-email="sale.entregaEmail" @success="handleSuccess" />

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

<style scoped>
.section {
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 16px;
  height: 100%;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 12px;
  color: rgba(0, 0, 0, 0.7);
}

.info-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.label {
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.55);
  text-transform: uppercase;
}

.value {
  font-size: 0.95rem;
}
</style>
