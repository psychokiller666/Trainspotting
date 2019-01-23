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
        this.gooditem = null
        this.init()
    },
    
    start: function () {
        // 生成金币
        for (let i = 1; GOOD_ITEM[1].quantity >= i; i++) {
            this.gooditem = cc.instantiate(this.goodItem)
            

            switch (GOOD_ITEM[1].position){
                case 'left':
                    this.gooditem.setPosition(- (375 - Config.OBSTACLE_ITEM[this.id].size.width) + ( this.gooditem.width / 2), 20)
                    // good.x = 
                    // good.y = - 
                    // console.log(Config.OBSTACLE_ITEM[this.id].size.width)
                    // good.getComponent(cc.Widget).isAlignRight = false
                    // good.getComponent(cc.Widget).Target = this.node
                    // good.getComponent(cc.Widget).left = Config.OBSTACLE_ITEM[this.id].size.width
                    // good.getComponent(cc.Widget).isAlignLeft = true

                    // good.getComponent(cc.Widget).top = 0
                    // good.getComponent(cc.Widget).isAlignTop = true

                    // good.getComponent(cc.Widget).updateAlignment()
                break;
                case 'right':
                    
                break;
                case 'center':
                    
                break;
            }

            this.node.addChild(this.gooditem)

            // console.log(good.y)
        }
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
