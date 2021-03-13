class Publisher {
    _triggerEvent(listener, eventData) {
        if (listener) {
            listener.forEach(function (callback) {
                callback(eventData);
            })
        }
    }

    addEventListener(eventName, listener) {
        if (!this.listeners) {
            this.listeners = {};
        }
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }

        this.listeners[eventName].push(listener);
    };
}


class Car extends Publisher{
    constructor() {
        super();
        this.speed = 0;
    }

    start() {
        this.speed = 100;
        setTimeout(this._acceleration.bind(this), 2000)
        this._triggerEvent(this.listeners.start);
    }

    _acceleration() {
        this.speed = 600;
        setTimeout(this._deceleration.bind(this), 2000);
        this._triggerEvent(this.listeners.acceleration);
    }
    
    _deceleration() {
        this.speed = 400;
        setTimeout(this._stop.bind(this), 1000);
        this._triggerEvent(this.listeners.deceleration);
    }

    _stop() {
        this.speed = 0;
        this._triggerEvent(this.listeners.stop, {currentTarget: this});
    }

    
}

function logger() {
    console.log('loger: ' + merc.speed);
}
function huyoger(e) {
    console.log('huyoger: ' + merc.speed);
    console.log('car temp: ' + e)
}


let merc = new Car();
console.log(merc.speed);

merc.addEventListener('start', logger);
// merc.addEventListener('start', huyoger);
merc.addEventListener('acceleration', huyoger);
merc.addEventListener('deceleration', logger);
merc.addEventListener('deceleration', huyoger);
merc.addEventListener('stop', function(e){
    huyoger(e);
});
merc.addEventListener('stop', logger);

merc.start();


class Cat extends Publisher{
    constructor(){
        super();
    }
    meow(){
        console.log('Meow Meow Meow');
        setTimeout(this._woof.bind(this), 6000);
        this._triggerEvent(this.listeners.meow);
        // this._woof();
    }
    _woof(){
        console.log('woof woof woof');
        this._triggerEvent(this.listeners.woof);
    }
}

let barsik = new Cat();
barsik.addEventListener('meow', status);
barsik.addEventListener('woof', status2);
barsik.meow();

function status(){
    console.log('Cat saying something');
}
function status2(){
    console.log('Cat saying something else');
}
