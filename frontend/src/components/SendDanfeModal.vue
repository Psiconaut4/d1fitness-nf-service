<template>
  <v-dialog v-model="open" max-width="400">
    <v-card>
      <v-card-title>Enviar DANFE</v-card-title>

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
        <v-btn variant="text" @click="open = false">Cancelar</v-btn>
        <v-btn color="primary" :loading="loading" @click="send">
          Enviar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { sendDanfeByEmail } from '../api/danfe.api'

const props = defineProps({
  invoiceId: { type: [String, Number], required: true },
  defaultEmail: { type: String, default: '' },
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue', 'success'])

const open = ref(props.modelValue)
const email = ref(props.defaultEmail)
const loading = ref(false)

watch(() => props.modelValue, v => open.value = v)
watch(open, v => emit('update:modelValue', v))

async function send() {
  loading.value = true
  await sendDanfeByEmail(props.invoiceId, { email: email.value })
  emit('success')
  open.value = false
  loading.value = false
}
</script>
