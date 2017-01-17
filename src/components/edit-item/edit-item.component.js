export default {
    data() {
        return {
            ctx: null,
            canvas: null,
            shouldShowImgCanvas: false,
            ctgHandler: '',
            loc: { desc: '', lat: null, lng: null }
        }
    },
    methods: {
        sendItem() {
            const timeCreated = Date.now();
            const file = this.$refs.inputFile.files;
            const editItemForm = this.$refs.editItemForm;
            if (file && file.length) {
                var formData = new FormData(editItemForm);
                formData.append('file', file[0], file[0].name);
                formData.append('loc', JSON.stringify(this.loc));
                formData.append('createdAt', timeCreated);
                this.$http.post('item', formData)
                    .then(() => {
                        this.$refs.toastr.s("You have successfully added an image! Redirecting...", "Great!")
                        setTimeout(() =>
                            this.$router.push('/item-center')
                            , 1500)
                    });
            }
            else {
                this.$refs.toastr.w("You have not added an image!", "Try again...");
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
        uploadImg() {
            var imgToSave = this.ctx.getImageData(0, 0, 200, 200)
            this.$http.post('img', imgToSave)
                .then(res => res.json())
                .then(res => this.newItem.img = 'http://localhost:3003/data/img/' + res._id);
        },
        getCurrLoc() {
            navigator.geolocation.getCurrentPosition(position => {
                this.loc.lat = position.coords.latitude;
                this.loc.lng = position.coords.longitude;
            });
        }
    },
    computed: {
        ctgs() {
            return this.$store.state.ctgs;
        }
    },
    mounted() {
        this.initCanvas()
    }
}