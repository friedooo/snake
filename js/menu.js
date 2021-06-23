export { Menu };
import {Game} from './game.js'


class Menu {

    constructor(DATA) {
        this.data = DATA;
        this.cellsAmount = localStorage.getItem('cells');
    }

    createMenu() {
        localStorage.setItem('stage', 'mainMenu');
        console.log(localStorage.getItem('stage'));

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

    createSettings() {
        localStorage.setItem('stage', 'settings');
        console.log(localStorage.getItem('stage'));

        this.settings = document.createElement('div');
        this.settings.classList.add('settings');
        this.container.appendChild(this.settings);

        this.container.classList.add('menu-container-border');
        this.createLangSwitcher(this.settings);

        this.backBtn.style.display = 'inline';
        this.backBtnHandler();
    }
    

    initLangSwitch() {
        let langItems;
        switch (localStorage.getItem('lang')) {
            case 'eng': {
                langItems = this.data[localStorage.getItem('stage')].eng;
                break;
            }
            case 'ru': {
                langItems = this.data[localStorage.getItem('stage')].ru;
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

    langSwitch = (e) => {

        switch (e.target.alt) {
            case 'eng': 
                document.querySelectorAll('.menu-item').forEach((elem, i) => {
                    elem.innerHTML = this.data.mainMenu.eng[i].toUpperCase();
                })
                localStorage.setItem('lang', 'eng')
                break;
            case 'ru':
                document.querySelectorAll('.menu-item').forEach((elem, i) => {
                    elem.innerHTML = this.data.mainMenu.ru[i].toUpperCase();
                })
                localStorage.setItem('lang', 'ru')
                break;
        }


        // меняем текст 'выбор языка' в settings
        document.querySelector('.lang-choice-text').innerHTML = this.data[localStorage.getItem('stage')][localStorage.getItem('lang')][0].toUpperCase();



    }

    createLangSwitcher(container) {
        if (this.langSwitcher) {
            this.langSwitcher.remove();
        }

        let langSwitcherContainer = document.createElement('div');
        langSwitcherContainer.classList.add('lang-switcher-container');
        container.appendChild(langSwitcherContainer);
        

        this.langSwitcher = document.createElement('select');
        this.langSwitcher.name = "language";
        this.langSwitcher.classList.add('lang-switcher');

        let langChoiceText = document.createElement('div');
        langChoiceText.classList.add('lang-choice-text');
        langChoiceText.innerHTML = this.data[localStorage.getItem('stage')][localStorage.getItem('lang')][0].toUpperCase();
        langSwitcherContainer.appendChild(langChoiceText);


        let flagContainer = document.createElement('div');
        flagContainer.classList.add('flag-container');
        langSwitcherContainer.appendChild(flagContainer);


        for (let url of this.data.flags) {
            let img = document.createElement('img');
            img.src = url[0];
            img.alt = url[1];
            img.classList.add('flag');
            img.addEventListener('click', this.langSwitch);
            flagContainer.appendChild(img);
        }
    }

    menuEventHandler() {
  
        window.addEventListener('click', (event) => {

            if (event.target.innerHTML.toLowerCase() === this.data.mainMenu[localStorage.getItem('lang')][0]) {
                this.startGameFunc();;
                this.backBtn.style.display = 'inline';
            }
            else if (event.target.innerHTML.toLowerCase() === this.data.mainMenu[localStorage.getItem('lang')][4]) {
                this.container.innerHTML = '';
                this.createSettings();
            }
        })
    }



    startGameFunc = () => {
        localStorage.setItem('stage', 'game');
        localStorage.setItem('pause', 'false');
        console.log(localStorage.getItem('stage'));

        const snake = new Game(700, 700, Number(this.cellsAmount));
        snake.startGame();
        this.backBtnHandler(snake.keyEventRemove);
    } 

    backBtnHandler = (eventRemoveFunc) => {
        this.backBtn.addEventListener('click',() => {
            if (localStorage.getItem('stage') === 'game') { //пока что такой вот костыль
                eventRemoveFunc();                          // потому что в settings backBtn ломается
            }

            this.backBtnEvent();
        });
    }

    backBtnEvent = () => {
        this.createMenu();
        this.clearGameField();
        this.backBtn.style.display = 'none';
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

            localStorage.setItem('stage', 'mainMenu');
            console.log(localStorage.getItem('stage'));

            this.clearGameField();
       });
    }

    clearGameField() {
        // document.querySelector('body').removeChild(document.querySelector('.container'));
        // document.querySelector('body').removeChild(document.querySelector('.counter'));
        if (document.querySelector('.container') !== null) {
            document.querySelector('.container').remove(); //я добавил эту ебанину и ошибка прошла (ошибка об удалении поля)
            document.querySelector('.counter').remove();
        }
    }
}



