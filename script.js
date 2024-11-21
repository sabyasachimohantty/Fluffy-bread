const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const HEIGHT = 578
const WIDTH = 1024
const GRAVITY = 0.6
canvas.height = HEIGHT
canvas.width = WIDTH
let gameOver = false

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
        pipes.forEach((pipe) => {
            if (this.collideLowerPipe(pipe) || this.collideUpperPipe(pipe)) {
                gameOver = true
            }
        })

        this.dy += GRAVITY
        this.render()
    }

    collideGround() {
        if(
            this.y + this.height >= 500
        ) return true
        return false
    }

    collideUpperPipe(pipe) {
        if (
            this.x + this.width < pipe.x ||
            this.x > pipe.x + pipe.width ||
            this.y > pipe.height
        ) return false
        return true
    }

    collideLowerPipe(pipe) {
        if (
            this.x + this.width < pipe.x ||
            this.x > pipe.x + pipe.width ||
            this.y + this.height < pipe.y
        ) return false
        return true
    }
}

class Pipe {
    constructor(x) {
        this.x = x
        this.dx = -1
        this.height = Math.floor(Math.random() * 100) + 100
        this.width = 50
        this.gap = Math.floor(Math.random() * 100) + 150
        this.y = this.height + this.gap
    }

    render() {
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, 0, this.width, this.height)
        ctx.fillRect(this.x, this.y, this.width, 500 - this.y)
    }

    update() {
        this.x += this.dx
        this.render()
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
let pipes = [
    new Pipe(500),
    new Pipe(700),
    new Pipe(900),
    new Pipe(1100),
    new Pipe(1300),
    new Pipe(1500),
]

function generatePipes() {
    if (pipes[0].x <= -100) {
        pipes.shift()
        const x = pipes.at(-1).x + 200 + Math.floor(Math.random() * 100)
        pipes.push(new Pipe(x))
    } 
}

function renderPipes() {
    pipes.forEach((pipe) => {
        pipe.update()
    })
}

function gameloop() {
    generatePipes()
    blankScreen()
    renderPipes()
    bread.update()
    drawGround()
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'white'
        ctx.font = "50px Arial"
        ctx.textAlign = "center"
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2)
    }
    requestAnimationFrame(gameloop)
}

requestAnimationFrame(gameloop)

window.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        bread.dy = -8
        bread.dx = 1
    }
})
