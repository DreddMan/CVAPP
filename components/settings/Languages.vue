<template>
  <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <v-list-item
          v-bind="