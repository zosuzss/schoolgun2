var Explosion = Class.create(Sprite,{
    initialize: function(X,Y){
        Sprite.call(this,96,96);
        this.image = game.assets["image/player/ex.png"]
        this.x = X-28;
        this.y = Y-28;
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
})