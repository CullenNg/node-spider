# node-spider
基于Node.js做的爬虫，按照规则采集豆瓣上的租房信息，仅供个人学习参考。

## 代码目录
```
├── LICENSE
├── README.md
├── data // 存放抓取的数据
│   └── data.json
├── index.js // 入口文件
├── library
│   └── douban.js // 豆瓣脚本
└── package.json

```

## 启动
```
$ npm -i
$ nodemon index.js
```

## Index.js
```
const DoubanSpider = require('./library/douban.js');

// 实例化
const spider = new DoubanSpider({
    // 头信息，一定要设置头信息，不然会给拦截，直接浏览器复制就好
    headers: {},
    // 屏蔽关键字列表
    blockList: [
        '龙华',
        '沙井',
        '福永',
        '光明',
    ],
});

// 开始抓取数据
spider.start('宝安租房');

```

## 抓取结果
```
[
    {
        "id": "180876121",
        "title": "公寓直租，宝安后亭地铁口，来深实习工作租房首选，电梯房可短租",
        "url": "https://www.douban.com/group/topic/180876121/",
        "time": "2020-06-19 12:40:25"
    },
    {
        "id": "180859925",
        "title": "公寓直租，宝安后亭地铁口11号线直达，电梯房，来深实习工作租房首选，可短租",
        "url": "https://www.douban.com/group/topic/180859925/",
        "time": "2020-06-19 11:05:47"
    }
]
```