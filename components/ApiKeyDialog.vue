<template>
  <v-dialog
      v-model="dialog"
      persistent
  >
    <template v-slot:activator="{ props }">
      <v-list-item
          rounded="xl"
          v-bind="props"
          prepend-icon="vpn_key"
          color="primary"
      >
        {{ $t('setApiKey') }}
      </v-list-item>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ $t('openAIApiKey') }}</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div>
          {{ $t('getAKey') }}:
          <a target="_blank" href="https://platform.openai.com/account/api-keys">https://platform.openai.com/account/api-keys</a>
        </div>
        <div
            class="mt-5 d-flex align-center"
        >
          <v-text-field
              v-model="apiKey"
              label="Api Key"
              hide-details
              clearable
              :disabled="!editable"
          ></v-text-field>
          <div
              v-if="editable"
          >
     