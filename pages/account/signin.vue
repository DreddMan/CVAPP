
<template>
  <v-card
      style="height: 100vh"
  >
    <v-container>
      <v-row>
        <v-col
            sm="9"
            offset-sm="1"
            md="6"
            offset-md="3"
        >
          <v-card
              class="mt-15"
              elevation="0"
          >
            <div class="text-center text-h4">Sign in</div>
            <v-card-text>
              <v-form ref="signInForm">
                <v-text-field
                    v-model="formData.username"
                    :rules="formRules.username"
                    label="User name"
                    variant="underlined"
                    clearable
                ></v-text-field>
                <v-text-field
                    v-model="formData.password"
                    :rules="formRules.password"
                    label="Password"
                    variant="underlined"
                    @keyup.enter="submit"
                    clearable
                    :type="passwordInputType"
                    :append-inner-icon="passwordInputType === 'password' ? 'visibility' : 'visibility_off'"
                    @click:append-inner="passwordInputType = passwordInputType === 'password' ? 'text' : 'password'"
                ></v-text-field>

              </v-form>

              <div v-if="errorMsg" class="text-red">{{ errorMsg }}</div>

              <div
                class="mt-5 d-flex justify-space-between"
              >
                <v-btn
                    @click="navigateTo('/account/signup')"