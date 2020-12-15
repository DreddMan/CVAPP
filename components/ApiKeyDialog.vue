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
      <