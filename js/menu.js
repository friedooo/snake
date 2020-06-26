const MAINMENU = ['start game', 'continue', 'mods', 'settings', 'hightscores']

class Menu {

    createMenu(items) {
        document.querySelector('body').innerHTML = '';
        let container = document.createElement('div');
        container.classList.add('menu-container');
        document.querySelector('body').appendChild(container);
        for (let i = 0; i < items.length; i++)
        {
            let item = document.createElement('div');
            item.classList.add('menu-item');
            item.innerHTML = items[i].toUpperCase();
            item.style.height = 100 / items.length + '%';
            container.appendChild(item);
        }
    }
}

let menu = new Menu();
menu.createMenu(MAINMENU);
