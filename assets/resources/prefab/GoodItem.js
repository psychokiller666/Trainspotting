import Thor from 'Thor'

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
