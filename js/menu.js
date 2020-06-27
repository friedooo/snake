export {DATA, Menu};
import {Game} from './game.js'


const DATA = {'mainMenu' :
['start game', 'continue', 'mods', 'settings', 'hightscores']};


class Menu {

    constructor() {
        this.container = document.createElement('div');
        this.container.classList.add('menu-container');
        this.events = {'start game': this.startGameFunc};
    }

    createMenu(items) {
        document.querySelector('body').innerHTML = '';
        
        
        document.querySelector('body').appendChild(this.container);
        for (let i = 0; i < items.length; i++)
        {
            let item = document.createElement('div');
            item.classList.add('menu-item');
            item.innerHTML = items[i].toUpperCase();
            item.style.height = 100 / items.length + '%';
            this.container.appendChild(item);
        }
    }

    menuEventHandler() {
        window.addEventListener('click', (e) => {
            if (this.events[e.target.innerHTML.toLowerCase()] != undefined)
            {
                this.events[e.target.innerHTML.toLowerCase()]();
            }
        }); 
    }

    startGameFunc() {
        const snake = new Game(600,600, 1024);
        snake.startGame();
    }
    
}





