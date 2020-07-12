import {DATA, Menu} from './menu.js';

export class Game {
    constructor(height, width, cells) {
        this.height = height;
        this.width = width;
        this.cells = cells;
        this.IMAGES = [
            '../src/img/burger.svg',
            '../src/img/apple.svg',
            '../src/img/beer.svg',
            '../src/img/pizza.svg',
            '../src/img/donut.svg',
            '../src/img/popcorn.svg',
            '../src/img/bread.svg',
            '../src/img/ice-cream.svg',
            '../src/img/meat.svg',
            '../src/img/chocolate.svg',
            '../src/img/tomato.svg',
            '../src/img/tea.svg',
            '../src/img/carrot.svg'
        ];
        this.count = 0;
        this.snakeLength = 5;
        this.arrX = [];
        this.arrY = [];
        this.key = 68;
        this.eaten = false;
        this.speedChangeStep = 5;
        this.speed = 150;
        this.speedFactor = 5000;

    }

    createField(){

        this.backBtn = document.createElement('span');
        this.backBtn.classList.add('back-btn');
        this.backBtn.innerHTML = 'Back to menu';
        document.querySelector('body').appendChild(this.backBtn);


        this.counter = document.createElement('div');
        this.counter.classList.add('counter');
        this.counter.innerHTML = 0;
        document.querySelector('body').appendChild(this.counter);



        this.container = document.createElement('div');
        this.container.classList.add('container');
        document.querySelector('body').appendChild(this.container);


        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('canvas')
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        
    }

    fillCells() {
        this.size = Math.sqrt(this.width*this.height)/Math.sqrt(this.cells);
        console.log(this.size);
        for (let i = 0; i < Math.sqrt(this.cells); i++)
        {
            for (let j = 0; j < Math.sqrt(this.cells); j++)
            {
                this.ctx.strokeRect(i*this.size, j*this.size, this.size, this.size); 
            }
        }

        // this.ctx.beginPath();
        // this.ctx.moveTo(100, 100);
        // this.ctx.quadraticCurveTo(100, 150, 200, 100);
        // this.ctx.stroke();
    }

    clearBody()
    {
        document.querySelector('body').innerHTML = '';
    }

    changeParams(params) {
        this.clearBody();
        for (let param of params)
        {
            if (param.key === 'width')
            this.width = param.value;
            if (param.key === 'height')
            this.height = param.value;
            if (param.key === 'cells')
            this.cells = param.value;
        }
        this.createField();
        this.fillCells();
    }


    
    
    createSnake() {
        let startPoint = Math.floor(Math.sqrt(this.cells)/2)*this.size;
        this.x = startPoint;
        this.y = startPoint;
        
        
        for (let i = this.snakeLength; i > 0; i--)
            {
                this.arrX.push(this.x - i * this.size);
                this.arrY.push(this.y /*- i * this.size*/);
            }

        for (let i = 0; i < this.arrX.length; i++)
        {
            this.ctx.fillRect(this.arrX[i], this.y, this.size, this.size);
            // this.ctx.fillRect(this.x, this.arrY[i], this.size, this.size);
        }
    }

  

    startMove() { 

        this.keyHandler();
        this.foodRandSpot();
        this.x -= this.size;
       
        //this.y -= this.size

        //console.log(this.width);

        this.movement();

    }

    movement() {
        this.interval = setInterval(() => {
            //console.log(this.arrX);
            
          
           if (this.eaten === false)
           {
                this.ctx.clearRect(this.arrX[0], this.arrY[0], this.size, this.size);
                this.ctx.strokeRect(this.arrX[0], this.arrY[0], this.size, this.size);
           }
           
            switch(this.key) {
                case 68: 
                    this.x += this.size;
                    if (this.x >= this.width)
                        {
                            this.x = 0
                        }
                    break;
                case 65:
                        if (this.x <= 0)
                            {
                                this.x = this.width;
                            }
                    this.x -= this.size;
                    break;
                case 87: 
                    if (this.y <= 0)
                        {
                            this.y = this.height;
                        }
                    this.y -= this.size;
                    break;
                case 83:  
                this.y += this.size;  
                    if (this.y >= this.height)
                        {
                            this.y = 0
                        }
                    break;
            }



            if (this.eaten === false)
            {
                this.arrY.shift();
                this.arrX.shift();
            }

            this.isCrash();
   
            this.arrY.push(this.y);
            this.arrX.push(this.x);

            this.ctx.fillRect(this.x, this.y, this.size, this.size);
            

            this.eaten = false;
            if (this.x === this.foodSpotX &&  this.y === this.foodSpotY)
            {
                this.foodRandSpot();
                this.eaten = true;

                this.snakeLength += 1;
                console.log(this.count);

                this.count += 1;
                this.counter.innerHTML = this.count;

                if (this.count != 0 && this.count % this.speedChangeStep === 0)
                {
                    this.speedProgress();
                    //alert(this.speed);
                }
               
               console.log(this.foodSpotX, this.foodSpotY);
            }

        }, this.speed);   
    }

