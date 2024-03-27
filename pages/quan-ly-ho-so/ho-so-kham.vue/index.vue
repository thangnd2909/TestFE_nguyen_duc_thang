<template>
  <div>
    <cardGlobal class="mt-3">
      <client-only>
        <v-row class="pb-2 align-center">
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              v-model="phoneNumber"
              placeholder="Nhập SĐT để tìm kiếm"
              prepend-inner-icon="mdi-magnify"
              dense
              outlined
              hide-details
              @input="searchPhone"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              v-model="fullName"
              placeholder="Nhập tên để tìm kiếm"
              prepend-inner-icon="mdi-magnify"
              dense
              outlined
              hide-details
              @input="searchName"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            color="orange lighten-1 text-none white--text ma-3"
            @click="handleAddUpdate(null)"
          >
            <v-icon left>
              mdi-plus
            </v-icon>
            Thêm mới hồ sơ</v-btn
          >
        </v-row>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-default-footer
          :items-per-page="pageSize"
          @page-count="pageCount = $event"
          :page.sync="page"
          loading-text="Xin chờ"
          no-results-text="Không có kết quả phù hợp"
          no-data-text="Không có dữ liệu"
          class="elevation-0 custom_header_table"
          fixed-header
          light
        >
          <template v-slot:[`item.stt`]="{ item }">
            <div class="font-weight-bold">{{ getItemIndex(item) }}</div>
          </template>
          <template v-slot:[`item.file`]="{ item }">
            <div class="py-3">
              <div class="fs-15 ">
                SĐT: <span class="font-weight-bold"> {{ item.phone }}</span>
              </div>
              <div class="fs-15 ">
                Tên: <span class="font-weight-bold">{{ item.full_name }}</span>
              </div>
              <div class="fs-15 ">
                Giới tính:
                <span class="font-weight-bold">
                  <span v-if="item.gender === $store.state.app.sex.MALE.value">
                    {{ $store.state.app.sex.MALE.text }}
                  </span>
                  <span
                    v-else-if="
                      item.gender === $store.state.app.sex.FEMALE.value
                    "
                  >
                    {{ $store.state.app.sex.FEMALE.text }}
                  </span>
                  <span v-else>
                    {{ $store.state.app.sex.OTHER.text }}
                  </span>
                </span>
              </div>
            </div>
          </template>

          <template v-slot:[`item.active`]="{ item }">
            <v-menu
              max-width="200"
              transition="scroll-y-transition"
              offset-x
              left
            >
              <template v-slot:activator="{ on }">
                <div class="cp" v-on="on">
                  <v-icon>mdi-dots-horizontal</v-icon>
                </div>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      class="cp"
                      @click="handleAddUpdate(item)"
                    >
                      Sửa hồ sơ
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      class="cp"
                      @click="handleOpenDelete(item)"
                    >
                      Xóa hồ sơ
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </client-only>
    </cardGlobal>
    <v-row class="w-100 mb-5">
      <v-col cols="2" md="2" class="d-flex align-center" >
        Tổng số: {{ (items || []).length === 0 ? 0 : items.length }}
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="10" md="10" class="px-0">
        <pagination
          :page="page"
          :pageCount="pageCount"
          :pageSize="pageSize"
          ref="pagination"
          depressed="true"
          class="mt-1"
          @changePage="changePage"
          @changePageSize="changePageSize"
        >
        </pagination>
      </v-col>
    </v-row>
    <addUpdate
      :open="openAddUpdate"
      :detailItem="detailItem"
      @addItem="addItem"
      @updateItem="updateItem"
      @toggle="openAddUpdate = !openAddUpdate"
    ></addUpdate>

    <YesNoAlert
      :open="openDelete"
      alert-msg="Bạn chắc chắn muốn xóa hồ sơ này?"
      @toggle="openDelete = !openDelete"
      @OK="handleDelete"
    >
    </YesNoAlert>
  </div>
</template>
<script>
import data from '~/assets/data.json'
import addUpdate from '~/components/addUpdate.vue'
import pagination from '~/components/pagination.vue'
import cardGlobal from '~/components/cardGlobal.vue'
import YesNoAlert from '~/components/YesNoAlertGlobal.vue'
export default {
  components: { addUpdate, pagination, cardGlobal, YesNoAlert },
  computed: {
    headers() {
      return [
        {
          text: 'STT',
          value: 'stt',
          sortable: false,
          align: 'center',
          width: 50
        },
        {
          text: 'Hồ Sơ',
          value: 'file',
          sortable: false,
          align: 'left',
          width: 200
        },
        {
          text: 'Ngày Sinh',
          value: '',
          sortable: false,
          align: 'center',
          width: 200
        },
        {
          text: 'Địa Chỉ',
          value: '',
          sortable: false,
          align: 'center',
          width: 200
        },
        {
          text: 'Hồ Sơ Chính',
          value: '',
          sortable: false,
          align: 'center',
          width: 200
        },
        {
          text: 'Thông Báo',
          value: '',
          sortable: false,
          align: 'center',
          width: 200
        },
        {
          text: '',
          value: 'active',
          align: 'center',
          sortable: false,
          width: 50
        }
      ]
    }
  },
  data() {
    return {
      data,
      items: [],
      pageSize: 2,
      page: 1,
      pageCount: 1,
      detailItem: {},
      phoneNumber: '',
      fullName: '',
      openAddUpdate: false,
      openDelete: false
    }
  },
  mounted() {
    this.items = JSON.parse(localStorage.getItem('ListDataItem'))
  },
  methods: {
    handleDelete() {
      for (let i = 0; i < this.items.length; i++) {
        if (this.detailItem.id === this.items[i].id) {
          this.items.splice(i, 1)
        }
      }
      this.$store.dispatch('notification/set_notifications', {
        icon: 'success',
        timeout: 5000,
        color: 'success',
        text: `Hồ sơ ${this.detailItem.full_name} - ${this.detailItem.phone} xóa thành công`
      })
    },
    handleOpenDelete(value) {
      this.openDelete = true
      this.detailItem = value
    },
    updateItem(item) {
      this.openAddUpdate = false
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id === item.id) {
          this.items[i].full_name = item.full_name
          this.items[i].phone = item.phone
          this.items[i].birthday = item.birthday
          this.items[i].email = item.email
          this.items[i].gender = item.gender
          this.items[i].address = item.address
          this.items[i].bloodGroup = item.bloodGroup
          this.items[i].country = item.country
        }
      }
      localStorage.setItem('ListDataItem', JSON.stringify(this.items))
    },
    addItem() {
      this.openAddUpdate = false
      this.items = JSON.parse(localStorage.getItem('ListDataItem'))
    },
    handleAddUpdate(item) {
      this.openAddUpdate = true
      this.detailItem = item
    },
    searchName() {
      this.items = JSON.parse(
        localStorage.getItem('ListDataItem')
      ).filter(item =>
        item.full_name.toLowerCase().includes(this.fullName.toLowerCase())
      )
    },
    searchPhone() {
      this.items = JSON.parse(
        localStorage.getItem('ListDataItem')
      ).filter(item => item.phone.toString().includes(this.phoneNumber))
    },

    getItemIndex(item) {
      return this.items.indexOf(item) + 1
    },

    changePage(value) {
      this.page = value
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.page = 1
        this.pageSize = pageSizes
        this.$refs.pagination.reset()
      }
    }
  },

}
</script>
