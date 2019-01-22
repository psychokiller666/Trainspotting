import Thor from 'Thor'
import Config from 'Config'
import _ from 'lodash'


cc.Class({
    extends: Thor,

    properties: {
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
        
    }
});
