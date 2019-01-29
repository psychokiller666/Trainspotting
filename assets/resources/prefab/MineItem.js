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

    boom () {
        console.log(this)
        this.destroy()
    },

    start () {

    },

});
