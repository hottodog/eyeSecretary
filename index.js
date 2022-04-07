// 引用linebot SDK
var linebot = require('linebot');
//引用request
var request = require('request');

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: '1657027135',
  channelSecret: 'd5fdfd126ee88cb4b75fa59e6b5d91bb',
  channelAccessToken: '0qKgZBy1iaO/3HeYxjSVdNIvzfzkzTPHTBcUn7uRAvWZa4yA1XSRMRzulKb09C0ZPqBQYrgGM05vUK57ToAv0pN4O6UVms0IF0N3t7cIjbgjAPcobNxHSJIWNMKliq73Iwij8XINJrfc+cJ0V6tJ6wdB04t89/1O/w1cDnyilFU='
});

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {
    // event.message.text是使用者傳給bot的訊息
    // 準備要回傳的內容
    // var replyMsg ='reply message 1';

    if(event.message.text == "貼心叮嚀"){
        //Imgur資訊勿刪
        //CLIENT_ID: f4b7e817c8c011a
        //CLIENT_SECRET: 8b759b380c34ad683a202e9851cfb1543bc8124b
        //Access Token: 6a432a35538c9721406cbd5de6ccf86997ebc395
        //https://imgur.com/gallery/xmJXFMT
        
        //連接imgur api
        var options = { method: 'GET',
            url: 'https://api.imgur.com/3/album/xmJXFMT/images',
            headers:
            { 'access-token': '6a432a35538c9721406cbd5de6ccf86997ebc395',
            'cache-control': 'no-cache',
            authorization: 'Client-ID f4b7e817c8c011a' } };
            
        //取得imgur相簿的所有內容，隨機回覆圖片
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            //取得相簿裡隨機位置的圖片link
            var pic_url= 'https://imgur.com/' + JSON.parse(body).data[Math.floor(Math.random()*JSON.parse(body).data.length)].id + '.jpg';
            // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者
            event.reply({
                type: 'image',
                originalContentUrl: pic_url,
                previewImageUrl: pic_url
                });
        });
    } 
});      
       
//         event.reply(
//             {
//                 type: 'image',
//                 originalContentUrl: pic_url,
//                 previewImageUrl: pic_url
//             }
//         ).then(function (data) {
//             // 當訊息成功回傳後的處理
//         }).catch(function (error) {
//             // 當訊息回傳失敗後的處理
//         });
    

// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', 3000, function () {
    console.log('[BOT已準備就緒]');
});