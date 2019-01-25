import Thor from 'Thor'
import Config from 'Config'


cc.Class({
    extends: Thor,

    properties: {
        scoreLabel: {
            type: cc.Label,
            default: 0,
            notify () {
                this.scoreLabel.string = Config.SCORE
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        //启用物理世界
    },

    start: function () {
        // 碰撞金币
        this.node.on('goodCollision', (other) => {
            other.node.$GoodItem.destroyGood().then(() => {
                Config.SCORE = Config.SCORE + 1
                this.scoreLabel.string = Config.SCORE
            })
        })
    },

    // 点击屏幕
    _onTouchStart: function () {
        this._Hero.$Hero.downAction()
    },

    init: function() {
        this._Hero.$Hero.init()
    },


    end: function () {
        // 游戏结束
        
    },
    
 
    update: function (dt) {
        // console.log(this._Background.position)
    }
});
