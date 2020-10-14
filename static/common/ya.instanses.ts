import { Yaxios, Options } from '../engine/yaxios';

const config = {
  baseUrl: '',
  headers: {
    'Content-Type': 'application/json',
  },
};
export default new Yaxios(config);
class Yaxi {
  instance = new Yaxios(config);

  getChats = () => this.instance.get('/chats');

  getUser = () => this.instance.get('/auth/user');

  createChat = (data: Options) => this.instance.post('/chats', data as Options);

  signin = (data: unknown) => this.instance.post('/auth/signin', data as Options);

  logout = () => this.instance.post('/auth/logout');

  signup = (data: Options) => this.instance.post('/auth/signup', data as Options);
}

export const $Yaxi = new Yaxi();
