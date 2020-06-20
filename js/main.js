
class view {
    constructor(height, width, cells) {
        this.height = height;
        this.width = width;
        this.cells = cells;
    }

    createField(){
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


    snakeLength = 3;
    arrX = [];
    arrY = [];
    key = 68;
    
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

        this.x -= this.size;
        //this.y -= this.size

        setInterval(() => {
            console.log(this.arrX);
 
            this.ctx.clearRect(this.arrX[0], this.arrY[0], this.size, this.size);
            this.ctx.strokeRect(this.arrX[0], this.arrY[0], this.size, this.size);
                
            switch(this.key) {
                case 68: 
                    this.x += this.size;
                    if (this.x === this.width)
                        {
                            this.x = 0
                        }
                    break;
                case 65:
                        if (this.x === 0)
                            {
                                this.x = this.width;
                            }
                    this.x -= this.size;
                    break;
                case 87: 
                    if (this.y === 0)
                        {
                            this.y = this.height;
                        }
                    this.y -= this.size;
                    break;
                case 83:  
                this.y += this.size;  
                    if (this.y === this.height)
                        {
                            this.y = 0
                        }
                    break;
            }
            
            
            this.arrY.push(this.y);
            this.arrY.shift();

            this.arrX.push(this.x);
            this.arrX.shift();
            
            this.ctx.fillRect(this.x, this.y, this.size, this.size);
            

        },300);
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


}

const snake = new view(600,600, 1024);
snake.createField();
snake.fillCells();
snake.createSnake();
snake.startMove();



