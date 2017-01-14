export default {
    data() {
        return {
            newItem: {
                name: '', primaryCtg: '', secondaryCtg: '', status: '', loc: { lat: '', lng: '' }, desc: '', img: ''
            },
            ctx: null,
            canvas: null,
            isCanvas: false,
        }
    },
    methods: {
        sendItem() {
            // console.log('clicked', this.newItem);
            if (!this.newItem.img) alert("You have not added an image!", "Try again...");
            // if (!this.newItem.img) this.$root.$refs.toastr.e("You have not added an image!", "Try again...");
            else {
                this.$http.post('http://localhost:3003/data/item', this.newItem)
                    .then(() => {
                        this.newItem = {
                            name: '', primaryCtg: '', secondaryCtg: '', status: '', loc: { lat: '', lng: '' }, desc: '', img: ''
                        };
                        this.isCanvas = false;
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
                this.isCanvas = true;
            }
            reader.readAsDataURL(e.target.files[0]);
        },
        uploadImg() {
            var imgToSave = this.ctx.getImageData(0, 0, 200, 200)
            this.$http.post('http://localhost:3003/data/img', imgToSave)
                .then(res => res.json())
                .then(res => this.newItem.img = 'http://localhost:3003/data/img/' + res._id);
        },
        getCurrLoc() {
            navigator.geolocation.getCurrentPosition(position => {
                this.newItem.loc.lat = position.coords.latitude;
                this.newItem.loc.lng = position.coords.longitude;
            });
        }
    },
    mounted() {
        this.initCanvas()
    }
}