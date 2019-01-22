import Thor from 'Thor'
import Config from 'Config'

cc.Class({
    extends: Thor,

    properties: {
        id: {
            type: cc.Integer,
            default: 1,
            notify () {
                let tempItem  = Config.OBSTACLE_ITEM[this.id]
                if (tempItem) {
                    this.node.$MagicSprite.index = tempItem.id

                    this.node.height = tempItem.size.height
                    this.node.width = tempItem.size.width

                    this.node.$PhysicsBoxCollider.size.height = tempItem.size.height
                    this.node.$PhysicsBoxCollider.size.width = tempItem.size.width
                }
            }
        }
    },

    onLoad: function () {
        this.Map = cc.find('Canvas/_gamePlaying/_gameMap')
    },

    shakeAction: function () {
        this.node.runAction(
            cc.sequence(
                cc.delayTime(0.3),
                cc.scaleTo(0.02, 1.05, 1.05),
                cc.scaleTo(0.02, 1, 1)
            ).easing(cc.easeExponentialOut())
        )
    },


    update: function (dt) {
        if (Config.GAME_STATUS == 'playing') {
            this.node.y = this.Map.y
        }
    },
});
