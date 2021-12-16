class Ball{
   
    constructor(){
        this.y = Math.random() * 500
        this.x = Math.random() * 10
        this.yVel = 0
        this.xVel = Math.random() * 10

        this.div = document.createElement("div")
        this.div.className = 'ball'
        document.body.appendChild(this.div)
        
        this.lastUpdate = Date.now()
    }
   
    update(){
        const dt = Date.now() - this.lastUpdate
        this.lastUpdate = Date.now
        this.y += this.yVel * dt / 1000
        this.x += this.xVel * dt / 1000
        this.yVel += 98 * dt / 100
        console.log(this.yVel)
        if(this.y > 400){
            this.yVel *= -1
        }
        this.div.style.top = this.y
        this.div.style.left = this.x
    }
}
