

$(document).ready(function(){
    let userCount;

    $.ajax({
        url: "/userCount",
        type: "POST",
        async : false,
        success: function(data){
            userCount = Number(data)
        },
        error: function(){
            alert("통신 중 에러가 발생했습니다.");
        }
    });

    /*
     * 내기설정 CSS로직
     */
    if(userCount === 2){
        document.getElementById('text_box02').style.display = "none";
        document.getElementById('result_box2').style.display = ""
        document.getElementById('result_box1').style.flex = "";
        document.getElementById('result_box1').style.marginLeft = ""
        document.getElementById('result_box1').style.marginRight = "";

        document.getElementById('box_number3').innerHTML = "3";
        document.getElementById('box_number4').innerHTML = "4";


    }
    else if(userCount === 3){
        document.getElementById('result_box1').style.flex = "2";
        document.getElementById('result_box1').style.marginLeft = "25%"
        document.getElementById('result_box1').style.marginRight = "25%";
        document.getElementById('result_box2').style.display = 'none';

        document.getElementById('box_number3').innerHTML = "2";
        document.getElementById('box_number4').innerHTML = "3";


    }

    //결과 띄우기 및 불필요한 요소들 보이지 않게 하기
    for(let i = 0; i < 4; i++){
        if((i+1) > userCount){
            let imgId = 'img' + (i+1).toString();
            let boxId = 'box' + (i+1).toString();

            document.getElementById(imgId).style.display = 'none';
            document.getElementById(boxId).style.display = 'none';
        }
        else{
            let boxId = 'box' + (i+1).toString();
            let resultId = 'result' + (i+1).toString() + '_invisible';
            document.getElementById(boxId).innerHTML = document.getElementById(resultId).value;
        }
    }

    if(Number(userCount) === 3){
        for(let i = 0; i < userCount; i++){
            let boxId = 'box' + (i+1).toString();
            document.getElementById(boxId).style.height = '23%';

        }
    }
    else if(Number(userCount) == 2){
        for(let i = 0; i < userCount; i++){
            let boxId = 'box' + (i+1).toString();
            document.getElementById(boxId).style.height = '33%';
        }
    }

    let formObj = $("form");

    //되돌리기 버튼 작업
    $('.button_51').on("click",function(e){
        e.preventDefault();

        formObj.attr("action", "/start").attr("method","get");
        formObj.submit();
    });

});