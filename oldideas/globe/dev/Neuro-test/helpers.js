/*** variables consts */
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']


/** 
 * destructured builtin functions 
 * */
const { pow, sqrt, atan2, cos, sin, tan, cosh, sinh, tanh, atan, floor, round, ceil, abs } = Math

const { log, info, warn } = console

/**
 * Prototypes
 */

Array.prototype.current = 0;
Array.prototype.next = function() {
    if(this.current>this.length) this.current = -1
    return this[this.current++]
};

Array.prototype.prev = function() {
    return this[this.current--];
};


Array.prototype.remove = function(n) {
    const idx = this.indexOf(n);
    if (idx > -1) this.splice(idx, 1);
    else throw new Error(str(n)+"is not an element in"+str(this))
};


Array.prototype.random = function() {
    return this[randint(this.length - 1)]
};

Array.prototype.randomRange = function(amount = 1,asString = false) {
    const res = []
    for (let n of range(amount)) {
        res.push(this[randint(this.length - 1)])
    }
    if (asString) return res.join("")
    return res
};
 
Array.prototype.sum = function() {
    return this.reduce((t, i)=> t+i, 0)
}
 
Array.prototype.average = function(){
    return this.sum()/this.length
}
Array.prototype.last = function (idx = 1, idxOnly) { return idxOnly ? this.length - idx : this[this.length - idx] };
 


/**
 * Added functinoality
 */

JSON.copy = function copy(n) {
    return JSON.parse(JSON.stringify(n))
}

/** 
 * random generation functions 
 * */
function randstr(length = 1) {
    return alphabet.randomRange(length).join("")
}

function randint(a = 1, b = 0, rounded = true) {
    const n = b ? Math.random()*(b-a+1)+a : Math.random()*(a-b+1)+b
    return rounded ? floor(n) : n
}

function randfloat(a=1, b=0, fixed=3) {
    const res =  b ? Math.random()*(b-a)+a : Math.random()*(a-b)+b
    return fixed ? toFixed(res, fixed) : res
   // return toFixed(b ? a + Math.random() * (b * 2) : Math.random() * a, fixed)
}





function randomRange(arr, amount = 1,asString = false) {
    const res = []
    for (let n of range(amount)) {
        res.push(arr[randint(arr.length - 1)])
    }
    if (asString) return res.join("")
    return res    
}

/**
 *  Type functions 
 * */

function str(a) {
    return String(a)
}

function int(a) {
    return +a
}



/**
 * other
 */
function range(n = 1, detail = 1) {
    // return [...new Array(n)].map((i, idx)=>idx)
    let res = []
    for (let i = n < 0 ? n : 0; i < n; i += detail) {
        res.push(+i)
    }
    return res
}



function toFixed(nr, amt = 3) {
    return +nr.toFixed(amt)
}


function distanceTo(src, targ, signel = true) {
    if(signel) return toFixed(Math.hypot(targ.x - src.x, targ.y - src.y), 3)
    const dx = targ.x - src.x;
    const dy = targ.y - src.y;
    return {
        x: dx,
        y: dy,
    }
}

function mapNum(inp, minInput, maxInput, minOutput, maxOutput) {
    return (inp - minInput) * (maxOutput - minOutput) / (maxInput - minInput) + minOutput;
}
