
<template>
  <v-dialog
      v-model="dialog"
      persistent
      scrollable
  >
    <template v-slot:activator="{ props }">
      <v-list-item
          rounded="xl"
          v-bind="props"
          prepend-icon="smart_toy"
          active
          color="primary"
      >
        {{ currentModel }}
      </v-list-item>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ $t('openAIModels') }}</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>