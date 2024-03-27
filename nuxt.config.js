import colors from 'vuetify/es5/util/colors'
import en from './assets/locale/en'
import vi from './assets/locale/vi'

export default {
  mode: 'universal',
  ssr: false,
  // server: {
  //   port: 2909, // default: 3000
  //   host: '0.0.0.0' // default: localhost
  // },
  head: {
    titleTemplate: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/ult.js', { src: '~/plugins/common.js', ssr: false }],
  /*
   ** Nuxt.js dev-module
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js module
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Vue Wait (Loading management)
    [
      'nuxt-leaflet',
      {
        /* module options */
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  wait: { useVuex: true },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    treeShake: true,
    lang: {
      locales: {
        vi,
        en
      },
      current: 'vi'
    },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {
        customProperties: true
      },
      dark: false,
      themes: {
        dark: {
          primary: '#B71C1C',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#B71C1C'
        }
      }
    }
  },
  build: {}
}
