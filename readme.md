# Tweetvatar

### 1

You will need to login or signup for twitter. Grab your access tokens from the twitter developer site (https://apps.twitter.com/), then insert into 'get_tweets.php' where shown below.
```php
$settings = array(
    'oauth_access_token' => "YOUR_OAUTH_ACCESS_TOKEN",
    'oauth_access_token_secret' => "YOUR_OAUTH_ACCESS_TOKEN_SECRET",
    'consumer_key' => "YOUR_CONSUMER_KEY",
    'consumer_secret' => "YOUR_CONSUMER_SECRET"
);
```

### 2

Download UwAmp (https://www.uwamp.com/en/), and download the Tweetvatar project folder into UwAmps 'www' folder.

### 3

Launch 'UwAmp.exe'. Open the 'php_uwamp.ini' file by clicking the small file icon in the top right corner of the Configuration section.

Navigate to the '[curl]' section (just above the bottom of the file).
```
[curl]
; A default value for the CURLOPT_CAINFO option. This is required to be an
; absolute path.
; curl.cainfo = ""
```
### 4

Update 'curl.cainfo' with the file path to the 'cacert.pem' file in the project folder. Be sure to remove the semi-colon, so that it resembles the example below.

```
 curl.cainfo = "F:\UwAmp\www\GroupProj_SKMBTF\cacert.pem"
```

Save the file.

### 5

In the UwAmp window, launch the project by clicking 'Browser www' in the My Web section.