// Интерфейс валидатора
import { Validator, ContextValidator } from './engine/validator';
import { EventBus } from './engine/event-bus';
import { Router } from './engine/router';
// Интерфейс-контекст хуков жизненного цикла компонента
export interface EventBusCoxtext {
  setup?: () => void;
  mounted?: () => void;
  updated?: () => void;
}
// Интерфейс определения стейта компонентов
export interface State extends EventBusCoxtext {
  template: string;
  data?: {};
  methods?: {};
  components?: {};
  $validator?: Validator;
  $bus?: EventBus;
  validation?: ContextValidator;
  $router?: Router;
}

export type ChatResponse = {
  id: number,
  title:string,
  avatar: string
};
