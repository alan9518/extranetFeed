// Main Function JS
// Call to Floating-Box
//         Facebook Data
//         Twitter Data
// Version 1
// 9/21/2017

$(document).ready(function(){
    // Create Main Module
    (function(){
        var mainJS = {
            init:function()
            {
                this.$allowedPages = 
                [
                    'http://localhost:8080/socialmediafeed/'.toLocaleLowerCase(),
                    'https://flextronics365.sharepoint.com/sites/sandbox/pruebas_alan/SitePages/Home.aspx'.toLocaleLowerCase(),
                    'https://mobileweb.flextronics.com/SharepointsiteRequest/socialMediaFeed/'.toLocaleLowerCase(),
                    'http://localhost:8080/FlexExtranet/'.toLocaleLowerCase()
                ]
                
                // this.getCurrentPage();
                //Enable SP_UI_DialogOptions
                LoadSodByKey("sp.js", function () {}); 
                this.isMDSEnabled();
            },
            // --------------------------------------
            // Look for MDS
            // --------------------------------------
            isMDSEnabled: function()
            {
                // Is MDS enabled?
                if ("undefined" != typeof g_MinimalDownload && g_MinimalDownload && (window.location.pathname.toLowerCase()).endsWith("/_layouts/15/start.aspx") && "undefined" != typeof asyncDeltaManager) {
                    // Register script for MDS if possible
                    RegisterModuleInit("PublicFlexBranding.js", this.render); //MDS registration
                    this.cacheDom();
                    this.startCarousel();
                    this.loadDependences();
                    console.log('MDS available')
                } else {
                    this.cacheDom();
                    this.startCarousel();
                    this.loadDependences(); 
                    console.log('NO MDS')
                }
            },
            startCarousel: function()
            {
                $('#slider1').tinycarousel();
            },
            // --------------------------------------
            // Search for the selected pages, if not 
            // wont load Scripts
            // --------------------------------------
            getCurrentPage:function()
            {  
                this.$currentUrl = window.location.href.toLocaleLowerCase();
                if(this.$allowedPages.indexOf(this.$currentUrl) != -1)
                    this.isMDSEnabled();
                else
                    return;
            },
            // --------------------------------------
            // Load Modules and Styles if Needed
            // --------------------------------------
            loadDependences:function()
            {
                $("head").append("<link rel='stylesheet' id='boxCss' href='https://extranetpoc.flex.com/sites/arturo/SiteAssets/Landing%20Page/css/stylesFloating-box-v2.css' type='text/css' />");
                // $("head").append("<script id='userFeed' src='https://extranetpoc.flex.com/sites/arturo/SiteAssets/Landing%20Page/JS/custom.js'></script>");
                $("body").append("<script id='box'      src='https://extranetpoc.flex.com/sites/arturo/SiteAssets/Landing%20Page/JS/floating-box-v3.js'></script>");
                $("body").append("<script id='faceFeed' src='https://extranetpoc.flex.com/sites/arturo/SiteAssets/Landing%20Page/JS/getFacebookData.js'></script>");
                $("body").append("<script id='twitFeed' src='https://extranetpoc.flex.com/sites/arturo/SiteAssets/Landing%20Page/JS/getTwitterData.js'></script>");
               

            },
            // --------------------------------------
            // Get Parent Containers
            // --------------------------------------
            cacheDom:function()
            {
                this.$mediaParentContainer = $('#socialMediaContent');
                $(".ms-wikicontent").css("padding-right", "0px");
            }
        }
        // Start Module
        mainJS.init();
    })();

});
