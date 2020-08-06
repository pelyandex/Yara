import index from './index/index';
import signin from './signin/signin';
import settings from './settings/settings';
import signup from './signup/signup';

export default {
  pages: {
    index, signin, settings, signup,
  },
  router: {
    index: '/', signin: '/signin', settings: '/settings', signup: '/signup',
  },
};
