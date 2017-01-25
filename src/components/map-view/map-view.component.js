import GoogleMapsLoader from 'google-maps'
GoogleMapsLoader.KEY = 'AIzaSyCc7ltRRQHGvEF7OwlrhRMR1QtXrNH9cZc';

export default {
    props: {
        items: {
            required: true
        }
    },
    data() {
        return {
            loc: { desc: '', lat: null, lng: null },
            map: null
        }
    },
    methods: {
        loadMap() {
            var defaultLoc = { lat: 32.088189, lng: 34.803140 };
            const options = {
                zoom: 15,
                center: defaultLoc,
            };
            GoogleMapsLoader.load(google => {
                this.map = new google.maps.Map(this.$refs.map, options);
                this.renderPlaceMarkers();
            });
        },
        renderPlaceMarkers() {
            this.items.forEach(item => {
                let placeLatLng = { lat: item.loc.lat, lng: item.loc.lng }
                let marker = new google.maps.Marker({
                    position: placeLatLng,
                    title: item.name,
                    map: this.map,
                })
                var contentString = `<div id="content">
      <div id="siteNotice">
      </div>
      <h1 id="firstHeading" class="firstHeading">${item.name}</h1>
      <div id="bodyContent">
      <p>${item.desc}</p>
      <img class="preview-img" style="max-width:200px " src="${item.imgUrl}"
      </div>
      </div>`

                this.map.panTo(placeLatLng);
                var infowindow = new google.maps.InfoWindow({
                    content:contentString
                });
                marker.addListener('click', () => {
                    this.$router.push(`item/${item._id}`)

                })
                marker.addListener('mouseover', () => {
                    infowindow.open(this.map, marker);

                })
                marker.addListener('mouseout', () => {
                    infowindow.close(this.map, marker);

                })
            })
        },
    },
    mounted() {
        this.loadMap()
    },
    components: {
        GoogleMapsLoader
    },
    watch: {
        items: function (reloadMap) {
            this.loadMap()
        }
    }
}