import {Game} from './game.js'
import {ENGDATA, Menu} from './menu.js'
import DATA from './DATA.js'

(function() {
    if (!localStorage.getItem('lang')) {
        localStorage.setItem('lang', 'eng');
    }
    console.log(1);
})


let menu = new Menu();
menu.createMenu();
menu.menuEventHandler();



