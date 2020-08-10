let ball_shadow=document.getElementById("ball_shadow");
let ball=document.getElementById("ball");
let id=setInterval(bouncing,3);
let btns=document.querySelectorAll('.button');
let play_btn=document.getElementById("play_button");
let welcome=document.getElementById("welcome");
let writer=document.getElementById("writer");
let shadow_x=ball_shadow.offsetLeft;
let is_in_game=false;
let acc=0.3;
let v=0;
let height=0;
let score=0;
let Ball=function()
{
this.y=920;
this.x=900;
this.v=0;
this.acc=0.3;
this.flag=0;
this.is_jumping=false;
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
    btn.addEventListener('click',function(e)
    {
        init();

    })


})

function bouncing()
{
    if(is_in_game==true)clearInterval(id);
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
    menuLoop();

}
function update() {
    document.onkeydown = function (e) {
        let key = e.keyCode;
        if(cur_ball.flag==0)
        {
            if (key == 37) {
                cur_ball.flag=-1;
            }
            if (key == 39) {
                cur_ball.flag=1;
            }
        }
        if(cur_ball.is_jumping==false)
        {
            if(key==38)
            {
                cur_ball.v=-20;
                cur_ball.is_jumping=true;
            }
        }

    }
    document.onkeyup=function(e)
    {
        cur_ball.flag=0;
    }
    cur_ball.x+=cur_ball.flag*6;
    ball.style.left=cur_ball.x+'px';
    if(cur_ball.is_jumping==true)
    {
        cur_ball.v+=cur_ball.acc;
        cur_ball.y+=cur_ball.v;
        ball.style.top=cur_ball.y+'px';
        if(cur_ball.y>=920)
        {
            cur_ball.y=920;
            cur_ball.is_jumping=false;
            cur_ball.v=0;
            ball.style.top=cur_ball.y+'px';
        }
      score=Math.floor(Math.max(score,920-cur_ball.y)) ;
      document.getElementById("score_board").innerText="Score: "+score;
    }


}
menuLoop = function() {
    update();
    requestAnimFrame(menuLoop);
};









