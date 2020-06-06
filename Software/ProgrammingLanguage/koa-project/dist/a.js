"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// a.mjs
var b_1 = __importDefault(require("./b"));
console.log('a starting');
exports.default = {
    done: true,
};
console.log('in a, b.done = %j', b_1.default.done);
console.log('a done');
