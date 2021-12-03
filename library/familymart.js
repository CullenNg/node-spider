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
    return encodeURI(`https://api.map.com.tw/net/familyShop.aspx?searchType=ShopNo&type=&kw=${key}&fun=getByName&key=6F30E8BF706D653965BDE302661D1241F8BE9EBC`);
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
     * @param {String} keyword store_num 店铺ID
     */
    start (keyword) {
        // 生成URL地址
        const url = generateURL(keyword);

        // 根据URL抓取数据
        this.fetchData(url, (html) => {
            let text = html.text();
            try {
                text = text.replace('getByName([', '');
                text = text.replace('])', '');
                const data = JSON.parse(text);
            } catch (e) {
                console.warn(keyword)
            }
            return;
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