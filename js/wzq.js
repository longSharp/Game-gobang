
    let canv = document.querySelector("canvas"),
        conText = canv.getContext("2d"),
        textD=document.querySelector(".text"),
        textP=document.querySelector(".text>p"),
        textBtn=document.querySelector(".text>button"),
        oRobot=document.querySelector(".robot");
        // this.console.log(textD)
    let aColor = ["#fff", "#000"];
    let toggle = 0;
    let toggle1 = false;
    let mapArr=[];
    let modes=[
        [1,0],
        [0,1],
        [1,1],
        [1,-1]
    ];
    let blockTimer=null;
    for(let i=0;i<21;i++){
        mapArr[i]=[];
        for(let j=0;j<21;j++){
            mapArr[i][j]=0;
        }
    }
    // console.log(mapArr)
    canv.width = 600;
    canv.height = 600;

    function drawLine(num) {
        for (let i = 0; i < num; i++) {
            conText.moveTo(0, 30 * i);
            conText.lineTo(canv.width, 30 * i);
            conText.moveTo(30 * i, 0);
            conText.lineTo(30 * i, canv.height);

        }
        conText.stroke();
    }
    drawLine(600 / 30 + 1);

    canv.onclick = function (e = window.event) {
        // `console.log(e)
        let dx = (Math.floor(((e.offsetX+15) / 30))) * 30,
            dy = (Math.floor(((e.offsetY+15) / 30))) * 30;
        toggle ? toggle = 0 : toggle = 1;
        if(mapArr[dx/30][dy/30]==0){
            createArc(dx, dy, aColor[toggle]);
            mapArr[dx/30][dy/30]=aColor[toggle];
            checkwin(dx/30,dy/30,aColor[toggle],modes[0]);
            checkwin(dx/30,dy/30,aColor[toggle],modes[1]);
            checkwin(dx/30,dy/30,aColor[toggle],modes[2]);
            checkwin(dx/30,dy/30,aColor[toggle],modes[3]);
            robot(dx/30,dy/30);
        }
        // console.log(mapArr)
    }

    function robot(x2,y2){
        let arr=[];
        if(!mapArr[x2-1][y2]){
            arr.push([x2-1,y2]);
        }
        if(!mapArr[x2+1][y2]){
            arr.push([x2+1,y2]);
        }
        if(!mapArr[x2][y2]-1){
            arr.push([x2,y2-1]);
        }
        if(!mapArr[x2][y2+1]){
            arr.push([x2-1,y2+1]);
        }
        if(!mapArr[x2-1][y2-1]){
            arr.push([x2-1,y2-1]);
        }
        if(!mapArr[x2-1][y2+1]){
            arr.push([x2-1,y2+1]);
        }
        if(!mapArr[x2+1][y2+1]){
            arr.push([x2+1,y2+1]);
        }
        if(!mapArr[x2+1][y2-1]){
            arr.push([x2+1,y2-1]);
        }
        // console.log(arr)
        if (!toggle1) {
            oRobot.classList.add("active1");
            if (arr.length) {
                let time = Math.floor(rand(1, 4));
                // console.log(time)
                blockTimer = setTimeout(function () {
                    let ran = Math.floor(rand(0, arr.length));
                    createArc(arr[ran][0] * 30, arr[ran][1] * 30, aColor[toggle ? toggle = 0 : toggle = 1]);
                    oRobot.classList.remove("active1");
                    clearTimeout(blockTimer);
                }, time * 1000);
            }
        }
        
    }

    function createArc(x, y, color) {
        conText.beginPath();
        conText.fillStyle = color;
        conText.arc(x, y, 15, 0, Math.PI * 2);
        conText.fill();

    }

    function checkwin(x1,y1,color1,mode){
        let count=0;
        for(let i=1;i<6;i++){
            if(mapArr[x1+i*mode[0]]){
                if(mapArr[x1+i*mode[0]][y1+i*mode[1]]==color1){
                    count++;
                }else{
                    break;
                }
            }
        }
        for(let i=1;i<6;i++){
            if(mapArr[x1-i*mode[0]]){
                if(mapArr[x1-i*mode[0]][y1-i*mode[1]]==color1){
                    count++;
                }else{
                    break;
                }
            }
        }
        if(count>=4){
            // console.log(1)
            toggle1=true;
            textD.classList.add("active");
            textBtn.onclick=function(){
                location.reload();
            }
            // console.log(textD)
        }
    }
    function rand(min,max){
        return Math.random()*(max-min)+min;
    }
