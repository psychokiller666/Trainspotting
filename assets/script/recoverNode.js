import Thor from 'Thor'

cc.Class({
    extends: Thor,

    properties: {

    },

    onLoad: function() {
        this.Map = cc.find('Canvas/_gamePlaying/_gameMap')
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.node.parent.name == 'obstacle') {
            this.Map.$Map.killedObstacle(otherCollider.node.parent)
        }
        
    }

    // update (dt) {},
});
