import Thor from 'Thor'
import _ from 'lodash'
import Config from 'Config'


cc.Class({
    extends: Thor,

    properties: {
        mapNumber: 2,
        mapWidth: 750,
        mapHeight: 2668,
        obstacle_02: cc.Prefab
    },

    onLoad: function () {
        this.Background = cc.find('Canvas/_gamePlaying/_gameBackground')
        this.Hero = cc.find('Canvas/_gamePlaying/initMark/_Hero')

        // 障碍物 对象池
        this.obstaclePool = new cc.NodePool('obstacle')
        this.obstacleCount = 20
    },
    start: function () {
        // this.createPool()
    },

    // 创建障碍物
    createObstacle: function () {
        let obstacle = null

        if (this.obstaclePool.size() > 0) {
            obstacle = this.obstaclePool.get()
            let lastNode = _.last(this.node.obstacleList.children)
            let lastPos
            if (lastNode) {
                lastPos = lastNode.$Widget.top + lastNode.height + 10
            } else {
                // 初始化位置
                lastPos = -800
            }

            this.node.obstacleList.addChild(obstacle)

            obstacle.$Widget.top = lastPos
        } else {
            // 预生成对象池
            if (this.node.obstacleList.children.length < this.obstacleCount) {
                this.obstaclePool.put(cc.instantiate(this.obstacle_02))
            }
        }
    },

    // 注销障碍物
    killedObstacle: function (obstacle) {
        this.obstaclePool.put(obstacle)
        this.obstaclePool.clear()
    },


    // 生成水雷
    // 生成金币

    update (dt) {

        if (Config.GAME_STATUS == 'loading') {
            // this.createObstacle()
        }

        if (Config.GAME_STATUS == 'playing') {
            this.node.y = this.node.y + (dt * 100 / 3)

            if (this.Hero.y <= 800) {
                this.node.y = this.node.y + (dt * 100 / 2.8)
            }

            this.createObstacle()
        }
    },

});
