import Thor from 'Thor'
import Config from 'Config'
import Alert from '../resources/prefab/Alert.js'

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

        // console.log()
        // 碰撞金币
        this.node.on('GoodItem', (other) => {
            other.node.$GoodItem.destroyGood().then(() => {
                Config.SCORE = Config.SCORE + 1
                this.scoreLabel.string = Config.SCORE
            })
        })

        // 碰撞水雷
        this.node.on('MineItem', (other) => {
            // 水雷爆炸
            other.node.destroy()
            Config.GAME_STATUS = 'death'

            Alert.show('得分：' + Config.SCORE, (choose) => {
                if (choose == 'cancelButton') {
                    console.log('重制游戏')
                } else {
                    // cc.game.resume()
                    console.log('观看广告继续')
                    Config.GAME_STATUS = 'playing'
                }
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
        if (Config.GAME_STATUS == 'death') {
            
        }

        if (Config.GAME_STATUS == 'player') {

        }
        // console.log(this._Background.position)
    }
});
