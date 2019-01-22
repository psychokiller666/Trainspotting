import Thor from 'Thor'
import Config from 'Config'

cc.Class({
    extends: Thor,

    properties: {
        Loading: cc.Node,
        Playing: cc.Node,
    },
    
    // 开始游戏
    gameStart: function () {
        this.node.runAction(cc.sequence(
            cc.moveTo(3, 0, 0),
            cc.callFunc(() => {
                this.Playing.active = true
                this.Playing.$Playing.init()
                Config.GAME_STATUS = 'init'
            })
        ))
    },

    start: function () {

    },

    // update (dt) {},
});
