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
        position: 'left'
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
        this.init()
    },
    
    init: function () {
        this.node.height = Config.OBSTACLE_ITEM[this.id].size.height

        this.node.obstacle_left.$Widget.left = 0
        this.node.obstacle_right.$Widget.right = 0

        this.node.obstacle_left.$ObstacleItem.id = this.id
        this.node.obstacle_right.$ObstacleItem.id = this.id

        // 生成金币
        for (let i = 1; GOOD_ITEM[1].quantity >= i; i++) {
            let good = cc.instantiate(this.goodItem)
            this.node.addChild(good)

            switch (GOOD_ITEM[2].position){
                case 'left':
                    good.getComponent(cc.Widget).isAlignRight = false
                    good.getComponent(cc.Widget).left = Config.OBSTACLE_ITEM[this.id].size.width
                    good.getComponent(cc.Widget).isAlignLeft = true

                    good.getComponent(cc.Widget).top = i * good.height + 20
                    good.getComponent(cc.Widget).isAlignTop = true

                    // good.getComponent(cc.Widget).updateAlignment()
                break;
                case 'right':
                    
                break;
                case 'center':
                    
                break;
            }
            // console.log(good.getComponent(cc.Widget))
            console.log(good.getComponent(cc.Widget).top)
        }

    }
});
