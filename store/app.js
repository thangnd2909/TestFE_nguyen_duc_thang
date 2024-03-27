export const state = () => ({
  pageSizes: [1, 10, 20, 50, 100],
  sex: {
    MALE: { text: 'Nam', value: 'MALE' },
    FEMALE: { text: 'Nữ', value: 'FEMALE' },
    OTHER: { text: 'Khác', value: 'OTHER' }
  },
  alert_display_time: 6000,
  pageTitle: '',
})
export const mutations = {
  setTitle(state, payload) {
    state.pageTitle = payload
  },
  set_time_alert(state, payload) {
    state.alert_display_time = Number(payload)
  }
}
export const actions = {


}
export const getters = {}
