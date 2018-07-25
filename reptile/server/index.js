var express = require('express');
var https= require('https')
var app = express();
var cheerio=require('cheerio');
var bodyParser = require('body-parser');
var iconv = require("iconv-lite");
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
app.use(bodyParser.json({limit:'1mb'}));
app.use(bodyParser.urlencoded({            
  extended: true
}));
app.get('/index.html',function(req,res){
  res.sendFile(__dirname+"/"+index.html); //提供静态文件
})
app.post('/data',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type",'aplication/json');
    res.setHeader("charset","utf-8");
    var url=req.body.docurl;
    console.log(url);
    readData(url, function(arr) {
      result={
        title:arr[0],
        sum:arr[1],
        chnum:arr[2],
        ennum:arr[3],
        dnum:arr[4]
      }
      res.send(result);
    })
})
function readData(url,callback){
  var content="";
  https.get(url,function(res){
    var html = '';
    res.on('data',function(data){
        data = iconv.decode(data, 'GBK');
        html+=data;
    })
    res.on('end',function(){
        var chsum;
        var ensum;
        var that=this;
        var $=cheerio.load(html);
        content="";
        $(".content-article p").each(function(){
          content+=$(this).text();
        })
        if(content.match(/[\u4E00-\u9FA5]/g)==null){
          chsum=0;
        }
        else{ 
          chsum=content.match(/[\u4E00-\u9FA5]/g).length;
        }
        if(content.match(/[a-z]+/ig)==null){
          ensum=0;
        }
        else{
          var ensum=content.match(/[a-z]+/ig).length;
        }
        //将汉字英文空格删除统计标点个数
        content=content.replace(/[\u4E00-\u9FA5]/g,"");
        content=content.replace(/[a-zA-Z]+/ig,"");
        content=content.replace(" ","");
        var dsum=content.length;
        var sum=chsum+ensum+dsum;
        var title=$("h1").text();
        console.log(title);
        var arr=[title,sum,chsum,ensum,dsum];
        callback && callback(arr);
    })
  }).on('error',function(){
     console.log('获取数据出错');
  })
 // console.log(content+"outer");

}
var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://"+host+":"+port)
});