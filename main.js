window.onload=function (){
    let ball_shadow=document.getElementById("ballShadow");
    let ball=document.getElementById("ball");
    let id=setInterval(bouncing,3);
    let btns=document.querySelectorAll('.button');
    let play_btn=document.getElementById("play_button");
    let restart_btn=document.getElementById("restart_button");
    let welcome=document.getElementById("welcome");
    let writer=document.getElementById("writer");
    let shadow_x=ball_shadow.style.left;
    let is_in_game=false;
    let circle=0;
    let acc=0.3;
    let v=0;
    let height=0;
    let score=0;
    let max_height=920;
    let platformCount=5;
    let position=900;
    let platforms=new Array();
    let game_over=false;
    let canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');
    function bouncing()
    {
        if(is_in_game==true)
        {clearInterval(id);}
        else
        {
            if(height>=600&&v>0)
            {
                if(v<=1)clearInterval(id);
                v=-v;
            }
            v+=acc;
            height+=v;
            ball.style.top=height+"px";
            ball_shadow.style.left=(shadow_x+600-height)+'px';
        }

    }
    function drawRoundedRect(ctx, x, y, width, height, r, fill, stroke) {
        ctx.save(); ctx.beginPath(); // draw top and top right corner
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner
        ctx.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner
        ctx.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner
        ctx.arcTo(x, y, x + r, y, r);
        if (fill) { ctx.fill(); }
        if (stroke) { ctx.stroke(); }
        ctx.restore();
    }
//画布是300*150等比例变化
    function Platform() {
        this.width = 30;
        this.height = 3;

        this.x = Math.random()*250;
        this.y = position/980*150;

        this.flag=1;
        position -= (max_height / platformCount);
        //Function to draw it
        this.draw = function () {
            try {
                let grd=ctx.createLinearGradient(this.x,this.y,this.width,this.height);
                grd.addColorStop(0,"#ffffff");
                grd.addColorStop(1,"#ffffff");
                ctx.fillStyle=grd;
                ctx.fillRect(this.x,this.y,this.width,this.height);
            } catch (e) {
            }
        };
        this.update=function()
        {
            ctx.clearRect(this.x,this.y,this.width,this.height);
        }

    }
    let Ball=function()
    {
        this.y=920;
        this.x=900;
        this.v=0;
        this.acc=0.6;
        this.flag=0;
        this.is_jumping=false;
        this.updated=false;
    }
    let cur_ball=new Ball();

    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame||
            function(callback) {
                window.setTimeout(callback, 3);
            };
    })();

    btns.forEach(btn=>{
        btn.addEventListener('mouseover',function(e)
        {
            let x=e.offsetX;
            let y=e.offsetY;
            let ripples=document.createElement('span');
            ripples.style.left=x+'px';
            ripples.style.top=y+'px';
            this.appendChild(ripples);
            setTimeout(()=>
            {
                ripples.remove();
            },1000)

        })
    })
    play_btn.addEventListener('click',function(e)
        {
            init();
        }
    )
    restart_btn.addEventListener('click',function(e)
    {
        game_over=false;
        document.getElementById("restart_button").style.visibility="hidden";
        let child=document.getElementById("score_board");
        child.parentNode.removeChild(child);
        position=900;
        platforms=new Array();
        ctx.clearRect(0,0,300,150);
        cur_ball=new Ball();
        init();
    })



    function init()
    {
        ball.style.top=cur_ball.x+"px";
        ball.style.left=cur_ball.y+"px";
        play_btn.style.display="none";
        ball_shadow.style.display="none";
        welcome.style.display="none";
        writer.style.display="none";
        let score_board=document.createElement("h1");
        score_board.setAttribute("id","score_board");
        let text=document.createTextNode("Score: 0");
        score_board.appendChild(text);
        document.body.appendChild(score_board);
        for(let i=0;i<platformCount;i++)
            platforms.push(new Platform());
        if(circle==0)
        {menuLoop();
            circle++;
        }



    }
    function update() {

        for(let i=0;i<platforms.length;i++)
            platforms[i].draw();

        document.onkeydown = function (e) {
            let key = e.keyCode;
            if(game_over==false) {
                if (cur_ball.flag == 0) {
                    if (key == 37) {
                        cur_ball.flag = -1;
                    }
                    if (key == 39) {
                        cur_ball.flag = 1;
                    }
                }
                if (cur_ball.is_jumping == false) {
                    if (key == 38) {
                        cur_ball.acc = 0.6;
                        cur_ball.v = -20;
                        cur_ball.updated = false;
                        cur_ball.is_jumping = true;
                    }
                }
            }
        }
        document.onkeyup = function (e) {
            let key=e.keyCode;
            if(key==37||key==39)
                cur_ball.flag = 0;
        }

        cur_ball.x+=cur_ball.flag*15;
        if(cur_ball.x>1900)cur_ball.x=0;
        else if(cur_ball.x<0)cur_ball.x=1900;
        ball.style.left=cur_ball.x+'px';
        if(cur_ball.is_jumping==true)
        {
            cur_ball.v+=cur_ball.acc;
            cur_ball.y+=cur_ball.v;
            ball.style.top=cur_ball.y+'px';
            if(cur_ball.y>920)
            {
                cur_ball.y=920;
                cur_ball.is_jumping=false;
                cur_ball.v=0;
                cur_ball.updated=true;
                ball.style.top=cur_ball.y+'px';
                gameOver();
            }

        }
        for(let i=0;i<platforms.length;i++)
            if(cur_ball.v>=0&&cur_ball.y>=platforms[i].y*980/150-80&&cur_ball.y<=(platforms[i].y+platforms[i].height)*980/150-40)
            {
                if(cur_ball.x>=platforms[i].x*1900/300-40&&cur_ball.x<=(platforms[i].x+platforms[i].width)*1900/300)
                {cur_ball.is_jumping=false;cur_ball.v=0;
                    //cur_ball.y-=max_height / platformCount;
                    if(cur_ball.updated==false){
                        platforms.push(new Platform());
                        position += (max_height / platformCount);
                        for(let j=0;j<platforms.length;j++)
                        {
                            platforms[j].y+=(max_height / platformCount)/980*150;
                        }

                        score+=10;
                        document.getElementById("score_board").innerText="Score: "+score;
                        cur_ball.y+=(max_height / platformCount);
                        if(cur_ball.y>920)
                        {
                            cur_ball.y=920;
                            cur_ball.is_jumping=false;
                            cur_ball.v=0;
                            cur_ball.updated=true;
                            ball.style.top=cur_ball.y+'px';
                            gameOver();
                        }
                        ball.style.top=cur_ball.y+"px";
                        ctx.clearRect(0,0,300,150);
                        cur_ball.updated=true;
                        break;
                    }

                }
                else
                    cur_ball.is_jumping=true;
            }
    }
    menuLoop = function() {
        update();
        requestAnimFrame(menuLoop);
    };
    function gameOver()
    {
        game_over=true;
        document.getElementById("restart_button").style.visibility="visible";
        document.getElementById("score_board").innerText="Game Over";
    }
}









