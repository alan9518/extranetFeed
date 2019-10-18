<?php
    // PHP Script to Connect to Twitter API 
    // Using TwitterOAuth Library
    // Version 1
    // 9/20/2017 

    // Call Dependences with Composer
    require "../lib/twitteroauth/autoload.php";
    use Abraham\TwitterOAuth\TwitterOAuth;
    header('Content-Type: application/json; charset=utf-8');
      

    // Define Twitter API Credentials of the APP Test Page
    // define('CONSUMER_KEY','T6luIm8YbhwHf1GRn5G1K56j9');
    // define('CONSUMER_SECRET','hjtRmikahFYOPAu370QCs6dp0GvIHRK4odxfEfji9tX1Xhk41e');
    // define('ACCESS_TOKEN','908018439939284992-5YIAFPA502xz1ObVgm5XmDP0H4P0Sgt');
    // define('ACCESS_TOKEN_SECRET','HbDilLuAgvNOOA6b3i1y579vpTW6uovuzYPuXqYHhv7f8');


    // Define Twitter API Credentials of Flex Page
    define('CONSUMER_KEY','yR64tNXRsw5qeaJ3Tr020EZ43');
    define('CONSUMER_SECRET','vIcoEwQyQ6vywrJfFhdEnQCnPEuNE3xdoRHfUpblkd5X2QG6aZ');
    define('ACCESS_TOKEN','733313718-hOF8mwx1DvfQ2xEegJwJPqtUJx3eGqDyIFkAluFy');
    define('ACCESS_TOKEN_SECRET','tX1g6p3utTAfU9fXwa0K9XgBkfvAN12Dfq129fg2zfioZ');

   

    // Create Connection with TwitterOAuth
    try
    {
        $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
        $content = $connection->get("account/verify_credentials");
    
        // Get Latest Tweet Aas a json Object
        // $statuses = $connection->get("statuses/home_timeline", 
        //                             [
        //                              "count" => 5, 
        //                              "exclude_replies" => true,
        //                              "exclude_retweets" => true, 
        //                              "tweet_mode" => "extended",
        //                              "include_entities" => true,
        //                              "compatibility_mode" => "extended"
        //                             ]);

        $statuses = $connection->get("statuses/user_timeline", 
        [
         "count" => 5, 
         "exclude_replies" => true,
         "exclude_retweets" => true, 
         "tweet_mode" => "extended",
         "include_entities" => true,
         "compatibility_mode" => "extended"
        ]);
                                    
        $twData = json_encode($statuses,true);
    }
    catch(Exception $e)
    {
        echo $e->getMessage();
    }
     
    // Return Tweet
     echo $twData;
   
   

?>