export {ENGDATA, Menu};
import {Game} from './game.js'


const ENGDATA = {'mainMenu' :
    ['start game', 'continue', 'mods', 'settings', 'hightscores']};

const RUDATA = {'mainMenu' :
    ['начать игру', 'продолжить', 'моды', 'настройки', 'рекорды']
}

const LANG = ['eng', 'ru'];

class Menu {

    constructor(DATA) {
        this.data = DATA;
    }

    createMenu() {

        //----- хз че это (без него работает), но на всякий случай
        // пусть пока здесь побудет  ------
        // upd: походу эта штука очищает полностью body, пока не буду трогать в общем
        //$('body').html('');
        

            if (this.container) {
                this.container.remove();
            }

            this.container = document.createElement('div');
            this.container.classList.add('menu-container');
            document.querySelector('body').appendChild(this.container);
           

            this.initLangSwitch();
            this.createResultScreen();
            this.createBackBtn();
            this.createLangSwitcher();

    }

    createBackBtn() {
        if (this.backBtn) {
            this.backBtn.remove();
        }

        this.backBtn = document.createElement('span');
        this.backBtn.classList.add('back-btn');
        this.backBtn.innerHTML = 'Back to menu';
        this.backBtn.style.display = 'none';
        document.querySelector('body').appendChild(this.backBtn);  
    }

    initLangSwitch() {
        let langItems;
        switch (localStorage.getItem('lang')) {
            case 'eng': {
                langItems = ENGDATA.mainMenu;
                break;
            }
            case 'ru': {
                langItems = RUDATA.mainMenu;
                break;
            }
        }

        for (let i = 0; i < langItems.length; i++)
        {
            let elem = document.createElement('div');
            elem.classList.add('menu-item');
            elem.style.height = 100 / langItems.length + '%';
            elem.innerHTML = langItems[i].toUpperCase();
            this.container.appendChild(elem);

        }
    }

    langSwitch(e) {
        switch (e.target.value) {
            case 'eng': 
                document.querySelectorAll('.menu-item').forEach((elem, i) => {
                    elem.innerHTML = ENGDATA.mainMenu[i].toUpperCase();
                })
                localStorage.setItem('lang', 'eng')
                break;
            case 'ru':
                document.querySelectorAll('.menu-item').forEach((elem, i) => {
                    elem.innerHTML = RUDATA.mainMenu[i].toUpperCase();
                })
                localStorage.setItem('lang', 'ru')
                break;
        }


    }

    createLangSwitcher() {
        if (this.langSwitcher) {
            this.langSwitcher.remove();
        }

        this.langSwitcher = document.createElement('select');
        this.langSwitcher.name = "language";
        this.langSwitcher.classList.add('lang-switcher');

        let flagsArr = ['flag', 'flag-us', 'flag', 'flag-ru'];

        LANG.forEach((e, index) => {
            let lang = document.createElement('option');
            
            lang.innerHTML = e;

            if (lang.innerHTML === localStorage.getItem('lang')) {
                lang.selected = true;
            }

            this.langSwitcher.appendChild(lang);
            
        })

        this.langSwitcher.addEventListener('change', this.langSwitch);
        document.querySelector('body').appendChild(this.langSwitcher);  
    }

    menuEventHandler() {
  
        window.addEventListener('click', (event) => {
            if (event.target.innerHTML.toLowerCase() === 'start game') {
                this.startGameFunc();
                console.log(1);
                this.backBtn.style.display = 'inline';
            }
        })
    }


    startGameFunc() {
        const snake = new Game(700,700, 256);
        snake.startGame();
        this.backBtn.addEventListener('click', () => {
            this.createMenu(ENGDATA.mainMenu);
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





