import {Game} from './game.js'
import {DATA, Menu} from './menu.js';


let menu = new Menu();
menu.createMenu(DATA.mainMenu);
menu.menuEventHandler();



