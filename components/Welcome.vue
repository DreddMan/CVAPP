
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-center">
          <h2 class="text-h2">{{ $t('welcomeTo') }} <span class="text-primary">{{ runtimeConfig.public.appName }}</span></h2>
          <p class="text-caption mt-5">
            {{ runtimeConfig.public.appName }} {{ $t('welcomeScreen.introduction1') }}
            <br>
            {{ $t('welcomeScreen.introduction2') }}
          </p>
        </div>
      </v-col>
    </v-row>