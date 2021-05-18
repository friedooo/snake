import {Game} from './game.js'
import {ENGDATA, Menu} from './menu.js';

if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'eng');
}

fetch(',.DATA.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });


let menu = new Menu();
menu.createMenu();
menu.menuEventHandler();



