const { resolve } = require('path');
const { existsSync, mkdirSync, readdirSync, unlinkSync, writeFileSync } = require('fs');
// 取出 template 标签里的内容
const templateReg = /\<template\>(.*?)\<\/template\>/;
const scriptReg = /\<script\>(.*?)\<\/script\>/;
const styleReg = /\<style\>(.*?)\<\/style\>/;

function vueLoader(source) {
    // source 把 app.vue内的所有东西，当成字符串输出出来
    const _str = source.replace(/[\r\n]/g, '');
    const template = _str.match(templateReg)[1];
    const script = _str.match(scriptReg)[1];
    const style = _str.match(styleReg)[1];
    // css 文件路径
    const cssFileName = `__temp/css/__${ new Date().getTime()}.css`;
    // 创建 CSS 文件夹
    writeFile(cssFileName, style);

    // 处理 template 部分
    const vueScript = script.replace(/\{(.*?)/, (node, key) => {
        return `
          {template:'${ template }',
        `
    });

    // 返回值必须为字符串
    return `
      import './../${ cssFileName }'
      ${ vueScript }
    `;
}

// 每次打包处理css文件
function writeFile(cssFileName, str) {
    // 创建目录
    if (!existsSync(formatPath('../../__temp'))) {
        // 如果不存在这个跟目录
        mkdirSync(formatPath('../../__temp'));
        mkdirSync(formatPath('../../__temp/css/'));
    }
    // 拿到文件夹下的所有文件
    const files = readdirSync(formatPath('../../__temp/css/'));
    // 先删除所有文件，如果 files 存在就进行遍历
    files && files.forEach(file => {
        unlinkSync(formatPath('../../__temp/css/' + file));
    });
    // 删除后写入
    writeFileSync(formatPath(`../../${ cssFileName }`), str);

}

// 找文件
function formatPath(path) {
    return resolve(__dirname, path);
}

module.exports = vueLoader;