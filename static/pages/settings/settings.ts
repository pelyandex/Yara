import template from './settings.template';
import { EventBus } from '../../engine/event-bus';
import Button from '../../components/button/button';
import { Validator, ContextValidator } from '../../engine/validator';
import { State } from '../../types';
import $ya from '../../common/ya.instanses';
import { Router } from '../../engine/router';

interface Context extends State { }
class Context {
  $router: Router;

  $bus: EventBus;

  $validator: Validator;

  template = template;

  components = {
    button: Button,
  };

  $ya = $ya;

  data = {
    name: 'ss',
    login: '',
    email: '',
    previouspassword: '',
    newpassword: '',
    repeatnewpassword: '',
    phone: '',
  };

  setup() {
    this.$bus.on('submited', () => this.methods.submit());
    console.log('setup signin');
  }

  mounted() {
    console.log('mounted signin');
  }

  updated() {
    console.log('updated signin');
  }

  methods = {
    change: (event: KeyboardEvent) => {
      this.data[(event.target as HTMLInputElement).id] = (event.target as HTMLInputElement).value;
    },
    keydown: (event) => {
      if (event.keyCode === 13) {
        this.methods.submit();
      }
    },
    focus: (event) => {
      (event.target as HTMLElement).classList.remove('active_input-error');
    },
    blur: (e) => {
      this.$validator.simple((e.target as HTMLElement).id);
    },
    submit: () => {
      if (this.$validator.all()) {
        this.$router.go('/');
        // const req = { data: this.data };
        // this.$ya.put('/user/profile', req as Options).then((res: Response) => {
        //   if (res.status === 200) {
        //     this.$router.go('/');
        //   }
        // });
      }
    },
  };

  validation: ContextValidator = {
    name: [
      { text: 'This field can\'t be empty', func: (email) => Boolean(email.length) },
      { text: 'Minimum password length of 4 characters', func: (password) => password.length >= 4 },
    ],
    login: [
      { text: 'This field can\'t be empty', func: (login) => Boolean(login.length) },
      { text: 'Minimum password length of 6 characters', func: (login) => login.length >= 6 },
    ],
    email: [
      { text: 'This field can\'t be empty', func: (email) => Boolean(email.length) },
      {
        text: 'Email is not valid',
        func: (email) => /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email),
      },
    ],
    previouspassword: [
      { text: 'This field can\'t be empty', func: (previouspassword) => Boolean(previouspassword.length) },
    ],
    newpassword: [
      { text: 'This field can\'t be empty', func: (newpassword) => Boolean(newpassword.length) },
      {
        text: 'Minimum password length of 6 characters',
        func: (newpassword) => newpassword.length >= 6,
      },
      {
        text: 'This fields have to match',
        func: () => true,
        custom: { repeat: ['newpassword', 'repeatnewpassword'] },
      },
    ],
    repeatnewpassword: [
      { text: 'This field can\'t be empty', func: (repeatnewpassword) => Boolean(repeatnewpassword.length) },
      {
        text: 'This fields have to match',
        func: () => true,
        custom: { repeat: ['newpassword', 'repeatnewpassword'] },
      },
    ],
  };
}
export default new Context();
