# Chessboard-CAPTCHA
Prototype of the authorial CAPTCHA scheme with a website for usability testing.

* [**WEBSITE with Chessboard-CAPTCHA**](https://mkuchno.github.io/Chessboard-CAPTCHA/)

  * The language of the text in the Chessboard-CAPTCHA and on the website is Polish, because they were prepared for the purposes of the master's thesis written in Polish.
  * You can run the Chessboard-CAPTCHA on this website, but remember that usability testing is complete.

<details>
  <summary>TABLE OF CONTENTS</summary>
  <ul>
    <li><a href="#description">Description</a></li>
    <li><a href="#chessboard-captcha-on-different-devices">Chessboard-CAPTCHA on different devices</a></li>
    <li><a href="#how-to-add-chessboard-captcha-to-your-website">How to add Chessboard-CAPTCHA to your website</a></li>
    <li><a href="#languages">Languages</a></li>
    <li><a href="#license">License</a></li>
  </ul>
</details>

## Description
Chessboard-CAPTCHA is a new original CAPTCHA solution based on chessboard,</br> it is fully responsive and easy to use on your website.

The user's task is to indicate the field on the chessboard with the given coordinates. The given coordinates are randomly selected and distorted. The chessboard symbols are standard, but each time they are mixed up with each other and assigned to different fields. A single Chessboard-CAPTCHA task allows you to generate a new task twice.

## Chessboard-CAPTCHA on different devices
<img src="https://user-images.githubusercontent.com/62030541/140007376-480ae4e9-08b7-4daa-94f4-e94ad8ee3392.png" alt="pad" width="50%" height="50%"><img src="https://user-images.githubusercontent.com/62030541/140007571-aeaebe8b-9820-438c-8667-093234ddfb49.png" alt="phone" width="30%" height="30%">
<img src="https://user-images.githubusercontent.com/62030541/140007576-4d6aee39-b0df-40f2-afeb-cedf3198e8ef.png" alt="computer1" width="80%" height="80%">
<img src="https://user-images.githubusercontent.com/62030541/140007578-86fb21b5-4364-45e5-ae8f-e311060c534f.png" alt="computer2" width="80%" height="80%">

## How to add Chessboard-CAPTCHA to your website
1. [Download](https://downgit.github.io/#/home?url=https://github.com/mkuchno/Chessboard-CAPTCHA/tree/main/captcha) the necessary captcha folder with the required files.
2. Extract and place the downloaded captcha folder in the folder with the HTML file where you want to add the Chessboard-CAPTCHA.
3. In this HTML file, add links to external CSS and JavaScript files from captcha folder, and also add a link to Font Awesome 4 because Chessboard-CAPTCHA use it.

    `<head>`

    ```html
    <script src="captcha/captcha.js"></script>
    <link rel="stylesheet" type="text/css" href="captcha/captcha.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    ```
    
    `</head>`
    
4. Now you can create HTML `<button>` tag with "captcha-release" class.
   This button opens the Chessboard-CAPTCHA and then takes the class "captcha-true" or "captcha-false" depending on the result of the challenge.

    `<body>`

    ```html
    <button class="captcha-release">CAPTCHA</button>
    ```
    
    `</body>`

5. Important notes:

    :bulb: To exclude errors related to the display of the Chessboard-CAPTCHA, make sure that the `<body>` tag does not have any changes to the appearance, it is best to wrap the page content in a container with the appropriate class or identifier and assign `<body>` tag styles to it.

    ```html
    <body> <!-- zero CSS rules -->
      <div id="page"> <!-- all CSS rules from the <body> tag are here -->
        <button class="captcha-release">CAPTCHA</button>
      </div>
    </body>
    ```

    :bulb: It is up to you how you use the added class ("captcha-true" or "captcha-false") to the button that triggers the Chessboard-CAPTCHA and when you deactivate that button.
    
    For example, on a page in this repository, the buttons that launched Chessboard-CAPTCHA are deactivated after one execution, and the number of correct answers is counted based on the number of occurrences of the "captcha-true" class.
      
      * [index.html](https://github.com/mkuchno/Chessboard-CAPTCHA/blob/main/index.html)
      * [index.js](https://github.com/mkuchno/Chessboard-CAPTCHA/blob/main/index.js)
      
6. Now you just only need to translate the text in the Chessboard-CAPTCHA from Polish to your language.

## Languages
* HTML5
* CSS3
* JavaScript (ES5/ES6)

## License
This project is licensed under the MIT License.