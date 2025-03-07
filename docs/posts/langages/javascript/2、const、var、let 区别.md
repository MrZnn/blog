---
titleicon: 
title: 2、const、var、let 区别
titleTemplate: Vitepress
description: js使用
layout: doc
navbar: "true"
sidebar: "true"
tags: 
  - javascript
date: 
created: 2025-03-07T09:10
updated: 2025-03-07T09:10
---

- 使用 const 声明的变量不能重新赋值，适用于那些不会被重新赋值的变量。
- 使用 let 声明的变量可以重新赋值，适用于那些会被重新赋值的变量。
- 使用 var 声明的变量也可以重新赋值，但由于其函数作用域和变量提升的特性，通常建议使用 let 或 const 代替 var

::: code-group
```sh [const.js]
const PI = 3.14159;
console.log(PI); // 输出: 3.14159

// 尝试重新赋值会报错
// PI = 3.14; // TypeError: Assignment to constant variable.

// 适用于对象属性
const person = {
    name: "Alice",
    age: 25
};

console.log(person.name); // 输出: Alice

// 对象的属性可以修改
person.age = 26;
console.log(person.age); // 输出: 26

// 但不能重新赋值整个对象
// person = { name: "Bob" }; // TypeError: Assignment to constant variable.
```

```sh [let.js]
let count = 0;
console.log(count); // 输出: 0

// 可以重新赋值
count = 10;
console.log(count); // 输出: 10

// 适用于循环
for (let i = 0; i < 5; i++) {
    console.log(i); // 输出: 0, 1, 2, 3, 4
}
// i 在循环外部不可访问
// console.log(i); // ReferenceError: i is not defined
```

```sh [var.js]
var x = 10;
console.log(x); // 输出: 10

// 可以重新赋值
x = 20;
console.log(x); // 输出: 20

// 变量提升
console.log(y); // 输出: undefined
var y = 30;
console.log(y); // 输出: 30

// 函数作用域
function testVar() {
    if (true) {
        var z = 40;
    }
    console.log(z); // 输出: 40
}
testVar();
// z 在函数外部不可访问
// console.log(z); // ReferenceError: z is not defined
```
:::