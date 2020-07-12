export {DATA, Menu};
import {Game} from './game.js'


const DATA = {'mainMenu' :
['start game', 'continue', 'mods', 'settings', 'hightscores']};


class Menu {


    createMenu(items) {
        $('body').html('');
        
        $('body').append('<div class = "menu-container"></div>');
        
        // this.container = document.createElement('div');
        // this.container.classList.add('menu-container');

        this.container = $('.menu-container')[0];

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
            if (e.target.innerHTML.toLowerCase() === 'start game')
            {
                this.startGameFunc();
            }
        }); 
    }


    startGameFunc() {
        const snake = new Game(600,600, 1024);
        snake.startGame();
        snake.backBtn.addEventListener('click', () => {
            this.createMenu(DATA.mainMenu);
        })
    } 

}





