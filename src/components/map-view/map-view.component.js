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
            map: null,
                isMobile : {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }
}
        }
    },
    methods: {
        // goToItemDet(id) {
        //     console.log('hey');
        //     this.$router.push(`item/${id}`);
        // },
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

      var contentStringForMobile = `<div id="content">
      <div id="siteNotice">
      </div>
      <h1 id="firstHeading" class="firstHeading">${item.name}</h1>
      <div id="bodyContent">
      <p>${item.desc}</p>
      <img class="preview-img" style="max-width:50px" src="${item.imgUrl}" onclick="window.eventBus.$emit('goToItemDet', '${item._id}' )"
      </div>
      </div>`

                

                if(this.isMobile.iOS() !== null || this.isMobile.Android() !== null){
                this.map.panTo(placeLatLng);
                var infowindowForMobile = new google.maps.InfoWindow({
                    content:contentStringForMobile
                });
            }
            else {
                this.map.panTo(placeLatLng);
                var infowindow = new google.maps.InfoWindow({
                    content:contentString
                });
            }

                

                

                if(this.isMobile.iOS() !== null || this.isMobile.Android() !== null){
                marker.addListener('click', () => {
                    infowindowForMobile.open(this.map, marker);

                })
            }
            else {
                marker.addListener('click', () => {
                    this.$router.push(`item/${item._id}`)

                })
                marker.addListener('mouseover', () => {
                    infowindow.open(this.map, marker);
                })
                marker.addListener('mouseout', () => {
                    infowindow.close(this.map, marker);

                })
            }
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