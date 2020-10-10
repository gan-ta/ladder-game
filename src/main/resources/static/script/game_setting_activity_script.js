let minus = document.querySelector('.minus');
let plus = document.querySelector('.plus');
let clearButton = document.querySelector('.rere');

let count = 4;
let imgName = '';
let destNum = '';
let insertCanvas = '';

$(document).ready(function(){
    inputInitialize()
    let formObj = $("form");

    document.getElementById("text1").value = '';
    document.getElementById("text2").value = '';
    document.getElementById("text3").value = '';
    document.getElementById("text4").value = '';

   $(".button_text").on("click",function (e) {
       if(count === 4){
           if(document.getElementById("text1").value ==='' || document.getElementById("text2").value ===''){
               alert("내기를 설정해주세요");
           }
           else if(document.getElementById("text3").value ==='' ||document.getElementById("text4").value ===''){
               alert("내기를 설정해주세요");
           }
           else{
               formObj.attr("action", "/start/next").attr("method","post");
               formObj.submit();
           }
       }
       if(count === 3){
           if(document.getElementById("text1").value ===''){
               alert("내기를 설정해주세요");
           }
           else if(document.getElementById("text3").value ==='' ||document.getElementById("text4").value ===''){
               alert("내기를 설정해주세요");
           }
           else{
               formObj.attr("action", "/start/next").attr("method","post");
               formObj.submit();
           }
       }
       if(count === 2){
           if(document.getElementById("text1").value ==='' ||document.getElementById("text2").value ===''){
               alert("내기를 설정해주세요");
           }
           else{
               formObj.attr("action", "/start/next").attr("method","post");
               formObj.submit();
           }
       }

   });
});

function inputInitialize(){
    document.getElementById("text1").value = '';
    document.getElementById("text2").value = '';
    document.getElementById("text3").value = '';
    document.getElementById("text4").value = '';
}

$(function(){
    var form = {
        userCount: count
    }
    $.ajax({
        url: "/start/setting",
        type: "POST",
        data: form,
        dataType : 'json',
        success: function(data){

        },
        error: function(){
            alert("통신 중 에러가 발생했습니다.");
        }
    });
    document.getElementById('userCount').value = count.toString();
});

//초기화 버튼 작동
clearButton.addEventListener('click', ()=>{
    for(let i = 0 ; i < count; i++){
        let textId = 'text' + (i+1).toString();
        document.getElementById(textId).value = '';
    }
});

//인원수를 줄였을 때의 작업
minus.addEventListener('click',()=>{

    if(count > 2) {
        imgName = "";
        destNum = ""
        count--;

        //input초기화
        for(let i = 0 ; i < 4; i++) {
            document.getElementById("text" + (i + 1).toString()).value = '';
        }

        document.getElementById("num_name").innerHTML = count.toString();
        for(let i = 1; i <=count; i++) {
            imgName += '<li><img src="img/' + i.toString() + '.png" alt="" class = img' + i.toString() + '></li>'
            destNum += '<li id = "dest' + i.toString() + '">' + i.toString() + '</li>'
        }
        document.getElementById("animal_image").innerHTML = imgName;
        document.getElementById('destination_list').innerHTML = destNum;
    }
    else{
        alert("인원은 2~4명까지 설정이 가능합니다.");
    }
    var form = {
        userCount : count
    }
    $.ajax({
        url: "/start/setting",
        type: "POST",
        data: form,
        dataType : 'json',
        success: function(data){
            document.getElementById('userCount').value = count.toString();
        },
        error: function(){
            alert("통신 중 에러가 발생했습니다.");
        }
    });

    /*
     * 내기설정 CSS로직
     */
    if(count === 2){
        document.getElementById('text_box02').style.display = "none";
        document.getElementById('box2').style.display = ""
        document.getElementById('box1').style.flex = "";
        document.getElementById('box1').style.marginLeft = ""
        document.getElementById('box1').style.marginRight = "";

        document.getElementById('box3').innerHTML = "<span id = \"box_number3\">3</span>" + "<input type=\"text\" name=\"text3\" id = \"text3\" style = \"margin-left: 3%\">";
        document.getElementById('box4').innerHTML = "<span id = \"box_number4\">4</span>" + "<input type=\"text\" name=\"text4\" id = \"text4\" style = \"margin-left: 3%\">";

    }
    else if(count === 3){
        document.getElementById('box1').style.flex = "2";
        document.getElementById('box1').style.marginLeft = "25%"
        document.getElementById('box1').style.marginRight = "25%";
        document.getElementById('box2').style.display = 'none';

        document.getElementById('box3').innerHTML = "<span id = \"box_number3\">2</span>" + "<input type=\"text\" name=\"text3\" id = \"text3\" style = \"margin-left: 3%\">";
        document.getElementById('box4').innerHTML = "<span id = \"box_number4\">3</span>" + "<input type=\"text\" name=\"text4\" id = \"text4\" style = \"margin-left: 3%\">";

    }
});

//인원수를 늘렸을 때의 작업
plus.addEventListener('click',()=>{
    if(count < 4) {
        imgName = "";
        destNum = ""
        count++;
        document.getElementById("num_name").innerHTML = count.toString();

        //input초기화
        for(let i = 0 ; i < 4; i++) {
            document.getElementById("text" + (i + 1).toString()).value = '';
        }

        for(let i = 1; i <=count; i++) {
            imgName += '<li><img src="img/' + i.toString() + '.png" alt=""></li>'
            destNum += '<li id = "dest' + i.toString() + '">' + i.toString() + '</li>'
        }
        document.getElementById("animal_image").innerHTML = imgName;
        document.getElementById('destination_list').innerHTML = destNum;
    }
    else{
        alert("인원은 2~4명까지 설정이 가능합니다.");
    }
    var form = {
        userCount : count
    }
    $.ajax({
        url: "/start/setting",
        type: "POST",
        data: form,
        dataType : 'json',
        success: function(data){
            document.getElementById('userCount').value = count.toString();
        },
        error: function(){
            alert("통신 중 에러가 발생했습니다.");
        }

    });

    /*
     * 내기설정 CSS로직
     */
    if(count === 3){
        document.getElementById('box1').style.flex = "2";
        document.getElementById('box1').style.marginLeft = "25%"
        document.getElementById('box1').style.marginRight = "25%";
        document.getElementById('text_box02').style.display = "";
        document.getElementById('box2').style.display = "none";

        document.getElementById('box_number3').innerHTML = "2";
        document.getElementById('box_number4').innerHTML = "3";

    }
    else if(count === 4){
        document.getElementById('box1').style.flex = "";
        document.getElementById('box1').style.marginLeft = ""
        document.getElementById('box1').style.marginRight = "";
        document.getElementById('box2').style.display = "";

        document.getElementById('box_number3').innerHTML = "3";
        document.getElementById('box_number4').innerHTML = "4";
    }
});
