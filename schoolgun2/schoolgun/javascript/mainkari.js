enchant();

//グローバル関数
var game;
var player;
var music2;
var BossEnemy;
var enemy;
var enemy2;
var enemy3;
var scene;
var resultscene;
var bg;
var score;
var score2;
var boss;
var bosscool;
var scorecolmn;
var revaival;
var start;
var gameover;
var gameover1;
var label_score;
var board;
var hpvar;
var maxHP;
var currentHP;
var operation;
var result1;
var rr2;
var stage;
var test;
var explosion;
var aud


window.onload = function(){
    game = new Game(1000,500);
    doPreload();
    game.fps = 40;
    game.keybind(90,"a");//z
    game.keybind(88,"b");//x
    game.keybind(16, "shift");
    
    game.onload = function(){
        //シーン１の動き..... 試しなだけであとでシーンごとに変える予定
        scene = new Scene();
        game.pushScene(scene);
        scene.backgroundColor = 'black';
        bg = new Backg("image/others/space2.jpg");
        player = new Player();
        start = new Start();
        gameover = new Gameover();
        gameover1 = 0;
        scene.addChild(bg);
        scene.addChild(start);
        hpvar = new HPBar();
        explanation();
        setUI();
        var music = new Audio('image/sub.mp3');
        var music2 = new Audio("image/jiyunoparadox.mp3")
        start.addEventListener(Event.TOUCH_START,function(){
            scene.removeChild(start);
            scene.addChild(player);
            score2 = 0;
            score = Scene(score2)
            scene.addChild(score);
            scene.addChild(hpvar);
            boss = 0
            bosscool = 0;
            //1フレームごとに動かす
            scene.onenterframe = function(){
                scene.insertBefore(board, null);
                label_score._score = score2;
                localStorage.setItem('kas',score2);//スコアを記録
                if(gameover1!=0){
                    music2.pause();
                }
                if(gameover1==0){
                    music2.play();
                    music2.loop = true
                    if(game.input.a||game.input.b){
                        music.play();
                    }


                if (game.frame % 60 == 0) {
                
                        enemy = new Enemy({x:380,y:50,speed:3,enemy_type:1,move_type:Math.floor(Math.random() * 3)});
                        scene.addChild(enemy);
                        if(score2 >= 3000&&boss==0&&bosscool==0){
                        enemy2 = new BossEnemy2({x:380,y:50,speed:3,enemy_type:1,move_type:0,hitpoint:300});
                        scene.addChild(enemy2);
                        boss+=10
                        bosscool=1;
                        }
                    
                        if(score2 >= 10000&&boss>=30&&bosscool==2){
                            enemy2 = new BossEnemy2({x:380,y:50,speed:3,enemy_type:1,move_type:0,hitpoint:600});
                            scene.addChild(enemy2);
                            bosscool = 1;
                            }
                }
                if(game.frame % 500 ==0){
                    enemy3 = new BossEnemy({
                        x:400+Math.random()*200,y: 50 + Math.random() * 10 , speed: 6 +Math.floor(Math.random()*8),enemy_type:0,move_type:0
                    })
                    scene.addChild(enemy3)
                   } 
                
            }
                checkIntersect();
                /*player.addEventListener(Event.TOUCH_START,function(){
                    game.pushScene(stage2);
                    stage2.addChild(player);
                })*/
            }
        });

        //ステージ2
        stage2 = new Scene();
        var bg2 = new Backg("image/others/brackhole.jpg");
        stage2.addChild(bg2);
        stage2.addChild(player);
        
        //リザルト画面
        resultscene = new Scene();
        result1 = new Resultbg();
        resultscene.addChild(result1);
        Resultset2();
        //コンティニュー用（試し）
        resultscene.addEventListener("enterframe",function(){
            if(game.input.shift){
                gameover1 = 0;
                game.removeScene(resultscene);
                game.pushScene(scene);
            };
        });
    };
    game.start();
};
//画像ロード
function doPreload(){
    game.preload(
        "image/score_bg.jpg",
        "image/enemy/BigEnemyO.png",
        "image/enemy/BigEnemy2.png",
        "image/enemy/BigEnemy3.png",
        "image/enemy/smallenemy.png",
        "image/enemy/bullet10.png",
        "image/enemy/tama1.png",
        "image/enemy/marutama.png",
        "image/enemy/BigEnemy4.png",
        "image/others/BB.jpg",
        "image/others/settei1.png",
        "image/others/space2.jpg",
        "image/others/brackhole.jpg",
        "image/others/titlelogo.png",
        "image/others/titlelogo1.png",
        "image/others/GameOver1.png",
        "image/player/bullet1.png",
        "image/player/kadai.png",
        "image/player/kitai1.png",
        "image/player/bullet.png",
        "image/player/ex.png",
    );
};
//スコア（用済み）
function Score(text){
    var label = new Label(text);
    label.font = "30px monospace";
    label.color ="red";
    label.x = 350;
    label.y = 20;
    return label;
}
//背景設定
var Backg = Class.create(Sprite,{
    initialize: function(a){
        Sprite.call(this,320,500);
        this.x = 400;
        this.image = game.assets[a];
    },

    
})

