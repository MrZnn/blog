

::: timeline 2025-05-12
- 基于 Flask + Scrapy + APScheduler + SQLite 的完整消息汇总系统开发框架，包含定时抓取、数据存储和可视化功能：
  - 开源地址 待定
  - 基本介绍 待定
- 项目文件 readme 编写

```text
# 项目结构
.
├── app.py
├── models.py
├── scheduler.py
├── crawlers/
│   ├── wechat_spider.py
│   └── headline_spider.py
├── templates/
│   ├── index.html
│   └── jobs.html
└── data/  # 自动生成每小时文件

# 启动命令
export FLASK_APP=app.py
flask run --host=0.0.0.0 --port=5000
```
:::


::: timeline 2023-05-12
- 项目架构确定
  核心模块设计
  1. 数据库设计（SQLite）
  2. Scrapy爬虫模块
  3. 定时任务调度（APScheduler）
  4. Flask Web界面
  5. 框架图
    <img src="/project/1.png" width="200" height="100">
- 项目说明的编写
- 项目记录
- 开发工具 Trea
- 开发环境 win11 虚拟机
- 注意事项

    <iframe src="./notice.md" width="600" height="300" style="border: 1px solid rgba(255, 182, 193, 0.5); border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);"></iframe>
    <!-- <div class="highlight-box">
      <iframe src="./notice.md" width="650" height="300" style="border: none; width: 100%; height: 100%;"></iframe>
    </div> -->
:::

::: code-group
```sh [pnpm]
pnpm -v
```

```sh [yarn]
yarn -v
```

```sh [bun]
bun -v
```
:::