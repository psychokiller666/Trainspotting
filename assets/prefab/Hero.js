import Thor from 'Thor'
import Config from 'Config'
import _ from 'lodash'

cc.Class({
    extends: Thor,

    properties: {
        status: 1,
        moveSpeed: 3,
        moveDistance: 1000,
        collisionOffset: 10,
        jumpDistance: -200
    },

    onLoad: function () {
        this.Playing = cc.find('Canvas/_gamePlaying')
        this.Map = cc.find('Canvas/_gamePlaying/_gameMap')
        // 开启物理引擎
        cc.director.getPhysicsManager().enabled = true

        cc.director.getCollisionManager().enabled = true

        // 英雄方向
        this.direction = this.node.scaleX
    },

    start: function () {
        // 关闭物理引擎
        cc.director.getPhysicsManager().enabled = false
    },

    // 初始化第一次
    // 英雄出场
    init: function () {
        // 关闭物理引擎
        this.node.runAction(cc.sequence(
            cc.moveTo(2, cc.v2(0, -165)),
            cc.callFunc(() => {
                // 移除遮罩层
                this.node.parent = this.node.parent.parent
                this.node.setPosition(cc.v2(0, 919))

                // 打开物理引擎
                cc.director.getPhysicsManager().enabled = true
                Config.GAME_STATUS = 'playing'
            })
        ))
    },

    // 复位
    reset: function () {
        
    },

    swimMove: function () {
        let tempDistance = this.moveDistance
        this.node.$RigidBody.linearVelocity = cc.v2(this.node.scaleX == -1 ? tempDistance : -tempDistance, this.moveDistance)
    },

    // 向左浮动
    swimLeft: function () {
        return new Promise((resolve, reject) => {
            this.node.scaleX = 1
            resolve()
        })
    },

    // 向右浮动
    swimRight: function () {
        return new Promise((resolve, reject) => {
            this.node.scaleX = -1
            resolve()
        })
    },

    // 向下浮动
    downAction: function () {
        return new Promise((resolve, reject) => {
            
            // 不能跳出_Map界面
            let tempjumpDistance = this.node.y <= 400 ? this.jumpDistance / 5 : this.jumpDistance
            // console.log()
            

            let action = cc.sequence(
                cc.jumpBy(this.moveSpeed, cc.v2(0, 0), tempjumpDistance, 1).easing(cc.easeCircleActionOut()),
                cc.callFunc(()=> {}, resolve())
            )
            action.setTag('Down')
            this.node.stopActionByTag('Down')
            if (Config.GAME_STATUS == 'playing') {
                this.node.runAction(action)
            }
        })
    },
    
    onCollisionEnter: function (other, self) {
        this.Playing.emit('goodCollision', other, self)
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        // console.log(otherCollider.node.name)
        switch (otherCollider.node.name)  {
            case 'top': 
                // console.log('ddd')
                if (Config.GAME_STATUS = 'playing') {
                    // 游戏结束
                    // Config.GAME_STATUS = 'gameover'
                    // console.log('game over')
                }
            break;
            case 'left':
                this.swimRight()
            break;
            case 'right':
                this.swimLeft()
            break;
            case 'obstacle_left':
                this.swimRight().then(() => {
                    otherCollider.node.$ObstacleItem.shakeAction()
                })
            break;
            case 'obstacle_right':
                this.swimLeft().then(() => {
                    otherCollider.node.$ObstacleItem.shakeAction()
                })
            break;
            default:

        }
    },

    update: function (dt) {
        if (Config.GAME_STATUS == 'playing') {
            this.swimMove()

            if (this.node.y <= 400) {
                this.Map.y = this.Map.y + (dt * 200 / 2.8)
            }
            // console.log(this.node.y)
        }
    }
});
