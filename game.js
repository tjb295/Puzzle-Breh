//Author Thomas Back, Javascript code for puzzle breh
var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 400, {backgroundColor: 0x00BFFF});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

//boolean values
var start = false;

var main_menu = PIXI.Sprite.fromImage("start.png");
stage.addChild(main_menu);

//text for game over menu
var instructions = new PIXI.Text("reach the end by helping the community! \n\
                                  Press Enter to begin!",{font : '11px Arial', fill : 0xff1010, align : 'left'});
main_menu.addChild(instructions);
instructions.position.x = 30;
instructions.position.y = 300;
//create score counter
var timer = new PIXI.Text('0',{font : '24px Arial', fill : 0xff1010, align : 'center'});
var endtile = new PIXI.Sprite(PIXI.Texture.fromImage("endgame.png"));
endtile.anchor.x = 0.5;
endtile.anchor.y = 0.5;
endtile.position.x = 380;
endtile.position.y = 60;
//create sprites
var redcup = new PIXI.Sprite(PIXI.Texture.fromImage("redcup.png"));
redcup.position.x = 340;
redcup.position.y = 260;
redcup.anchor.x = 0.5;
redcup.anchor.y = 0.5;

var glass = new PIXI.Sprite(PIXI.Texture.fromImage("glass.png"));
glass.position.x = 60;
glass.position.y = 340;
glass.anchor.x = 0.5;
glass.anchor.y = 0.5;
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
PIXI.loader.add("assets_breh.json").load(ready);
PIXI.loader.add("sophisticat.json");

//audio
PIXI.loader.add("Blip_Select.wav").load(soundready);
PIXI.loader.add("Blip_Select3.wav").load(soundready);
PIXI.loader.add("brehgamemusic.wav").load(soundready);
var walk1;
var walk2;
var theme;
var sophisticat;
var dialogue_box;
function ready(){

    var frames = [];
    
    for (i=1;i <=3;i++){
        frames.push(PIXI.Texture.fromFrame('breh' + i +'.png'));
    }

    
    runner = new PIXI.extras.MovieClip(frames);
    runner.scale.x = 5;
    runner.scale.y = 5;
    runner.position.x = 200;
    runner.position.y = 200;
    runner.animationSpeed = 0.1;
    runner.play();
    stage.addChild(runner);

}
function soundready(){
    walk1 = PIXI.audioManager.getAudio("Blip_Select.wav");
    walk2 = PIXI.audioManager.getAudio("Blip_Select3.wav");
    theme = PIXI.audioManager.getAudio("brehgamemusic.wav");
    theme.loop = true;
    theme.play();
}
var blockarr = [];
//begin rendering the maze
function maze_render(){
    
var x_pos = 380;
var y_pos = 380;

for(j=0; j < 100; j++){
    for(i=0; i< 10; i++){
        blockarr[j] =  new PIXI.Sprite(PIXI.Texture.fromImage("block.png"));
        blockarr[j].anchor.x = 0.5;
        blockarr[j].anchor.y = 0.5;

        blockarr[j].position.x = x_pos;
        blockarr[j].position.y = y_pos;
       
        stage.addChild(blockarr[j]);
        
        x_pos -= 40;
        if(blockarr[j].position.y == 340){
            if(blockarr[j].position.x >= 60 && blockarr[j].position.x <= 340){
                blockarr[j].alpha = 0;
            }

        }
        if(blockarr[j].position.y == 300 ){
            if(blockarr[j].position.x == 260){
                blockarr[j].alpha = 0;
            }
        }
        if (blockarr[j].position.y == 260){
            if(blockarr[j].position.x == 100 || blockarr[j].position.x == 180 || blockarr[j].position.x == 260 || blockarr[j].position.x == 300 || blockarr[j].position.x == 340){
                blockarr[j].alpha = 0;
            }
        }
        if (blockarr[j].position.y == 220){
            if(blockarr[j].position.x >= 60 && blockarr[j].position.x <= 260){
                blockarr[j].alpha = 0;
            }
        }
        if (blockarr[j].position.y == 180){
            if(blockarr[j].position.x == 60|| blockarr[j].position.x == 300 || blockarr[j].position.x == 340 || blockarr[j].position.x == 380){
                blockarr[j].alpha = 0;
            }
        }
        if (blockarr[j].position.y == 140){
            if(blockarr[j].position.x == 60 || blockarr[j].position.x == 100 || blockarr[j].position.x == 140 || blockarr[j].position.x == 300 || blockarr[j].position.x == 380){
                blockarr[j].alpha = 0;
            }
        }
        if (blockarr[j].position.y == 100){
            if (blockarr[j].position.x == 140 || blockarr[j].position.x == 180 || blockarr[j].position.x == 220 || blockarr[j].position.x == 260 || blockarr[j].position.x == 300 || blockarr[j].position.x == 380 ){
                blockarr[j].alpha = 0;
            }
        }
        if(blockarr[j].position.y == 60){
            if(blockarr[j].position.x == 60 || blockarr[j].position.x == 100 || blockarr[j].position.x == 140 || blockarr[j].position.x == 300 || blockarr[j].position.x == 380){
                blockarr[j].alpha = 0;
            }
        }




    }
    console.log(blockarr[j].position.x);
    x_pos = 380;
    y_pos -=40;
}
}
//timed function to make sure user doesnt move out of the set positions
function setdone(){
    done = true;
    player.stop();
}

