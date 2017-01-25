import GoogleMapsLoader from 'google-maps'
GoogleMapsLoader.KEY = 'AIzaSyCc7ltRRQHGvEF7OwlrhRMR1QtXrNH9cZc';

export default {
    data() {
        return {
            ctx: null,
            canvas: null,
            shouldShowImgCanvas: false,
            ctgHandler: '',
            loc: { desc: '', lat: null, lng: null },
            map: null
        }
    },
    methods: {
        sendItem() {
            const timeCreated = new Date();
            const file = this.$refs.inputFile.files;
            const editItemForm = this.$refs.editItemForm;
            if (file && file.length) {
                var formData = new FormData(editItemForm);
                formData.append('file', file[0], file[0].name);
                formData.append('loc', JSON.stringify(this.loc));
                formData.append('createdAt', timeCreated);
                this.$store.dispatch('addNewItem', formData)
                    .then(res => {
                        if (res === undefined) this.$refs.toastr.w("Something went wrong", "Try Again!");
                        else {
                            this.$refs.toastr.s("You have successfully added an item! Redirecting...", "Great!");
                            setTimeout(() =>
                                this.$router.push('/item-center')
                                , 1500)
                        }
                    })
            }
        },
        initCanvas() {
            this.canvas = this.$refs.canvas;
            this.ctx = this.canvas.getContext('2d');
        },
        drawOnCanvas(e) {
            this.ctx.clearRect(0, 0, 200, 200);
            var reader = new FileReader();
            reader.onload = event => {
                var img = new Image();
                img.onload = () => {
                    this.ctx.drawImage(img, 0, 0, 200, 200);
                }
                img.src = event.target.result;
                this.shouldShowImgCanvas = true;
            }
            reader.readAsDataURL(e.target.files[0]);
        },
        loadMap() {
            var defaultLoc = { lat: 32.088189, lng: 34.803140 };
            const options = {
                zoom: 15,
                center: defaultLoc
            };
            GoogleMapsLoader.load(google => {
                this.map = new google.maps.Map(this.$refs.map, options);
                navigator.geolocation.getCurrentPosition(position => {
                    this.placeMarkerAndPanTo({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
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
        }
    },
    computed: {
        ctgs() {
            return this.$store.state.ctgs;
        }
    },
    mounted() {
        this.initCanvas(),
            this.loadMap()
    },
    components: {
        GoogleMapsLoader
    }
}