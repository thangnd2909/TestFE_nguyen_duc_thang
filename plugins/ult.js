export default function(context, inject) {
  
  inject('isNullOrEmpty', str => {
    return str === null || str === undefined || str === '' || str.length === 0
  })
  inject('isMobilePhone', str => {
    let phoneNot84 = /[0]{1}[35789]{1}[0-9]{8}$/
    let phone84 = /^[84]{2}[35789]{1}[0-9]{8}$/
    return phoneNot84.test(str) || phone84.test(str)
  })
}
