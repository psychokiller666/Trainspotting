import Thor from 'Thor'
import Config from 'Config'
import _ from 'lodash'


const GOOD_ITEM = {
    1: {
        id: 1,
        quantity: 2,
        position: 'left'
    },
    2: {
        id: 2,
        quantity: 3,
        position: 'right'
    }
}

cc.Class({
    extends: Thor,

    properties: {
        goodItem: cc.Prefab,
        intervalDistance: 10
    },

    onLoad: function () {
        this.id = _.random(1, 5)
        this.goodId = _.random(1,2)
        this.goodPool = new cc.NodePool('good')
        this.minePool = new cc.NodePool('mine')

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
        for (let i = 1; GOOD_ITEM[this.goodId].quantity >= i; i++) {
            // this.goodPool.put(cc.instantiate(this.goodItem))
            // good = this.goodPool.get()
            good = cc.instantiate(this.goodItem)
            // 位置
            switch (GOOD_ITEM[this.goodId].position) {
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
                    this.node.goodList.addChild(good)

                break;
            }
        }
    },

    // 水雷
    createMine: function () {

    },

    init: function () {
        this.node.height = Config.OBSTACLE_ITEM[this.id].size.height

        this.node.obstacle_left.$Widget.left = 0
        this.node.obstacle_right.$Widget.right = 0

        this.node.obstacle_left.$ObstacleItem.id = this.id
        this.node.obstacle_right.$ObstacleItem.id = this.id
        // this.createGood()
    }
});
