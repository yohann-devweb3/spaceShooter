//init variables

let press = null;
let code = null;
const bullets = [];
const ennemies = [];
const bulletWidth = 4;
const bulletHeight = 4;
const ennemyWidth = 25;
const ennemyHeight = 25;
const playerWidth = 50;
const playerHeight = 50;
var pointScore = 0;
var pointSante = 2;
var health =5;
let playerLeft = (window.innerWidth - playerWidth) / 2;
let PlayerTop =  (window.innerHeight - playerHeight);
var speedEnemy = 2;
var speedBullet=2;
var speedShip=5;
var enemyTimeRecast=5000;
var endgame=false;

//instances dom
const game = document.getElementById("game");
const player = document.getElementById("player");

//set score
const score = document.createElement('div');
score.id = "score";
score.style.position="absolute";
score.style.top="82px";
score.style.left="40px";
score.style.height="60px";
score.style.width="auto";
score.style.fontSize="x-large";
score.style.zIndex="10";
score.style.color="yellow";
score.innerText = "Mon score: 0";
document.body.insertBefore(score,document.body.firstChild);

//set sante
const sante = document.createElement('div');
sante.id = "sante";
sante.style.position="absolute";
sante.style.top="112px";
sante.style.left="40px";
sante.style.height="60px";
sante.style.width="auto";
sante.style.fontSize="x-large";
sante.style.zIndex="10";
sante.style.color="rgb(193, 86, 86)";
sante.innerText = "Points de vie: " + pointSante;
document.body.insertBefore(sante,document.body.firstChild);

//set la taille
player.style.width = playerWidth + 'px';
player.style.height = playerHeight + 'px';



//déplacement bullet
window.addEventListener('keydown',function(event){
    code = event.keyCode;
    press = true;
    console.log(code);

    if (code==32){
        const bullet = document.createElement('div');
        bullet.style.height = bulletWidth +'px';
        bullet.style.width = bulletHeight +'px';
        bullet.style.left = parseInt(player.style.left)+((playerWidth - bulletWidth)/2) +'px';
        bullet.style.top = player.style.top; 
        bullet.className = 'bullet'; 
        game.appendChild(bullet);
        bullets.push(bullet);
    }

   //droite
   if (press && code == 39 && playerLeft<= window.innerWidth - playerWidth){
    playerLeft = playerLeft+speed;
}


//gauche
if (press && code == 37 && playerLeft>=0){
    playerLeft = playerLeft-speed;
}

//haut
if (press && code == 38 && PlayerTop >=0){
    PlayerTop = PlayerTop-speed;
}

//bas
if (press && code == 40 && PlayerTop<= window.innerHeight - playerHeight){
    PlayerTop = PlayerTop+speed;
}
},true);


window.addEventListener('keyup',function(){
    press = false;
});

function generate(){
    if(endgame===false){
        const enemy = document.createElement("div");
        enemy.style.width = ennemyWidth + 'px';
        enemy.style.height = ennemyHeight + 'px';
        enemy.style.left = Math.round(Math.random() * (window.innerWidth - ennemyWidth))+'px';
        enemy.style.top = 0+'px';
        enemy.className='ennemy';
        game.append(enemy);
        ennemies.push(enemy);
    
   

    //genere prochain enemy tout les 5sec
    var zetime = setTimeout(generate,Math.round(Math.random() * enemyTimeRecast));
    }else{
        clearInterval(zetime);
    }

   
}
//deplacement et vitesse de deplacement
function strafe(speed){
    speed=parseInt(speed);

    //droite
    if (press && code == 39 && playerLeft<= window.innerWidth - playerWidth){
        playerLeft = playerLeft+speed;
    }


    //gauche
    if (press && code == 37 && playerLeft>=0){
        playerLeft = playerLeft-speed;
    }

    //haut
    if (press && code == 38 && PlayerTop >=0){
        PlayerTop = PlayerTop-speed;
    }

    //bas
    if (press && code == 40 && PlayerTop<= window.innerHeight - playerHeight){
        PlayerTop = PlayerTop+speed;
    }
    
    //set la position
    player.style.top = PlayerTop + 'px';
    player.style.left = playerLeft + 'px';
   
}


    generate(enemyTimeRecast);




