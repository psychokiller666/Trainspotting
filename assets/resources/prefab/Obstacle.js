import Thor from 'Thor'
import Config from 'Config'
import _ from 'lodash'

const MINE_ITEM = {
    1: {
        id: 1,
        quantity: 1,
        position: 'left',
    },
    2: {
        id: 1,
        quantity: 1,
        position: 'right',
    }
}

cc.Class({
    extends: Thor,

    properties: {
        goodItem: cc.Prefab,
        mineItem: cc.Prefab,
        intervalDistance: 10
    },

    onLoad: function () {
        this.id = _.random(1, 5)
        this.goodId = _.random(1,3)
        this.mineId = _.random(1,2)

        // 初始化障碍物
        this.init()
        // 创建金币
        this.createGood()
        // 创建水雷
        this.createMine()
    },
    
    // 金币
    createGood: function () {
        let good = null
        for (let i = 1; Config.GOOD_ITEM[this.goodId].quantity >= i; i++) {
            good = cc.instantiate(this.goodItem)
            // 位置
            switch (Config.GOOD_ITEM[this.goodId].position) {
                // 左边金币
                case 'left': 
                    this.node.obstacle_left.addChild(good)
                    good.$Widget.right = - good.width
                    good.$Widget.top = i * (good.height + 20)
                    good.$Widget.isAlignTop = true
                    good.$Widget.isAlignRight = true
                break;
                // 右边金币
                case 'right':
                    this.node.obstacle_right.addChild(good)
                    good.$Widget.left = - good.width
                    good.$Widget.top = i * (good.height + 20)
                    good.$Widget.isAlignTop = true
                    good.$Widget.isAlignLeft = true
                break;
                // 中间金币
                case 'center':
                    this.node.obstacle_left.addChild(good)
                    good.$Widget.target = this.node
                    good.$Widget.isAlignHorizontalCenter = true
                    good.$Widget.isAlignTop = true
                    good.$Widget.horizontalCenter = 0
                    good.$Widget.top = i * (good.height + 20)
                break;
            }
        }
    },

    // 水雷
    createMine: function () {
        let mine = null
        for (let i = 1; MINE_ITEM[this.mineId].quantity >= i; i++) {
            mine = cc.instantiate(this.mineItem)
            switch (MINE_ITEM[this.mineId].position) {
                case 'left':
                    this.node.obstacle_left.addChild(mine)
                    mine.$Widget.right = - mine.width
                    mine.$Widget.top = i * mine.height
                    mine.$Widget.isAlignTop = true
                    mine.$Widget.isAlignRight = true
                break;

                case 'right':
                    this.node.obstacle_right.addChild(mine)
                    mine.$Widget.left = - mine.width
                    mine.$Widget.top = i * mine.height
                    mine.$Widget.isAlignTop = true
                    mine.$Widget.isAlignLeft = true
                break;
            }
        }
    },

    init: function () {
        this.node.height = Config.OBSTACLE_ITEM[this.id].size.height

        this.node.obstacle_left.$Widget.left = 0
        this.node.obstacle_right.$Widget.right = 0

        this.node.obstacle_left.$ObstacleItem.id = this.id
        this.node.obstacle_right.$ObstacleItem.id = this.id
    }
});
