// Custom Sharepoint JS
// Version 2
// 10/23/2017

(function (){
    
        var custom = 
        {
            init:function()
            {
                this.$clientContext =  new SP.ClientContext.get_current();
                this.mySites(this.$clientContext);
            },
            mySites:function($clientContext)
            {
                var $web = this.$clientContext.get_web();
                var $user = $web.get_currentUser();
                this.$clientContext.load($user);
                this.getUserInformation($user);
            },
            getUserInformation:function($user)
            {
                var $that = this;
                var $username = $user.get_loginName();
                var $peopleManager = new SP.UserProfiles.PeopleManager(this.$clientContext);
                var $propertyName = "FirstName";
                var $targetUser = $username;
                var $userProfileProperty = $peopleManager.getUserProfilePropertyFor($targetUser, $propertyName);
                this.$clientContext.executeQueryAsync($that.handleQuerySuccess($userProfileProperty), $that.handleQueryFail);
                
            },
            handleQuerySuccess:function($userProfileProperty)
            {
                console.log($userProfileProperty)
                var $currentusername = $userProfileProperty.get_value();
                console.log($currentusername); 
                $("#currentuser").append('<h1 class="welcome-title"><span style="color: #FFFFFF">Hello ' + $currentusername + ',</span> <span style="color: #009add">Welcome<br>to the Flex Extranet</span></h1>');
                
            },
            handleQueryFail:function($sender, $args)
            {
                console.log("Error: " + $args.get_message());
            }
    
        }
    
    
        custom.init();
    
    })(); 