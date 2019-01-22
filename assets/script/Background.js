import Thor from 'Thor'
import Config from 'Config'

cc.Class({
    extends: Thor,

    properties: {
        // Hero: cc.Node
    },

    onLoad: function () {
        this.Hero = cc.find('Canvas/_gamePlaying/initMark/_Hero')
    },

    backgroundMove: function (dt) {
        this.node.background_01.y = this.node.background_01.y + (dt * 100 / 5)
        this.node.background_02.y = this.node.background_02.y + (dt * 100 / 4)
        this.node.wall.right.y = this.node.wall.right.y + (dt * 100 / 1.5)
        this.node.wall.left.y = this.node.wall.left.y + (dt * 100 / 1.5)


        if (this.Hero.y <= 400) {
            this.node.background_01.y = this.node.background_01.y + (dt * 100 / 3)
            this.node.background_02.y = this.node.background_02.y + (dt * 100 / 2)
            this.node.wall.right.y = this.node.wall.right.y + (dt * 100 / 1.4)
            this.node.wall.left.y = this.node.wall.left.y + (dt * 100 / 1.4)
        }
        if (this.node.background_01.y >= 1334) {
            this.node.background_01.y = 0
        }
        if (this.node.background_02.y >= 1334) {
            this.node.background_02.y = 0
        }
        
        if (this.node.wall.right.y >= 800) {
            this.node.wall.right.y = 0
            this.node.wall.left.y = 0
        }
    },

    getWallY: function () {
        return this.node.wall.left.y
    },

    update: function (dt) {
        // 背景滚动
        if (Config.GAME_STATUS == 'playing') {
            this.backgroundMove(dt)
        }
    },
});
