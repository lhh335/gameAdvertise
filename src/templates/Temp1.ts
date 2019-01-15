class Temp1 extends egret.Sprite {

    private static instance: Temp1;

    public platform_text: egret.TextField;
    public title_text: egret.TextField
    public content_text: egret.TextField;
    public vx_text: egret.TextField;
    public vx_text2: egret.TextField;
    public qr_string: string;
    private qr_view: egret.Sprite;

    private qrbg: egret.Shape;

    private platform_gradient: egret.Shape;
    private title_gradient: egret.Shape;
    private content_gradient: egret.Shape;
    private vx_gradient: egret.Shape;
    private vx2_gradient: egret.Shape;

    public constructor() {
        super();
        this.createView();
    }

    private static init() {
        Temp1.instance = new Temp1();
    }

    public static getInstance() {
        if (Temp1.instance === undefined) {
            this.init();
        }
        return Temp1.instance;
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private createView() {
        let stageW = 720;
        let stageH = 1280;

        // let sky = this.createBitmapByName("bg_jpg");
        let bg = this.createBitmapByName("t1_background_png");
        this.addChild(bg);
        bg.width = stageW;
        bg.height = stageH;

        let notice = this.createBitmapByName("t1_notice_png");
        this.addChild(notice);
        notice.x = 23;
        notice.y = 302;

        let beauty = this.createBitmapByName("t1_beauty_png");
        this.addChild(beauty);
        beauty.x = 347;
        beauty.y = 903;

        this.platform_text = new egret.TextField();
        // colorLabel.textColor = 0xffffff;
        this.platform_text.bold = true;
        this.platform_text.width = this.width;
        this.platform_text.textAlign = "center";
        this.platform_text.size = 80;
        this.platform_text.x = 0;
        this.platform_text.y = 40;
        this.addChild(this.platform_text);
        this.platform_gradient = new egret.Shape();
        this.genGradientPlatform(this.platform_gradient, this.platform_text);
        this.addChild(this.platform_gradient);

        this.title_text = new egret.TextField();
        this.title_text.width = this.width;
        this.title_text.textAlign = "center";
        this.title_text.size = 55;
        this.title_text.x = 0;
        this.title_text.y = 315;
        this.addChild(this.title_text);
        this.title_gradient = new egret.Shape();
        this.genGradientTitle(this.title_gradient, this.title_text);
        this.addChild(this.title_gradient);

        this.content_text = new egret.TextField();
        this.content_text.width = this.width - 90;
        this.content_text.multiline = true;
        this.content_text.textAlign = "left";
        this.content_text.lineSpacing = 15;
        this.content_text.size = 40;
        this.content_text.x = 40;
        this.content_text.y = 395;
        this.addChild(this.content_text);
        this.content_gradient = new egret.Shape();
        this.genGradientContent(this.content_gradient, this.content_text);
        this.addChild(this.content_gradient);

        this.vx_text = new egret.TextField();
        this.vx_text.width = this.width - 20;
        this.vx_text.textAlign = "left";
        this.vx_text.size = 60;
        this.vx_text.x = 20;
        this.vx_text.y = 235;
        this.addChild(this.vx_text);
        this.vx_gradient = new egret.Shape();
        this.genGradientVX(this.vx_gradient, this.vx_text);
        this.addChild(this.vx_gradient);

        this.vx_text2 = new egret.TextField();
        this.vx_text2.width = this.width - 20;
        this.vx_text2.textAlign = "left";
        this.vx_text2.size = 60;
        this.vx_text2.x = 20;
        this.vx_text2.y = 835;
        this.addChild(this.vx_text2);
        this.vx2_gradient = new egret.Shape();
        this.genGradientVX(this.vx2_gradient, this.vx_text2);
        this.addChild(this.vx2_gradient);

        this.qrbg = new egret.Shape();
        this.qrbg.graphics.beginFill(0xffffff, 1);
        this.qrbg.graphics.drawRect(20, 940, 320, 320);
        this.qrbg.graphics.endFill();

        this.qr_view = new egret.Sprite();
        // this.qr_view = qr.QRCode.create("www.baidu.com", 0x000000, 300, 300);

    }

    private genGradientPlatform(gradient: egret.Shape, text: egret.TextField, colors: number[] = [0xffffff, 0xe9b718, 0x482103, 0x793403, 0x482103]) {
        let matrix = new egret.Matrix();
        matrix.createGradientBox(text.width, text.height, Math.PI * 0.5, text.x, text.y);
        gradient.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, [1, 1, 1, 1, 1], [30, 120, 150, 170, 235], matrix);
        gradient.graphics.drawRect(text.x, text.y, text.width, text.height);
        gradient.graphics.endFill();
        gradient.mask = text;
        var shadow_filter = new egret.DropShadowFilter(3, 90, 0x7f3300);
        gradient.filters = [shadow_filter];
    }

    private genGradientVX(gradient: egret.Shape, text: egret.TextField, colors: number[] = [0xFAF5CB, 0xB78331, 0xFAF5CB]) {
        let matrix = new egret.Matrix();
        matrix.createGradientBox(text.width, text.height, Math.PI * 0.5, text.x, text.y);
        gradient.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, [1, 1, 1], [70, 160, 255], matrix);
        gradient.graphics.drawRect(text.x, text.y, text.width, text.height);
        gradient.graphics.endFill();
        gradient.mask = text;
        var shadow_filter = new egret.DropShadowFilter(3, 90, 0x48130d);
        gradient.filters = [shadow_filter];
    }

    private genGradientTitle(gradient: egret.Shape, text: egret.TextField, colors: number[] = [0xFDDB10, 0xffffff, 0xFDDB10, 0xFBA000]) {
        let matrix = new egret.Matrix();
        matrix.createGradientBox(text.width, text.height, Math.PI * 0.5, text.x, text.y);
        gradient.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, [1, 1, 1, 1], [70, 140, 205, 225], matrix);
        gradient.graphics.drawRect(text.x, text.y, text.width, text.height);
        gradient.graphics.endFill();
        gradient.mask = text;
        var glow_filter = new egret.GlowFilter(0x5b1f01, 1, 9, 9);
        gradient.filters = [glow_filter];
    }

    private genGradientContent(gradient: egret.Shape, text: egret.TextField, colors: number[] = [0xFAF5CB, 0xB78331, 0xFAF5CB], alphas: number[] = [1, 1, 1], ratios: number[] = [40, 160, 255]) {

        let matrix = new egret.Matrix();
        matrix.createGradientBox(text.width, text.height, Math.PI * 0.5, text.x, text.y);
        gradient.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, alphas, ratios, matrix);
        gradient.graphics.drawRect(text.x, text.y, text.width, text.height);
        gradient.graphics.endFill();
        gradient.mask = text;
        var glow_filter = new egret.GlowFilter(0x482103);
        gradient.filters = [glow_filter];
    }

    private updateView() {

    }

    public leanCloudSave() {
        window["leanCloudSave"](this.platform_text.text, this.title_text.text,
            this.content_text.text, this.vx_text.text, this.qr_string, 1);
    }

    public set Platform(value: string) {
        if (this.platform_text.text !== value) {
            this.platform_text.text = value;
            this.genGradientPlatform(this.platform_gradient, this.platform_text);
        }
    }

    public set Title(value: string) {
        if (this.title_text.text !== value) {
            this.title_text.text = value;
            this.genGradientTitle(this.title_gradient, this.title_text);
        }
    }

    public set Content(value: string) {
        if (this.content_text.text !== value) {
            this.content_text.text = value;
            var colors = [];
            var alphas = [];
            var ratios = [];
            var default_ratios = [40, 160, 255];
            for (var i = 0; i < this.content_text.numLines; i++) {
                colors = colors.concat([0xFAF5CB, 0xB78331, 0xFAF5CB]);
                alphas = alphas.concat([1, 1, 1]);
                ratios = [];
                for (var j = 0; j < this.content_text.numLines * default_ratios.length; j++) {
                    if (j === this.content_text.numLines * default_ratios.length - 1) {
                        ratios.push(255);
                    } else {
                        ratios.push(Math.floor((default_ratios[j % default_ratios.length]) / (this.content_text.numLines) + 255 / this.content_text.numLines * Math.floor(j / default_ratios.length)));
                    }
                }
                // [20 80 127 147 207 255]
                // ratios.concat([40, 160, 255])
            }

            this.genGradientContent(this.content_gradient, this.content_text, colors, alphas, ratios);
        }
    }

    public set VX(value: string) {
        if (value === "") {
            this.vx_text.text = "";
            this.vx_text2.text = "";
        } else {
            if (this.vx_text.text !== value) {
                this.vx_text.text = value;
                this.vx_text2.text = value;
                this.genGradientVX(this.vx_gradient, this.vx_text);
                this.genGradientVX(this.vx2_gradient, this.vx_text2);
            }
        }

    }

    public setQR(value: string, callback: Function = null) {
        if (value !== '') {
            if (!this.contains(this.qrbg)) {
                this.addChild(this.qrbg)
            }
            if (this.qr_string !== value) {
                if (this.contains(this.qr_view)) {
                    // this.qr_view = null;
                    this.removeChild(this.qr_view);
                }

                this.qr_string = value;

                var QRCode = qrcode(10, "L");
                QRCode.addData(encodeURI(this.qr_string), "Byte");
                QRCode.make();

                var qr_element = QRCode.createImgTag(5, 0);
                // console.log(qr_element.indexOf(" src=\""));
                // console.log(qr_element.indexOf("\" width="));

                // console.log(qr_element.slice(qr_element.indexOf(" src=\"") + 6, qr_element.indexOf("\" width=")))
                let loader = new egret.ImageLoader();
                var url = qr_element.slice(qr_element.indexOf(" src=\"") + 6, qr_element.indexOf("\" width="));
                loader.load(url);

                var imgLoadHandler = (evt: egret.Event) => {
                    var loader: egret.ImageLoader = evt.currentTarget;
                    var bmd: egret.BitmapData = loader.data;
                    var qrImg: egret.Bitmap = new egret.Bitmap(bmd);
                    this.qr_view.addChild(qrImg);
                    this.qr_view.x = 37;
                    this.qr_view.y = 956;
                    this.addChild(this.qr_view);
                    if (callback !== null) {
                        callback();
                    }
                }
                loader.once(egret.Event.COMPLETE, imgLoadHandler, this);
            } else {
                if (callback !== null) {
                    callback();
                }
            }
        } else {
            this.qr_string = "";
            if (this.contains(this.qr_view)) {
                // this.qr_view = null;
                this.removeChild(this.qr_view);
                this.removeChild(this.qrbg);
            }
            if (callback !== null) {
                callback();
            }
        }
    }
}