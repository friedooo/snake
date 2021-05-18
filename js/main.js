
import {Menu} from './menu.js'
import DATA from './DATA.js'

(function() {
    if (!localStorage.getItem('lang')) {
        localStorage.setItem('lang', 'eng');
    }
    console.log(1);
})()


let menu = new Menu(DATA);
menu.createMenu();
menu.menuEventHandler();



