// Fetch Twitter Page Data
// Ajax and TwitterOAuthn Library
// Version 1
// 9/20/2017

    
(function()
{
      // --------------------------------------
      // Create Module
      // --------------------------------------
        var getTwitterData =  
        {
            // --------------------------------------
            // Main Function
            // --------------------------------------
            init:function()
            {
                // var $twitterUrl = 'twitterData/getTwitterData.php';
                var $twitterUrl = 'https://mobileweb.flextronics.com/SharepointsiteRequest/socialMediaFeed/twitterData/getTwitterData.php';
                this.cacheDom();
                this.callTwitterData($twitterUrl);
                this.$twitterPostObject = {};
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
            callTwitterData: function($twitterUrl)
            {
                var $that = this;
                $.ajax({
                    url:$twitterUrl,
                    method: 'GET',
                    dataType: 'JSON',
                    async:true,
                    beforeSend: function()
                    {
                        console.log('Requesting Twitter Data');
                    },
                    success: function(dataResult,response)
                    {
                        $that.$twitterPostObject = dataResult;
                        $that.handleAjaxSuccess();
                    },
                    error: function(error)
                    {
                        $that.handleAjaxError();
                    },
                    complete:function(dataResult)
                    {
                        if(!typeof dataResult === 'object')
                        {
                            $that.handleAjaxError();
                        }
                    }
                    
                });

            },
            // --------------------------------------
            // Get Twitter Post Data 
            // Is Successfull
            // --------------------------------------
            handleAjaxSuccess: function()
            {
               
                var $lastTweet  = this.filterJSONResponse(this.$twitterPostObject)[0];
                var $tweetDate  = $lastTweet.created_at;
                var $tweetTags  = '#'+$lastTweet.entities.hashtags[0].text;
                var $tweetText  = this.decodeEntities($lastTweet.full_text);               
                var $tweetlink  = $lastTweet.id;
                var $tweetUser  = $lastTweet.user.screen_name;
                var $tweetImage;
                if(typeof($lastTweet.extended_entities) === "undefined")
                    $tweetImage = this.handleNoImageTweet($tweetImage);
                else
                    $tweetImage = $lastTweet.extended_entities.media[0].media_url_https 
                                  ||  $lastTweet.entities.media[0].media_url_https ;
                                                         ;
                this.renderData($tweetDate,$tweetTags,$tweetText, $tweetImage, $tweetlink, $tweetUser);
            },
            // --------------------------------------
            // Look For Retweeted Tweets
            // And Tweets that Doesn't Have Hashtags
            // And Remove Them From the Data to wok With
            // --------------------------------------
            filterJSONResponse:function($tweetObject)
            {   
                var $newTweetObject = $tweetObject.filter(function($tweet){
                    return !$tweet.retweeted_status   &&
                            $tweet.retweeted == false &&
                            $tweet.entities.hashtags.length > 0 &&
                            $tweet.entities.media;
                });
                return $newTweetObject;
                
            },
            // --------------------------------------
            // If There was an error on The Service Call
            // Show Previuos Post as Dummy Data until  
            // error is fixed
            // --------------------------------------
            handleAjaxError:function()
            {
                this.renderData('September 20, 2017','#AugmentedReality','Why #AugmentedReality and #VirtualReality will be important for your business. via(@Entrepreneur) https://t.co/cq7l5jBsBC', 'https://pbs.twimg.com/media/DKLqTVWVoAE0e0W.jpg', '910547717453078528', 'alanmed78242995');
            },
            // --------------------------------------
            // Display Twitter Post
            // --------------------------------------
            renderData: function($tweetDate,$tweetTags,$tweetText, $tweetImage, $tweetlink,$tweetUser)
            {
                console.log('Rendering Twitter');

            // Twitter Column
                var mediaContainerRowColumn = document.createElement('div');
                    mediaContainerRowColumn.className = '_2 column1';
            
            // Background Image
                var TWPostMediaContainerInnerColumn = document.createElement('div');
                    TWPostMediaContainerInnerColumn.className = '_2 col-div w-clearfix';
                    TWPostMediaContainerInnerColumn.style.background =  "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('" + $tweetImage + "') no-repeat center";
                    TWPostMediaContainerInnerColumn.style.backgroundSize  = 'cover';

            // Icon Container
                var TWIconContainer = document.createElement('div');
                    TWIconContainer.className = '_2 social-icon';
            
            // Icon 
                var TWIcon = document.createElement('img');
                    TWIcon.src = 'https://extranetpoc.flex.com/sites/arturo/SiteAssets/Landing%20Page/images/twittericon.png';    
                    TWIcon.className = 'image-16';
            
            // Content container 
                var TWPostContentContainer = document.createElement('div');
                    TWPostContentContainer.className = 'col-cont';  

            // Title
                var TWPostTitle = document.createElement('p');
                    TWPostTitle.className = 'col-title col-titleTW col-tag';
                    TWPostTitle.appendChild(document.createTextNode($tweetTags));

            // Post Date
                var TWPostDate = document.createElement('p');
                    TWPostDate.className = 'col-para';
                // Check For Internet Explorer
                    if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent))  
                        TWPostDate.appendChild(document.createTextNode(this.createDateIE($tweetDate)));   
                    else
                // Is Chrome
                    TWPostDate.appendChild(document.createTextNode(this.createDate($tweetDate)));

            // Post Text
                var TWPostContent = document.createElement('p');
                    TWPostContent.className = 'col-para';
                    TWPostContent.appendChild(document.createTextNode($tweetText));

            // Link Button
                var TWPostButton = document.createElement('a');
                    TWPostButton.appendChild(document.createTextNode('View the Tweet'));
                    TWPostButton.href = this.createLink($tweetlink, $tweetUser);
                    TWPostButton.setAttribute('target', '_blank');
                    TWPostButton.className = 'col-button w-button';

            // Append All the Items
                    $(TWIcon).appendTo(TWIconContainer);    
                    $(TWIconContainer).appendTo(TWPostMediaContainerInnerColumn);
                    $(TWPostTitle).appendTo(TWPostContentContainer);
                    $(TWPostDate).appendTo(TWPostContentContainer);
                    $(TWPostContent).appendTo(TWPostContentContainer);
                    $(TWPostButton).appendTo(TWPostContentContainer);
                    $(TWPostContentContainer).appendTo(TWPostMediaContainerInnerColumn);
                    $(TWPostMediaContainerInnerColumn).appendTo(mediaContainerRowColumn);

                   
            // Append the Parent
                    $(mediaContainerRowColumn).appendTo(this.$socialMediaContainer);

            },
            // -------------------------------------------
            // Parse Twitter Post Creation Date for Chrome
            // Thu Sep 21 16:20:31 +0000 2017
            // September 21, 2017
            // -------------------------------------------
            createDate: function(postDate)
            {
                var $postCreationDate = new Date(postDate);
                var $monthName = this.getMonthName($postCreationDate.getMonth());
                var fullDate = $monthName + ' ' +  $postCreationDate.getDate() + ', ' + $postCreationDate.getFullYear();
                return(fullDate);
            },
            // -------------------------------------------
            // Select Month From Array
            // -------------------------------------------
            getMonthName: function(monthIndex){
                var $month =  [
                    "January", "February", "March", "April", 
                    "May", "June","July", "August", "September", 
                    "October", "November", "December"
                ] [monthIndex];
                return ($month);
            },
            // --------------------------------------
            // Parse Twitter Post Creation Date for IE
            // Thu Sep 21 16:20:31 +0000 2017
            // September 21, 2017
            // --------------------------------------
            createDateIE: function(postDate){
                var $monthArray = {"Jan":0, "Feb":1, "Mar":2, "Apr":3, "May":4, "Jun":5, "Jul":6, "Aug":7, "Sep":8, "Oct":9, "Nev":10, "Dec":11};
                //get the values from the string
                var regex = /^[^ ]+ ([^ ]+) (\d{1,2}) (\d{2}):(\d{2}):(\d{2}) \+(\d{4}) (\d{4})$/;
                match = regex.exec(postDate);
                var $month   = $monthArray[match[1]],
                    $date    = match[2],
                    $hours   = match[3],
                    $minutes = match[4],
                    $seconds = match[5],
                    $ms      = match[6],
                    $year    = match[7];
                
                var $postCreationDate = new Date($year, $month, $date, $hours, $minutes , $seconds, $ms);
                var $fullDate = this.getMonthName($postCreationDate.getMonth()) +  '  '  + 
                                $postCreationDate.getDate() + ', ' + 
                                $postCreationDate.getFullYear();
                return($fullDate);

            },
            // --------------------------------------
            // Create Link to see the Post on Twitter
            // --------------------------------------
            createLink: function(tweetLink, tweetUser)
            {
                var $link = 'https://twitter.com/'+tweetUser+'/status/'+tweetLink;
                return $link;
            },
            // --------------------------------------
            // If the Api sends back a Tweet Without Media
            // Look for another Image to set
            // --------------------------------------
            handleNoImageTweet:function($tweetImage){
                $tweetImage = 'https://flextronics365.sharepoint.com/sites/sandbox/pruebas_alan/SiteAssets/img/flex_logo_detail.png';
                return $tweetImage;
            },
            // --------------------------------------
            // Transform Plain text Returned From The
            // Twitter API
            // Remove The Doublequotes
            // --------------------------------------
            decodeEntities: function($text)
            {
                $text = $text.replace(/"/g, "'");
                var textArea = document.createElement('textarea');
                textArea.innerHTML = $text;
                return textArea.value;
            }

        };

        // Start Module
        getTwitterData.init();
    })();
