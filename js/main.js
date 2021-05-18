import {Game} from './game.js'
import {ENGDATA, Menu} from './menu.js';

if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'eng');
}

let menu = new Menu();
menu.createMenu();
menu.menuEventHandler();



