import Thor from 'Thor'
import Config from 'Config'

const GOOD_ITEM = {
    1: {
        id: 1,
        // position: 
    },
    2: {
        id: 2,
    },
    3: {
        id: 3,
    },
    4: {
        id: 4,
    },
    5: {
        id: 5,
    },
}

cc.Class({
    extends: Thor,

    properties: {
        id: {
            type: cc.Integer,
            default: 0,
            notify () {
                this.node.$MagicSprite.index = this.id
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.Map = cc.find('Canvas/_gamePlaying/_gameMap')
    },

    start: function () {
    },

    destroyGood: function () {
        return new Promise((resolve, reject) => {
            this.node.destroy()
            resolve()
        })
    },

    

    update: function (dt) {
        if (Config.GAME_STATUS == 'playing') {
            this.node.y = this.Map.y
        }
    }
});
