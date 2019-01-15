function leanCloudInit() {
    // 测试
    var APP_ID = 'jFJpMImjIEgWUPC61Le4hqba-gzGzoHsz';
    var APP_KEY = 'Wc794SA22mpsAkFcIB98P46p';
    // 正式
    // var APP_ID = 'BtQx8lWICnIY125rxLASy9pU';
    // var APP_KEY = 'FF7E9pxxJRYyBxhI7RCJtic5';
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
}
window.leanCloudInit = leanCloudInit;

function leanCloudSave(platform, title, content, vx, qr, template) {
    var Ad = AV.Object.extend('Ad');

    var ad = new Ad();
    ad.set('platform', platform);
    ad.set('title', title);
    ad.set('content', content);
    ad.set('vx', vx);
    ad.set('qr', qr);
    ad.set('template', Number(template));
    ad.save().then(function () {
        
    }, function (error) {
        alert(JSON.stringify(error));
    });
}
window.leanCloudSave = leanCloudSave;