<template>
  <v-col
    :class="(depressed && 'depressed-pagination') + ' pt-0 pb-0'" cols="12">
    <v-row no-gutters class="justify-sm-end justify-center">
      <v-col class="col-auto" :key="pageCount">
        <div class="ml-2">
          <v-pagination text  :value="page" :length="pageCount"  @input="changePageButton($event)" total-visible="10" ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
export default {
  props: ['pageCount', 'page', 'pageSize', 'depressed'],
  data: () => ({
    customPage: 1,
    rerender: Math.random()
  }),
  methods: {
    changePageSize(value) {
      this.customPage = 1
      this.$emit('changePageSize', value)
    },
    checkPage(e) {
      let value = e.target.value
      if (isNaN(value) || parseInt(value) <= 0) {
        this.customPage = 1
      } else {
        this.customPage = parseInt(value)
      }
      this.changePage(parseInt(value))
    },
    changePage(value) {
      if (isNaN(this.customPage)) {
        this.customPage = 1
        this.$emit('changePage', this.customPage)
      } else if (this.customPage < 1) {
        this.customPage = 1
        this.$emit('changePage', this.customPage)
      } else if (this.customPage > this.pageCount) {
        this.customPage = 1
        this.$emit('changePage', this.customPage)
      } else {
        this.$emit('changePage', parseInt(this.customPage))
      }
    },
    changePageButton(value) {
      this.customPage = parseInt(value)
      this.$emit('changePage', parseInt(this.customPage))
    },
    reset() {
      this.customPage = 1
    }
  },
  watch: {
    page(value) {
      this.rerender = Math.random()
    }
  }
}
</script>
<style lang="scss">
.depressed-pagination {
  .v-pagination__item {
    box-shadow: none !important;
    border: thin solid rgba(0, 0, 0, 0.12);
    height: 36px;
    width: 36px;
  }
  .v-pagination__item:hover {
    background-color: rgba(0, 0, 0, 0.12) !important;
  }

  .v-pagination__navigation {
    box-shadow: none !important;
    border: thin solid rgba(0, 0, 0, 0.12);
    height: 36px;
    width: 36px;
  }

  .v-pagination__navigation:hover {
    background-color: rgba(0, 0, 0, 0.12) !important;
  }

  .v-pagination__item--active:hover {
    background-color: #b71c1c !important;
    border-color: #b71c1c !important;
  }
}
</style>
