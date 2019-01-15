class Temp3 extends egret.Sprite {

    private static instance: Temp3;

    public platform_text: egret.TextField;
    public title_text: egret.TextField
    public content_text: egret.TextField;
    public vx_text: egret.TextField;
    public qr_string: string;
    private qr_view: egret.Sprite;

    private qrbg: egret.Shape;

    private platform_gradient: egret.Shape;
    private title_gradient: egret.Shape;
    private content_gradient: egret.Shape;
    private vx_gradient: egret.Shape;

    public constructor() {
        super();
        this.createView();
    }

    private static init() {
        Temp3.instance = new Temp3();
    }

    public static getInstance() {
        if (Temp3.instance === undefined) {
            this.init();
        }
        return Temp3.instance;
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
        let bg = this.createBitmapByName("t3_background_png");
        this.addChild(bg);
        bg.width = stageW;
        bg.height = stageH;

        let platform_bg = this.createBitmapByName("t3_platform_png");
        this.addChild(platform_bg);
        platform_bg.x = 140;
        platform_bg.y = 30;

        let notice = this.createBitmapByName("t3_notice_png");
        this.addChild(notice);
        notice.x = 25;
        notice.y = 420;

        let qr = this.createBitmapByName("t3_qr_png");
        this.addChild(qr);
        qr.x = 0;
        qr.y = 960;

        this.platform_text = new egret.TextField();
        // colorLabel.textColor = 0xffffff;
        this.platform_text.bold = true;
        this.platform_text.width = this.width - 310;
        this.platform_text.textAlign = "center";
        this.platform_text.size = 65;
        this.platform_text.x = 155;
        this.platform_text.y = 150;
        this.addChild(this.platform_text);
        this.platform_gradient = new egret.Shape();
        this.genGradientPlatform(this.platform_gradient, this.platform_text);
        this.addChild(this.platform_gradient);

        this.title_text = new egret.TextField();
        this.title_text.width = this.width - 280;
        this.title_text.textAlign = "center";
        this.title_text.size = 50;
        this.title_text.bold = true;
        this.title_text.x = 110;
        this.title_text.y = 475;
        this.title_text.textColor = 0xbf4534;
        this.addChild(this.title_text);

        this.content_text = new egret.TextField();
        this.content_text.width = this.width - 200;
        this.content_text.multiline = true;
        this.content_text.textAlign = "left";
        this.content_text.lineSpacing = 15;
        this.content_text.size = 35;
        this.content_text.x = 90;
        this.content_text.y = 565;
        this.content_text.stroke = 3;
        this.content_text.strokeColor = 0x874514;
        this.content_text.textColor = 0xFFEB8C;
        this.addChild(this.content_text);


        this.vx_text = new egret.TextField();
        this.vx_text.width = this.width - 200;
        this.vx_text.textAlign = "left";
        this.vx_text.size = 35;
        this.vx_text.x = 120;
        this.vx_text.y = 345;
        // this.vx_text.stroke = 1;
        // this.vx_text.strokeColor = 0xa34b1b;
        this.vx_text.textColor = 0xffde03;
        this.addChild(this.vx_text);
        this.vx_gradient = new egret.Shape();
        this.genGradientVX(this.vx_gradient, this.vx_text);
        this.addChild(this.vx_gradient);



        this.qrbg = new egret.Shape();
        this.qrbg.graphics.beginFill(0xffffff, 1);
        this.qrbg.graphics.drawRect(240, 985, 240, 245);
        this.qrbg.graphics.endFill();



        this.qr_view = new egret.Sprite();
        // this.qr_view = qr.QRCode.create("www.baidu.com", 0x000000, 300, 300);

    }

    private genGradientPlatform(gradient: egret.Shape, text: egret.TextField, colors: number[] = [0xfffefa, 0xfed925]) {
        let matrix = new egret.Matrix();
        matrix.createGradientBox(text.width, text.height, Math.PI * 0.5, text.x, text.y);
        gradient.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, [1, 1], [0, 255], matrix);
        gradient.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, [1, 1], [0, 255], matrix);
        gradient.graphics.drawRect(text.x, text.y, text.width, text.height);
        gradient.graphics.endFill();
        gradient.mask = text;
        var shadow_filter = new egret.DropShadowFilter(6, 90, 0xb00304);
        gradient.filters = [shadow_filter];
    }

    private genGradientVX(gradient: egret.Shape, text: egret.TextField, colors: number[] = [0xffde03]) {
        let matrix = new egret.Matrix();
        matrix.createGradientBox(text.width, text.height, Math.PI * 0.5, text.x, text.y);
        gradient.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, [1], [0], matrix);
        gradient.graphics.drawRect(text.x, text.y, text.width, text.height);
        gradient.graphics.endFill();
        gradient.mask = text;
        var glow_filter = new egret.GlowFilter(0x26282d, 1, 10, 10, 3);
        var glow_filter2 = new egret.GlowFilter(0xa34b1b, 1, 2, 2, 1);
        gradient.filters = [glow_filter2, glow_filter];
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
        }
    }

    public set Content(value: string) {
        if (this.content_text.text !== value) {
            this.content_text.text = value;
        }
    }

    public set VX(value: string) {
        if (value === "") {
            this.vx_text.text = "";
        } else {
            if (this.vx_text.text !== value) {
                this.vx_text.text = value;
                this.genGradientVX(this.vx_gradient, this.vx_text);
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

                var qr_element = QRCode.createImgTag(3, 0);

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
                    this.qr_view.x = 275;
                    this.qr_view.y = 1020;
                    this.qr_view.width = 210;
                    this.qr_view.height = 210;
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