import io from 'socket.io-client'
export default {
name: 'chat',
  data () {
    return {
      socket: null,
      chatMsgs: [],
      chatMsg: {
        nickName: 'Guest',
        msg: ''
        // speechState: 'play'
      }
    }
  },
  methods: {
    startVoiceRecognition(){
      console.log('starting');
      this.recognition.start();
      // this.speechState = 'stop';
    },
    stopVoiceRecognition(){
      console.log('stop');
      this.recognition.stop();
      // this.speechState = 'play';
    },
    
    sendMsg () {
      console.log('Sending: ', this.chatMsg)
      this.socket.emit('chat newMessage', this.chatMsg)
      this.chatMsg.msg = ''
    }
  },
  created () {
    const nickName = window.prompt('Nick name?')
    this.chatMsg.nickName = nickName || this.chatMsg.nickName
    this.socket = io.connect('https://llamalizrok.herokuapp.com')
    this.socket.on('chat message', chatMsg => {
      this.chatMsgs.push(chatMsg)
    })
  },
  mounted(){
        if (!('webkitSpeechRecognition' in window)) {
            console.log('webkitSpeechRecognition not supported');
        } else {
            this.recognition = new webkitSpeechRecognition();
            // this.recognition.continuous = true;
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
                //now you can show the results
            }
            // this.recognition.onerror = (event) => {
            //     console.log('onerror', event);
            //     this.isRec = false;
            // }
            // this.recognition.onend = () => { 
            //     console.log('done record')
            //     if(this.isRec) this.recognition.start();
            // }
        }
    }
}
