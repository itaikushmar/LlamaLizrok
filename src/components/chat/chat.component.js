import io from 'socket.io-client'
export default {
name: 'chat',
  data () {
    return {
      socket: null,
      chatMsgs: [],
      chatMsg: {
        nickName: 'Guest',
        msg: '',
      },
        speechState: 'play'
    }
  },

  methods: {
    startVoiceRecognition(){
      this.chatMsg.msg = '';
      console.log('starting');
      console.log(this.speechState);
      this.recognition.start();
      this.speechState = 'stop';
    },
    stopVoiceRecognition(){
      console.log('stop');
      this.recognition.stop();
      this.speechState = 'play';
    },
    
    sendMsg () {
      console.log('Sending: ', this.chatMsg)
      this.socket.emit('chat message', this.chatMsg)
    
      this.chatMsg.msg = ''
    },
    scrollcheck(){
      window.scrollTo(0,document.body.scrollHeight);
    }
  },
  
  created () {
    const nickName = window.prompt('Nick name?')
    this.chatMsg.nickName = nickName || this.chatMsg.nickName
    this.socket = io.connect({ path: '/llamalizrok/data/socket.io', secure: true });
    console.log(this.socket)
    this.socket.on('chat message', chatMsg => {
      this.chatMsgs.push(chatMsg)
      this.scrollcheck();
           
    })
  },
  mounted(){
        if (!('webkitSpeechRecognition' in window)) {
            console.log('webkitSpeechRecognition not supported');
        } else {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.lang = 'en-us';
            this.recognition.interimResults = true;
            this.recognition.onstart = () => {
                this.isRec = true;
            }
            this.recognition.onresult = (event) => {
                let allText = '';
                for(let currRes in event.results){
                    const res = event.results[currRes][0];
                    if(res){
                        console.log('script', res.transcript)
                        allText += ' ' + res.transcript;
                    }
                }
                console.log('allText', allText);
                this.chatMsg.msg = allText;
            }
        }
    }
}
