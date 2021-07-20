// <!-- <canvas width="400" height="300"></canvas> -->

window.onload = function() {
    let canvas = document.getElementById("c")

    canvas.addEventListener('keydown', moveIt, true)

    ctx = canvas.getContext('2d')

    ctx.fillRect (100, 100, 30, 30)

    let x = 100
    let y = 100

    function moveIt(event){
        // right arrow is 39
        if (event.keyCode === 39) {
            context.clearRect(0, 0, canvas.width, canvas.height)
            x = x + 10
            ctx.canvas(x, y, 30, 30)
        }
        if (event.keyCode === 37) {
            context.clearRect(0, 0, canvas.width, canvas.height)
            x = x - 10
            ctx.canvas(x, y, 30, 30)
        }

    }
    // left arrow is 37
}
