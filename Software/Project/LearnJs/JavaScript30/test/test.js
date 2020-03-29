var str1 = 'asdfasfd';
str1.something = function () {
    return 'split';
}
var str2 = new String('afasdsfdf');
str2.something = function () {
    return 'split';
}

console.log(str2.toString());
console.log(window.Math.pow(2, 52));