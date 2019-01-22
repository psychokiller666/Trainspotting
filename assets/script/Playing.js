import Thor from 'Thor'
import Config from 'Config'


cc.Class({
    extends: Thor,

    properties: {
        scoreLabel: {
            type: cc.Label,
            default: null,
            // get () {
            //     return '得分' + this.scoreLabel.string
            // },
            notify () {
                // console.log()
                this.scoreLabel.string = Config.SCORE
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        //启用物理世界
    },

    start: function () {
        console.log(this.scoreLabel)
        // 碰撞金币
        this.node.on('goodCollision', (other) => {
            other.node.$GoodItem.destroyGood().then(() => {
                Config.SCORE = Config.SCORE + 1
                this.scoreLabel.string = Config.SCORE
                console.log(Config.SCORE)

            })
        })
    },

    // 点击屏幕
    _onTouchStart: function () {
        this._Hero.$Hero.downAction()
    },

    init: function() {
        // this._Hero.node.pauseAllActions()
        this._Hero.$Hero.init()
        // console.log(this._Hero.$Hero)
        // 游戏初始化
        
        // 生成地图
    },


    end: function () {

    },
    
 
    update: function (dt) {
        // console.log(this._Background.position)
    }
});