document.addEventListener('keydown', keydownEventHandler);


//document.addEventListener('keyup', keyupEventHandler);
function walk_play(){
    walk1.play();
}
var moveup = false;
var movedown = false;
var moveright = false;
var moveleft = false;
var done = true;
function keydownEventHandler(e){
    if(done == false){
        return;
    }
    var newx;
    var newy;
    //if enter is pressed, at start menu, then start game
    if (e.keyCode == 13 && !start){
        start = true;
        runner.alpha = 0;
        main_menu.alpha = 0;
        instructions.alpha = 0;
        game_play();
    }
    else if (e.keyCode == 13 && ending){
        first_render = false;
        ending = false;
        game_play();
    }
    else if(start){
        newx = player.position.x;
        newy = player.position.y;
        
        if (e.keyCode ==  87) {// w key
               newy -= 40;
            }
        else if (e.keyCode == 83) {

            newy += 40;
        }
        else if (e.keyCode == 65){

            newx  -= 40;
        }
        else if (e.keyCode == 68) {

            newx  += 40;
        }
        if (!collision(newx,newy)){
            player.play();
            createjs.Tween.get(player.position).to({x: newx, y: newy},1000);
            done = false;
            walk2.play();
            setTimeout(walk_play,100);
            walk2.play();
            setTimeout(walk_play,100);
            setTimeout(setdone,1050);
            
        }
       
        
        
       
        
        
    }

    
}
//start screen first
var first_render = true;



//gameplay


var player;


function game_play(){
    if (first_render == true){
        console.log(blockarr.length);
        maze_render();
        stage.addChild(endtile);
        stage.addChild(redcup);
        stage.addChild(glass);
        var frames = [];
        var frames1 = [];
        //player frames
        for (i=1;i <=3;i++){
            frames.push(PIXI.Texture.fromFrame('breh' + i +'.png'));
        }
        //sophisticat frames
        for (i=1;i <=2;i++){
            frames1.push(PIXI.Texture.fromFrame('sophisticat' + i +'.png'));
        }
        sophisticat = new PIXI.extras.MovieClip(frames1);
    sophisticat.anchor.x = 0.5;
    sophisticat.anchor.y = 0.5;
    sophisticat.position.x = 220;
    sophisticat.position.y = 220;
    sophisticat.animationSpeed = 0.1;
    sophisticat.play();
    stage.addChild(sophisticat);

    player = new PIXI.extras.MovieClip(frames);
    player.anchor.x = 0.5;
    player.anchor.y = 0.5;
    player.position.x = 340;
    player.position.y = 340;
    player.loop = true;
    player.animationSpeed = 0.1;
    stage.addChild(player);
    first_render = false;
    }
    else{
            has_redcup = false;
            has_glass = false;
            creditssc.visible = false;
            redcup.alpha = 1;
            glass.alpha = 1;
            sophisticat.position.x = 220;
            sophisticat.position.y = 220;
            player.position.x = 340;
            player.position.y = 340;
        
    }
    

    
   
}
// variables for dialogue function
var has_redcup = false;
var has_glass = false;
var cancel;
//begin making the options for dialogue
cancel = new PIXI.Sprite(PIXI.Texture.fromImage("cancel_noitem.png"));
cancel.interactive = true;
cancel.position.x = 100;
cancel.position.y = 290;
cancel.scale.x = 2;
cancel.scale.y = 2;
cancel.on('mousedown', menuSelectCancel);

var giveredcup = new PIXI.Sprite(PIXI.Texture.fromImage("giveredcup.png"));
giveredcup.interactive = true;
giveredcup.position.x = 50;
giveredcup.position.y = 290;
giveredcup.on('mousedown',menuSelectRedCup);

var giveglass = new PIXI.Sprite(PIXI.Texture.fromImage("giveglass.png"));
giveglass.interactive = true;
giveglass.position.x = 20;
giveglass.position.y = 150;
giveglass.on('mousedown', menuSelectGlass);

var redcupreact = new PIXI.Sprite(PIXI.Texture.fromImage("redcupreact.png"));
redcupreact.position.x = 500;
redcupreact.position.y = 600;
redcupreact.anchor.x = 0.5;
redcupreact.anchor.y = 0.5;
redcupreact.scale.x = 0.5;
redcupreact.scale.y = 0.5;

var glassreact = new PIXI.Sprite(PIXI.Texture.fromImage("glassreact.png"));
glassreact.position.x = 500;
glassreact.position.y = 600;
glassreact.anchor.x = 0.5;
glassreact.anchor.y = 0.5;
glassreact.scale.x = 0.5;
glassreact.scale.y = 0.5;

