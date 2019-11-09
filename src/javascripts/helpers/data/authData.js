import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import board from '../../components/boards/boards';

const authDiv = $('#auth');
const boardDiv = $('#boards');
const logoutNavbar = $('#navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is loggen in - we should NOT see auth component
      boardDiv.removeClass('hide');
      logoutNavbar.removeClass('hide');
      authDiv.addClass('hide');
      board.showAllBoards(user.uid);
    } else {
      // nobody logged in SHOW auth component
      boardDiv.addClass('hide');
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
