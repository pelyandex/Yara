import template from './signin.tempate';
import { EventBus } from '../../engine/event-bus';
import Button from '../../components/button/button';
import { Validator, ContextValidator } from '../../engine/validator';
import { State } from '../../types';
import $ya from '../../common/ya.instanses';
import { Router } from '../../engine/router';

interface Context extends State { }
class Context {
  $bus: EventBus;

  $validator: Validator;

  $ya = $ya;

  $router: Router;

  template = template;

  components = {
    button: Button,
  };

  data = {
    login: '',
    password: '',
  };

  setup() {
    // $Yaxi.getUser()
    //   .then((res:Response) => {
    //     if (res.status === 200) {
    //       this.$router.go('/');
    //     }
    //   });
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
    toSignUp: () => {
      this.$router.go('/signup');
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
        //     login: this.data.login,
        //     password: this.data.password,
        //   },
        // };
        this.$router.go('/');
        // $Yaxi.signin(req)
        //   .then((res: Response) => {
        //     if (res.status === 200) {
        //       this.$router.go('/');
        //     }
        //   })
        //   .catch((err: Response) => {
        //     const box = document.querySelector('.error-box');
        //     const errObj = {
        //       400: err.data.reason,
        //       401: err.data,
        //     };
        //     const text = errObj[err.status];
        //     box.firstChild.textContent = text ?? 'Server is unavalible';
        //     box.classList.add('active-error');
        //     setTimeout(() => box.classList.remove('active-error'), 3000);
        //   });
      }
    },
  };

  validation: ContextValidator = {
    login: [
      { text: 'This field can\'t be empty', func: (login) => Boolean(login.length) },
      { text: 'Minimum password length of 6 characters', func: (login) => login.length >= 6 },
    ],
    password: [
      { text: 'This field can\'t be empty', func: (password) => Boolean(password.length) },
      { text: 'Minimum password length of 6 characters', func: (password) => Boolean(password.length) },
    ],
  };
}
export default new Context();
