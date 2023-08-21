var explanation;
var Player = Class.create(Sprite,{
    initialize: function(){
        Sprite.call(this,32,32);
        this.image = game.assets["image/player/kitai1.png"];
        this.x = 550;
        this.y = 450;
        this.hp = 150;
        this.weapon_cooltime = 0;
    },
    onenterframe: function(){
        //プレイヤーの画像の動き
        if (game.frame % 10 == 0) {
            if (this.frame == 2) {
                this.frame = 0;
            } else if(this.frame==1) {
                this.frame = 1;
            }else{
                this.frame=2;
            }
        }

        //プレイヤーの弾
        if(game.input.a){
            if (this.weapon_cooltime <= 0) {
                var weapon = new Weapon(this.x + 6 + Math.random() * 8, this.y - 30+ Math.random()*8, 270, "star", 3);
                scene.addChild(weapon);
                this.weapon_cooltime = 5;
        }
    }
        if (this.weapon_cooltime > 0) {
            this.weapon_cooltime -= 1;
        }

        //プレイヤーの動き
        if(game.input.left){
            this.x -= 4;
        }
        if (game.input.right){
            this.x +=4 
        }
        if(game.input.up){
            this.y -=4;
        }
        if(game.input.down){
            this.y +=4;
        }

        if(this.x<400){
            this.x = 400;
        }
        if(this.x >690){
            this.x = 690;
        }
        if(this.y<0){
            this.y = 0;
        }
        if(this.y>460){
            this.y = 460;
        }
    },
    //ダメージ
    dame: function(bullet_dame){
        this.hp -= bullet_dame;
        if(this.hp<=0){
            explanation = new Explosion(this.x,this.y)
            scene.addChild(explanation);
            scene.removeChild(this);
            gameover1 = 1;
            scene.addChild(gameover);
            setTimeout(function(){
            revivePlayer();
            },5000)
        }
    }
}) 