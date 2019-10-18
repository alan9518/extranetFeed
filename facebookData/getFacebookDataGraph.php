<?php
    
    //PHP Script to Get Permanent Acces Token and JSON Data
    //Using Facebook Graph API Credendtials AND HTTP  CALLS
    //Version 2
    //28/09/2017 

    // ------------------------- 
    // Allowed Petitions
    // ------------------------- 
       $allowedOrigins = array
       (
            "http://localhost:8080/socialMediaFeedNoComposer/",
            "http://localhost:8080/socialMediaFeed/",
            "https://flextronics365.sharepoint.com/sites/sandbox/pruebas_alan/SitePages/Home.aspx"

       );

    // ------------------------- 
    // Facebook Constants
    // -------------------------
    // Dummy Page
        // define('APP_ID','324274764701945');
        // define('APP_SECRET','04a38e3a5b491d1933b96c93ad43850e');
        // define('PAGE_ID','344714192619311');

    // Flex Page
        define('APP_ID','349738292137092');
        define('APP_SECRET','6186e8bea0fcadb0a1ea01ae4ec23c14');
        define('PAGE_ID','390981107628825');
        $fbData = array();
    
    // Allow Petition
        if (isset($_SERVER['HTTP_ORIGIN'])) {

            if (!in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins) ) {
                // Origin is not allowed
                exit;
            }

            // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
            // you want to allow, and if so:
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            // header('Access-Control-Allow-Credentials: true');
            // header('Access-Control-Max-Age: 86400');    // cache for 1 day
        }
        
            // Access-Control headers are received during OPTIONS requests
            // Deal with preflight request
            if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        
                if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                    // may also be using PUT, PATCH, HEAD etc
                    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
        
                if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        
                exit(0);
            }
    // ------------------------- 
    // Execute Facebook Methods
    // -------------------------
        
        // Create Long live Access Token
            $access_Token_URL = 'https://graph.facebook.com/oauth/access_token?client_id='.APP_ID.'&client_secret='.APP_SECRET.'&grant_type=client_credentials';
            // https://graph.facebook.com/oauth/access_token?client_id=349738292137092&client_secret=6186e8bea0fcadb0a1ea01ae4ec23c14&grant_type=client_credentials
        
        // Get Access Token
            $access_str = file_get_contents($access_Token_URL);
    
        // Prepare Token and clean result
            $tokenarr = str_replace('"','',$access_str);
    
        // Convert Result in array
            $tokenarray = explode(":",str_replace(',',':', $tokenarr));
            
        // Create the URL For The Graph API Connection and get the Data
            // $json_str = file_get_contents('https://graph.facebook.com/344714192619311?fields=posts.limit(5)%7Bcreated_time%2Cmessage%2Cfull_picture%2Clink%7D&access_token='.$tokenarray[1]);
            $json_str = file_get_contents('https://graph.facebook.com/390981107628825?fields=posts.limit(5)%7Bcreated_time%2Cname%2Cmessage%2Cfull_picture%2Clink%7D&access_token='.$tokenarray[1]);
            
            $data = json_decode($json_str);
            $fbData = json_encode($data,true);
            
        echo $fbData;
      
?>



