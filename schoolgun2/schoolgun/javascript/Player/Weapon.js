var Weapon = Class.create(Sprite, {
    initialize: function (x, y, angle, type, power) {
        Sprite.call(this, 16, 16);
        this.type = type;
        this.power = power;

        this.image = game.assets["image/player/bullet.png"];
        this.x = x;
        this.y = y;
        this.angle = angle;
        

    },
    onenterframe: function () {
        if (this.type == "star") {
            this.x += Math.cos(this.angle * (Math.PI / 180)) * 20;
            this.y += Math.sin(this.angle * (Math.PI / 180)) * 20;
            this.frame = (this.frame + 1) % 3;
        }
        if (this.x <= 390 || this.x >= 700 || this.y <= -30 || this.y >= 990) {
            scene.removeChild(this);
        }
    }
});