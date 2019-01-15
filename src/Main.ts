//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;
    private Temp1: Temp1;
    private Temp2: Temp2;
    private Temp3: Temp3;
    private SelectedTemp;
    private index: number = 1;
    private flag: boolean = false;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }


        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */


    private createGameScene() {

        window["leanCloudInit"]();

        this.SelectedTemp = Temp3.getInstance();
        this.addChild(this.SelectedTemp);

        let panel = new egret.Sprite();
        panel.y = - 1200;
        this.addChild(panel);

        let panelbg = new egret.Shape();
        panelbg.graphics.lineStyle(3, 0xF2E339);
        panelbg.graphics.beginFill(0xD69027, 1);
        panelbg.graphics.drawRect(60, 140, 600, 1050);
        panelbg.graphics.endFill();
        panel.addChild(panelbg);

        let platform_title = new egret.TextField();
        platform_title.text = '游戏平台(6):'
        platform_title.x = 80;
        platform_title.y = 180;
        panel.addChild(platform_title);

        let platform_text = new egret.TextField();
        platform_text.textColor = 0x000000;
        platform_text.type = egret.TextFieldType.INPUT;
        platform_text.width = this.width;
        platform_text.textAlign = "left";
        platform_text.size = 25;
        platform_text.x = 80;
        platform_text.y = 235;
        // platform_text.text = "游戏平台";

        let platform_text_bg = new egret.Shape();
        platform_text_bg.graphics.beginFill(0xffffff, 0.8);
        platform_text_bg.graphics.drawRect(platform_text.x - 5, platform_text.y - 12, 570, 50);
        platform_text_bg.graphics.endFill();
        panel.addChild(platform_text_bg);
        panel.addChild(platform_text);
        // platform_text.addEventListener(egret.Event.FOCUS_IN, (e) => {
        //     if (platform_text.text === "游戏平台") {
        //         platform_text.text = "";
        //     }
        // }, this);
        platform_text.addEventListener(egret.Event.FOCUS_OUT, (e) => {
            if (e.target.text.length > 5) {
                e.target.text = e.target.text.slice(0, 6);
                // } else if (e.target.text.length === 0) {
                //     platform_text.text = "游戏平台";
            }
            // this.SelectedTemp.Platform = e.target.text;
        }, this);

        let title_title = new egret.TextField();
        title_title.text = '活动标题(6):'
        title_title.x = 80;
        title_title.y = 300;
        panel.addChild(title_title);

        let title_text = new egret.TextField();
        title_text.textColor = 0x000000;
        title_text.type = egret.TextFieldType.INPUT;
        title_text.width = this.width;
        title_text.textAlign = "left";
        title_text.size = 25;
        title_text.x = 80;
        title_text.y = 355;
        // title_text.text = "活动标题";
        let title_text_bg = new egret.Shape();
        title_text_bg.graphics.beginFill(0xffffff, 0.8);
        title_text_bg.graphics.drawRect(title_text.x - 5, title_text.y - 12, 570, 50);
        title_text_bg.graphics.endFill();
        panel.addChild(title_text_bg);
        panel.addChild(title_text);
        // title_text.addEventListener(egret.Event.FOCUS_IN, (e) => {
        //     if (title_text.text === "活动标题") {
        //         title_text.text = "";
        //     }
        // }, this);
        title_text.addEventListener(egret.Event.FOCUS_OUT, (e) => {
            if (e.target.text.length > 5) {
                e.target.text = e.target.text.slice(0, 6);
                // } else if (e.target.text.length === 0) {
                //     title_text.text = "活动标题";
            }
            // this.SelectedTemp.Title = e.target.text;
        }, this);



        let content_title = new egret.TextField();
        content_title.text = '活动内容(80):'
        content_title.x = 80;
        content_title.y = 420;
        panel.addChild(content_title);

        let content_text = new egret.TextField();
        content_text.textColor = 0x000000;
        content_text.width = 570;
        content_text.height = 200;
        content_text.multiline = true;
        content_text.maxChars = 100;
        content_text.type = egret.TextFieldType.INPUT;
        content_text.textAlign = "left";
        content_text.lineSpacing = 15;
        content_text.size = 24;
        content_text.x = 80;
        content_text.y = 475;
        // content_text.text = "活动内容";
        // content_text.addEventListener(egret.Event.FOCUS_IN, (e) => {
        //     if (content_text.text === "活动内容") {
        //         content_text.text = "";
        //     }
        // }, this);

        content_text.addEventListener(egret.Event.FOCUS_OUT, (e) => {
            if (e.target.text.length > 99) {
                e.target.text = e.target.text.slice(0, 100);
                // } else if (e.target.text.length === 0) {
                //     content_text.text = "活动内容";
            }
        }, this);

        let content_text_bg = new egret.Shape();
        content_text_bg.graphics.beginFill(0xffffff, 0.8);
        content_text_bg.graphics.drawRect(content_text.x - 5, content_text.y - 12, 570, 200);
        content_text_bg.graphics.endFill();
        panel.addChild(content_text_bg);
        panel.addChild(content_text);


        let vx_title = new egret.TextField();
        vx_title.text = '微信号(20):'
        vx_title.x = 80;
        vx_title.y = 695;
        panel.addChild(vx_title);


        let vx_text = new egret.TextField();
        vx_text.textColor = 0x000000;
        vx_text.type = egret.TextFieldType.INPUT;
        vx_text.width = this.width;
        vx_text.textAlign = "left";
        vx_text.size = 25;
        vx_text.x = 80;
        vx_text.y = 750;
        // vx_text.text = "微信号";
        // vx_text.addEventListener(egret.Event.FOCUS_IN, (e) => {
        //     if (vx_text.text === "微信号") {
        //         vx_text.text = "";
        //     }
        // }, this);

        vx_text.addEventListener(egret.Event.FOCUS_OUT, (e) => {
            if (e.target.text.length > 19) {
                e.target.text = e.target.text.slice(0, 20);
                // } else if (e.target.text.length === 0) {
                //     vx_text.text = "微信号";
            }
        }, this);

        let vx_text_bg = new egret.Shape();
        vx_text_bg.graphics.beginFill(0xffffff, 0.8);
        vx_text_bg.graphics.drawRect(vx_text.x - 5, vx_text.y - 12, 570, 50);
        vx_text_bg.graphics.endFill();
        panel.addChild(vx_text_bg);
        panel.addChild(vx_text);



        let qr_title = new egret.TextField();
        qr_title.text = '二维码地址:'
        qr_title.x = 80;
        qr_title.y = 815;
        panel.addChild(qr_title);

        let qr_text = new egret.TextField();
        qr_text.textColor = 0x000000;
        qr_text.type = egret.TextFieldType.INPUT;
        qr_text.width = 570;
        qr_text.height = 200;
        qr_text.multiline = true;
        qr_text.textAlign = "left";
        qr_text.lineSpacing = 15;
        qr_text.size = 24;
        qr_text.x = 80;
        qr_text.y = 870;
        // qr_text.text = "二维码";
        // qr_text.addEventListener(egret.Event.FOCUS_IN, (e) => {
        //     if (qr_text.text === "二维码") {
        //         qr_text.text = "";
        //     }
        // }, this);

        qr_text.addEventListener(egret.Event.FOCUS_OUT, (e) => {
            if (e.target.text.length > 19) {
                e.target.text = e.target.text.slice(0, 20);
                // } else if (e.target.text.length === 0) {
                //     qr_text.text = "二维码";
            }
        }, this);
        let qr_text_bg = new egret.Shape();
        qr_text_bg.graphics.beginFill(0xffffff, 0.8);
        qr_text_bg.graphics.drawRect(qr_text.x - 5, qr_text.y - 12, 570, 200);
        qr_text_bg.graphics.endFill();
        panel.addChild(qr_text_bg);

        panel.addChild(qr_text);
        // qr_text.addEventListener(egret.Event.FOCUS_OUT, (e) => {
        //     this.SelectedTemp.QR = e.target.text;
        // }, this);


        let reset_bg = new egret.Shape();
        reset_bg.graphics.lineStyle(3, 0xF2E339);
        reset_bg.graphics.beginFill(0x86550A);
        reset_bg.graphics.drawRect(140, 1080, 180, 85);
        reset_bg.graphics.endFill();
        panel.addChild(reset_bg);

        let reset_text = new egret.TextField();
        reset_text.text = "重置";
        reset_text.textColor = 0xF2E339;
        reset_text.type = egret.TextFieldType.INPUT;
        reset_text.width = 180;
        reset_text.textAlign = "center";
        reset_text.fontFamily = "黑体";
        reset_text.size = 28;
        reset_text.x = 140;
        reset_text.y = 1110;
        panel.addChild(reset_text);

        let reset_bg_mask = new egret.Shape();
        reset_bg_mask.graphics.beginFill(0x86550A);
        reset_bg_mask.graphics.drawRect(140, 1080, 180, 85);
        reset_bg_mask.graphics.endFill();
        reset_bg_mask.alpha = 0;
        panel.addChild(reset_bg_mask);
        reset_bg_mask.touchEnabled = true;
        reset_bg_mask.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
            platform_text.text = '';
            title_text.text = '';
            content_text.text = '';
            vx_text.text = '';
            qr_text.text = '';
            this.SelectedTemp.Platform = '';
            this.SelectedTemp.Title = ''
            this.SelectedTemp.Content = '';
            this.SelectedTemp.VX = '';
            this.SelectedTemp.setQR('');

        }, this);

        let button_bg = new egret.Shape();
        button_bg.graphics.lineStyle(3, 0xF2E339);
        button_bg.graphics.beginFill(0x86550A);
        button_bg.graphics.drawRect(400, 1080, 180, 85);
        button_bg.graphics.endFill();
        panel.addChild(button_bg);


        let publish_button = new egret.TextField();
        publish_button.text = "生成";
        publish_button.textColor = 0xF2E339;
        publish_button.type = egret.TextFieldType.INPUT;
        publish_button.width = 180;
        publish_button.textAlign = "center";
        publish_button.fontFamily = "黑体";
        publish_button.size = 28;
        publish_button.x = 400;
        publish_button.y = 1110;
        panel.addChild(publish_button);

        let button_bg_mask = new egret.Shape();
        button_bg_mask.graphics.beginFill(0x86550A);
        button_bg_mask.graphics.drawRect(400, 1080, 180, 75);
        button_bg_mask.graphics.endFill();
        button_bg_mask.alpha = 0;
        panel.addChild(button_bg_mask);
        button_bg_mask.touchEnabled = true;
        button_bg_mask.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
            // if (platform_text.text === '' || title_text.text === '' || content_text.text === '' || vx_text.text === '' || qr_text.text === '') {
            //     alert('数据不能为空');
            //     return;
            // }

            // var wxreg = /^[a-zA-Z0-9]{1}[-_a-zA-Z0-9]{5,19}$/;
            // var qrreg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
            // if (wxreg.test(vx_text.text)) {
            // if (qrreg.test(qr_text.text)) {
            this.flag = true;
            this.SelectedTemp.Platform = platform_text.text;
            this.SelectedTemp.Title = title_text.text;
            this.SelectedTemp.Content = content_text.text;
            this.SelectedTemp.VX = vx_text.text;
            this.SelectedTemp.setQR(qr_text.text, () => {

                var tw = egret.Tween.get(panel);
                tw.to({ y: -1200 }, 250);

                var renderTexture: egret.RenderTexture = new egret.RenderTexture();
                renderTexture.drawToTexture(this.SelectedTemp);
                var url = renderTexture.toDataURL("image/png", new egret.Rectangle(0, 0, 720, 1280));
                // renderTexture.saveToFile("image/png", "a/down.png", new egret.Rectangle(0, 0, this.stage.width, this.stage.height));

                var image_mask;
                var image;
                var closeMask;
                var tip;
                closeMask = document.getElementById('closeMsk');
                image_mask = document.getElementById("image_mask");
                tip = document.getElementById('tip');
                if (image_mask) {
                    image.src = url;
                } else {
                    image_mask = window.document.createElement("div");
                    image_mask.id = "image_mask";
                    image = document.createElement('img');
                    image.id = 'image';
                    image.src = url;
                    image_mask.appendChild(image);
                    document.body.appendChild(image_mask);

                    if (!closeMask) {
                        closeMask = document.createElement('div');
                        closeMask.id = 'closeMask';
                        closeMask.innerText = '关闭';
                        document.body.appendChild(closeMask);
                    }
                    closeMask.addEventListener('click', () => {
                        document.body.removeChild(image_mask);
                        document.body.removeChild(closeMask);
                        document.body.removeChild(tip);
                    })
                    if (!tip) {
                        tip = document.createElement('p');
                        tip.id = 'tip';
                        tip.innerHTML = '长按保存图片';
                        document.body.appendChild(tip);
                    }
                }
                var searchImage = document.getElementById('image');
                if (searchImage) {
                    var screenRate = window.screen.width / window.screen.height;
                    var compare = screenRate > (9 / 16);
                    if (window.screen.availHeight < window.screen.availWidth || compare) {
                        searchImage.style.height = 1280 * (window.screen.availHeight / 1280) * 0.7 + 'px';
                        searchImage.style.width = searchImage.offsetHeight * 9 / 16 + 'px';
                    } else {
                        searchImage.style.width = 720 * (window.screen.availWidth / 720) * 0.7 + "px";
                        searchImage.style.height = 1280 * (window.screen.availHeight / 1280) * 0.7 + 'px';
                    }

                }
                
                this.SelectedTemp.leanCloudSave();
            });
            // } else {
            //     alert('微信号格式有误');
            // }

        }, this);


        let data_button_panel = new egret.Sprite()
        this.addChild(data_button_panel);

        let data_button_bg = new egret.Shape();
        data_button_bg.graphics.lineStyle(3, 0xF2E339);
        data_button_bg.graphics.beginFill(0x86550A, 1);
        data_button_bg.graphics.drawRect(20, 20, 180, 65);
        data_button_bg.graphics.endFill();
        data_button_panel.addChild(data_button_bg);

        let data_button_text = new egret.TextField();
        data_button_text.text = '填写信息';
        data_button_text.textAlign = "center";
        data_button_text.width = 180;
        data_button_text.size = 24;
        data_button_text.x = 20;
        data_button_text.y = 42;
        data_button_panel.addChild(data_button_text);

        let data_button_mask_bg = new egret.Shape();
        data_button_mask_bg.graphics.beginFill(0x86550A, 1);
        data_button_mask_bg.graphics.drawRect(20, 20, 180, 65);
        data_button_mask_bg.graphics.endFill();
        data_button_mask_bg.alpha = 0;
        data_button_panel.addChild(data_button_mask_bg);
        data_button_mask_bg.touchEnabled = true;
        data_button_mask_bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
            var tw = egret.Tween.get(panel);
            if (panel.y === -1200) {
                tw.to({ y: 0 }, 500, egret.Ease.backInOut);
            } else {
                tw.to({ y: -1200 }, 500);
            }
        }, this);

        let change_template_panel = new egret.Sprite()
        this.addChild(change_template_panel);

        let change_template_bg = new egret.Shape();
        change_template_bg.graphics.lineStyle(3, 0xF2E339);
        change_template_bg.graphics.beginFill(0x86550A, 1);
        change_template_bg.graphics.drawRect(520, 20, 180, 65);
        change_template_bg.graphics.endFill();
        change_template_panel.addChild(change_template_bg);

        let change_template_text = new egret.TextField();
        change_template_text.text = '更换模板';
        change_template_text.textAlign = "center";
        change_template_text.width = 180;
        change_template_text.size = 24;
        change_template_text.x = 520;
        change_template_text.y = 42;
        change_template_panel.addChild(change_template_text);

        let change_template_mask_bg = new egret.Shape();
        change_template_mask_bg.graphics.beginFill(0x86550A, 1);
        change_template_mask_bg.graphics.drawRect(520, 20, 180, 65);
        change_template_mask_bg.graphics.endFill();
        change_template_mask_bg.alpha = 0;
        change_template_panel.addChild(change_template_mask_bg);
        change_template_mask_bg.touchEnabled = true;

        change_template_mask_bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
            // this.removeChild(this.SelectedTemp);
            e.preventDefault();
            if (this.flag === false) {
                RES.getResAsync("description_json", (result: Object[]) => {
                    this.SelectedTemp.Platform = result[0]["platform"];
                    this.SelectedTemp.Title = result[0]["title"];
                    this.SelectedTemp.Content = result[0]["content"];
                    this.SelectedTemp.VX = result[0]["vx"];
                    this.SelectedTemp.setQR(result[0]["qr"]);
                }, this)
            }

            if (this.index > 3) {
                this.index = 1;
            }
            this.removeChild(this.SelectedTemp);
            switch (this.index) {
                case 1:
                    this.SelectedTemp = Temp1.getInstance();
                    break;
                case 2:
                    this.SelectedTemp = Temp2.getInstance();
                    break;
                case 3:
                    this.SelectedTemp = Temp3.getInstance();
                    break;
                default:
                    return;
            }
            this.SelectedTemp.Platform = platform_text.text;
            this.SelectedTemp.Title = title_text.text;
            this.SelectedTemp.Content = content_text.text;
            this.SelectedTemp.VX = vx_text.text;
            this.SelectedTemp.setQR(qr_text.text, () => {

                var tw = egret.Tween.get(panel);
                tw.to({ y: -1200 }, 250);

                var renderTexture: egret.RenderTexture = new egret.RenderTexture();
                renderTexture.drawToTexture(this.SelectedTemp);
                var url = renderTexture.toDataURL("image/png", new egret.Rectangle(0, 0, 720, 1280));
                // renderTexture.saveToFile("image/png", "a/down.png", new egret.Rectangle(0, 0, this.stage.width, this.stage.height));
                
            });
            this.addChildAt(this.SelectedTemp, 0);
            this.index++
        }, this);


        RES.getResAsync("description_json", (result: Object[]) => {
            this.SelectedTemp.Platform = result[0]["platform"];
            this.SelectedTemp.Title = result[0]["title"];
            this.SelectedTemp.Content = result[0]["content"];
            this.SelectedTemp.VX = result[0]["vx"];
            this.SelectedTemp.setQR(result[0]["qr"]);
        }, this)


    }

    private update() {

    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}


