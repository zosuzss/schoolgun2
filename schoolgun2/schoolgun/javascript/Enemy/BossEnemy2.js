/**
 * 初期化用
 * @param   param["x"]
 * @param   param["y"]
 * @param   param["speed"]
 * @param   param["enemy_type"]
 * @param   param["move_type"]
 * @param   param["hitpoint"]
 */

var BossEnemy2  = Class.create(Sprite,{
    initialize: function(param){
        //paramをメンバ変数へ変換(座標以外(Sprite宣言前に座標設定ができないため))
        this.createEntity(param);

        //thisからSprite関数を使えるようにする宣言とSpriteのwidth,height、及び座標設定
        this.setSpriteScaleFromEnemyType(param);

        this.setPositionFromMoveTypeIsLeft(param);

        //enemy_type から 画像 と HPを設定
        this.setStatusFromEnemyType();

        //追加設定
        this.initial_frame = game.frame;

        this.movetype = 0;
        this.attackfome = 0;

        this.is_destroy = 0;
        
        this.test = calculateAngle(this.x + this.width / 2, this.y + this.height / 2, player.x + (player.width / 2), player.y + (player.height / 2));
    },
    onenterframe: function(){
        this.move(this.movetype);
        this.attack();
        if(this.x<=390||this.x>=691||this.y>=460||this.y<=-20){
            scene.removeChild(this);
        }
    },
    //タイプ事に入れ替え
    setStatusFromEnemyType: function () {
        if (this.enemy_type == 1) {
            this.image = game.assets["image/enemy/BigEnemy2.png"];
            
        }
    },
    setSpriteScaleFromEnemyType: function (param) {
        if (this.enemy_type == 1) {
            Sprite.call(this, 64, 64);
            this.attack_cooltime = 0;
        }
        this.x = param["x"];
        this.y = param["y"];
    },
    //タイプごとに配置場所変更
    setPositionFromMoveTypeIsLeft: function(){
        if(this.move_type==0){
            this.x = 397;
            this.y = -10;
        }
    },
    //初期化用
    createEntity: function (param){
        this.speed = param["speed"];
        this.enemy_type = param["enemy_type"]; 
        this.move_type = param["move_type"];
        this.hp = param["hitpoint"]
        this.angle =  85;
    },
    //エネミーの動きの種類
    move: function(a){
        if(this.movetype==0){
            this.x += Math.cos(this.angle * (Math.PI / 180)) * 3;
            this.y += Math.sin(this.angle * (Math.PI / 180)) * 3;
            this.angle -=1.31;
            if(this.y<-11){
                this.movetype = 1;
            }
        }else if(this.movetype==1){
            this.x -= Math.cos(this.angle * (Math.PI / 180)) * this.speed;
            this.y -= Math.sin(this.angle * (Math.PI / 180)) * this.speed;
            this.angle +=1.31;
            if(this.y<-11){
                this.movetype = 0;
            }
        }else if(this.movetype==2){
            var ang = this.test;
            var i = 0;
            this.x += Math.cos(ang * (Math.PI / 180)) * this.speed;
            this.y += Math.sin(ang * (Math.PI / 180)) * this.speed;
            this.tl.rotateTo(ang-90, 0);
        };
    },
    //エネミーのダメージ計算
    damage: function(weapon_damage){
        this.hp -= weapon_damage;
        if(this.hp<=0){
        scene.removeChild(this);
        score2 += 5000;
        boss += 20;
        bosscool  = 2;
        }
    },
    //攻撃の種類
    attack: function(){
        if(this.attack_cooltime <= 0){
            var to_player = calculateAngle(this.x + this.width / 2, this.y + this.height / 2, player.x + (player.width / 2), player.y + (player.height / 2));
            if(this.attackfome == 0){
                this.attack2way(to_player,30,1);
                this.attackfome = 1;
            }else if(this.attackfome==1){
                this.attackCircle(16);
                this.attackfome = 2;
            }else if(this.attackfome==2){
                this.attack1(to_player,0);
                this.attackfome = 3;
            }else if(this.attackfome==3){
                this.attackCircle(16);
                this.attackfome = 0;
            }
            this.attack_cooltime = 40;
        }
        this.attack_cooltime -=1;
    },
    /**
     * 【攻撃】等間隔に1wayの弾を打つ
     * @param {any} to_angle //角度
     * @param {any} space   //弾同士の間隔
     * @param {any} is_to_player    //プレイヤー狙いかどうか
     */
    attack1: function(to_angle,is_to_player){
        var bullet = new Enemybullet(this.x+10, this.y+3 + (this.height / 2) - 8, to_angle, 5, "straight", is_to_player,15);
        scene.addChild(bullet);
    },
    /**
     * 【攻撃】等間隔に2wayの弾を打つ
     * @param {any} to_angle //角度
     * @param {any} space   //弾同士の間隔
     * @param {any} is_to_player    //プレイヤー狙いかどうか
     */
    attack2way: function (to_angle, space, is_to_player) {
        var bullet1 = new Enemybullet(this.x + (this.width / 2) - 4, this.y + (this.height / 2) - 8, to_angle + (space / 2), 10, "straight", is_to_player,15);
        scene.addChild(bullet1);
        var bullet2 = new Enemybullet(this.x + (this.width / 2) - 4, this.y + (this.height / 2) - 8, to_angle - (space / 2), 10, "straight", is_to_player,15);
        scene.addChild(bullet2);
    },
    /**
     * 円形の弾
     * @param {any} to_angle 
     * @param {any} space   
     * @param {any} is_to_player    
     */
    attackCircle: function (num_bullet) {
        for (var i = 0; i < num_bullet; i++) {
            var bullet = new Enemybullet(this.x + (this.width / 2), this.y + (this.height / 2), (360 / num_bullet) * i + this.angle, 10, "straight", 0,5);
            scene.addChild(bullet);
        }
    },
});