var dialogueopen = false;
function dialogue() {
    dialogue_box = new PIXI.Sprite(PIXI.Texture.fromImage("sophisticatdio.png"));
    dialogue_box.position.x = 500;
    dialogue_box.position.y = 600;
    dialogue_box.anchor.x = 0.5;
    dialogue_box.anchor.y = 0.5;
    dialogue_box.scale.x = 0.5;
    dialogue_box.scale.y = 0.5;
    stage.addChild(dialogue_box);

    stage.addChild(redcupreact);
    stage.addChild(glassreact);
    createjs.Tween.get(dialogue_box.position).to({x: 200, y: 200},1000);
    dialogueopen = true;
   
    
    if (!has_glass && !has_redcup) {
        dialogue_box.addChild(cancel);
    }
    if(!has_glass && has_redcup){
        dialogue_box.addChild(giveredcup);
    }
    if(has_glass && !has_redcup){
        dialogue_box.addChild(giveglass);
    }
    if(has_redcup && has_glass){
        dialogue_box.addChild(giveredcup);
        dialogue_box.addChild(giveglass);
        
    }
    

}
//selection functions for dialogue
function menuSelectCancel() {
    createjs.Tween.get(dialogue_box.position).to({x: 500, y: 600},1000);
    dialogueopen = false;
}
function menuSelectRedCup(){
    createjs.Tween.get(dialogue_box.position).to({x: 500, y: 600},1000);
    createjs.Tween.get(redcupreact.position).to({x: 200, y: 200},1000);
    setTimeout(removediacup,5000);
     dialogueopen = false;
}
function menuSelectGlass(){
    createjs.Tween.get(dialogue_box.position).to({x: 500, y: 600},1000);
    createjs.Tween.get(glassreact.position).to({x: 200, y: 200},1000);
    setTimeout(removediaglass,5000);
     dialogueopen = false;
    
}
function sophisticatmove(){
    //createjs.Tween.get(sophisticat.position).to({x: 180, y: 220},1000, createjs.Ease.bounceOut);
    createjs.Tween.get(sophisticat.position).to({x: 180, y: 260},1000, createjs.Ease.bounceOut);
}
function removediaglass(){
    glassreact.visible = false;
    sophisticatmove();
}
function removediacup(){
    createjs.Tween.get(redcupreact.position).to({x: 500, y: 600},1000);
}
function collision(x, y) {
    if(x == 380){
        if(y == 60){
            endgame();
            return false;
        }
    }
    if (y == glass.position.y){
        if (x == glass.position.x){
            has_glass = true;
            glass.alpha = 0;
            return false;
        }
    }
    if (y == redcup.position.y){
        if (x == redcup.position.x){
           
            has_redcup = true;
            redcup.alpha = 0;
            //play sound
            return false;
            
        }
    }
    if (y == sophisticat.position.y) {
        
        if (x == sophisticat.position.y) {
            if(!dialogueopen){
                  console.log(dialogueopen);
                  dialogue();
            }
          
            return true;
        }

    }
    if(y == 340){
            if(x >= 60 && x <= 340){
                return false;
            }

        }
        if(y == 300 ){
            if(x == 260){
                return false;
            }
        }
        if (y == 260){
            if(x == 100 || x == 180 || x == 260 || x == 300 || x == 340){
                return false;
            }
        }
        if (y == 220){
            if(x >= 60 && x <= 260){
                return false;
            }
        }
        if (y == 180){
            if(x == 60|| x == 300 || x == 340 || x == 380){
                return false;
            }
        }
        if (y == 140){
            if(x == 60 || x == 100 || x == 140 || x == 300 || x == 380){
                return false;
            }
        }
        if (y == 100){
            if (x == 140 || x == 180 || x == 220 || x == 260 || x == 300 || x == 380 ){
                return false;
            }
        }
        if(y == 60){
            if(x == 60 || x == 100 || x == 140 || x == 300 || x == 380){
                return false;
            }
        }

        
        return true;
    
}
var creditssc = new PIXI.Sprite(PIXI.Texture.fromImage("credits.png"));
creditssc.anchor.x = 0.5;
creditssc.anchor.y = 0.5;
creditssc.position.x = 200;
creditssc.position.y = 200;
creditssc.scale.x = 0.7;
creditssc.scale.y = 0.7;
var end;
function endgame(){
    theme.paused = true;
    end = new PIXI.Sprite(PIXI.Texture.fromImage("endscreen.png"));
    stage.addChild(end);
    setTimeout(credits,10000);
    
    
}
var ending = false;
function credits(){
    console.trace();
    creditssc.visible = true;
    end.visible = false;
    stage.addChild(creditssc);
    ending  = true;
    
    
}
function animate(){
    requestAnimationFrame(animate);
    renderer.render(stage);
}

animate();