let is_in_game=false;
let acc=0.3;
let v=0;
let height=0;
let ball_shadow=document.getElementById("ball_shadow");
let shadow_x=ball_shadow.offsetLeft;
let ball=document.getElementById("ball");
let id=setInterval(bouncing,3);
let btns=document.querySelectorAll('.button');
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
    alert("hello world");

}






