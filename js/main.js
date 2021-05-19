
import {Menu} from './menu.js'
import DATA from './DATA.js'

(function() {
    if (!localStorage.getItem('lang')) {
        localStorage.setItem('lang', 'eng');
    }

    localStorage.setItem('stage', 'mainMenu');

    localStorage.setItem('cells', 256);
})()


let menu = new Menu(DATA);
menu.createMenu();
menu.menuEventHandler();



