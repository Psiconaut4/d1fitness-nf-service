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
    <v-card-title>Vendas</v-card-title>

    <v-table>
      <thead>
        <tr>
          <th>Código da Venda</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="sale in sales" :key="sale">
          <td>
            <RouterLink
              :to="{
                name: 'sale-details',
                params: { saleId: sale }
              }"
            >
              {{ sale }}
            </RouterLink>
          </td>
          <td>
            <v-btn
              size="small"
              color="primary"
              disabled
            >
              Enviar NF
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

