import Thor from 'Thor'
// import { gameStart } from 'UiCamera'

cc.Class({
    extends: Thor,

    properties: {
        Camera: cc.Camera
    },

    onLoad: function () {

    },

    start: function () {
        // 监听加载动画
        this.onAnimationlisten()
    },

    loadRes: function () {
        if (this.node.step_02.active) {
            if (this._progressbar.$ProgressBar.progress <= 1) {
                for(let i = this._progressbar.$ProgressBar.progress; i <= 1; i = i + 0.001) {
                    this._progressbar.$ProgressBar.progress = i
                }
                this._actor_loading.$Animation.play('actor_loadingEnd')
            } else {
                console.log('ffd????')
            }
        }
    },

    // 微信登陆
    wxLogin: function () {
        return new Promise((resolve, reject) => {
            console.log('--------：微信授权')
            this.loadRes()
            resolve()
        })
    },

    // 开始游戏
    _onStartBtnTouchStart: function () {
        this.wxLogin().then(() => {
            this.node.step_01.active = false
            this.node.step_02.active = true
        }).then(() => {
            this.loadRes()
        })
    },
    
    // 监听加载动画
    onAnimationlisten: function () {
        this._actor_loading.$Animation.on('finished', () => {
            this.node.step_02.active = false
            this.node.step_03.active = true
            this.Camera.node.$UiCamera.gameStart()

        })

        this._actor_start.$Animation.on('finished', () => {
            // 游戏开始
        })
    }
});