//スタートボタンとゲームオーバー画面
var Start = Class.create(Sprite,{
    initialize: function(){
        Sprite.call(this,200,140)
            this.x = 450;
            this.y = 100;
            this.image = game.assets["image/others/titlelogo1.png"]
    },
    onenterframe: function(){
        if (game.frame % 10 == 0) {
            if (this.frame == 3) {
                this.frame = 0;
            } else if(this.frame==2) {
                this.frame = 1;
            }else if(this.frame==1){
                this.frame=2;
            } else{
                this.frame=3;
            }
        }
    }
})

var Gameover = Class.create(Sprite,{
    initialize: function(){
        Sprite.call(this,200,140)
            this.x = 450;
            this.y = 100;
            this.image = game.assets["image/others/GameOver1.png"]
    },
    onenterframe: function(){
        if (game.frame % 10 == 0) {
            if(this.frame==1){
                this.frame=0;
            } else{
                this.frame=1;
            }
        }
    }
})

//当たり判定
function checkIntersect(){
    Player.intersect(Enemybullet).forEach(function(pair){
        pair[0].dame(pair[1].power);
        scene.removeChild(pair[1]);
        uphp();
        //setTimeout(function(){
            //revivePlayer();
        //},5000)
    })
    Enemy.intersect(Weapon).forEach(function (pair) {
        //pair[0]がenemy
        //pair[1]がweapon
        pair[0].damage(pair[1].power);
        scene.removeChild(pair[1]);
        scorecolmn = 1;
    });

    BossEnemy2.intersect(Weapon).forEach(function (pair) {
        //pair[0]がenemy
        //pair[1]がweapon
        pair[0].damage(pair[1].power);
        scene.removeChild(pair[1]);
        scorecolmn = 1;
    });

    BossEnemy.intersect(Weapon).forEach(function(pair){
        pair[0].damage(pair[1].power);
        scene.removeChild(pair[1]);
        scorecolmn = 1 ;
    })
}

function calculateAngle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
}

//復活用
function revivePlayer() {
    var aaaa= henkan();
    resultscene.addChild(aaaa)
    
    
    /*
    player = new Player();
    scene.addChild(player);
    hpvar = new HPBar();
    scene.addChild(hpvar);
    */game.removeScene(scene);
    game.pushScene(resultscene);
}

//ui設定
function setUI() {
    board = new VirtualMap(1, 20);
    board.width = 320;
    board.height = 500;
    board.x = 1;
    board.y = 0;

    var boardbg = new Sprite(300, 500);
    boardbg.image = game.assets["image/score_bg.jpg"];
    board.addChild(boardbg);

    setScore();

    scene.addChild(board);
}

