export default  {
  data: () => {
    return {
      items: [],
      contactForm: {name: '', email: '', phone: '', msg: ''},
      formHidden: false
    }
  },
  methods : {
    sendForm () {
      // console.log('clicked' , this.contactForm);
      this.$http.post('contact', this.contactForm)
            .then(() => {
                this.toggleForm();
                this.contactForm = {name: '', email: '', phone: '', msg: ''};
            })
    },
    toggleForm () {
      this.formHidden = true; 
      setTimeout (() => {
        this.formHidden = false;
        // console.log('formhidden' , this.formHidden);
      }, 5000)
    }
  }
}