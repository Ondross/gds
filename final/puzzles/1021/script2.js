//instantiate a ball
const balls = []
for(let i = 0; i < 100; i++){
    balls.push(new Ball())
}

// loop every 10m

setInterval(() => balls.forEach(ball => ball.update()), 10)