function draw(){

    strafe(speedShip);

  

    //draw enemies
    for (let index = 0; index<ennemies.length;index++){
        const ennemy = ennemies[index];
        ennemy.style.top = (parseInt(ennemy.style.top)+speedEnemy)+'px';
        
        if(parseInt(ennemy.style.top)>window.innerHeight-ennemyHeight){
            game.removeChild(ennemy);
            ennemies.splice(index,1);
        }
    }

 


   
    
    //draw bullets
    for (let index = 0; index<bullets.length;index++){
        const bullet = bullets[index];
  
        bullet.style.top =(parseInt(bullet.style.top))-speedBullet+'px';
     
    
        if(parseInt(bullet.style.top)<0){
            game.removeChild(bullet);
            bullets.splice(index,1);
        }
    }

    //collision detection shot
    for (let i =0;i<ennemies.length;i++){
        const ennemy = ennemies[i];
        for (let j =0; j<bullets.length;j++){
            const bullet = bullets[j];
        
                if(bullet.offsetLeft+(bullet.clientWidth/2)> ennemy.offsetLeft
                && bullet.offsetLeft+(bullet.clientWidth/2)<ennemy.offsetLeft + ennemy.clientWidth
                && bullet.offsetTop+(bullet.clientHeight/2)>ennemy.offsetTop
                && bullet.offsetTop+(bullet.clientHeight/2)<ennemy.offsetTop + ennemy.clientWidth){
                game.removeChild(ennemy);
                ennemies.splice(i,1);

                game.removeChild(bullet);
                bullets.splice(j,1); 
    
                pointScore=pointScore+1;

                //augmente la vitesse si j'ai atteind un certain nombre de points

                if (pointScore==2){
                   
                    speedEnemy=speedEnemy+2;
                    speedBullet=speedBullet+2;

                    speedShip=speedShip+2;
                    strafe(speedShip);
                    enemyTimeRecast=4500;
                }

                if (pointScore==4){
                    
                    speedEnemy=speedEnemy+2;
                    speedBullet=speedBullet+2;

                    speedShip=speedShip+2;
                    strafe(speedShip);
                    enemyTimeRecast=3500;
                }

                if (pointScore==6){
                    speedEnemy=speedEnemy+2;
                    speedBullet=speedBullet+2;
                   
                    speedShip=speedShip+2;
                    strafe(speedShip);
                    enemyTimeRecast=2800;
                }
               
                if (pointScore==10){
                    speedEnemy=speedEnemy+2;
                    speedBullet=speedBullet+2;
                    
                    speedShip=speedShip+2;
                    strafe(speedShip);
                    enemyTimeRecast=1000;
                  
                }
               
                console.log(enemyTimeRecast+"-----");
                document.getElementById("score").innerText="Mon score: " +pointScore ;
                }   
                           
             }
    }
        //collision detection vaiseaux et player et decrement la vie
        for (let i =0;i<ennemies.length;i++){
            const ennemy = ennemies[i];
       
            
                    if(player.offsetLeft+(player.clientWidth/2)> ennemy.offsetLeft
                    && player.offsetLeft+(player.clientWidth/2)<ennemy.offsetLeft + ennemy.clientWidth
                    && player.offsetTop+(player.clientHeight/2)>ennemy.offsetTop
                    && player.offsetTop+(player.clientHeight/2)<ennemy.offsetTop + ennemy.clientWidth){
                    game.removeChild(ennemy);
                    ennemies.splice(i,1);

                 

                    pointSante=pointSante-1;


                    document.getElementById("sante").innerText="Points de vie: " +pointSante ;

                    if(pointSante==0){ //dans le cas ou il a plus de point de vie
                      
                       //set game over
                        endgame=true;
                        const gameover = document.createElement('div');
                        const msg = document.createElement('h1');
                        gameover.id = "gameover";
                        gameover.style.position="absolute";
                        gameover.style.top="";
                        gameover.style.height="100%";
                        gameover.style.width="100%";
                        gameover.style.fontSize="x-large";
                        gameover.style.zIndex="10";
                        gameover.style.backgroundColor="black";

                        msg.style.position="absolute";
                        msg.style.top="31%";
                        msg.style.left="32%";
                        msg.style.font="red";
                        msg.style.zIndex="25";
                        msg.style.height="500px";
                        msg.textContent="Game Over !";
                        msg.style.color="red";
                        msg.style.fontSize="84px";

                        document.body.insertBefore(msg,document.body.firstChild);
                        document.body.insertBefore(gameover,document.body.firstChild);

                          //set button replay
                          const replay = document.createElement('button');
                          replay.id="buttonReplay";
                          replay.style.backgroundColor="yellow";
                          replay.style.color="blue";
                          replay.style.zIndex="25";
                          replay.style.position="absolute";
                          replay.style.top="59%";
                          replay.style.fontSize="xxx-large";
                          replay.style.left="44%";
                          replay.style.border="1px solid blue";
                          replay.style.borderRadius="5px"
                          replay.textContent="Rejouer";
                          

                          pointScore=0;//reset les scores
                          pointSante=0;

                          //recharge si click sur bouton rejouer
                          document.body.insertBefore(replay,document.body.lastChild);
                          replay.addEventListener('click',function(event){
                            location.reload();
                          })
                    }

                    }   
                            
                
        }

    requestAnimationFrame(draw);
}


function refresh(){

}