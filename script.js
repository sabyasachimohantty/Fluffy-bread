const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const HEIGHT = 578
const WIDTH = 1024
const GRAVITY = 0.6
canvas.height = HEIGHT
canvas.width = WIDTH

class Player {
    constructor() {
        this.x = 50
        this.y = 50
        this.dx = 0
        this.dy = 0
        this.height = 50
        this.width = 50
    }

    render() {
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    update() {
        this.y += this.dy
        this.x += this.dx
        if (this.x + this.width >= canvas.width / 2) {
            this.x = canvas.width / 2 - this.width
            this.dx = 0
        } 
        if (this.collideGround()) {
            this.y = 500 - this.height
            this.dy = 0
        }
        this.dy += GRAVITY
        this.render()
    }

    collideGround() {
        if(
            this.y + this.height >= 500
        ) return true
        return false
    }
}

class Pipe {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.height = 150
        this.width = 50
    }

    render() {
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

function blankScreen() {   
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawGround() {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 500, canvas.width, 5)
}

const bread = new Player()
const upperPipe = new Pipe(500, 0)
const lowerPipe = new Pipe(500, 500 - 150)

function generatePipes(x) {
    
}

function gameloop() {
    blankScreen()
    bread.update()
    drawGround()
    upperPipe.render()
    lowerPipe.render()
    requestAnimationFrame(gameloop)
}

requestAnimationFrame(gameloop)

window.addEventListener('keydown', (e) => {
    console.log(e.code)
    if (e.code === "Space") {
        bread.dy = -8
        bread.dx = 1
    }
})
