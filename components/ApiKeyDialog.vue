<template>
  <v-dialog
      v-model="dialog"
      persistent
  >
    <template v-slot:activator="{ props }">
      <v-list-item
          rounded="xl"
          v-bind="props"
 