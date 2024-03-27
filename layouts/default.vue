<template>
  <v-app style="background-color: #ECEFF1">
    <client-only>
      <alert group="main" :duration="7000" position="top right" :max="5" />
    </client-only>
    <div class="app-layout-css">
      <client-only>
        <v-navigation-drawer v-model="drawer" :clipped="clipped" width="300px" app dark style="padding-bottom: 37px" class="denser-nav z-index-9999"
        >
          <v-list nav dense expand class="disabled-active pt-0">
            <div class="logo mt-4">
              <v-img src="/logo/logo.png" />
            </div>
            <template v-for="(item, index) in topmenuAdmin">
              <v-list-group v-if="(item.child || []).length !== 0" :key="`${index}-${item.id}`" no-action active-class="primary--text"
              >
                <template v-slot:activator>
                  <template>
                    <v-list-item-icon>
                      <v-icon>{{ item.page_icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{item.page_name}}</v-list-item-title>
                    </v-list-item-content>
                  </template>
                </template>
                <v-list-item v-for="i in item.child" :to="i.page_url" :key="i.id" router active-class="primary--text">
                  <v-list-item-icon>
                    <v-icon>{{ i.page_icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title @click="handleUrlPage(i.page_url)" class="pl-2 pb-2">{{ i.page_name }}</v-list-item-title>
                </v-list-item>
              </v-list-group>
              <v-list-item v-else :key="index" :to="item.page_url" router active-class="primary--text">
                <v-list-item-icon>
                  <v-icon>{{ item.page_icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title @click="handleUrlPage(item.page_url)">{{ item.page_name }}</v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
          <div class="vesion">
            <div class=" primary--text py-1 fs-14 pr-2" align="right"> Vesion 1.0 </div>
          </div>
        </v-navigation-drawer>
      </client-only>
      <v-app-bar flat :clipped-left="clipped" fixed app light color="#F5F7FE">
       <v-app-bar-nav-icon v-if="breakpoint !== 'desktop'" @click.stop="drawer = !drawer" />
        <div
          class="headline fs-24 d-flex align-center font-weight-bold primary--text">
          {{ $store.state.app.pageTitle }}
        </div>
        <v-spacer />
        <v-menu  v-model="menu" max-width="150"  transition="scroll-y-transition" offset-x offset-y>
          <template v-slot:activator="{ on }">
            <div class="d-flex align-center cp" v-on="on">
              <div class="cp d-flex align-center border-1 py-1 border-radius-50 grey lighten-3" >
                <div class="ml-1 primary--text font-weight-bold">
                  Nguyễn Đức Thắng
                </div>
                <v-avatar :tile="false"  class="ml-2 mr-1"  color="grey lighten-2" size="32" >
                  <v-icon color="white" size="31">
                    mdi-account-circle
                  </v-icon>
                </v-avatar>
              </div>
              <div>
                <v-icon>mdi-menu-down</v-icon>
              </div>
            </div>
          </template>

          <v-list dense class="py-0">
            <v-list-item-group>
              <nuxt-link class="nuxt-link text-decoration-none" to="#">
                <v-list-item class="pl-2">
                  <v-list-item-content>
                    <v-list-item-title class="primary--text">
                      Tài khoản của tôi
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </nuxt-link>
              <v-divider />
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <div class="mx-3 my-5">
            <nuxt />
          </div>
          <div class="copyright">
            <div class=" primary--text mb-5  fs-14" align="center"> copyright © Nguyễn Đức Thắng </div>
          </div>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import data from '~/assets/data.json'
import listMap from '~/assets/listMap.json'
import alert from '~/components/alertGlobal.vue'
export default {
  components: {
    alert
  },
  computed: {
    topmenuAdmin() {
      return [
        {
          page_name: 'Dashboard',
          page_url: '/dashboad',
          child: []
        },
        {
          page_name: 'Quản lý hồ sơ',
          child: [
            {
              page_name: 'Hồ sơ khám',
              page_icon: '',
              page_url: '/quan-ly-ho-so/ho-so-kham'
            },
            {
              page_name: 'Cơ sở khám',
              page_icon: '',
              page_url: '/quan-ly-ho-so/co-so-kham'
            }
          ]
        }
      ]
    },
    breakpoint() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'mobile'
        case 'sm':
          return 'mobile'
        case 'md':
          return 'mobile'
        case 'lg':
          return 'desktop'
        case 'xl':
          return 'desktop'
        default:
          return 'desktop'
      }
    }
  },
  data: () => ({
    data,
    listMap,
    clipped: false,
    menu: false,
    title: '',
    drawer: true
  }),
  watch: {},
  beforeCreate(){
    localStorage.setItem('ListDataItem', JSON.stringify(data))
    localStorage.setItem('ListDataItemMap', JSON.stringify(listMap))
  },
  created() {
    if (this.$route.fullPath === '/') {
      this.title = '/dashboad'
      this.$store.commit('app/setTitle', this.title)
    } else {
      this.$store.commit('app/setTitle', this.$route.path)
    }
  },
  mounted() {
  },
  methods: {
    handleUrlPage(value) {
      this.$store.commit('app/setTitle', value)
    }
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>
<style lang="scss">
.app-layout-css {
  .logo {
    height: 80px !important;
  }
  .nuxt-link {
    text-decoration: none;
  }
  .v-list-item {
    margin-top: 4px !important;
    min-width: 12px !important;
  }
  .v-list-item__icon {
    margin: 0 !important;
    min-width: 12px !important;
  }
  .v-application--is-ltr .v-list--dense.v-list--nav .custom-group.v-list-group--no-action > .v-list-group__items  > div > .v-list-item {
    padding-left: 40px !important;
  }
  .v-application--is-ltr .v-list--dense .v-list-group--sub-group .v-list-group__header {
    padding-left: 6px;
  }
   .theme--dark.v-list-item--active::before, .theme--dark.v-list-item--active:hover::before {
    opacity: 0 !important;
  }
  .v-list-item--active {
    color: #fff;
  }
}
</style>
