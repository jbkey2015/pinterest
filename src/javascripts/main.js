import firebase from 'firebase';
import 'bootstrap';
import '../styles/main.scss';

import auth from './components/Auth/auth';
import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/authData';
import logout from './components/MyNavbar/myNavbar';


const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.loginButton();
  authData.checkLoginStatus();
  logout.logoutEvent();
};

init();
