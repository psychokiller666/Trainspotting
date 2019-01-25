import Thor from 'Thor'
import Config from 'Config'

const GOOD_ITEM = {
    1: {
        id: 1,
        quantity: 2,
        position: 'left'
    },
    2: {
        id: 2,
        quantity: 3,
        position: 'left'
    }
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
    
    destroyGood: function () {
        return new Promise((resolve, reject) => {
            this.node.destroy()
            resolve()
        })
    }
});
