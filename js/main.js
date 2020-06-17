
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


    snakeLength = 5;
    arrX = [];
    arrY = [];
    
    createSnake() {
        let startPoint = Math.floor(Math.sqrt(this.cells)/2)*this.size;
        this.x = startPoint;
        this.y = startPoint;

        
        for (let i = this.snakeLength; i > 0; i--)
            {
                this.arrX.push(this.x /*- i * this.size*/);
                this.arrY.push(this.y - i * this.size);
            }

        for (let i = 0; i < this.arrX.length; i++)
        {
            // this.ctx.fillRect(this.arrX[i], this.y, this.size, this.size);
            this.ctx.fillRect(this.x, this.arrY[i], this.size, this.size);
        }
    }

  

    startMove() { 

        //this.x -= this.size

        setInterval(() => {
            console.log(this.arrX);
            

            
            this.ctx.clearRect(this.arrX[0], this.arrY[0], this.size, this.size);
            this.ctx.strokeRect(this.arrX[0], this.arrY[0], this.size, this.size);
                
            this.y += this.size

            if (this.x === this.width)
            {
                this.x = 0
            }

            if (this.y === this.height)
            {
                this.y = 0
            }
            
            
            this.arrX.push(this.y);
            this.arrX.shift();
            
            this.ctx.fillRect(this.x, this.y, this.size, this.size);
            

        },1000);
    }


}

const snake = new view(600,600, 1024);
snake.createField();
snake.fillCells();
snake.createSnake();
snake.startMove();



