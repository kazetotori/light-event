# LightEventJS

> LightEvent is like a simple EventEmitter that only has one event.  
>
> ---
> You may use EventEmitter like this:  
> ~~~javascript
> emitter.on('change',callback);  
> emitter.emit('change',value);  
> ~~~
>
> ---
> By LightEvent you can use like this:
> ~~~javascript
> let onchange = new LightEvent();  
> onchange.add(callback);  
> onchange.emit(value);
> ~~~




---
## Advantage
- Make your module's event clearly. When using EventEmitter sometimes you just do not know what event will be emitted. Or you do not know what the event name is. But LightEvent is only one object, you can map the module to get what event this module has.    
  
- EventEmitter can be emitted by other module. Sometimes this is not allowed. By the LightEvent you can out only interface that add or remove listeners. So because of the closure the event can be only emitted in the module of yourself.





---
## Install
Right now you can only download from github.
~~~
git clone https://github.com/kazetotori/light-event
~~~







---
## Start
~~~javascript
const LightEvent = require('light-event');
const onchange = new LightEvent();

function sayHi(name) {
    console.log(`Hi ${name}!`);
}

function sayHello(name) {
    console.log(`Hello ${name}!`);
}


onchange.add(sayHi);
onchange.add(sayHello);
onchange.emit('Kat'); 
// Hi Kat!
// Hello Kat!

onchange.remove(sayHi);
onchange.emit('Elen');
// Hello Elen!

onchange.once(sayHi);
onchange.emit('Ben');
// Hello Ben!
// Hi Ben!

onchange.emit('Ben');
// Hello Ben!

~~~







---
## Version 1.0.0 APIs
- [new LightEvent();](#newLightEvent)
- [event.add();](#add)
- [event.remove();](#remove)
- [event.once();](#once)
- [event.emit();](#emit)
- [event.listeners();](#listeners)
- [event.interface();](#interface)


<h3 id="newLightEvent">new LightEvent();</h3>

~~~javascript
// Get an instance
const LightEvent = require('light-event');
const onchange = new LightEvent();
const ondata = new LightEvent();
~~~


<h3 id="add">event.add(listener);</h3>

~~~javascript
// Add listener for the event. The argument can be Array<Function> or Function.
onupdate.add(function(newVal,oldVal){
    console.log(`The value has updated`);
    console.log(`old value:${oldVal}, new value:${newVal}`);
})

function handleFunc1(){ ... }
function handleFunc2(){ ... }
event.add( handleFunc1 , handleFunc2 );

// or like this
let handleFuncs = [ handleFunc1 , handleFunc2 ];
event.add(handleFuncs);
~~~


<h3 id="remove">event.remove(listener);</h3>

~~~javascript
// Remove listener from the event. The argument can be Array<Function> or Function.
// The usage is like the function event.add().
onupdate.remove(handleFunc1);
~~~


<h3 id="once">event.once(listener);</h3>

~~~javascript
// Just like the function once of an eventEmitter object.
// The listener added by the function once will be removed after called once
onupdate.once(function(){
    console.log(`This listener will be removed after it being called.`)
});
~~~


<h3 id="emit">event.emit();</h3>

~~~javascript
//Emit the event. Any of arguments for the function emit will trans to any listeners.
onhi.add(function(name){
     console.log(`Hello ${name}!`);
})
onhi.emit('Kat'); //The argument name of the listener will be `Kat`
~~~


<h3 id="listeners">event.listeners();</h3>

~~~javascript
// Get listeners of the event.
function sayHi(){ ... }
function sayHello(){ ... }
event.add( sayHi , sayHello );
console.log(event.listeners()); //[ Function sayHi(){} , Function sayHello(){} ]
~~~


<h3 id="interface">event.interface();</h3>

~~~javascript
// Return an object that has only functions of `add`, `remove`, and `once`. It means by the object you can only add or remove listeners but can not emit it.
let iface = event.interface();
iface.add(...)
iface.remove(...)
iface.once(...)
iface.emit() //Error, emit is not a function.
~~~