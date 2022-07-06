/**
 * Created by sean@ihuanqu.com on 2018/9/21.
 */

var isWeChat = function () {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("micromessenger") > -1) {
    return true;
  }
  // else if (ua.indexOf('qq/') > -1 || ua.indexOf("mqqbrowser") > -1) {
  //   return true;
  // }
  return false;
};

var wxShare = function (data) {
  var title = data.title;
  var desc = data.desc;
  var imgUrl = data.logo;
  var link = window.location.href;

  $.ajax({
    url: `https://wxsign.ihuanqu.com/api/wx/sign`,
    type: 'get',
    data: {url: link, platform: "web"},
    dataType: 'json',
    success: function (res) {
      if (res.ret === 0) {
        wx.config({
          debug: false,
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ]
        });

        wx.ready(function () {
          wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl
          });

          wx.onMenuShareTimeline({
            title: title,
            link: link,
            imgUrl: imgUrl
          });
        });
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
};