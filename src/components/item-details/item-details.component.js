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
        console.log(this.currItem);
            var defaultLoc = { lat: this.currItem.loc.lat, lng: this.currItem.loc.lng };
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
                    this.loc.lat = this.currItem.loc.lat;
                    this.loc.lng = this.currItem.loc.lng;
                });
            });
        },
        placeMarkerAndPanTo(latLng) {
            var marker = new google.maps.Marker({
                position: latLng,
                map: this.map
            });
            this.map.panTo(latLng);
        }
    },
    computed: {
        currItem () {
            return this.$store.state.currItem;
            }
        },
        mounted() {
            this.loadMap()
        },
    components: {
        GoogleMapsLoader
    }
}