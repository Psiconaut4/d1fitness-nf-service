<template>
  <v-container class="py-4">

    <!-- Header do Dashboard -->
    <!--
      Cabeçalho principal da aplicação.
      Exibe o título da tela e ações de navegação secundárias.
    -->
    <div class="d-flex align-center justify-space-between mb-6">
      <h2 class="text-h6 font-weight-medium">
        Dashboard de Vendas
      </h2>

      <!-- Acesso rápido ao histórico -->
      <!--
        Ação secundária, posicionada no header para fácil acesso.
      -->
      <v-btn
        to="/history"
        variant="text"
        prepend-icon="mdi-history"
      >
        Histórico
      </v-btn>
    </div>

    <!-- Indicador de carregamento -->
    <!--
      Exibido enquanto a lista de vendas está sendo carregada.
    -->
    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
      rounded
      class="mb-4"
    />

    <!-- Tabela de vendas -->
    <!--
      Componente responsável por exibir a listagem principal de vendas.
      Mantido isolado para reutilização e organização do código.
    -->
    <SalesTable :sales="sales" />

    <!-- Alerta de erro -->
    <!--
      Exibido em caso de falha ao buscar os dados da API.
    -->
    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      class="mt-4"
    >
      {{ error }}
    </v-alert>

  </v-container>
</template>

<script setup>
/*
  Importações da Composition API e dependências da aplicação.
*/
import { onMounted, ref } from 'vue'
import { getSales } from '../api/sales.api'
import SalesTable from '../components/SalesTable.vue'

/*
  Estados reativos do dashboard:
  - sales: lista de vendas
  - loading: controle de carregamento
  - error: mensagem de erro
*/
const sales = ref([])
const error = ref(null)
const loading = ref(true)

/*
  Carrega as vendas assim que o dashboard é montado.
*/
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
