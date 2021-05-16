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

        this.createResultScreen();

        
        $('<span>', {
            class: 'back-btn',
            text: 'Back to menu',
        }).appendTo('body');

        this.backBtn = $('.back-btn')[0];

        this.backBtn.style.display = 'none';
    }

    menuEventHandler() {
  
        $(window).on('click', (e) => {
            if (e.target.innerHTML.toLowerCase() === 'start game')
            {
                this.startGameFunc();

                this.backBtn.style.display = 'inline';
            }
        }); 
    }


    startGameFunc() {
        const snake = new Game(600,600, 1024);
        snake.startGame();
        this.backBtn.addEventListener('click', () => {
            this.createMenu(DATA.mainMenu);
            this.clearGameField();
            this.backBtn.style.display = 'none';
        })
    } 

    createResultScreen() {
        this.resultScreen = document.createElement('div');
        this.resultScreen.classList.add('result-screen');
        this.container.appendChild(this.resultScreen);

        this.resultScreen.style.display = 'none';

        let menuBtnContainer = document.createElement('div');
        menuBtnContainer.classList.add('menu-btn-container');
        this.resultScreen.appendChild(menuBtnContainer);

        let toMenuBtn = document.createElement('div');
        toMenuBtn.innerHTML = 'Menu';
        toMenuBtn.classList.add('toMenu');
        menuBtnContainer.appendChild(toMenuBtn);

        
        this.zeroStatistics = {
            'count' : 0,
            'speed': 0,
            'length': 0,
            'time' : 0};

        for (let key in this.zeroStatistics)
        {
                let elem = document.createElement('div');
                elem.classList.add('result-item');
                elem.style.height = '22%';
                this.resultScreen.appendChild(elem);

                let name = document.createElement('div');
                name.innerHTML = key;
                elem.appendChild(name);

                let value = document.createElement('div');
                value.innerHTML = this.zeroStatistics[key];
                elem.appendChild(value);       
        }
        

        toMenuBtn.addEventListener('click', () => {
            this.backBtn.style.display = 'none';
            this.resultScreen.style.display = 'none';
            document.querySelectorAll('.menu-item').forEach((e) => {
                e.style.display = 'flex';
            })

            this.clearGameField();
       });
    }

    clearGameField() {
        // document.querySelector('body').removeChild(document.querySelector('.container'));
        // document.querySelector('body').removeChild(document.querySelector('.counter'));
        document.querySelector('.container').remove(); //я добавил эту ебанину и ошибка прошла (ошибка об удалении поля)
        document.querySelector('.counter').remove();
    }

}





