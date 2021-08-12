function delay(millisecond) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date());
        }, millisecond);
    });
}

console.log(`Delaying start... ${new Date().getSeconds()}s`);
delay(1000)
    .then(newDate => {
        console.log(`Done ${newDate.getSeconds()}s`);
});
console.log(`Next code... ${new Date().getSeconds()}s`);
