var stage2  =   Class.create(Sprite,{
    initialize: function(){
        stage2 = new Scene();
        stage2.backgroundColor = "red"
        
    },
    onenterframe: function(){
        scene.addEventListener(Event.TOUCH_START,function(){
            game.pushScene(stage2);
        })
    }
})