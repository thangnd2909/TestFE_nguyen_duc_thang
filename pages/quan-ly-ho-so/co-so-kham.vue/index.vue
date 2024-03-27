<template>
  <div>
    <div>
      <client-only>
        <l-map :zoom="zoom" :center="center" style="height: 500px">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker v-for="(location, index) in locations" :key="index" :lat-lng="location.coordinates" >
            <l-popup :lat-lng="location.coordinates" :content="location.name + '<br>' + location.address"></l-popup>
          </l-marker>
        </l-map>
      </client-only>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LeafletMap',
  data: () => ({
    zoom: 18,
    center: [21.017069714364983, 105.85504793070729],
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    locations: []
  }),
  mounted() {
    this.locations = JSON.parse(localStorage.getItem('ListDataItemMap'))
  },
  methods: {}
}
</script>
