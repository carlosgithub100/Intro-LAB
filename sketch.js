let colorlist = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']

let movers = []
let G = 0.1
let wind = 0 // constant wind
let gust = 3 // 👈 big dramatic gust when space is pressed
let gusting = false
let gustTimer = 0

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    movers.push(
      new Mover(random(width), random(height), random(-1, 1), random(-1, 1), 10, random(colorlist))
    )
  }
  ellipseMode(RADIUS)
}

function draw() {
  if (gusting && frameCount - gustTimer < 10) {
    background(200, 230, 255); // 💨 gust background flash
  } else {
    background(220);
    gusting = false;
  }

  for (let mover of movers) {
    mover.update()
  }
}

function keyPressed() {
  if (key === ' ') {
    gusting = true;
    gustTimer = frameCount;
    for (let mover of movers) {
      mover.dx += random(-gust, gust)
    }
  }
}

class Mover {
  constructor(x, y, dx, dy, r, c) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.r = r
    this.c = c
  }

  update() {
    this.applyGravity()
    this.applyWind()
    this.move()
    this.containWithinWindow()
    this.draw()
  }

  draw() {
    fill(this.c)
    circle(this.x, this.y, this.r)
  }

  move() {
    this.x += this.dx
    this.y += this.dy
  }

  applyGravity() {
    this.dy += G
  }

  applyWind() {
    this.dx += wind
  }

  containWithinWindow() {
    if (this.x < this.r) {
      this.x = this.r
      this.dx *= -1
    }
    if (this.x > width - this.r) {
      this.x = width - this.r
      this.dx *= -1
    }
    if (this.y < this.r) {
      this.y = this.r
      this.dy *= -1
    }
    if (this.y > height - this.r) {
      this.y = height - this.r
      this.dy *= -1
    }
  }
}
