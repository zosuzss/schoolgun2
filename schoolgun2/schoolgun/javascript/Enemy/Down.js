var Down = Class.create(Sprite, {
    initialize: function (x, y) {
        Sprite.call(this, 1, 1);

        this.x = x;
        this.y = y;
    },
    onenterframe: function () {
        
        scene.removeChild(this);
    },

});