# Electron-Progressbar
electronjs-progressbar is a lightweight lib that adds a progressbar to the top of your window view. Progressbar type currently support determinate or intermediate. It is simple and easy to implement and requires only the `body` element of the page present. 

# Installation
`
npm i electronjs-progressbar
`
or visit https://www.npmjs.com/package/electronjs-progressbar

# Configuration
`baseBackground`      :     `color (default: transparent)` (This defines the background color of the parent element of the progressbar)
<br/>
<br/>
`progressBackground`  :     `color [optional] (default: blue)` (I really consider blue to be a cool and nice color for the progressbar background)
<br/>
<br/>
`type`                :     `options[ "D", "I"] [optional] (default = "D")`  (Sets the type of progressbar to either `determinate` or `intermediate` using letters `D` or `I` respectively
<br/>
<br/>
`speed`               :     `integer [optional] (default = 3)`   (Sets the progress speed using this attribute)
<br/>
<br/>
`maxProgressWidth`    :     `integer [optional] (default = 20)`  (Sets the max width of the progressbar)
<br/>
<br/>
 `barHeight`          :     `integer [optional] (default = 3)`  (Sets the height of the progressbar) 
<br/>
<br/>
`customProgressCss`           :     `String [optional]` (Sets your custom css for progressbar, for example "margin-top: 10px; width: 50%")
<br/>
<br/>
`customCss`           :     `String [optional]` (Sets your custom css for progressbar's container, for example "margin-top: 10px; width: 50%")

# Properties
`progressbar.COMPLETED`     `Equals to "C" and triggers progressbar completion`
<br/>
<br/>
`progressbar.LOADING`       `Equals to "L" and sets progressbar state as loading`
<br/>
<br/>
`progressbar.progressBarID`       `Gets progressbar's id usually "electronjsprogressbar"`

# Usage

    //import the library
    const createProgressBar = require('electronjs-progressbar');

    //initialize progressbar
    const config = {
            progressBackground: "blue",
            type: "D",
            speed: 5
          };
          
    var progressbar = createProgressBar({
          config
          });

    /**
    * or inline initialize
    * var progressbar = createProgressBar({
    *       
    *    });
    **/
    
    //start progressbar
    progressbar.setProgressStatus();
    
    //complete progressbar using
    //progressbar.setProgressStatus("C"); or progressbar.setProgressStatus(progressbar.COMPLETED);
    //for a live simulation I would call this after 3000 milliseconds to actually show the progressbar loading
    
    setTimeout(function(){
      progressbar.setProgressStatus(progress.COMPLETED);
    }, 3000);


