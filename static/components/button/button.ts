import template from './button.template';
import { EventBus } from '../../engine/event-bus';
import { Validator } from '../../engine/validator';
import { State } from '../../types';

interface Context extends State {}
class Context {
  $bus:EventBus;

  $validator: Validator;

  template = template;

  setup() {
    console.log('setup button');
  }

  mounted() {
    console.log('mounted button');
  }

  methods = {
    submit: () => {
      this.$bus.emit('submited');
    },
  };
}
const context = new Context();
export default context;
