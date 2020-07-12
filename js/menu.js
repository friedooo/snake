export {DATA, Menu};
import {Game} from './game.js'


const DATA = {'mainMenu' :
['start game', 'continue', 'mods', 'settings', 'hightscores']};


class Menu {

    createMenu(items) {
        $('body').html('');
        
        $('<div class = "menu-container"></div>').appendTo('body');


        this.container = $('.menu-container')[0];

        for (let i = 0; i < items.length; i++)
        {
            $('<div>', {
                class: 'menu-item',
                height: 100/ items.length + '%',
                text: items[i].toUpperCase(),
            }).appendTo(this.container);

        }
    }

    menuEventHandler() {
  
        $(window).on('click', (e) => {
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





