const DoubanSpider = require('./library/douban.js');

// 实例化
const spider = new DoubanSpider({
    // 头信息
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Host': 'www.douban.com',
        "Pragma": 'no-cache',
        "Referer": 'https://www.douban.com/group/search?start=50&cat=1013&sort=time&q=%E6%B7%B1%E5%9C%B3%E8%BD%AC%E7%A7%9F',
        "User-Agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "Cookie": 'bid=0sUsEBmcOQs; douban-fav-remind=1; __yadk_uid=C2yeKZb2dyOsRzzLtiISRzWHwJfCNrQc; trc_cookie_storage=taboola%2520global%253Auser-id%3D73554637-19be-447f-bcc5-75fd5bacbdd6-tuct44138d9; viewed="3132277"; _vwo_uuid_v2=D5F155863650A81F352D411C810B62B25|89a1cf0c81a0ad5b76d5b098c2d39f14; gr_user_id=ab13c279-522f-490d-a407-329da8944963; __gads=Test; ct=y; ap_v=0,6.0; _pk_ref.100001.8cb4=%5B%22%22%2C%22%22%2C1575447094%2C%22https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DNc_ehYaIS4-93VgUBss__mgF6Y-h-oWkqPhoblutJctv8y3oFi-XW-0SxbkIbtaKJETpj2E_KWkNWwhKypVbG_%26wd%3D%26eqid%3D8eb4a89300024757000000065de76a06%22%5D; _pk_ses.100001.8cb4=*; __utma=30149280.863424606.1565608081.1575273681.1575447097.6; __utmc=30149280; __utmz=30149280.1575447097.6.6.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __utmt=1; _pk_id.100001.8cb4=3c6c1c08d1368d2d.1568976873.4.1575451605.1575275771.; __utmb=30149280.381.9.1575451604935',
    },
    // 屏蔽列表
    blockList: [
        '龙华',
        '沙井',
        '福永',
        '光明',
    ],
});

// 开始抓取数据
spider.start('宝安租房');
