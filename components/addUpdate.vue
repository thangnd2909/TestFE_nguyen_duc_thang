<template>
  <v-dialog :value="open" @keydown="$event.key === 'Escape' && toggle()" max-width="800px" persistent
  >
    <v-card>
      <v-card-title class="pt-3 pb-2" style="border-bottom: 1px solid #2b8c8f">
        {{ $isNullOrEmpty(detailItem) ? ' Tạo mới hồ sơ' : 'Cập nhật hồ sơ' }}
      </v-card-title>

      <v-card-text style="max-height: calc(100vh - 13rem); overflow-x: hidden">
        <v-container class="pb-6 pt-5" fluid>
          <v-row>
            <v-col cols="12" class="py-0">
              <div>Số điện thoại <span class="red--text pl-2">*</span></div>
              <v-text-field v-model="phone" outlined dense :error-messages="phoneErrors" @input="phoneErrors = []" onKeyPress="if(this.value.length==10) return false;" v-on:keypress="isNumber($event)"></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <div>Họ và tên <span class="red--text pl-2">*</span></div>
              <v-text-field v-model="name"  outlined dense :error-messages="nameErrors"  @input="nameErrors = []"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <div>Giới tính <span class="red--text pl-2">*</span></div>
              <v-select v-model="sex" :items="listSex" outlined dense ></v-select>
            </v-col>
            <v-col cols="12" md="6" class="py-0 ">
              <div>Nhóm máu <span class="red--text pl-2">*</span></div>
              <v-select  v-model="bloodGroup" :items="listBloodGroup" outlined dense :error-messages="bloodGroupErrors" @input="bloodGroupErrors = []"></v-select>
            </v-col>
            <v-col cols="12" md="6" class="py-0 ">
              <div>Ngày sinh <span class="red--text pl-2">*</span></div>
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px" >
                <template v-slot:activator="{ on }">
                  <v-text-field v-on="on" class="color-icon-time fs-15px pb-error-0" v-model="birthday" dense outlined readonly:spellcheck="false"> </v-text-field>
                </template>
                <v-date-picker v-model="menu_date" :allowed-dates="allowedDates" locale="vi" @input="menu = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <div>Quốc gia <span class="red--text pl-2">*</span></div>
              <v-select v-model="country" :items="listCountry" outlined dense
              ></v-select>
            </v-col>
            <v-col cols="12" class="py-0">
              <div>Email</div>
              <v-text-field v-model="email" outlined dense></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <div>Địa chỉ <span class="red--text pl-2">*</span></div>
              <v-text-field v-model="address" outlined dense :error-messages="addressErrors" @input="addressErrors = []"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text  height="40px"  class="orange lighten-2 text-none white--text"  @click="checkAddUpdate">
          <div class="font_size">Hoàn thành</div>
        </v-btn>
        <v-btn  text  height="40px" class="red darken-1 lighten-4 text-none white--text"  @click="toggle()">
          <div class="font_size">Hủy</div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    open: {
      type: Boolean,
      required: true
    },
    detailItem: {
      type: Object
    }
  },
  computed: {
    birthday() {
      return moment(this.menu_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    }
  },
  data: () => ({
    menu: false,
    menu_date: moment().format('YYYY-MM-DD'),
    phone: null,
    name: null,
    sex: 'MALE',
    bloodGroup: null,
    country: 'vietNanm',
    email: null,
    address: null,
    phoneErrors: [],
    nameErrors: [],
    bloodGroupErrors: [],
    addressErrors: [],
    listSex: [
      { text: 'Nam', value: 'MALE' },
      { text: 'Nữ', value: 'FEMALE' },
      { text: 'Khác', value: 'OTHER' }
    ],
    listBloodGroup: [
      { text: '- Chọn nhóm máu -', value: null },
      { text: 'Nhóm A', value: 'A' },
      { text: 'Nhóm B', value: 'B' },
      { text: 'Nhóm AB', value: 'AB' },
      { text: 'Nhóm O', value: '0' }
    ],
    listCountry: [
      { text: 'Brunei', value: 'brunei' },
      { text: 'Campuchia', value: 'campuchia' },
      { text: 'Indonesia', value: 'indonesia' },
      { text: 'Lào', value: 'lao' },
      { text: 'Malaysia', value: 'malaysia' },
      { text: 'Myanmar', value: 'myanmar' },
      { text: 'Philippines', value: 'philippines' },
      { text: 'Singapore', value: 'singapore' },
      { text: 'Thái Lan', value: 'thaiLan' },
      { text: 'Việt Nam', value: 'vietNanm' }
    ]
  }),
  methods: {
    reset() {
      this.menu = false
      this.menu_date = moment().format('YYYY-MM-DD')
      this.phone = null
      this.name = null
      this.sex = 'MALE'
      this.bloodGroup = null
      this.country = 'vietNanm'
      this.email = null
      this.address = null
      this.phoneErrors = []
      this.nameErrors = []
      this.bloodGroupErrors = []
      this.addressErrors = []
    },
    allowedDates(value) {
      const today = moment(new Date()).format('YYYY-MM-DD')
      if (today >= value) {
        return true
      } else {
        return false
      }
    },
    isNumber(e) {
      let char = String.fromCharCode(e.keyCode)
      if (/^[0-9\:]+$/.test(char)) return true
      else e.preventDefault()
    },
    checkAddUpdate() {
      let hasError = false
      if (this.$isNullOrEmpty(this.phone)) {
        hasError = true
        this.phoneErrors = ['Vui lòng nhập số điện thoại']
      }
      if (this.$isNullOrEmpty(this.detailItem)) {
        if (!this.$isNullOrEmpty(this.phone)) {
          for (let i = 0;i < JSON.parse(localStorage.getItem('ListDataItem')).length;i++) {
            if (this.phone === JSON.parse(localStorage.getItem('ListDataItem'))[i].phone) {
              hasError = true
              this.phoneErrors = ['SĐT đã tồn tại trong hệ thống']
            }
          }
        }
      } else {
        if (!this.$isNullOrEmpty(this.phone)) {
          for (let i = 0; i < JSON.parse(localStorage.getItem('ListDataItem')).length; i++) {
            if (this.phone === JSON.parse(localStorage.getItem('ListDataItem'))[i].phone && this.detailItem.id !== JSON.parse(localStorage.getItem('ListDataItem'))[i].id) {
              hasError = true
              this.phoneErrors = ['SĐT đã tồn tại trong hệ thống']
            }
          }
        }
      }
      if (this.$isNullOrEmpty(this.name)) {
        hasError = true
        this.nameErrors = ['Vui lòng nhập họ và tên']
      } else if ((this.name || '').trim().length > 50) {
        hasError = true
        this.nameErrors = ['Vui lòng nhập họ và tên không được vượt quá 50 kí tự']
      }
      if (this.$isNullOrEmpty(this.bloodGroup)) {
        hasError = true
        this.bloodGroupErrors = ['Vui lòng chọn nhóm máu']
      }
      if ((this.email || '').trim().length > 150) {
        hasError = true
        this.emailErrors = ['Vui lòng nhập email không được vượt quá 150 kí tự']
      }
      if (this.$isNullOrEmpty(this.address)) {
        hasError = true
        this.addressErrors = ['Vui lòng nhập địa chỉ']
      }
      if ((this.address || '').trim().length > 255) {
        hasError = true
        this.addressErrors = ['Vui lòng nhập địa chỉ không được vượt quá 255 kí tự']
      }
      if (!hasError) {
        if (this.$isNullOrEmpty(this.detailItem)) {
          this.Add()
        } else {
          this.update()
        }
      }
    },
    update() {
      const data = {
        id: this.detailItem.id,
        full_name: !this.$isNullOrEmpty(this.name) ? this.name.trim() : this.name,
        phone: this.phone,
        birthday: this.birthday,
        email: !this.$isNullOrEmpty(this.email) ? this.email.trim() : this.email,
        gender: this.sex,
        address: !this.$isNullOrEmpty(this.address) ? this.address.trim() : this.address,
        bloodGroup: this.bloodGroup,
        country: this.country
      }
      this.$emit('updateItem', data)
      this.$store.dispatch('notification/set_notifications', {icon: 'success',timeout: 5000, color: 'success',text: `Hồ sơ ${this.name} - ${this.phone} được cập nhật thành công`})
      this.reset()
    },
    Add() {
      const data = {
        id: localStorage.getItem('ListDataItem').length + 1,
        full_name: !this.$isNullOrEmpty(this.name) ? this.name.trim() : this.name,
        phone: this.phone,
        birthday: this.birthday,
        email: !this.$isNullOrEmpty(this.email) ? this.email.trim()  : this.email,
        gender: this.sex,
        address: !this.$isNullOrEmpty(this.address) ? this.address.trim() : this.address,
        bloodGroup: this.bloodGroup,
        country: this.country
      }
      const listItemNew = []
      listItemNew.push( data, ...JSON.parse(localStorage.getItem('ListDataItem'))
      )
      localStorage.setItem('ListDataItem', JSON.stringify(listItemNew))
      this.$emit('addItem')
      this.$store.dispatch('notification/set_notifications', { icon: 'success', timeout: 5000,  color: 'success',  text: `Hồ sơ ${this.name} - ${this.phone} được thêm mới thành công`})
      this.reset()
    },
    toggle() {
      this.$emit('toggle')
    }
  },
  watch: {
    open(value) {
      if (value) {
        this.reset()
        if (!this.$isNullOrEmpty(this.detailItem)) {
          this.phone = this.detailItem.phone
          this.name = this.detailItem.full_name
          this.sex = this.detailItem.gender
          this.bloodGroup = this.detailItem.bloodGroup
          this.country = this.detailItem.country
          this.email = this.detailItem.email
          this.address = this.detailItem.address
          this.menu_date = moment( this.detailItem.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }
      }
    }
  }
}
</script>