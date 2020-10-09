let count = 4
let imgName = '';
let destNum = '';
var img1Dom;
var img2Dom;
var img3Dom;
var img4Dom;

//이미지 다운을 시키기 위한 정보
var ladderData;
var ladderCutVertical;
var ladderCutHorizontal;

//작업을 중지표시하기 위한 변수모두
let ladderFlag  = new Array();
let checkFlag = new Array();


//투명도 조절 아이디 찾기
let opacityControll = '';

$(document).ready(function(){

    let formObj = $("form");


    //되돌리기 버튼 작업
    $('.button_51').on("click",function(e){
        e.preventDefault();

        formObj.attr("action", "/").attr("method","post");
        formObj.submit();
    });

    //결과 창 버튼 작업
    $('.button_50').on("click",function(e){
        e.preventDefault();

        formObj.attr("action", "/result").attr("method","post");
        formObj.submit();
    });

});


$(function(){
    //배열 초기화
    for(var i = 0 ; i < 4;i++){
        ladderFlag[i] = 1;
        checkFlag[i] = 0;
    }

    $.ajax({
        url: "/userCount",
        type: "POST",
        async : false,
        success: function(data){
            count = Number(data)
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

        document.getElementById('box_number3').innerHTML = "3";
        document.getElementById('box_number4').innerHTML = "4";
    }
    else if(count === 3){
        document.getElementById('box1').style.flex = "2";
        document.getElementById('box1').style.marginLeft = "25%"
        document.getElementById('box1').style.marginRight = "25%";
        document.getElementById('box2').style.display = 'none';

        document.getElementById('box_number3').innerHTML = "2";
        document.getElementById('box_number4').innerHTML = "3";

    }


    var form = {
        userCount : count
    }
    $.ajax({
        url: "/create/ladder",
        type: "POST",
        data: form,
        dataType : 'json',
        async : false,
        success: function(data){
            //html 수정
            insertCanvas = '<canvas id = \"paper\" class = \"ladder_paper\" ></canvas>';
            document.getElementById("ladder_body").innerHTML = insertCanvas;

            //사다리 작업 수행
            createLadder(data);
        },
        error: function(){
            alert("통신 중 에러가 발생했습니다.");
        }
    });

    //결과를 미리 저장
    for(let i = 0 ;  i < count ; i++){
        let destination = imageDown(ladderData, ladderCutVertical, ladderCutHorizontal, i,false);
        let resultId = 'result' + (i+1).toString();

        document.getElementById(resultId).value = destination.toString();

    }


    for(let i = 1; i <=count; i++) {
        imgName += '<li><img src="../img/' + i.toString() + '.png" alt="" id = img' + i.toString() +'Id class = img' + i.toString() + '></li>'
        destNum += '<li id = "dest' + i.toString() + '">' + i.toString() + '</li>'
    }
    document.getElementById("animal_image").innerHTML = imgName;
    document.getElementById('destination_list').innerHTML = destNum;




    img1Dom = document.querySelector('.img1');
    img2Dom = document.querySelector(".img2");
    img3Dom = document.querySelector(".img3");
    img4Dom = document.querySelector(".img4");


    //이미지마다 클릭 이벤트를 넣는 작업
     img1Dom.addEventListener('click',()=>{
        //현재 진행이 되어 있는지 체크를 하는 변수
        let ingCheck = 0;
        //새로운 사다리 갱신
        for(var i = 0 ; i < count;i++){
            document.getElementById('img' + (i+1).toString() + 'Id').setAttribute('style','opacity:1,0');
            if(i !== 0) {
                document.getElementById('img' + (i+1).toString() + 'Id').setAttribute('style','opacity:0.6');
                ladderFlag[i] = 1;
            }
            else{
                //닫혀져 있으면 열어줌
                if(ladderFlag[i] === 1){ ladderFlag[i] = 0; ingCheck = 1;}
            }
        }

        //현재 해당 이미지가 수행이 되지 않고 있을때만 수행
        if(ingCheck === 1) {
            createLadder(ladderData);
            imageDown(ladderData, ladderCutVertical, ladderCutHorizontal, 0,true);
        }
    });

    img2Dom.addEventListener('click',()=>{
        //현재 진행이 되어 있는지 체크를 하는 변수
        let ingCheck = 0;
        //새로운 사다리 갱신
        for(var i = 0 ; i < count;i++){
            document.getElementById('img' + (i+1).toString() + 'Id').setAttribute('style','opacity:1,0');
            if(i !== 1) {
                document.getElementById('img' + (i+1).toString() + 'Id').setAttribute('style','opacity:0.6');
                ladderFlag[i] = 1;
            }
            else{
                //닫혀져 있으면 열어줌
                if(ladderFlag[i] === 1){ ladderFlag[i] = 0; ingCheck = 1;}
            }
        }

        if(ingCheck === 1) {
            createLadder(ladderData);
            imageDown(ladderData, ladderCutVertical, ladderCutHorizontal, 1,true);
        }
    });

    if(count >= 3) {
        img3Dom.addEventListener('click', () => {
            //현재 진행이 되어 있는지 체크를 하는 변수
            let ingCheck = 0;
            //새로운 사다리 갱신
            for(let i = 0 ; i < count;i++){
                document.getElementById('img' + (i+1).toString() + 'Id').setAttribute('style','opacity:1,0');
                if(i !== 2) {
                    document.getElementById('img' + (i+1).toString() + 'Id').setAttribute('style','opacity:0.6');
                    ladderFlag[i] = 1;
                }
                else{
                    //닫혀져 있으면 열어줌
                    if(ladderFlag[i] === 1){ ladderFlag[i] = 0; ingCheck = 1;}
                }
            }

            if(ingCheck === 1) {
                createLadder(ladderData);
                imageDown(ladderData, ladderCutVertical, ladderCutHorizontal, 2,true);
            }
        });
    }

    if(count >= 4) {
        img4Dom.addEventListener('click', () => {
            //현재 진행이 되어 있는지 체크를 하는 변수
            let ingCheck = 0;
            //새로운 사다리 갱신
            for(var i = 0 ; i < count;i++){
                document.getElementById('img' + (i+1).toString() + 'Id').setAttribute('style','opacity:1,0');
                if(i !== 3) {
                    document.getElementById('img' + (i+1).toString() + 'Id').setAttribute('style','opacity:0.6');
                    ladderFlag[i] = 1;
                }
                else{
                    //닫혀져 있으면 열어줌
                    if(ladderFlag[i] === 1){ ladderFlag[i] = 0; ingCheck = 1;}
                }
            }
            if(ingCheck === 1) {
                createLadder(ladderData);
                imageDown(ladderData, ladderCutVertical, ladderCutHorizontal, 3,true);
            }
        });
    }

});


/*
 *사다리를 만드는 작업
 * @Param : 컨트롤러에서 임의의 사다리에 대한 정보
 */
function createLadder(data){
    let canvas = document.getElementById("paper"),
        c = canvas.getContext("2d"),
        TWO_PI = Math.PI * 2;
    let cutVertical = [];
    let cutHorizontal = [];
    let horizontalTerm = 0;
    let insertHorizontal = 0;
    let horizontalIdx = 0;
    let verticalIdx = 0;

    let horizontalDivCnt = count + 3;

    if(count === 4){
        //수직선 저장
        cutVertical.push(45);
        cutVertical.push(120);
        cutVertical.push(200);
        cutVertical.push(280);

        //가로선 저장
        horizontalTerm = (canvas.height-10) / horizontalDivCnt;
        cutHorizontal.push(0);
        for(let i  = 1; i <= horizontalDivCnt; i++){
            insertHorizontal = horizontalTerm * i;
            cutHorizontal.push(insertHorizontal);
        }
        cutHorizontal.push(canvas.height);
    }
    else if(count === 3){
        //수직선 저장
        cutVertical.push(62);
        cutVertical.push(160);
        cutVertical.push(260);

        //가로선 저장
        horizontalTerm = (canvas.height-10) / horizontalDivCnt;
        cutHorizontal.push(0);
        for(let i  = 1; i <= horizontalDivCnt; i++){
            insertHorizontal = horizontalTerm * i;
            cutHorizontal.push(insertHorizontal);
        }
        cutHorizontal.push(canvas.height);
    }
    else if(count === 2){
        //수직선 저장
        cutVertical.push(80);
        cutVertical.push(240);

        //가로선 저장
        horizontalTerm = (canvas.height-10) / horizontalDivCnt;
        cutHorizontal.push(0);
        for(let i  = 1; i <= horizontalDivCnt; i++){
            insertHorizontal = horizontalTerm * i;
            cutHorizontal.push(insertHorizontal);
        }
        cutHorizontal.push(canvas.height);
    }

    c.fillStyle = "white";
    c.fillRect(0,0,canvas.width,canvas.height);

    c.strokeStyle = "#666";
    c.lineWidth = 2;

    //세로선을 지정
    for(let i = 0 ; i < cutVertical.length; i++){
        c.beginPath();
        c.moveTo(cutVertical[i],0);
        c.lineTo(cutVertical[i],150);
        c.stroke();
    }

    //가로선을 그리는 작업
    $.each(data,function(i,v){
        //데이터 인풋
        horizontalIdx = Number(v.horizontal);
        verticalIdx = Number(v.vertical);

        c.beginPath();
        c.moveTo(cutVertical[verticalIdx],cutHorizontal[horizontalIdx+1]);
        c.lineTo(cutVertical[verticalIdx+1],cutHorizontal[horizontalIdx+1]);
        c.stroke();

    });

    ladderData = data;
    ladderCutVertical = cutVertical;
    ladderCutHorizontal = cutHorizontal;

}


/*
 * 이미지 떨어짐 구현
 * data : 현재 사다리의 상태
 * cutVertical : 수직 좌표정보
 * cutHorizontal : 수평 좌표정보
 * unitNum : 현재 유낫의 정보
 * draw : 그림을 그릴 것인지 안그릴 것인지 판단(true: 그림을 그림, false: 그림을 그리지 않음)
 * return : 목적지를 반환
 */
function imageDown(data,cutVertical,cutHorizontal,unitNum,draw){
    let canvas = document.getElementById("paper"),
        c = canvas.getContext("2d"),
        TWO_PI = Math.PI * 2;
    let horizontalDivCnt = count + 3;
    let horizontalIdx = 0;
    let verticalIdx = 0;


    //데이터의 상태를 Map으로 저장
    let map = new Array(horizontalDivCnt+2);
    for(let i = 0 ; i < map.length; i++){
        map[i] = new Array(count);
    }
    for(let i = 0; i < map.length; i++){
        for(let j = 0 ; j < map[i].length; j++){
            map[i][j] = 0;
        }
    }

    $.each(data,function(i,v){
        //데이터 인풋
        horizontalIdx = Number(v.horizontal);
        verticalIdx = Number(v.vertical);

        map[horizontalIdx+1][verticalIdx] = 1;
    });

    //유닛에 따른 초기값 설정
    let currentLocation = unitNum;
    let lineColor = "";

    if(unitNum === 0){
        lineColor = "#99ccff";
    }
    else if(unitNum === 1){
        lineColor = "#ff9999";
    }
    else if(unitNum === 2){
        lineColor = "#66cc99";
    }
    else{
        lineColor = "#ffcc00"
    }

    let posY = 0;
    horizontalIdx = 1;
    let directionCheck = 0; //0은 세로방향, 1은 가로방향
    let prevLocation;
    let nextLocation;

    if(draw == true) {
        let interval = setInterval(function () {
            //중지조건
            if (posY === cutHorizontal[cutHorizontal.length - 1]) {
                //5만큼 더 움직이고 나감
                //색을 지정
                let idName = 'dest' + (currentLocation + 1).toString();

                if (currentLocation === 0) {
                    document.getElementById(idName).style.backgroundColor = lineColor;
                } else if (currentLocation === 1) {
                    document.getElementById(idName).style.backgroundColor = lineColor;
                } else if (currentLocation === 2) {
                    document.getElementById(idName).style.backgroundColor = lineColor;
                } else if (currentLocation === 3) {
                    document.getElementById(idName).style.backgroundColor = lineColor;
                }

                //flag를 닫아줌
                ladderFlag[unitNum] = 1;
                //조사를 한 목적지인지 체크
                checkFlag[unitNum] = 1;

                //전부 조사가 되어 있으면 5초후 다음 페이지로 넘어감
                let finishCheck = checkFinish();
                if(finishCheck === true){
                    setTimeout(function(){
                        let formObj = $("form");

                        formObj.attr("action", "/result").attr("method","post");
                        formObj.submit();
                    }, 5000);
                }

                clearInterval(interval);
            } else if (posY >= cutHorizontal[cutHorizontal.length - 1] - 5) {
                c.fillStyle = lineColor;
                c.beginPath();
                c.arc(cutVertical[currentLocation], posY, 1.5, 0, TWO_PI, false);
                c.fill();
                posY += 1;
            } else if (ladderFlag[unitNum] === 1) {
                clearInterval(interval);
            }
            //가로선으로 움직이는 작업
            else if (directionCheck === 1) {
                if (prevLocation > nextLocation) {
                    directionCheck = 0;
                } else {
                    c.fillStyle = lineColor;
                    c.beginPath();
                    c.arc(prevLocation, posY, 1.5, 0, TWO_PI, false);
                    c.fill();
                    prevLocation += 1;
                }

            } else if (directionCheck === 2) {
                if (prevLocation < nextLocation) {
                    directionCheck = 0;
                } else {
                    c.fillStyle = lineColor;
                    c.beginPath();
                    c.arc(prevLocation, posY, 1.5, 0, TWO_PI, false);
                    c.fill();
                    prevLocation -= 1;
                }
            } else if (posY < cutHorizontal[horizontalIdx] && directionCheck === 0) {
                c.fillStyle = lineColor;
                c.beginPath();
                c.arc(cutVertical[currentLocation], posY, 1.5, 0, TWO_PI, false);
                c.fill();
                posY += 1;
            } else if (posY >= cutHorizontal[horizontalIdx]) {
                if (currentLocation === 0) {
                    if (map[horizontalIdx][currentLocation] === 1) {
                        directionCheck = 1;
                        prevLocation = cutVertical[currentLocation];
                        nextLocation = cutVertical[currentLocation + 1];
                        currentLocation += 1;
                    }
                    horizontalIdx += 1;
                } else if (currentLocation === (cutVertical.length - 1)) {
                    if (map[horizontalIdx][currentLocation - 1] === 1) {
                        directionCheck = 2;
                        prevLocation = cutVertical[currentLocation];
                        nextLocation = cutVertical[currentLocation - 1];
                        currentLocation -= 1;
                    }
                    horizontalIdx += 1;
                } else {
                    if (map[horizontalIdx][currentLocation] === 1) {
                        directionCheck = 1;
                        prevLocation = cutVertical[currentLocation];
                        nextLocation = cutVertical[currentLocation + 1];
                        currentLocation += 1;
                    } else if (map[horizontalIdx][currentLocation - 1] === 1) {
                        directionCheck = 2;
                        prevLocation = cutVertical[currentLocation];
                        nextLocation = cutVertical[currentLocation - 1];
                        currentLocation -= 1;
                    }
                    horizontalIdx += 1;
                }
            }
        }, 0.5);
    }
    else{
        while(true) {
            //중지조건
            if (posY === cutHorizontal[cutHorizontal.length - 1]) {
                break;
            }
            else if (posY >= cutHorizontal[cutHorizontal.length - 1] - 5) {
                posY += 1;
            }
            //가로선으로 움직이는 작업
            else if (directionCheck === 1) {
                if (prevLocation > nextLocation) {
                    directionCheck = 0;
                } else {
                    prevLocation += 1;
                }

            }
            else if (directionCheck === 2) {
                if (prevLocation < nextLocation) {
                    directionCheck = 0;
                } else {
                    prevLocation -= 1;
                }
            }
            else if (posY < cutHorizontal[horizontalIdx] && directionCheck === 0) {
                posY += 1;
            }
            else if (posY >= cutHorizontal[horizontalIdx]) {
                if (currentLocation === 0) {
                    if (map[horizontalIdx][currentLocation] === 1) {
                        directionCheck = 1;
                        prevLocation = cutVertical[currentLocation];
                        nextLocation = cutVertical[currentLocation + 1];
                        currentLocation += 1;
                    }
                    horizontalIdx += 1;
                } else if (currentLocation === (cutVertical.length - 1)) {
                    if (map[horizontalIdx][currentLocation - 1] === 1) {
                        directionCheck = 2;
                        prevLocation = cutVertical[currentLocation];
                        nextLocation = cutVertical[currentLocation - 1];
                        currentLocation -= 1;
                    }
                    horizontalIdx += 1;
                } else {
                    if (map[horizontalIdx][currentLocation] === 1) {
                        directionCheck = 1;
                        prevLocation = cutVertical[currentLocation];
                        nextLocation = cutVertical[currentLocation + 1];
                        currentLocation += 1;
                    } else if (map[horizontalIdx][currentLocation - 1] === 1) {
                        directionCheck = 2;
                        prevLocation = cutVertical[currentLocation];
                        nextLocation = cutVertical[currentLocation - 1];
                        currentLocation -= 1;
                    }
                    horizontalIdx += 1;
                }
            }
        }
    }

    return currentLocation+1;
}

/*
 * 모든 사다리를 탔는지 체크하는 함수
 */
function checkFinish(data){

    for(let i  = 0 ; i < count; i++){
        if(checkFlag[i] === 0) return false;
    }

    return true;
}