    keyHandler(){
        const vertical = [87, 83];
        const horizontal = [68, 65];
    
        window.addEventListener('keydown', (e) => {
            if ((this.key === 87 || this.key === 83) && 
            this.arrY[this.arrY.length - 1] != this.arrY[this.arrY.length - 2])
            {
                if (e.which === 68 || e.which === 65)
                {
                    this.key = e.which;
                }
            }

            if ((this.key === 68 || this.key === 65) && 
                this.arrX[this.arrX.length - 1] != this.arrX[this.arrX.length - 2])
            {
                if (e.which === 87 || e.which === 83)
                {
                    this.key = e.which;
                }
            }
        });  
    }


    foodRandSpot(){
        this.foodSpotX = Math.round(Math.random()*this.width/this.size)*this.size;
        this.foodSpotY = Math.round(Math.random()*this.height/this.size)*this.size;
        for (let i = 0; i < this.arrX.length; i++)
        {
            if ((this.arrX[i] === this.foodSpotX &&
            this.arrY[i] === this.foodSpotY) || 
            this.foodSpotX === this.width || 
            this.foodSpotY === this.height)
            {
                while ((this.arrX[i] === this.foodSpotX &&
                    this.arrY[i] === this.foodSpotY) || 
                    this.foodSpotX === this.width || 
                    this.foodSpotY === this.height)
                    {
                        this.foodSpotX = Math.round(Math.random()*this.width/this.size)*this.size;
                        this.foodSpotY = Math.round(Math.random()*this.height/this.size)*this.size;
                    }
            }
        }
    
        let img = new Image();
        img.addEventListener('load', () => {
            this.ctx.drawImage(img, this.foodSpotX, this.foodSpotY, this.size, this.size);  
        })
        img.src = this.IMAGES[Math.round(Math.random() * (this.IMAGES.length - 1))];
        img.zIndex = 101;
        //this.ctx.fillRect(this.foodSpotX, this.foodSpotY, this.size, this.size);

       
    }

    speedProgress() {
        this.speed = this.speed - Math.pow(this.speedFactor/this.count, 1/3);
        clearInterval(this.interval);
        this.movement();  
    }

    isCrash() {
        for (let i = 0; i < this.arrX.length; i++)
        {
            if (this.arrX[i] === this.x && this.arrY[i] === this.y)
            {
                this.gameOver();
            }
        }
    }

    gameOver() {
        this.statistics = {
            'count' : this.count,
            'speed': this.speed,
            'length': this.snakeLength,
            'time' : 0};

        this.clearBody();

        this.container = document.createElement('div');
        this.container.classList.add('container');
        document.querySelector('body').appendChild(this.container);

        this.createResultScreen();
    }

    createResultScreen() {
        this.resultScreen = document.createElement('div');
        this.resultScreen.classList.add('result-screen');
        this.resultScreen.style.width = this.width;
        this.resultScreen.style.height = this.height;
        this.container.appendChild(this.resultScreen);

        this.fillResultScreen();
    }

    fillResultScreen() {
        for (let key in this.statistics)
        {
                let elem = document.createElement('div');
                elem.classList.add('result-item');
                elem.style.height = '22%';
                this.resultScreen.appendChild(elem);

                let name = document.createElement('div');
                name.innerHTML = key;
                elem.appendChild(name);

                let value = document.createElement('div');
                value.innerHTML = this.statistics[key];
                elem.appendChild(value);
                
        }

        let menuBtnContainer = document.createElement('div');
        menuBtnContainer.classList.add('menu-btn-container');
        this.resultScreen.appendChild(menuBtnContainer);

        let toMenuBtn = document.createElement('div');
        toMenuBtn.innerHTML = 'Menu';
        toMenuBtn.classList.add('toMenu');
        menuBtnContainer.appendChild(toMenuBtn);

        toMenuBtn.addEventListener('click', () => {
            let menu = new Menu();
            menu.createMenu(DATA.mainMenu);
        });
    }

    startGame() {
        this.clearBody();
        this.createField();
        this.fillCells();
        this.createSnake();
        this.startMove();
    }

}
