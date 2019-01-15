class Temp2 extends egret.Sprite {

    private static instance: Temp2;

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
        Temp2.instance = new Temp2();
    }

    public static getInstance() {
        if (Temp2.instance === undefined) {
            this.init();
        }
        return Temp2.instance;
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
        let bg = this.createBitmapByName("t2_background_png");
        this.addChild(bg);
        bg.width = stageW;
        bg.height = stageH;

        let notice = this.createBitmapByName("t2_notice_png");
        this.addChild(notice);
        notice.x = 43;
        notice.y = 302;

        // let qr_box = this.createBitmapByName("t2_qrBox_png");
        // this.addChild(qr_box);
        // qr_box.x = 260;
        // qr_box.y = 1030;


        this.platform_text = new egret.TextField();
        // colorLabel.textColor = 0xffffff;
        this.platform_text.bold = true;
        this.platform_text.width = this.width - 260;
        this.platform_text.textAlign = "center";
        this.platform_text.size = 70;
        this.platform_text.x = 150;
        this.platform_text.y = 50;
        this.addChild(this.platform_text);
        this.platform_gradient = new egret.Shape();
        this.genGradientPlatform(this.platform_gradient, this.platform_text);
        this.addChild(this.platform_gradient);

        this.title_text = new egret.TextField();
        this.title_text.width = this.width;
        this.title_text.textAlign = "center";
        this.title_text.size = 55;
        this.title_text.bold = true;
        this.title_text.x = -5;
        this.title_text.y = 330;
        this.addChild(this.title_text);
        this.title_gradient = new egret.Shape();
        this.genGradientTitle(this.title_gradient, this.title_text);
        this.addChild(this.title_gradient);

        this.content_text = new egret.TextField();
        this.content_text.width = this.width - 200;
        this.content_text.multiline = true;
        this.content_text.textAlign = "left";
        this.content_text.lineSpacing = 15;
        this.content_text.size = 35;
        this.content_text.x = 90;
        this.content_text.y = 415;
        this.addChild(this.content_text);
        this.content_gradient = new egret.Shape();
        this.genGradientContent(this.content_gradient, this.content_text);

        this.addChild(this.content_gradient);

        this.vx_text = new egret.TextField();
        this.vx_text.width = this.width - 200;
        this.vx_text.textAlign = "left";
        this.vx_text.size = 45;
        this.vx_text.alpha = 0.4;
        this.vx_text.x = 190;
        this.vx_text.y = 250;
        this.addChild(this.vx_text);
        this.vx_gradient = new egret.Shape();
        this.genGradientVX(this.vx_gradient, this.vx_text);
        this.addChild(this.vx_gradient);

        this.vx_text2 = new egret.TextField();
        this.vx_text2.width = this.width - 200;
        this.vx_text2.textAlign = "left";
        this.vx_text2.size = 45;
        this.vx_text2.x = 90;
        this.vx_text2.y = 900;
        this.addChild(this.vx_text2);
        this.vx2_gradient = new egret.Shape();
        this.genGradientVX(this.vx2_gradient, this.vx_text2);
        this.addChild(this.vx2_gradient);

        this.qrbg = new egret.Shape();
        this.qrbg.graphics.lineStyle(9, 0x00d0ff);
        this.qrbg.graphics.beginFill(0xffffff, 1);
        this.qrbg.graphics.drawRect(240, 1010, 240, 240);
        this.qrbg.graphics.drawCircle(5, 5, 20);
        this.qrbg.graphics.endFill();



        this.qr_view = new egret.Sprite();
        // this.qr_view = qr.QRCode.create("www.baidu.com", 0x000000, 300, 300);

    }

    private genGradientPlatform(gradient: egret.Shape, text: egret.TextField, colors: number[] = [0xfffefa, 0xfed925]) {
        let matrix = new egret.Matrix();
        matrix.createGradientBox(text.width, text.height, Math.PI * 0.5, text.x, text.y);
        gradient.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, [1, 1], [0, 255], matrix);
        gradient.graphics.drawRect(text.x, text.y, text.width, text.height);
        gradient.graphics.endFill();
        gradient.mask = text;
        var shadow_filter = new egret.DropShadowFilter(6, 90, 0xb00304);
        gradient.filters = [shadow_filter];
    }

    private genGradientVX(gradient: egret.Shape, text: egret.TextField, colors: number[] = [0xF7FFFF, 0x04f4f4]) {
        let matrix = new egret.Matrix();
        matrix.createGradientBox(text.width, text.height, Math.PI * 0.5, text.x, text.y);
        gradient.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, [1, 1], [0, 255], matrix);
        gradient.graphics.drawRect(text.x, text.y, text.width, text.height);
        gradient.graphics.endFill();
        gradient.mask = text;
        var glow_filter = new egret.GlowFilter(0x002a7f, 1, 10, 10, 3);
        gradient.filters = [glow_filter];
    }

    private genGradientTitle(gradient: egret.Shape, text: egret.TextField, colors: number[] = [0x00c9fc, 0x0a56a9]) {
        let matrix = new egret.Matrix();
        matrix.createGradientBox(text.width, text.height, Math.PI * 0.5, text.x, text.y);
        gradient.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, [1, 1], [0, 225], matrix);
        gradient.graphics.drawRect(text.x, text.y, text.width, text.height);
        gradient.graphics.endFill();
        gradient.mask = text;
        var glow_filter = new egret.GlowFilter(0xFFFFFF, 1, 5, 5, 4);
        var shadow_filter = new egret.DropShadowFilter(5, 90, 0x0d8cd5);
        gradient.filters = [glow_filter, shadow_filter];
    }

    private genGradientContent(gradient: egret.Shape, text: egret.TextField, colors: number[] = [0xfefdab, 0xedc307], alphas: number[] = [1, 1], ratios: number[] = [0, 255]) {

        let matrix = new egret.Matrix();
        matrix.createGradientBox(text.width, text.height, Math.PI * 0.5, text.x, text.y);
        gradient.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, alphas, ratios, matrix);
        gradient.graphics.drawRect(text.x, text.y, text.width, text.height);
        gradient.graphics.endFill();
        gradient.mask = text;
        var glow_filter = new egret.GlowFilter(0x022b64, 1, 5, 5, 3);
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
            var default_ratios = [0, 255];
            for (var i = 0; i < this.content_text.numLines; i++) {
                colors = colors.concat([0xfefdab, 0xedc307]);
                alphas = alphas.concat([1, 1]);
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

                var qr_element = QRCode.createImgTag(3, 0);
                // console.log(qr_element.indexOf(" src=\""));
                // console.log(qr_element.indexOf("\" width="));

                // console.log(qr_element.slice(qr_element.indexOf(" src=\"") + 6, qr_element.indexOf("\" width=")))
                let loader = new egret.ImageLoader();
                console.log(qr_element);
                var url = qr_element.slice(qr_element.indexOf(" src=\"") + 6, qr_element.indexOf("\" width="));
                loader.load(url);

                var imgLoadHandler = (evt: egret.Event) => {
                    var loader: egret.ImageLoader = evt.currentTarget;
                    var bmd: egret.BitmapData = loader.data;
                    var qrImg: egret.Bitmap = new egret.Bitmap(bmd);
                    this.qr_view.addChild(qrImg);
                    this.qr_view.x = 275;
                    this.qr_view.y = 1045;
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