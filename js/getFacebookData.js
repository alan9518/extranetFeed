// Fetch Facebook Page Data
// Ajax Call To PHP Server
// Version 1
// 9/19/2017

(function ()
{
     // --------------------------------------
     // Create Module
     // --------------------------------------
        var getFacebookData = 
        {
            // --------------------------------------
            // Main Function
            // --------------------------------------
            init : function()
            {
                // var $facebookUrl = 'facebookData/getFacebookDataGraph.php';
                var $facebookUrl = 'https://mobileweb.flextronics.com/SharepointsiteRequest/socialMediaFeed/facebookData/getFacebookDataGraph.php'
                this.cacheDom();
                this.callData($facebookUrl);
            },
            // --------------------------------------
            // Get Parent container for The Social Media Boxes
            // --------------------------------------
            cacheDom:function()
            {
                this.$socialMediaContainer = $('#socialMediaContent');   
            },
            // --------------------------------------
            // Call PHP Service with AJAX
            // --------------------------------------
            callData: function($facebookUrl)
            {
                // Save Parent Reference
                var $that = this;
                $.ajax({
                    url:  $facebookUrl,
                    method : 'GET',
                    dataType : 'JSON',
                    contentType: 'html',
                    async:true,
                    // --------------------------------------
                    // Show Loading Spinner
                    // --------------------------------------
                    beforeSend: function()
                    {
                        console.log('Enviando Facebook');
                        $that.showLoaders(true);
                    },
                    // --------------------------------------
                    // Call function to Render data
                    // --------------------------------------
                    success :function(dataResult)
                    {
                        $that.handleAjaxSuccess(dataResult);
                    },
                    // --------------------------------------
                    // Render dummy data
                    // --------------------------------------
                    error:function(error)
                    {    
                         console.log(error.responseText);
                         $that.handleAjaxError();
                    },
                    // --------------------------------------
                    // Check if the final answer is valid
                    // If not, call the error handler
                    // --------------------------------------
                    complete:function(dataResult)
                    {
                         if(!typeof dataResult === 'object')
                         {
                            $that.handleAjaxError();
                         }
                        
                    }
                })
            },
            // --------------------------------------
            // Get Facebook Post Data
            // --------------------------------------
            handleAjaxSuccess: function($facebookPostObject)
            {   
                if($facebookPostObject === null) {
                    this.handleAjaxError();
                    return;
                }

                $facebookPostObject = this.filterJSONResponse($facebookPostObject.posts.data);
                var $lastPost    = $facebookPostObject[0];
                var $postTitle   = $lastPost.name || this.filterPostTitle($lastPost.message, 60);                
                var $postDate    =  this.createDate($lastPost.created_time);
                var $postMessage = this.filterPostTitle($lastPost.message, 80);
                var $postImage   = $lastPost.full_picture;
                var $postLink    = $lastPost.link;
                this.renderData($postTitle,$postDate,$postMessage,$postImage,$postLink);
            },
            // --------------------------------------
            // Filter the Facebook Array 
            // Look For Onnly Posts With Images
            // --------------------------------------
            filterJSONResponse:function($fbPost)
            {
                var $newPostObject = $fbPost.filter(function($post){
                    return $post.full_picture  &&
                           $post.link;
                });
                return $newPostObject;
            },
            // --------------------------------------
            // Reduce the length of the title and Message
            // If they are too long
            // --------------------------------------
            filterPostTitle:function($FBMessage, $maxLength)
            {
                var $titleArray = ($FBMessage.split('.'));
                var $reducedTitle = $titleArray[0].length > $maxLength ?
                                    $titleArray[0].substring(0,$maxLength) +"..." :
                                    $titleArray[0];
                return $reducedTitle;

            },
            // --------------------------------------
            // If There was an error on The Service Call
            // Show Previuos Post as Dummy Data until  
            // error is fixed
            // --------------------------------------
            handleAjaxError: function()
            {
                this.renderData('Intelligent Personal Robots Deliver Benefits of the Future... Today',
                                'August 7, 2018',
                                'Meet temi, a personal robot assistant built to enhance human abilities. Learn how the company behind the robot partnered with us to reduce mechanical costs by 20% and reach global markets..."',
                                'https://flex.com/sites/default/files/resize/styles/optimized/public/Temi-casestudy-flex-600x400.jpg?itok=tAtslL-p',
                                'https://flex.com/insights/case-studies/temi-personal-robot?utm_source=social&utm_medium=facebook&utm_campaign=Temi%20Personal%20Robot&sf90927618=1');
            },
            // --------------------------------------
            // Show Loader for Post
            // --------------------------------------
            showLoaders: function(showLoader)
            {
                var $loaderShowing = false;
                var spinnerDiv = document.createElement('div');
                if(showLoader){
                    
                    spinnerDiv.className = 'spinner';

                    var cubeDivOne = document.createElement('div');
                    cubeDivOne.className = 'cube1';
                
                    var cubeDivTwo = document.createElement('div');
                    cubeDivTwo.className = 'cube2';

                    $(cubeDivTwo).appendTo(spinnerDiv);
                    $(cubeDivOne).appendTo(spinnerDiv);
                    $(spinnerDiv).appendTo(this.$socialMediaContainer);
                    
                    $loaderShowing = true;
                }
                // If its already Showing it, hide it
                if(!$loaderShowing)
                    this.$socialMediaContainer.find('.spinner').hide();
                
            },
            // --------------------------------------
            // Display Facebook Post
            // --------------------------------------
            renderData: function($postTitle,$postDate,$postMessage,$postImage,$postLink)
            {
                
                // Post Container
                    var mediaContainerRowColumn = document.createElement('div');
                        mediaContainerRowColumn.className = 'column1 div-block-7';
                
                // Post Column
                    var FBPostMediaContainerInnerColumn = document.createElement('div');
                        FBPostMediaContainerInnerColumn.className = 'col-div w-clearfix';
                        FBPostMediaContainerInnerColumn.style.background =  "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('" + $postImage + "') no-repeat center ";
                        FBPostMediaContainerInnerColumn.style.backgroundSize  = 'cover';
                
                // Icon Container
                    var FBIconContainer = document.createElement('div');
                        FBIconContainer.className = 'social-icon';

                // Icon
                    var FBIcon = document.createElement('img');
                        FBIcon.src = 'https://extranetpoc.flex.com/sites/arturo/SiteAssets/Landing%20Page/images/fbicon.png';     
                        FBIcon.className = 'image-15';                   

                // Text and Title Container
                    var FBPostContentContainer = document.createElement('div');
                        FBPostContentContainer.className = 'col-cont';   
                    
                // Post Title
                    var FBPostTitle = document.createElement('p');
                        FBPostTitle.className = 'col-title col-titleFB';
                        FBPostTitle.appendChild(document.createTextNode($postTitle));

                
                // Post Date
                    var FBPostDate = document.createElement('p');
                        FBPostDate.className = 'col-para';
                        FBPostDate.appendChild(document.createTextNode($postDate));


                // Post Message
                    var FBPostContent = document.createElement('p');
                        FBPostContent.className = 'col-para';
                        FBPostContent.appendChild(document.createTextNode($postMessage));
                
                // Post Link
                    var FBPostButton = document.createElement('a');
                        FBPostButton.appendChild(document.createTextNode('Read the story'));
                        FBPostButton.href = $postLink;
                        FBPostButton.setAttribute('target', '_blank');
                        FBPostButton.className = 'col-button w-button';

                // Append Components
                    $(FBIcon).appendTo(FBIconContainer);    
                    $(FBIconContainer).appendTo(FBPostMediaContainerInnerColumn);
                    $(FBPostTitle).appendTo(FBPostContentContainer);
                    $(FBPostDate).appendTo(FBPostContentContainer);
                    $(FBPostContent).appendTo(FBPostContentContainer);
                    $(FBPostButton).appendTo(FBPostContentContainer);
                    $(FBPostContentContainer).appendTo(FBPostMediaContainerInnerColumn);
                    $(FBPostMediaContainerInnerColumn).appendTo(mediaContainerRowColumn);
        
                // Append Main Container of Facebook Post and Hide Loader
                    $(mediaContainerRowColumn).appendTo(this.$socialMediaContainer);
                    this.showLoaders(false);
            },
            // --------------------------------------
            // Parse Facebook Post Creation Date
            // 2017-09-19T17:19:37+0000
            // September 19, 2017
            // -------------------------------------- 
            createDate: function($postDate)
            {
                var $split = $postDate.split(':');
                var $splitDate = $split[0];
                    $splitDate = $splitDate.slice(0, $splitDate.search("T"));
                    $splitDate = $splitDate.replace(new RegExp('-', 'g'),'/');
                var $postCreationDate = new Date($splitDate);
                var $month =  [
                        "January", "February", "March", "April", 
                        "May", "June","July", "August", "September", 
                        "October", "November", "December"
                ]    [$postCreationDate.getMonth()];
                var $fullDate = $month + ' ' +  $postCreationDate.getDate() + ', ' + $postCreationDate.getFullYear();
                return($fullDate);
            }
        };

        // Start Module
        getFacebookData.init();

    })();
