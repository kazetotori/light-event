const LightEvent = require('LightEvent');
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

