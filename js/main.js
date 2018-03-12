function Rend3D(pageCount) {

    this.$stageArea = $(".stageArea");
    this.$stageContent = $(".stageContent");
    this.$stagePage = $(".stagePage");

    this.winWH = {
        W: this.$stageArea.width(),
        H: this.$stageArea.height()
    };
    // 水平方向旋转角度
    this.rotateY = 0;
    this.pageIndex = 1;
    // 定义3D面个数
    this.pageCount = pageCount;
    this.deg = 360 / this.pageCount;
    this.translateZ = this.winWH.W / 4 / Math.tan(this.deg / 2 / 180 * Math.PI);
    this.perspective = this.translateZ * 2;

    this.render3d();
}
Rend3D.prototype = {
    render3d: function(){
        var page = this.$stageContent.children(".stagePage"),
            i = 0;

        this.$stageArea.css({
            "-webkit-perspective": this.perspective + "px",
            "perspective": this.perspective + "px"
        });

        this.$stageContent.css({
            "width": this.winWH.W / 2 + "px",
            "height": this.winWH.H / 2 + "px",
            "top": "50%",
            "left": "50%",
            "margin-top": this.winWH.H / -4 + "px",
            "margin-left": this.winWH.W / -4 + "px"
        });

        for (; i < this.pageCount; i++) {
            $(page[i]).css({
                "transform": "rotateY(" + i * this.deg + "deg) translateZ(" + this.translateZ + "px)",
                "-webkit-transform": "rotateY(" + i * this.deg + "deg) translateZ(" + this.translateZ + "px)"
            });
        }
    },
    setRotateY: function(rotateY){
        this.$stageContent.css({
            "-webkit-transform": "rotateY(" + rotateY + "deg)",
            "transform": "rotateY(" + rotateY + "deg)"
        });
    },
    next: function(){
        var me = this;
        me.rotateY -= me.deg;
        setTimeout(function() {
            me.setRotateY(me.rotateY);
        },200);
        return this;
    },
    pre: function(){
        var me = this;
        me.rotateY += me.deg;
        setTimeout(function() {
            me.setRotateY(me.rotateY);
        },200);
        return this;
    },
    start: function(){
        this.setRotateY(0);
        return this;
    },
    last: function(){
        this.setRotateY(-this.deg * (this.pageCount - 1));
        return this;
    },
    first: function(){
        this.setRotateY(0);
        return this;
    }
};

var stage3d = new Rend3D(6);

stage3d.next();
setTimeout(function () {
    stage3d.last();
},1000);
setTimeout(function () {
    stage3d.first();
},1500);

