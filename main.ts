input.onButtonPressed(Button.B, function () {
    turn += 1
    if (turn > 3) {
        turn = 0
    }
})
input.onButtonPressed(Button.A, function () {
    turn += -1
    if (turn < 0) {
        turn = 3
    }
})
input.onButtonPressed(Button.AB, function () {
	
})
function move () {
    if (turn == 0) {
        dx = 1
        dy = 0
    }
    if (turn == 1) {
        dx = 0
        dy = 1
    }
    if (turn == 2) {
        dx = -1
        dy = 0
    }
    if (turn == 3) {
        dx = 0
        dy = -1
    }
    x += dx
    y += dy
}
let time = 0
let score = 0
let list_y: number[] = []
let list_x: number[] = []
let egg_y = 0
let egg_x = 0
let y = 0
let x = 0
let dy = 0
let dx = 0
let turn = 0
let run = 0
control.inBackground(function () {
    if (input.logoIsPressed()) {
        pins.digitalWritePin(DigitalPin.P2, 1)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
    if (input.buttonIsPressed(Button.A)) {
        pins.digitalWritePin(DigitalPin.P2, 1)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P2, 0)
    } else if (input.buttonIsPressed(Button.B)) {
        pins.digitalWritePin(DigitalPin.P2, 1)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P2, 0)
    } else if (input.buttonIsPressed(Button.AB)) {
        pins.digitalWritePin(DigitalPin.P2, 1)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P2, 0)
        serial.redirectToUSB()
    }
})
basic.forever(function () {
    if (run == 1) {
        basic.clearScreen()
        move()
        if (x == egg_x && y == egg_y) {
            list_x.insertAt(0, x)
            list_y.insertAt(0, y)
            egg_x = randint(0, 4)
            egg_y = randint(0, 4)
            score += 1
            time += -10
        } else {
            list_x.insertAt(0, x)
            list_y.insertAt(0, y)
            list_x.pop()
            list_y.pop()
        }
        for (let index = 0; index <= list_x.length - 1; index++) {
            led.plotBrightness(list_x[index], list_y[index], 215)
            led.plotBrightness(x, y, 120)
        }
        led.plotBrightness(egg_x, egg_y, 50)
        basic.pause(time)
    }
})
basic.forever(function () {
    if (input.logoIsPressed()) {
        run = 1
        turn = 0
        dx = 1
        dy = 0
        x = 0
        y = 0
        egg_x = 4
        egg_y = 4
        list_x = [x]
        list_y = [y]
        score = 0
        time = 1000
    }
    if (x < 0 || x > 4) {
        run = 0
        basic.showNumber(score)
    } else if (y < 0 || y > 4) {
        run = 0
        basic.showNumber(score)
    }
})
