const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const fs = require('fs');
const path = require('path');

/**
 * 生成请求链接
 * @param {String} key 关键字
 */ 
const generateURL = (key) => {
    return encodeURI(`https://www.douban.com/group/search?start=0&cat=1013&sort=time&q=${key}`);
}

/**
 * 获取列表数据
 * @param {string} res HTML Content
 * @return {Array} 
 * [].title
 * [].time
 * [].url
 */
const get_list = ($) => {
	const arr = [];
	$('.article tr').map((x, row) => {
		const title = $(row).find('td').eq(0).find('a').attr('title');
		const url = $(row).find('td').eq(0).find('a').attr('href');
		const id = url.match(/\d+/g)[0];
		const time = $(row).find('td').eq(1).attr('title');
		arr.push({
			id,
			title,
			url,
			time,
		});
	});
	return arr;
}

/**
 * 过滤不需要的字段
 * @param {Array} list
 * @returns {Array}
 */
const removeBlockList = (list, blockList = []) => {
    return list.filter(item => {
        let tof = true;
        blockList.map(key => {
            if (item.title.includes(key) == true) {
                tof = false;
            }
        });
        return tof;
    });
}

/**
 * @param {Object} headers 请求头信息
 * @param {Array} blockList 屏蔽关键字的列表
 */
class Douban {
    constructor ({
        headers = {},
        blockList = [],
    }) {
        this.headers = headers;
        this.blockList = [...blockList];
    }

    /**
     * 单独设置参数
     */
    setItem (key, value) {
        this[key] = value;
    }

    /**
     * 开始抓取数据
     * @param {String} keyword 关键字
     */
    start (keyword = '') {
        // 生成URL地址
        const url = generateURL(keyword);

        // 根据URL抓取数据
        this.fetchData(url, (html) => {
            // 获取列表
            let list = get_list(html); 

            // 过滤黑名单
            list = removeBlockList(list, this.blockList);

            // 开始写入文件
            console.log(`1. 找到 ${list.length} 条数据`);
            console.log('2. 正在写入 JSON 文件....');
            try {
                const filePath = path.join(__dirname, '../data/data.json');
                fs.writeFileSync(filePath, JSON.stringify(list, null, 4));
                console.log('3. 写入文件成功');
            } catch (err) {
                console.log(err);
                console.log('3. 写入文件失败');
            }
        });
    }

    /**
     * 发送请求
     * @param {String} url 
     * @param {Function} callback 
     */
    fetchData (url, callback) {
        request({
            encoding: null,
            headers: this.headers,
            url
        }, function(error, response, body) {
            if (error) {
                console.log(error);
            }
            var buf = iconv.decode(body, 'utf8');
            var html = cheerio.load(buf);
            return callback(html);
        });
    }
}

module.exports = Douban;