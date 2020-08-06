import { State } from '../types';

export type ValidateArr = {
  text: string;
  func(key: string): boolean;
  custom?: {[key: string]: string[]};
};
export interface ContextValidator {
  [key: string]: ValidateArr[];
}
export interface Validator {
  context: ContextValidator;
  simple(id: string): boolean;
  all(): boolean;
  validData: []
}

export class Validator {
  constructor(context: ContextValidator, validData) {
    this.context = context;
    this.validData = validData;
  }

  errors = {
    repeat: (ctx:State, arr) => ctx[arr[0]] === ctx[arr[1]],
  };

  setErrors(id: string, text: string, notvalid: boolean) {
    const node = document.getElementById(id);
    if (notvalid) {
      node.classList.add('active_input-error');
    } else {
      node.classList.remove('active_input-error');
    }

    node.nextElementSibling.textContent = text;
  }

  simple = (id: string): boolean => {
    const findVObj = this.validData[id];
    if (!findVObj) {
      throw new Error(`\n\n (ノ°益°)ノ  Check  --> ${id} <-- ID in your Validation Data!  (ノ°益°)ノ \n\n`);
    }

    const node = document.getElementById(id);
    if (!node) {
      throw new Error(`\n\n (ノ°益°)ノ  Check  --> ${id} <-- ID in your DOM!  (ノ°益°)ノ \n\n`);
    }

    for (const condition of findVObj) {
      if (condition.custom) {
        const key = Object.keys(condition.custom)[0];
        const notvalid = !this.errors[key](this.context, condition.custom[key]);
        condition.custom[key].forEach((el) => this.setErrors(el, condition.text, notvalid));
        if (notvalid) {
          return false;
        }
      }

      if (!condition.func(this.context[id])) {
        this.setErrors(id, condition.text, true);
        return false;
      }
    }

    return true;
  };

  all(): boolean {
    const result = [];
    for (const key in this.validData) {
      if (Object.prototype.hasOwnProperty.call(this.validData, key)) {
        result.push(this.simple(key));
      }
    }

    return !result.includes(false);
  }
}
