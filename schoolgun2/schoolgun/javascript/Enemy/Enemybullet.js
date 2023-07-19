var Enemybullet = Class.create(Sprite, {
    initialize: function (x, y, angle, speed, type, is_to_player,power) {
        Sprite.call(this, 8, 8);
        this.type = type;
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.is_to_player = is_to_player;
        this.power = power;

        if (this.type == "straight") {
            if (this.is_to_player == 0) {
                this.image = game.assets["image/enemy/tama1.png"];
            } else {
                this.image = game.assets["image/enemy/marutama.png"];
            }
            
            this.scaleX = 2;
            this.scaleY = 2;
        }

    },
    onenterframe: function () {
        if (this.type == "straight") {
            this.x += Math.cos(this.angle * (Math.PI / 180)) * this.speed;
            this.y += Math.sin(this.angle * (Math.PI / 180)) * this.speed;
            this.frame = (this.frame + 1) % 3;
        }
        if (this.x <= 400 || this.x >= 700 || this.y <= -30 || this.y >= 990) {
            scene.removeChild(this);
        }
    }
});