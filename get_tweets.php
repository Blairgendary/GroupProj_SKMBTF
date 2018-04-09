<?php

require_once('TwitterAPIExchange.php');


$settings = array(
    'oauth_access_token' => "2720284888-IH0xwtOOy6kTId31hdrA0LICOw8P4C9MvUQBKMx",
    'oauth_access_token_secret' => "IKu02oc4MfDdHQcCpkNyIGeqYfI6i7rHlWP8p5aJVVOdm",
    'consumer_key' => "U4W8y8UShFwtqEFJdkQyna3wA",
    'consumer_secret' => "h7G5zAPkSqcm2a9qj81OLoVnCCbf35DdOpmvCEOLHGYwGU4Klf"

);

// ?screen_name=sbukkit&count=40&include_rts=true
// 

// these are the fields that you change for your project
$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$getfield = '?screen_name=sbukkit&count=20&include_rts=true';
$requestMethod = 'GET';

$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
    ->buildOauth($url, $requestMethod)
    ->performRequest();


?>


