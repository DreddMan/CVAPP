<template>
  <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <v-list-item
          v-bind="props"
          rounded="xl"
          prepend-icon="language"
          :title="$t('language')"
      ></v-list-item>
    </template>
    <v-card>
      <v-toolbar
          dark
          color="primary"
      >
        <v-btn
            icon
            dark
            @click="dialog = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t('language') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <!--          <v-toolbar-items>-->
        <!--            <v-btn-->
        <!--                variant="text"-->
        <!--                @click="dialog = false"-->
        <!--            >-->
        <!--              Save-->
        <!--            </v-btn>-->
        <!--          </v-toolbar-items>-->
      </v-toolbar>
      <v-list
      >
        <!--          <v-list-item-->
        <!--              title="Use device language"-->
        <!--              :append-icon="usingDeviceLanguage() ? 'radio_button_checked' : 'radio_button_unchecked'"-->
        <!--              @click="useDeviceLanguage"-->
        <!--          >-->
        <!--          </v-list-item>-->
        <v-list-item
            v-for="l in locales