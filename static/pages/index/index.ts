import template from './index.template';
import { EventBus } from '../../engine/event-bus';
import { Validator, ContextValidator } from '../../engine/validator';
import { State, ChatResponse } from '../../types';
import { $Yaxi } from '../../common/ya.instanses';
import { Response } from '../../engine/yaxios';

interface Context extends State { }
class Context {
  $bus: EventBus;

  chats: ChatResponse;

  $validator: Validator;

  template = template;

  data = {
    newChat: '',
    message: '',
    currentTime: 'Friday, 12 July 2020',
    chats: [
      {
        id: 0,
        title: 'Test',
        avatar: '',
      },
    ],
    currentChat: [
      {
        date: '00:01:22',
        text: 'Please just speak to me!',
      },
      {
        date: '00:01:47',
        text: 'Please just say you love me!',
      },
      {
        date: '00:02:22',
        text: 'You\'re all I got !!!',
      },
      {
        date: '00:10:00',
        text: 'You\'re my codependency...',
      },
    ],
  };

  setup() {
    // this.methods.updateChats();
    console.log('setup index');
  }

  mounted() {
    this.data.currentTime = this.methods.getDate();
    console.log('mounted index');
  }

  updated() {
    console.log('updated index');
  }

  methods = {
    setNameNewChat: (event: InputEvent) => {
      this.data.newChat = (event.target as HTMLInputElement).value;
    },
    getDate: () => {
      const date = new Date();
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const dd: string | number = date.getDate();
      const mm = months[date.getMonth() + 1];
      const yy = date.getFullYear();
      return `${dd}  ${mm}  ${yy}`;
    },
    change: (event: KeyboardEvent) => {
      this.data.message = (event.target as HTMLInputElement).value;
    },
    blur: () => this.$validator.simple('message'),
    enter: () => {
      if (this.methods.blur()) {
        this.data.currentChat = this.data.currentChat.concat({
          date: new Date().toLocaleTimeString(), text: this.data.message,
        });
        this.data.message = '';
        (document.querySelector('#message') as HTMLInputElement).value = '';
      }
    },
    keydown: (event: KeyboardEvent) => {
      if (event.keyCode === 13) {
        this.methods.enter();
      }
    },
    focus: (event: FocusEvent) => {
      (event.target as HTMLElement).classList.remove('active_input-error');
    },
    logout: () => {
      this.$router.go('/signin');
      // $Yaxi.logout().then(() => this.$router.go('/signin'));
    },
    updateChats: () => {
      $Yaxi.getChats()
        .then((res: Response) => {
          this.data.chats = res.data as ChatResponse[];
        })
        .catch((err: Response) => {
          if (err.status.toString().startsWith('4')) {
            this.$router.go('/signin');
          }
        });
    },
    createChat: () => {
      const newChat = {
        id: 1,
        title: this.data.newChat,
        avatar: '',
      };
      this.data.chats = [...this.data.chats, newChat];
      // $Yaxi.createChat({ data: { title: this.data.newChat } } as Options)
      //   .then(() => {
      //     (document.getElementById('chatInput') as HTMLInputElement).value = '';
      //     this.methods.updateChats();
      //   })
      //   .catch(() => {
      //     const box = document.querySelector('.error-box');
      //     box.classList.add('active-error');
      //     setTimeout(() => box.classList.remove('active-error'), 3000);
      //   });
    },
  };

  validation: ContextValidator = {
    message: [{ text: 'Invalid characters', func: (message: string) => !/<script/.test(message) }],
  };
}
export default new Context();
