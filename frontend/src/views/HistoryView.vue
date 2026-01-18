<template>
  <v-container class="py-4">

    <!-- Header da tela -->
    
    <div class="d-flex align-center mb-6">
      <v-btn
        variant="text"
        icon="mdi-arrow-left"
        @click="$router.back()"
      />
      <h2 class="text-h6 font-weight-medium ml-3">
        Histórico de Envios
      </h2>
    </div>

    <!-- Indicador de carregamento -->
   
    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
      rounded
      class="mb-4"
    />

    <!-- Alerta de erro -->
    
    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      class="mb-4"
    >
      {{ error }}
    </v-alert>

    <!-- Card contendo a tabela de histórico -->
    <v-card
      v-if="history.length"
      elevation="2"
      rounded="lg"
    >
      <v-card-text class="pa-0">

        <!-- Tabela de histórico -->
        <v-table>
          <thead>
            <tr>
              <th class="text-left">NF</th>
              <th class="text-left">E-mail</th>
              <th class="text-left">Status</th>
              <th class="text-left">Data de Envio</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in history"
              :key="item.sentAt"
            >
              <td>{{ item.invoiceId }}</td>

              <td>{{ item.email }}</td>

              <td>
                <!--
                  Status representado por chip para melhor escaneabilidade.
                  Cores indicam sucesso ou falha no envio.
                -->
                <v-chip
                  size="small"
                  variant="tonal"
                  :color="item.status === 'SUCCESS' ? 'success' : 'error'"
                >
                  {{ item.status }}
                </v-chip>
              </td>

              <td>
                {{ new Date(item.sentAt).toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </v-table>

      </v-card-text>
    </v-card>

    <!-- Estado vazio -->
    <!--
      Caso não existam registros no histórico.
      UX: evita tela em branco e comunica claramente ao usuário.
    -->
    <v-alert
      v-if="!loading && !history.length && !error"
      type="info"
      variant="tonal"
    >
      Nenhum envio registrado até o momento.
    </v-alert>

  </v-container>
</template>

<script setup>
/*
  Importações da Composition API e da camada de API.
*/
import { ref, onMounted } from 'vue'
import { getSendHistory } from '../api/history.api'

/*
  Estados reativos da tela:
  - history: lista de envios
  - loading: controle de carregamento
  - error: mensagem de erro
*/
const history = ref([])
const loading = ref(true)
const error = ref(null)

/*
  Carrega o histórico de envios assim que a tela é montada.
*/
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
