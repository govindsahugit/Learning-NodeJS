Base-64 in NodeJS

    When we write a file in base64 the file size increases by 1.3 times

    You can use the following command as well to get the base64 encoded data:
    >  base64 image.png

    If you want to get the URL of the image. Then you can use the following command:
    >  echo "data:image/png;base64,$(base64 image.png)"

    This encoding exist cuz some communication system are only text-based

    Base64url ? 
        It remove the = sign from last if exist, and +, / is replaced by -, _
        It is used for sending data in query params