
const {
    log,
    info,
    warn
} = console


function sleep(s = 0.1) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}

function toCoordId(x, y) {
    return JSON.stringify([x, y])
}

function toFixed(nr, amt = 6) {
    return +nr.toFixed(amt)
}

function randint(a = 0, b = 1) {
    return a + Math.random() * b
}

function getDistance(a, b) {
    return Math.hypot(b.x - a.x, b.y - a.y)
}

function getDis(a, b) {
    return Math.hypot(b[0] - a[0], b[1] - a[1])
}

JSON.copy = (a)=> JSON.parse(JSON.stringify(a))

Array.prototype.current = 0
Array.prototype.next = function () {
    if (this.current >= this.length - 1) this.current = -1
    return this[this.current++]
}

Array.prototype.getCurrent = function (arr) {
    return this.current
}


// js adatoption of python range
function range(n = 1) {
    return [...new Array(n)]
}

function getPosTo(src, targ, dis) {
    const dx = targ[0] - src[0];
    const dy = targ[1] - src[1];
    let angle = Math.atan2(dy, dx)

    return [src[0] + dis * Math.cos(angle), src[1] + dis * Math.sin(angle)]
}




/** get itermediate points */
function getIntermediate(a, b) {
    let steps = stepDestail
    const res = []
    let dis = Infinity
    let c = null
    let tracker = 0

    while (dis > steps) {
        if (tracker > 1000) throw new Error('infinite loop at: getIntermediate')
        c = getPosTo(a, b, tracker)
        dis = getDis(c, b)
        tracker += steps
        res.push(c.map(i => toFixed(i, 6)))
    }
    return res
}