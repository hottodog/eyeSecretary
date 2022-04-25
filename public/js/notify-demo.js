window.onload = () => {   //每秒刷新秒數顯示時間
    window.setInterval(() => {
        document.getElementById('show-time-string').textContent = '現在時間：' + moment().format('LTS');
    }, 1000);
};

function NotifyMe() { //通知功能
    const setTime = document.getElementById('schedule-timeset').value;
    const timeStr = moment().add(setTime, 's').format('LTS'); //現在的時間加上秒數，轉換成字串
    fetch(`/auth/notify/me?n_s=${setTime}`).then(() => {
        document.getElementById('schedule-notify').textContent = `預定通知時間：${timeStr}`;
    });
}