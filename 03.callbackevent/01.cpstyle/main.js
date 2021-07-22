// continuation-passing style (연속 전달 방식)

function add(a, b) {
    return a + b;
}
console.log(`result>> ${add(1, 2)}`);

// (sync)cps
console.log('--- sync cps ---');

function addCps(a, b, cb) {
    cb(a + b);
}
console.log('before');
addCps(1, 2, res => console.log(`result>> ${res}`));
console.log('after');

// (async)cps
console.log('--- async cps ---');
function asyncAddCps(a, b, cb) {
    setTimeout(() => cb(a + b), 100);
}
console.log('before');
asyncAddCps(1, 2, res => console.log(`result>> ${res}`));
console.log('after');

// non-cps
console.log('--- non cps ---');
let result = [1, 5, 7].map(elem => elem - 1);
console.log(result);
