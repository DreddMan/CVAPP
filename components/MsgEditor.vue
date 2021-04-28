<template>
  <v-textarea
      v-model="message"
      :label="$t('writeAMessage')"
      :placeholder="hint"
      rows="1"
      :auto-grow="autoGrow"
      :disabled="disabled"
      :loading="loading"
      :hide-details="true"
      append-inner-icon="send"
      @keyup.enter.exact="enterOnly"
      @click:appendInner="clickSendBtn"
  ></v-textarea>
</template>

<script>
import { isMobile } from 'is-mobile'
export default {
  name: "MsgEditor",
  props: {
    sendMessage: Function,
    disabled: Boolean,
    loading: Boolean,
  },
  data() {
    return {
      message: "",
      rows: 1,
      autoGrow: true,
    };
  },
  computed: {
    hint() {
      return isMobile() ? "" : "Press Enter to send your message or Shift+Enter to add a new line";
    },
  },
  watch: {
    message(val) {
      const lines = val.split(/\r\n|\r|\n/).length;
      if (lines > 8) {
        this.rows = lines;
        this.autoGrow = false;
      } else {
        this.rows = 1;
        this.autoGrow = true;
      }
    },
  },
  methods: {
    send() {
      let msg = this.message
      // re