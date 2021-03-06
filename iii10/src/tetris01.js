var Tetris01Layer = cc.Layer.extend({
    sprite: null,
    dx: 10, // remove range
    dy: 1,  // dropping  range
    counter: 0,
    tetris: [], // [0 ~ 6] replace T,N,O,I,L,..
    t: 0, // [0 ~ 6] random index of tetris[]
    td: 0, // change direction to 1> ,2^ ,3< , 0v
    Ry: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], // dead  line
    ty: [[0, 0, -20, -20, 0, 0, 20, 20, 20, 20], [-30, -10, -10, 10, 10, 30, 30, 10, -10, -30], [0, 0, 20, 20, 0, 0, -20, -20, -20, -20], [30, 10, 10, -10, -10, -30, -30, -10, 10, 30]],
    // ty[a][b] ~ a : [0~v,1~>,2~^,3~<] , ~ b : [0,1,2,3,4,5,6,7,8,9] 9 points
    oy: [[-20, -20, -20, 0, 20, 20, 20, 0, 0, 0], [-20, 0, 20, 20, 20, 0, -20, -20, 0, 0], [20, 20, 20, 0, -20, -20, -20, 0, 0, 0], [20, 0, -20, -20, -20, 0, 20, 20, 0, 0]],
    iy: [[-10, -10, -10, -10, -10, 10, 10, 10, 10, 10], [-40, -20, 0, 20, 40, 40, 20, 0, -20, -40], [10, 10, 10, 10, 10, -10, -10, -10, -10, -10], [40, 20, 0, -20, -40, -40, -20, 0, 20, 40]],
    ly: [[-30, -30, -30, -10, -10, 10, 30, 30, 10, -10], [-20, 0, 20, 20, 0, 0, 0, -20, -20, -20], [30, 30, 30, 10, 10, -10, -30, -30, -10, 10], [20, 0, -20, -20, 0, 0, 0, 20, 20, 20]],
    jy: [[-30, -30, -30, -10, 10, 30, 30, 10, -10, -10], [-20, 0, 20, 20, 20, 20, 0, 0, 0, -20], [30, 30, 30, 10, -10, -30, -30, -10, 10, 10], [20, 0, -20, -20, -20, -20, 0, 0, 0, 20]],
    ny: [[-30, -30, -10, 10, 10, 30, 30, 10, -10, -10], [0, 20, 20, 20, 0, 0, -20, -20, -20, 0], [30, 30, 10, -10, -10, -30, -30, -10, 10, 10], [0, -20, -20, -20, 0, 0, 20, 20, 20, 0]],
    zy: [[-20, -20, -20, 0, 0, 20, 20, 20, 0, 0], [-10, 10, 30, 30, 10, 10, -10, -30, -30, -10], [20, 20, 20, 0, 0, -20, -20, -20, 0, 0], [10, -10, -30, -30, -10, -10, 10, 30, 30, 10]],
    Ty: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],

    ctor: function () {
        this._super();
        var size = cc.winSize;
        this.t = parseInt(Math.random() * 7);
        var title = new cc.LabelTTF("TETRIS", "Arial", 38);
        title.x = size.width / 8;
        title.y = size.height * 8 / 9;
        title.ignoreAnchorPointForPosition(false);
        this.addChild(title, 1);

        var title1 = new cc.LabelTTF("space key --> PAUSE ", "Arial", 20);
        title1.x = size.width / 8;
        title1.y = size.height * 6 / 9;
        title1.setColor(cc.color(0, 0, 255));
        title1.ignoreAnchorPointForPosition(false);
        this.addChild(title1, 1);

        var title2 = new cc.LabelTTF("enter key --> RESUME ", "Arial", 20);
        title2.x = size.width / 8;
        title2.y = size.height * 5 / 9;
        title2.setColor(cc.color(0, 0, 255));
        title2.ignoreAnchorPointForPosition(false);
        this.addChild(title2, 1);

        var title3 = new cc.LabelTTF("◤left▲turn▼down◥right", "Arial", 20);
        title3.x = size.width / 8;
        title3.y = size.height * 4 / 9;
        title3.setColor(cc.color(0, 0, 255));
        title3.ignoreAnchorPointForPosition(false);
        this.addChild(title3, 1);

        var t2 = new cc.LabelTTF("SCORE : ", "", 20);
        t2.x = 750;
        t2.y = size.height * 8 / 10;
        t2.setColor(cc.color(255, 0, 0));
        t2.ignoreAnchorPointForPosition(false);
        this.addChild(t2, 1);

        this.t3 = new cc.LabelTTF(" ", "", 20);
        this.t3.attr({
            x: 850,
            y: size.height * 8 / 10
        });
        this.t3.setColor(cc.color(255, 0, 0));
        this.t3.ignoreAnchorPointForPosition(false);
        this.addChild(this.t3, 1);

        this.t3c = new cc.LayerColor(
            cc.color(255, 255, 255, 100),
            100, 38);
        this.t3c.x = 850;
        this.t3c.y = size.height * 8 / 10;
        this.t3c.ignoreAnchorPointForPosition(false);
        this.addChild(this.t3c, 1);

        var t4 = new cc.LabelTTF("TIME : ", "", 20);
        t4.x = 750;
        t4.y = size.height * 7 / 10;
        t4.setColor(cc.color(255, 0, 0));
        t4.ignoreAnchorPointForPosition(false);
        this.addChild(t4, 1);

        this.t5 = new cc.LabelTTF(" ", "", 20);
        this.t5.attr({
            x: 850,
            y: size.height * 7 / 10
        });
        this.t5.setColor(cc.color(255, 0, 0));
        this.t5.ignoreAnchorPointForPosition(false);
        this.addChild(this.t5, 1);

        this.t5c = new cc.LayerColor(
            cc.color(255, 255, 255, 100),
            100, 38);
        this.t5c.x = 850;
        this.t5c.y = size.height * 7 / 10;
        this.t5c.ignoreAnchorPointForPosition(false);
        this.addChild(this.t5c, 1);

        this.tetris = new cc.Sprite(res.Bg_png);
        this.tetris.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.tetris, 0);

        this.tetris[0] = new cc.Sprite(res.TB);
        this.tetris[0].attr({
            x: size.width * 4.5 / 9,
            y: size.height * 99 / 100
        });
        this.addChild(this.tetris[0], 2);

        this.tetris[1] = new cc.Sprite(res.IG);
        this.tetris[1].attr({
            x: size.width * 4.5 / 9,
            y: size.height * 99 / 100
        });
        this.addChild(this.tetris[1], 2);

        this.tetris[2] = new cc.Sprite(res.OO);
        this.tetris[2].attr({
            x: size.width * 4 / 9,
            y: size.height * 99 / 100
        });
        this.addChild(this.tetris[2], 2);

        this.tetris[3] = new cc.Sprite(res.LR);
        this.tetris[3].attr({
            x: size.width * 4 / 9,
            y: size.height * 99 / 100
        });
        this.addChild(this.tetris[3], 2);

        this.tetris[4] = new cc.Sprite(res.JP);
        this.tetris[4].attr({
            x: size.width * 4 / 9,
            y: size.height * 99 / 100
        });
        this.addChild(this.tetris[4], 2);

        this.tetris[5] = new cc.Sprite(res.NB);
        this.tetris[5].attr({
            x: size.width * 4 / 9,
            y: size.height * 99 / 100
        });
        this.addChild(this.tetris[5], 2);

        this.tetris[6] = new cc.Sprite(res.ZP);
        this.tetris[6].attr({
            x: size.width * 4 / 9,
            y: size.height * 99 / 100
        });
        this.addChild(this.tetris[6], 2);

        this.tetris[3] = new cc.Sprite(res.LR);
        this.tetris[3].attr({
            x: size.width * 4 / 9,
            y: size.height
        });
        this.addChild(this.tetris[3], 2);

        this.myKeyListener(this);
        this.scheduleUpdate();

        return true;
    },

    myKeyListener: function (layer) {
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                switch (keyCode) {
                    default :
                        cc.log("keyCode = " + keyCode);
                        cc.log("x " + layer.tetris[layer.t].x + " y " + layer.tetris[layer.t].y + " w " + layer.tetris[layer.t].width + " h " + layer.tetris[layer.t].height);
                        break;
                    case  13 :  //   press space key ---->  PAUSE
                        layer.scheduleUpdate(layer);
                        break;
                    case  32 :  //   press enter key ----> CONTINUE
                        layer.unscheduleUpdate(layer);
                        break;
                    case 37 :   //   press <- key  ----> MOVE TO  LEFT
                        if ((layer.tetris[layer.t].y - layer.tetris[layer.t].height / 2 > layer.tetris[layer.t].height) & (layer.tetris[layer.t].x - layer.tetris[layer.t].width / 2 > 250)) {
                            layer.tetris[layer.t].x -= layer.dx;
                            cc.log("keyCode = " + keyCode);
                            cc.log("x " + layer.tetris[layer.t].x + " y " + layer.tetris[layer.t].y + " w " + layer.tetris[layer.t].width + " h " + layer.tetris[layer.t].height);
                        }
                        break;
                    case 38 :   //  press ^ key  ----> counterclockwise TURN 90 degree
                        if (layer.tetris[layer.t].y - layer.tetris[layer.t].height / 2 > layer.tetris[layer.t].height) {
                            layer.td += 1;
                            layer.tetris[layer.t].runAction(cc.rotateBy(0, -90));
                            cc.log("keyCode = " + keyCode);
                            cc.log("x " + layer.tetris[layer.t].x + " y " + layer.tetris[layer.t].y + " w " + layer.tetris[layer.t].width + " h " + layer.tetris[layer.t].height);

                        }
                        break;
                    case 39 :  // press -> key ----> MOVE TO RIGHT
                        if ((layer.tetris[layer.t].y - layer.tetris[layer.t].height / 2 > layer.tetris[layer.t].height) & (layer.tetris[layer.t].x + layer.tetris[layer.t].width / 2 < 640)) {
                            layer.tetris[layer.t].x += layer.dx;

                            cc.log("keyCode = " + keyCode);
                            cc.log("x " + layer.tetris[layer.t].x + " y " + layer.tetris[layer.t].y + " w " + layer.tetris[layer.t].width + " h " + layer.tetris[layer.t].height);
                        }
                        break;
                    case 40 :   // press v key  ----> faster dropping down
                        if (layer.tetris[layer.t].y - layer.tetris[layer.t].height / 2 > layer.tetris[layer.t].height + 40) {
                            layer.tetris[layer.t].y -= 40;
                            cc.log("keyCode = " + keyCode);
                            cc.log("x " + layer.tetris[layer.t].x + " y " + layer.tetris[layer.t].y + " w " + layer.tetris[layer.t].width + " h " + layer.tetris[layer.t].height);
                        }
                        break;
                }
            }
        }, this);
    },

    update: function (dt) {

        switch (this.t) {  // random of 7 kinds shape T , I , O , L , J , N , Z
            case 0:
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 10; j++) {
                        this.Ty[i][j] = this.tetris[this.t].y + this.ty[i][j]
                    }
                }
                break;
            case 1:
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 10; j++) {
                        this.Ty[i][j] = this.tetris[this.t].y + this.iy[i][j]
                    }
                }
                break;
            case 2:
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 10; j++) {
                        this.Ty[i][j] = this.tetris[this.t].y + this.oy[i][j]
                    }
                }
                break;
            case 3:
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 10; j++) {
                        this.Ty[i][j] = this.tetris[this.t].y + this.ly[i][j]
                    }
                }
                break;
            case 4:
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 10; j++) {
                        this.Ty[i][j] = this.tetris[this.t].y + this.jy[i][j]
                    }
                }
                break;
            case 5:
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 10; j++) {
                        this.Ty[i][j] = this.tetris[this.t].y + this.ny[i][j]
                    }
                }
                break;
            case 6:
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 10; j++) {
                        this.Ty[i][j] = this.tetris[this.t].y + this.zy[i][j]
                    }
                }
                break;
        }

        var tt = parseInt((this.tetris[this.t].x - 250) / 20)+1;
        switch (this.t) {
            case 0 :  //  T
                switch (this.td) {
                    case 0 : //  T T
                        if ((this.Ty[0][0] > this.Ry[tt - 1]) && (this.Ty[0][2] > this.Ry[tt]) && (this.Ty[0][4] > this.Ry[tt + 1])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt], this.Ry[tt + 1]);
                            this.Ry[tt - 1] = this.Ry[tt] = this.Ry[tt + 1] = z + 40;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                           // cc.log("0- " + this.Ry[0] + " 1- " + this.Ry[1] + " 2- " + this.Ry[2] + " 3- " + this.Ry[3] + " 4- " + this.Ry[4] + " 5- " + this.Ry[5] + " 6- " + this.Ry[6] + " 7- " + this.Ry[7] + " 8- " + this.Ry[8] + " 9- " + this.Ry[9] + " 10- " + this.Ry[10] + " 11- " + this.Ry[11] + " 12- " + this.Ry[12] + " 13- " + this.Ry[13] + " 14- " + this.Ry[14] + " 15- " + this.Ry[15] + " 16- " + this.Ry[16] + " 17- " + this.Ry[17] + " 18- " + this.Ry[18] + " 19- " + this.Ry[19] + " 20- " + this.Ry[20]);
                        }

                        break;
                    case 1 :    // T  |--
                        if ((this.Ty[1][9] > this.Ry[tt - 1]) && (this.Ty[1][1] > this.Ry[tt])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt]);
                            this.Ry[tt - 1] = z + 60;
                            this.Ry[tt] = z + 40;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 2 :    //  T _|_
                        if ((this.Ty[2][6] > this.Ry[tt - 1]) && (this.Ty[2][7] > this.Ry[tt]) && (this.Ty[2][8] > this.Ry[tt + 1])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt], this.Ry[tt + 1]);
                            this.Ry[tt - 1] = this.Ry[tt + 1] = z + 20;
                            this.Ry[tt] = z + 40;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 3 :    //  T --|
                        if ((this.Ty[3][3] > this.Ry[tt - 1]) && (this.Ty[3][5] > this.Ry[tt])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt], this.Ry[tt + 1]);
                            this.Ry[tt - 1] = z + 40;
                            this.Ry[tt] = z + 60;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                }
                break;
            case 1 :  //  I
                switch (this.td) {
                    case 0 : //  I ▁
                        if ((this.Ty[0][0] > this.Ry[tt - 2]) && (this.Ty[0][1] > this.Ry[tt - 1]) && (this.Ty[0][2] > this.Ry[tt]) && (this.Ty[0][3] > this.Ry[tt + 1])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 2], this.Ry[tt - 1], this.Ry[tt], this.Ry[tt + 1]);
                            this.Ry[tt - 2] = this.Ry[tt - 1] = this.Ry[tt] = this.Ry[tt + 1] = z + 20;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 1 :    // I |
                        if ((this.Ty[1][9] > this.Ry[tt])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            this.Ry[tt] += 80;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 2 :    //  I --
                        if ((this.Ty[2][5] > this.Ry[tt - 2]) && (this.Ty[2][6] > this.Ry[tt - 1]) && (this.Ty[2][7] > this.Ry[tt]) && (this.Ty[2][8] > this.Ry[tt + 1])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 2], this.Ry[tt - 1], this.Ry[tt], this.Ry[tt + 1]);
                            this.Ry[tt - 2] = this.Ry[tt - 1] = this.Ry[tt] = this.Ry[tt + 1] = z + 20;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 3 :    //  I |
                        if ((this.Ty[3][4] > this.Ry[tt])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            this.Ry[tt] += 80;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                }
                break;
            case 2 :  //  O
                switch (this.td) {
                    case 0 : //  O O
                        if ((this.Ty[0][0] > this.Ry[tt - 1]) && (this.Ty[0][1] > this.Ry[tt])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt]);
                            this.Ry[tt - 1] = this.Ry[tt] = z + 40;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 1 :    // O O
                        if ((this.Ty[1][6] > this.Ry[tt - 1]) && (this.Ty[1][7] > this.Ry[tt])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt]);
                            this.Ry[tt - 1] = this.Ry[tt] = z + 40;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 2 :    // O O
                        if ((this.Ty[2][4] > this.Ry[tt - 1]) && (this.Ty[2][5] > this.Ry[tt])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt]);
                            this.Ry[tt - 1] = this.Ry[tt] = z + 40;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 3 :     // O O
                        if ((this.Ty[3][2] > this.Ry[tt - 1]) && (this.Ty[3][3] > this.Ry[tt])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt]);
                            this.Ry[tt - 1] = this.Ry[tt] = z + 40;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                }
                break;
            case 3 :  //  L
                switch (this.td) {
                    case 0 : //  L L
                        if ((this.Ty[0][0] > this.Ry[tt - 1]) && (this.Ty[0][1] > this.Ry[tt])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt]);
                            this.Ry[tt - 1] = z + 60;
                            this.Ry[tt] = z + 20;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 1 :    // L  __|
                        if ((this.Ty[1][3] > this.Ry[tt - 1]) && (this.Ty[1][8] > this.Ry[tt]) && (this.Ty[1][9] > this.Ry[tt + 1])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt], this.Ry[tt + 1]);
                            this.Ry[tt - 1] = this.Ry[tt] = z + 20;
                            this.Ry[tt + 1] = z + 40;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 2 :    //  L  7
                        if ((this.Ty[2][3] > this.Ry[tt - 1]) && (this.Ty[2][6] > this.Ry[tt])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt]);
                            this.Ry[tt - 1] = this.Ry[tt] = z + 60;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 3 :    //  L  ┌--
                        if ((this.Ty[3][2] > this.Ry[tt - 1]) && (this.Ty[3][4] > this.Ry[tt]) && (this.Ty[3][5] > this.Ry[tt + 1])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt], this.Ry[tt + 1]);
                            this.Ry[tt - 1] = this.Ry[tt] = this.Ry[tt + 1] = z + 40;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                }
                break;
            case 4 :  //  J
                switch (this.td) {
                    case 0 : //  J J
                        if ((this.Ty[0][0] > this.Ry[tt - 1]) && (this.Ty[0][1] > this.Ry[tt])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt]);
                            this.Ry[tt - 1] = z + 20;
                            this.Ry[tt] = z + 60;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 1 :    // J
                        if ((this.Ty[1][6] > this.Ry[tt - 1]) && (this.Ty[1][7] > this.Ry[tt]) && (this.Ty[1][9] > this.Ry[tt + 1])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt], this.Ry[tt + 1]);
                            this.Ry[tt - 1] = this.Ry[tt] = this.Ry[tt + 1] = z + 40;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 2 :    //  J
                        if ((this.Ty[2][5] > this.Ry[tt - 1]) && (this.Ty[2][8] > this.Ry[tt])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt]);
                            this.Ry[tt - 1] = this.Ry[tt] = z + 60;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 3 :    //  J └—
                        if ((this.Ty[3][2] > this.Ry[tt - 1]) && (this.Ty[3][3] > this.Ry[tt]) && (this.Ty[3][4] > this.Ry[tt + 1])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt], this.Ry[tt + 1]);
                            this.Ry[tt - 1] = z + 40;
                            this.Ry[tt] = this.Ry[tt + 1] = z + 20;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                }
                break;
            case 5 :  //  N
                switch (this.td) {
                    case 0 : //  N N
                        if ((this.Ty[0][8] > this.Ry[tt - 1]) && (this.Ty[0][0] > this.Ry[tt])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt]);
                            this.Ry[tt - 1] = z + 60;
                            this.Ry[tt] = z + 40;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 1 :    // N _|▔
                        if ((this.Ty[1][6] > this.Ry[tt - 1]) && (this.Ty[1][7] > this.Ry[tt]) && (this.Ty[1][9] > this.Ry[tt + 1])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt], this.Ry[tt + 1]);
                            this.Ry[tt - 1] = z + 20;
                            this.Ry[tt] = this.Ry[tt + 1] = z + 40;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 2 :    //  N N
                        if ((this.Ty[2][3] > this.Ry[tt - 1]) && (this.Ty[2][5] > this.Ry[tt])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt]);
                            this.Ry[tt - 1] = z + 60;
                            this.Ry[tt] = z + 40;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 3 :    // N _|▔
                        if ((this.Ty[3][1] > this.Ry[tt - 1]) && (this.Ty[3][2] > this.Ry[tt]) && (this.Ty[3][4] > this.Ry[tt + 1])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt], this.Ry[tt + 1]);
                            this.Ry[tt - 1] = z + 20;
                            this.Ry[tt] = this.Ry[tt + 1] = z + 40;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                }
                break;
            case 6 :  //  Z
                switch (this.td) {
                    case 0 : //  Z Z
                        if ((this.Ty[0][8] > this.Ry[tt - 1]) && (this.Ty[0][0] > this.Ry[tt]) && (this.Ty[0][1] > this.Ry[tt + 1])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt], this.Ry[tt + 1]);
                            this.Ry[tt - 1] = this.Ry[tt] = z + 40;
                            this.Ry[tt + 1] = z + 20;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 1 :    // Z ┌┘
                        if ((this.Ty[1][7] > this.Ry[tt - 1]) && (this.Ty[1][9] > this.Ry[tt])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt]);
                            this.Ry[tt - 1] = z + 40;
                            this.Ry[tt] = z + 60;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 2 : //  Z Z
                        if ((this.Ty[2][3] > this.Ry[tt - 1]) && (this.Ty[2][5] > this.Ry[tt]) && (this.Ty[2][6] > this.Ry[tt + 1])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt], this.Ry[tt + 1]);
                            this.Ry[tt - 1] = this.Ry[tt] = z + 40;
                            this.Ry[tt + 1] = z + 20;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                    case 3 :   // Z ┌┘
                        if ((this.Ty[3][2] > this.Ry[tt - 1]) && (this.Ty[3][4] > this.Ry[tt])) {
                            this.tetris[this.t].y -= this.dy
                        } else {
                            z = Math.max(this.Ry[tt - 1], this.Ry[tt]);
                            this.Ry[tt - 1] = z + 40;
                            this.Ry[tt] = z + 60;
                            this.t = parseInt(Math.random() * 7);
                            this.td = 0;
                            this.score(this);
                            this.myLog(this);
                        }
                        break;
                }
                break;
        }

        cc.log("Ry[tt] " + this.Ry[tt] + " this.Ry[tt - 1] " + this.Ry[tt - 1] + " hight " + this.tetris[this.t].height + " width " + this.tetris[this.t].width);
        if (this.Ry[tt] >= 640) {
            this.unscheduleUpdate(this)
        }
        var d = new Date();
        var n = d.toLocaleTimeString();
        var t5s = " " + n;
        this.t5.setString(t5s);
    },

    score: function (layer) {
        layer.counter += 10;
        layer.t3s = " " + layer.counter;
        layer.t3.setString(layer.t3s);
    },

    myLog : function(layer){
        cc.log("X: "+layer.tetris[layer.t].x+" Y: "+layer.tetris[layer.t].y+" '0:' " + layer.Ry[0] + " " + layer.Ry[1] + " " + layer.Ry[2] + " " + layer.Ry[3] + " " + layer.Ry[4] + " '5:' " + layer.Ry[5] + " " + layer.Ry[6] + " " + layer.Ry[7] + " " + layer.Ry[8] + " " + layer.Ry[9] + " '10-' " + layer.Ry[10] + " " + layer.Ry[11] + " " + layer.Ry[12] + " " + layer.Ry[13] + " " + layer.Ry[14] + " '15-' " + layer.Ry[15] + " " + layer.Ry[16] + " " + layer.Ry[17] + " " + layer.Ry[18] + " " + layer.Ry[19] + " '20-' " + layer.Ry[20]);
    }

});

var Tetris01Scene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new Tetris01Layer();
        this.addChild(layer);
        this.focused = true;
    }
});

