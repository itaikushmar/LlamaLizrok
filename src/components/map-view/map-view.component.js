import GoogleMapsLoader from 'google-maps'
GoogleMapsLoader.KEY = 'AIzaSyCc7ltRRQHGvEF7OwlrhRMR1QtXrNH9cZc';

export default {
    data() {
        return {
            loc: { desc: '', lat: null, lng: null },
            map: null
        }
    },
    created() {
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

                // navigator.geolocation.getCurrentPosition(position => {
                //     this.placeMarkerAndPanTo({ 
                //         lat: position.coords.latitude, 
                //         lng: position.coords.longitude
                //     });
                //     this.loc.lat = position.coords.latitude;
                //     this.loc.lng = position.coords.longitude;
                // });
            });
        },
        renderPlaceMarkers() {
                // console.log('renderPlaceMarkers', this.items);
            
            this.items.forEach(item => {
                let placeLatLng = { lat: item.loc.lat, lng: item.loc.lng }
                let marker = new google.maps.Marker({
                    position: placeLatLng,
                    title: item.name,
                    map: this.map,
                })
                // this.placeMarkerAndPanTo(placeLatLng);
                this.map.panTo(placeLatLng);
                var infowindow = new google.maps.InfoWindow({
                    content: item.name + '+' + item.desc + '+' + item.imgUrl
                });
                marker.addListener('click', () => {
                    this.$router.push(`item/${item._id}`)

                })
                 marker.addListener('mouseover', () => {
                    infowindow.open(this.map,marker);

                })
            })
        },
        // placeMarkerAndPanTo(latLng) {
        //     var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: this.map
        //     });
        //     this.map.panTo(latLng);
        // },
    },
    mounted() {
        this.loadMap()
    },
        components: {
        GoogleMapsLoader
    },
    computed:{
        items(){
            return this.$store.state.items;
        }
    }
}