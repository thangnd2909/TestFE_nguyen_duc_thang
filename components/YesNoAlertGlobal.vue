<template>
  <div>
    <v-dialog
      :value="open"
      @keydown="$event.key === 'Escape' && toggle()"
      @click:outside="toggle"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          {{ title }}

          <div class="flex-grow-1"></div>
          <v-icon color="grey lighten-2"  class="cp" @click="toggle">mdi-close-circle</v-icon>
        </v-card-title>
        <v-card-text class="pt-1  black--text fs-15">{{
          alertMsg
        }}</v-card-text>
       
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            class="text-none orange lighten-2  white--text"
            depressed
            @click="OK"
            >Xác nhận</v-btn
          >
          <v-btn
            class="red darken-1 lighten-4 text-none white--text"
            depressed
            @click="toggle"
            >Hủy</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: 'Thông báo'
    },
    alertMsg: {
      type: String,
      default: String
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle')
    },
    OK() {
      this.$emit('toggle')
      this.$emit('OK')
    }
  }
}
</script>
