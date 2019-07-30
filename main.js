
//1、创建工具函数
function createTag(tag){
   return document.createElement(tag);
}
function Check_img(xxx){
    var key_div=document.getElementById(xxx);
    var key_img= key_div.lastElementChild;
    key_img.src="http://"+kb_lc[xxx]+"/favicon.ico";
    key_img.onerror=function(){
        key_img.src="./img/point.png";
}
}
//2、创建键盘字母及对应网址;
    var kbd_arr=[
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L"],
        ["Z","X","C","V","B","N","M"]
    ]
    var kb_lc={
        "Q":"www.qq.com",
        "W":"weibo.com"
    }
    var kb_Local = JSON.parse(localStorage.getItem("kb_Local") || 'null');
	if(kb_Local)kb_lc = kb_Local;
//3、循环创建键盘
    var main=document.getElementById("keyboard");
    for(var i=0;i<kbd_arr.length;i++){
        var row_div=createTag("div");
        row_div.className="row"+(i+1);
        for(var j=0;j<kbd_arr[i].length;j++){
            //j代表每行j个按键，i代表有i行
            var kbd_div=createTag("div");
            kbd_div.id=kbd_arr[i][j];
            kbd_div.className="key";
            //创建点击事件，添加编辑网址功能，存储到localStorage中
            kbd_div.onclick=function(e){
                var element=e.target;
                if(element.parentNode.id===""){
                    var key_url=prompt("请为"+element.id+"键添加或更换网址");
                    var xxx=element.id;
                }else{
                    var key_url=prompt("请为"+element.parentNode.id+"键添加或更换网址");
                    var xxx=element.parentNode.id;
                }
                if(key_url!==null){kb_lc[xxx]=key_url;};
                localStorage.setItem('kb_Local', JSON.stringify(kb_lc))
                Check_img(xxx);
            }
            //创建span，从kbd_arr中找字母
            var kbd_div_span=createTag("span");
            kbd_div_span.textContent=kbd_arr[i][j];
            //创建img，添加属性和判定
            var kbd_div_img=createTag("img");
            if(kb_lc[kbd_arr[i][j]]!==undefined){
                kbd_div_img.src="http://"+kb_lc[kbd_arr[i][j]]+"/favicon.ico";
            }else{ 
                kbd_div_img.src="./img/point.png";
            }
            kbd_div_img.onerror=function(){
                kbd_div_img.src="./img/point.png";
            }
            
            //把span和img添加到按键div中，再把按键div添加到行div中
            kbd_div.appendChild(kbd_div_span);
            kbd_div.appendChild(kbd_div_img);
            row_div.appendChild(kbd_div);
       }
       //把行div添加到main中
        main.appendChild(row_div);
    }
    var text_span=createTag("span");
    text_span.textContent="点击键盘修改地址";
    main.appendChild(text_span);
//4、添加keypress监听事件
    document.addEventListener("keypress",function(e){
        var key=e.key;
        key=key.toUpperCase();
        var website=kb_lc[key];
        window.open("http://"+website,"_blank")
    })