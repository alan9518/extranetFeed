/* 
  Module to Create Dynamic Links on the Side box
  Version 4
  19/10/2017
*/


// ---------------------------------------------------
// Box Creation Module
// ---------------------------------------------------
(function (){
    // -----------------------------------------------
    // Create Module
    // -----------------------------------------------
        var boxContent = 
        {
            
            // Main Function
            init:function()
            {
                this.$current_Site_Coll_URL = _spPageContextInfo.webAbsoluteUrl;
                this.$current_User_Id = _spPageContextInfo.userId;
                this.getUserType();
                this.bindEvents();    
            },
            // --------------------------------------
            // Get User Type From API
            // --------------------------------------
            getUserType: function()
            {
                this.callSharepointService();
            },
            // --------------------------------------
            // Call Sharepoint Service
            // --------------------------------------
            callSharepointService:function()
            { 
                var $that = this;
                var $serviceURL = this.$current_Site_Coll_URL + '/_api/web/GetUserById('+this.$current_User_Id+')/?$expand=groups';
                var $isOwner;
                var req;
                if (window.XMLHttpRequest) 
                    req = new XMLHttpRequest();
                else 
                    req = new ActiveXObject("Microsoft.XMLHTTP");

                    req.open('GET', $serviceURL, false); 
                    req.send(null);
                    if (req.status == 200)
                        $that.handleAjaxSharepointSuccess(req.responseXML);

            },
            // --------------------------------------
            // Get the XML and determine if the user 
            // is Owner or  not
            // --------------------------------------
            handleAjaxSharepointSuccess:function($dataResult)
            {
                var $owners = $dataResult.getElementsByTagName('d:LoginName');
                var  $isOwner = $owners[0].textContent.toLocaleLowerCase();
                this.getUserInteralStatus($isOwner);
            },
            // --------------------------------------
            // Display Message that the User could 
            // not be retrieved
            // --------------------------------------
            handleAjaxSharepointError:function()
            {
                console.log("Couldn't retrieve the User");
            },
            // --------------------------------------
            // Determine if the User is interal or external
            // Syncronous Get Request
            // --------------------------------------
            getUserInteralStatus:function($isOwner )
            {
                var $serviceURL = this.$current_Site_Coll_URL + '/_api/web/SiteUserInfoList/Items('+this.$current_User_Id+')';
                var req;
                if (window.XMLHttpRequest) 
                    req = new XMLHttpRequest();
                else 
                    req = new ActiveXObject("Microsoft.XMLHTTP");

                    req.open('GET', $serviceURL, false); 
                    req.send(null);
                    if (req.status == 200)
                        this.isInternalOrExternal($isOwner,req.responseXML);

            },
            // --------------------------------------
            // Determine if the User is interal or external
            // Syncronous Get Request
            // --------------------------------------
            isInternalOrExternal:function($isOwner,$userData)
            {   
                var $isInternal = $userData.getElementsByTagName('content')[0].getElementsByTagName('d:UserType')[0].textContent.toLocaleLowerCase();
                $isOwner.search('owners') > 0 ?
                    this.createJSONLinks(true,$isInternal):
                    this.createJSONLinks(false,$isInternal);
            },
            // --------------------------------------
            // Create the JSON Array
            // With the links Information
            // --------------------------------------
            createJSONLinks:function($isOwner,$isInternal)
            {
                var $links;
                if($isOwner == true)
                {
                    switch($isInternal)
                    {
                        case "internal":
                                        $links = [
                                            {
                                                'link':'#',
                                                'image':'https://extranetpoc.flex.com/sites/arturo/SiteAssets/Landing%20Page/images/accounts.png',
                                                'message':'Extranet Account',
                                            },
                                            {
                                                'link':'#',
                                                'image':'https://extranetpoc.flex.com/sites/arturo/SiteAssets/Landing%20Page/images/support.png',
                                                'message':'Extranet Support',
                                            },
                                            {
                                                'link':'#',
                                                'image':'https://extranetpoc.flex.com/sites/arturo/SiteAssets/Landing%20Page/images/training.png',
                                                'message':'Extranet Training',
                                            },
                                            {
                                                'link':'#',
                                                'image':'https://extranetpoc.flex.com/sites/arturo/SiteAssets/Landing%20Page/images/accounts.png',
                                                'message':'User Retention',
                                            }
                                        ];
                                        break;
                        case "external":
                                        $links = [
                                            {
                                                'link':'#',
                                                'image':'https://extranetpoc.flex.com/sites/arturo/SiteAssets/Landing%20Page/images/accounts.png',
                                                'message':'Extranet Account',
                                            },
                                            {
                                                'link':'#',
                                                'image':'https://extranetpoc.flex.com/sites/arturo/SiteAssets/Landing%20Page/images/support.png',
                                                'message':'Extranet Support',
                                            },
                                            {
                                                'link':'#',
                                                'image':'https://extranetpoc.flex.com/sites/arturo/SiteAssets/Landing%20Page/images/training.png',
                                                'message':'Extranet Training',
                                            }
                                        ];
                                        break;
                        default :  $links = null;
                    }
                }
                else
                {
                    $links = [
                        {
                            'link':'#',
                            'image':'https://extranetpoc.flex.com/sites/arturo/SiteAssets/Landing%20Page/images/support.png',
                            'message':'Extranet Support',
                        }
                    ];
                }

                // Render Links
                this.render($links); 
                
               
            },
            // --------------------------------------
            // Create HTML Content
            // --------------------------------------
            createDom: function($data)
            {
            // Parent Container
                var $flexGrid = document.createElement('div');
                    $flexGrid.className = 'flex-grid';
                    $flexGrid.id = 'flex-grid';

            
            // Icons Container
                var $borderBox =  document.createElement('div');
                    $borderBox.className = 'border-box hideBox';
                    $borderBox.id = 'border-box'

            // Useful Links Container
                var $linkBox =  document.createElement('div');
                    // $linkBox.className = 'link-box';
                    $linkBox.id = 'link-box'
               
                    
                if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) 
                    $linkBox.className = 'link-box link-boxIE';
                else
                    $linkBox.className = 'link-box  link-boxChrome';
                
                console.log($data.length);
                if($data.length === 4)
                {
                   var boxClasses =  $linkBox.classList;
                   boxClasses.add("box4");
                 }
            
            // Useful Links Text       
                $flexGrid.appendChild($borderBox);
                $flexGrid.appendChild($linkBox);
                if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) 
                // IE
                    $linkBox.innerHTML = '<p class="vertical" style="white-space: nowrap; line-height:50px;"> Links </p>&nbsp; <p class="vertical" style="white-space: nowrap; line-height:40px;">Useful</p>';
                else
                // Chrome
                    $linkBox.innerHTML = '<p class="vertical" style="white-space: pre-wrap;"> Links </p>&nbsp; <p class="vertical"  style="white-space: pre-wrap;">Useful</p>';
                
            // Create Links and Icons
                for (var i = 0, len = $data.length; i < len; i++)
                {

                    // Each Link and Icon Container
                    var $iconBox = document.createElement('div');
                        $iconBox.className = 'icon-box';
                        
                    // Links
                    var $link = document.createElement('a');
                        $link.href = $data[i].link;
                    
                        // Set Different ID for 
                        if(i===3)
                            $link.id = 'linkModal';
                        else
                            $link.id = 'link'+ i;
 
                    // Message
                    var $text = document.createElement('span');
                        $text.innerText = $data[i].message;
                        
                    // Icon Container
                    var $icon = document.createElement('div');
                        $icon.className = 'icono';
                           
                    // Icon
                    var $imageBox = document.createElement('img');
                        $imageBox.src = $data[i].image;
                        $imageBox.className = 'icon-image';
                        $('.icon-image').appendTo($icon);

                    // Append Items
                        $borderBox.appendChild($iconBox);
                        $iconBox.appendChild($link);
                        $link.appendChild($icon);
                        $link.appendChild($text);
                        $icon.appendChild($imageBox);

                }

            // Return Box Object
                return $flexGrid;

            },
            // --------------------------------------
            // Set Box Events
            // --------------------------------------
            bindEvents : function()
            {
                // Set Click Event for Microsoft Edge
                var listenType = (navigator.userAgent.toLowerCase().indexOf('edge') != -1) ? 'mousedown' : 'click';
                $('body').on(listenType, '.link-box',this.toggleBox.bind(this) );
                $('body').on(listenType, '#linkModal',this.openDialog.bind(this) );
            },
            // --------------------------------------
            // Display the elements on the Screen
            // --------------------------------------
            render: function($links)
            {
              
                var $data = $links
                $('body').append(this.createDom($data));
               

            },
            // --------------------------------------
            // Show and Hide Box
            // --------------------------------------
            toggleBox:function()
            {

                $('#border-box').toggleClass(' hideBox ');
                $('#flex-grid').toggleClass(' gridIndex ');
               
            },
            // --------------------------------------
            // Open Dialog
            // --------------------------------------
            openDialog:function(event)
            {
                event.preventDefault();
                var $url = 'https://extranetpoc.flex.com/sites/cisco//SitePages/UserRetentionProcess.aspx?url='+this.$current_site_coll_URL;
                var $dialogOptions = SP.UI.$create_DialogOptions();
                    $dialogOptions.title = 'User Retention';
                    $dialogOptions.url = $url;
                    $dialogOptions.allowMaximize = true;
                    $dialogOptions.width = 1000;
                    $dialogOptions.height = 620;

                SP.UI.ModalDialog.showModalDialog($dialogOptions);
                return false;
            }
        };

      
        // Call Module
        boxContent.init();
       
})();



