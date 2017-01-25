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
        const itemId = this.$route.params._id;
        this.$store.dispatch('getCurrItem', itemId);
    },
    methods: {
        loadMap() {
            // console.log(this.$store.state.currItem)
            var defaultLoc = { lat: 32.088189, lng: 34.803140 };
            const options = {
                zoom: 15,
                center: defaultLoc
            };
            GoogleMapsLoader.load(google => {
                this.map = new google.maps.Map(this.$refs.map, options);
                navigator.geolocation.getCurrentPosition(position => {
                    this.placeMarkerAndPanTo({
                        lat: this.currItem.loc.lat,
                        lng: this.currItem.loc.lng
                    });
                    this.loc.lat = position.coords.latitude;
                    this.loc.lng = position.coords.longitude;
                });
            });
        },
        placeMarkerAndPanTo(latLng) {
            var marker = new google.maps.Marker({
                position: latLng,
                map: this.map
            });
            this.map.panTo(latLng);
        },
        hara() {
            console.log(this.currItem.loc.lat)
        },
    },
    computed: {
        currItem() {
            return this.$store.state.currItem;
        }
    },
    watch: {
        currItem: function () {
            this.loadMap()
        }
    },
    components: {
        GoogleMapsLoader
    }
}