function setScore() {
    var label = new Label("SCORE");
    label.font = "bold 32px Courier New";
    label.color = "red";
    board.addChild(label);
    label.mx = 10;
    label.my = 250;

    label_score = new ScoreLabel();
    label_score._score = score2;
    label_score.label = "";
    label_score.scaleX = 1.4;
    label_score.scaleY = 1.4;
    board.addChild(label_score);
    label_score.mx = 40;
    label_score.my = 300;
}

//HPバーの設定
var HPBar = Class.create(Sprite, {

  initialize: function() {

    Sprite.call(this, 20, 400);

    maxHP = player.hp; // 最大hpの表示

    currentHP = player.hp; // 現在のhpを表示

    this.backgroundColor = 'green'; // hpの色

    this.x = 350; //hpの配置

    this.y = 60; //hpの配置

    var labelhp = new Label("HP");
    labelhp.font = ("16px bold")
    labelhp.color = "red"
    labelhp.x = 350;
    labelhp.y = 10;
    scene.addChild(labelhp);
},
})

function uphp(){
    currentHP = player.hp;
    var ratio = currentHP / maxHP; //現在のHPの割合

    var barHeight = Math.round( hpvar.height * ratio); //HPバーの高さ

    hpvar.height = barHeight; //HPバーの高さを更新

    hpvar.y = 310 + (maxHP - barHeight); //上から減らすように位置調整
}

function explanation(){
    operation = new VirtualMap(1, 20);
    operation.width = 270;
    operation.height = 500;
    operation.x = 730;
    operation.y = 0;
    var sousa = new Sprite(270,500);
    sousa.image = game.assets["image/score_bg.jpg"]
    
    operation.addChild(sousa);
    setOperation();
    scene.addChild(operation);
}

function setOperation(){
    var label1 = new Label("操作説明")
    label1.font = "bold 32px Courier New";
    label1.color = "black";
    operation.addChild(label1);
    label1.mx = 10;
    label1.my = 20;
    var label2 = new Label("←→↑↓:移動")
    label2.font = "16px Courier New";
    operation.addChild(label2);
    label2.mx = 10;
    label2.my = 60;
    var label2 = new Label("Zキー:1ショット")
    label2.font = "16px Courier New";
    operation.addChild(label2);
    label2.mx = 8;
    label2.my = 80;
    var label4 = new Label("Xキー:2ショット")
    label4.font = "16px Courier New";
    operation.addChild(label4);
    label4.mx = 8;
    label4.my = 100;
    var label3 = new Label("敵を倒して高スコアを目指そう！")
    label3.font = "16px Courier New";
    operation.addChild(label3);
    label3.mx = 8;
    label3.my = 140;
}

//リザルト画面設定
var Resultbg = Class.create(Sprite,{
    initialize: function(){
        Sprite.call(this,320,500);
        this.x= 400;
        this.image = game.assets["image/score_bg.jpg"]
    }
})

function Resultset(a){
    var label = new Label(a);
    label.font = "40px monospace";
    label.color ="red";
    label.x = 530;
    label.y = 200;
    return label;
}

function henkan(){
    var rrr = String(score2);
    rr2 = Resultset(rrr)
    return rr2
}

function Resultset2(){
    var label = new Label("リザルト");
    label.font = "60px monospace";
    label.color ="black";
    label.x = 440;
    label.y = 20;
    var label2 = new Label("スコア");
    label2.font = "45px monospace";
    label2.color ="black";
    label2.x = 490;
    label2.y = 100;
    resultscene.addChild(label);
    resultscene.addChild(label2);
}

/*var Explosion = Class.create(Sprite,{
    initialize: function(X,Y){
        Sprite.call(this,32,32);
        this.image = game.assets["image/player/爆発.png"]
        this.x = X;
        this.y = Y;
    },
    onenterframe: function(){
        if (game.frame % 10 == 0) {
            if (this.frame == 4) {
                this.frame = 0;
            } else if(this.frame==3) {
                this.frame = 1;
            }else if(this.frame==2){
                this.frame=2;
            }else if(this.frame==1){
                this.frame=3
            }else{
                this.frame=4
            }
        }
    }
})*/