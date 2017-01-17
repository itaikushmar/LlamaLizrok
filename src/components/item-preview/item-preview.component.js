export default {
  data () {
    return {
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    displayItem() {
      this.$store.commit('setCurrItemIdx', this.item._id)
      // this.$store.dispatch('getItem');
      // this.$router.push('item');
    }
  },
}
