import template from './signup.template';
import { EventBus } from '../../engine/event-bus';
import Button from '../../components/button/button';
import { Validator, ContextValidator } from '../../engine/validator';
import $ya from '../../common/ya.instanses';
import { State } from '../../types';
import { Router } from '../../engine/router';

interface Context extends State { }
class Context {
  $ya = $ya;

  $router: Router;

  $bus: EventBus;

  $validator: Validator;

  template = template;

  components = {
    button: Button,
  };

  data = {
    login: '',
    email: '',
    password: '',
    repeatpassword: '',
    name: '',
    secondname: '',
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
      const target = event.target as HTMLInputElement;
      this.data[target.id] = target.value;
    },
    focus: (event: FocusEvent) => {
      (event.target as HTMLElement).classList.remove('active_input-error');
    },
    blur: (event: FocusEvent) => {
      this.$validator.simple((event.target as HTMLElement).id);
    },
    toSignIn: () => {
      this.$router.go('/signin');
    },
    keydown: (event: KeyboardEvent) => {
      if (event.keyCode === 13) {
        this.methods.submit();
      }
    },
    submit: () => {
      if (this.$validator.all()) {
        // const req = {
        //   data: {
        //     first_name: this.data.name,
        //     login: this.data.login,
        //     second_name: this.data.secondname,
        //     email: this.data.email,
        //     password: this.data.password,
        //     phone: this.data.phone,
        //   },
        // };
        this.$router.go('/signin');
        // $Yaxi.signup(req as Options)
        //   .then((res:Response) => {
        //     if (res.status === 200) {
        //       this.$router.go('/signin');
        //     }
        //   })
        //   .catch((err:Response) => {
        //     const box = document.querySelector('.error-box');
        //     box.textContent = err.status === 400 ? err.data as string : 'Server unavalible';
        //     box.classList.add('active-error');
        //     setTimeout(() => box.classList.remove('active-error'), 3000);
        //   });
      }
    },
  };

  validation: ContextValidator = {
    name: [
      { text: "This field can't be empty", func: (name) => !!name.length },
    ],
    secondname: [
      { text: "This field can't be empty", func: (secondname) => !!secondname.length },
    ],
    phone: [
      { text: "This field can't be empty", func: (phone) => !!phone.length },
    ],
    email: [
      { text: "This field can't be empty", func: (email) => !!email.length },
      {
        text: 'Email is not valid',
        func: (email) => /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email),
      },
    ],
    password: [
      { text: "This field can't be empty", func: (password) => !!password.length },
      { text: 'Minimum password length of 6 characters', func: (password) => password.length >= 6 },
      {
        text: 'This fields have to match',
        func: () => true,
        custom: { repeat: ['password', 'repeatpassword'] },
      },
    ],
    repeatpassword: [
      { text: "This field can't be empty", func: (password) => !!password.length },
      {
        text: 'This fields have to match',
        func: () => true,
        custom: { repeat: ['password', 'repeatpassword'] },
      },
    ],
    login: [
      { text: "This field can't be empty", func: (login) => !!login.length },
      { text: 'Minimum password length of 6 characters', func: (login) => login.length >= 6 },
    ],
  };
}
export default new Context();
