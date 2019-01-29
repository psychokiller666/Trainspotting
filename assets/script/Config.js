
module.exports = {
    GAME_STATUS: 'loading',
    SCORE: 0,
    OBSTACLE_ITEM: {
        1: {
            id: 1,
            size: {
                width: 190,
                height: 120
            }
        },
        2: {
            id: 2,
            size: {
                width: 180,
                height: 340
            }
        },
        3: {
            id: 3,
            size: {
                width: 120,
                height: 200
            }
        },
        4: {
            id: 4,
            size: {
                width: 240,
                height: 260
            }
        },
        5: {
            id: 5,
            size: {
                width: 150,
                height: 120
            }
        },
    },
    // 金币
    // id：id
    // quantity：数量
    // position：位置
    GOOD_ITEM: {
        1: {
            id: 1,
            quantity: 2,
            position: 'left'
        },
        2: {
            id: 2,
            quantity: 3,
            position: 'right'
        },
        3: {
            id: 2,
            quantity: 3,
            position: 'center'
        }
    }
}
