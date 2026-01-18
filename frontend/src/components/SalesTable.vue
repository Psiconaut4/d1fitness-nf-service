<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  sales: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <v-card>
    <v-card-title class="text-h6">
      Vendas
    </v-card-title>

    <v-divider />

    <v-table>
      <thead>
        <tr>
          <th>Código da Venda</th>
          <th class="text-right">Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="saleId in sales" :key="saleId">
          <td class="font-weight-medium">
            #{{ saleId }}
          </td>

          <td class="text-right">
            <v-btn
              size="small"
              color="primary"
              variant="outlined"
              :to="{
                name: 'sale-details',
                params: { saleId }
              }"
            >
              Ver detalhes
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
