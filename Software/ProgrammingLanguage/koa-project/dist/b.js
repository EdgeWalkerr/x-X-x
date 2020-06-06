"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// b.mjs
var a_1 = __importDefault(require("./a"));
console.log('b starting');
exports.default = {
    done: true,
};
console.log('in b, a.done = %j', a_1.default.done);
console.log('b done');
