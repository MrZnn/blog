---
titleicon: 
title: Mocking
titleTemplate: Vitepress
description: 使用VItepress搭建个人博客时，需要归档和标签，利用createContentLoader进行生成
layout: doc
navbar: "true"
sidebar: "true"
tags: 
  - go
date: 
created: 2024-05-07T16:54
updated: 2024-05-18T01:16

prev:
  text: 5、依赖注入
  link: /posts/langages/go/5、依赖注入
next:
  text: 7、反射
  link: /posts/langages/go/7、反射
---

## Mocking

&emsp;&emsp;没有对代码中重要的区域进行 mock 将会导致难以测试。在我们的例子中，我们不能测试我们的代码在每个打印之间暂停，但是还有无数其他的例子。调用一个 可能 失败的服务？想要在一个特定的状态测试您的系统？在不使用 mocking 的情况下测试这些场景是非常困难的。

&emsp;&emsp;如果没有 mock，你可能需要设置数据库和其他第三方的东西来测试简单的业务规则。你可能会进行缓慢的测试，从而导致 缓慢的反馈循环。

&emsp;&emsp;当不得不启用一个数据库或者 webservice 去测试某个功能时，由于这种服务的不可靠性，你将会得到的是一个 脆弱的测试。

[\[when to mock\]](https://8thlight.com/blog/uncle-bob/2014/05/10/WhenToMock.html)