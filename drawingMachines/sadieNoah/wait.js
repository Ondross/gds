function countdown(time) {
    let timer = setInterval(function () {
        document.getElementById("counter-div").innerHTML = time // right now, writes to element with id innerdiv (remember to change)
        time = time - 1
        if (time <= 0) {clearInterval(timer)
        }
    }, 1000)
}
