export default {
    data() {
        return {
        }
    },
    created() {
        const itemId = this.$route.params._id;
        this.$store.dispatch('getCurrItem', itemId);
    },
    computed: {
        currItem () {
            return this.$store.state.currItem;
        }
    }
}