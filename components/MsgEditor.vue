<template>
  <v-textarea
      v-model="message"
      :label="$t('writeAMessage')"
      :placeholder="hint"
      rows="1"
 