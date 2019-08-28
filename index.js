'use-strict'

/*
*   @param config
*   return Object object
*/

module.exports = function (config) {
    
    /*
    *   Define and initialise the progressbar types
    *   D -> determinate progress
    *   I -> Intermediate progress
    */
    const type1 = "D";
    const type2 = "I";
    
    //sets a default progressbar max width
    let Imax = 20;

    //sets user custom css if != ""
    const customCSS = "";
    const customProgressCSS = "";

    //if user initiates without a custom configuration use this
    //else use user's configuration
    if(config == null){
        
        //new config object
        config = {};

        //sets progressbar parent's background
        config.baseBackground = "#00000000";

        //sets progressbar background color
        config.progressBackground = "blue";

        //sets progress type [D or I]
        config.type = type1;

        //sets progressbar speed
        config.speed = 3;

        //sets a max width for progressbar
        config.maxBarWidth = 20;

        //sets the progressbar height
        config.barHeight = 3;

        //sets custom container
        config.container = "body";
    } else {
        
        //sets custom value for the config elements
        if(config.container == null) config.container = "body";

        if(config.baseBackground == null) config.baseBackground = "#00000000";
        
        if(config.progressBackground == null) config.progressBackground = "blue";

        if(config.type == null) config.type = type1;

        if(config.speed == null) config.speed = 3;

        if(config.maxBarWidth != null) Imax = config.maxBarWidth;

        if(config.barHeight == null) config.barHeight = 5;

        if(config.customCSS != null) customCSS = config.customCSS;

        if(config.customProgressCSS != null) customProgressCSS = config.customProgressCSS;
    }

    //create an object
    const obj = {};

    //Assigns variable 
    const type = config.type;
    const speed = config.speed;
    const barHeight = config.barHeight;
    let innerProgress = 0;
    let end = false;
    let progressLevel = 0;

    //set default object properties that can be used
    //LOADING states that the progressbar is still working
    obj.LOADING = "L";
    //COMPLETED initiate a progress completion of the progressbar
    obj.COMPLETED = "C";
    
    //if status is null sets the default to LOADING
    if(obj.status == null)
        obj.status = "L";

    //Gets the document's body element
    const body = document.querySelector(container);
    
    //sets margin of the container to 0px
    body.style.margin = "0px";

    //Creates two new div (parent div and progressbar div)
    let div = document.createElement("div");
    let progress = document.createElement("div");

    //defines parent div style
    div.style.width = "100%";
    div.style.height = barHeight+"px";
    div.style.background = config.baseBackground;
    div.style.position = "absolute";
    div.style.top = 0;

    //sets user custom css if != ""
    if(customCSS != ""){
        customCSS += div.style.cssText;
        div.style.cssText = customCSS;
    }

    //defines progressbar div style
    progress.style.width = "0%";
    progress.style.height = barHeight+"px";
    progress.style.background = config.progressBackground;
    progress.style.position = "absolute";
    progress.style.top = 0;
    progress.style.left = "0%";
    progress.id = "electronjsprogressbar";
    
    //sets user custom css if != ""
    if(customProgressCSS != ""){
        customProgressCSS += progress.style.cssText;
        progress.style.cssText = customProgressCSS;
    }

    //append progress div to parent div
    div.appendChild(progress);
    
    //append parent div to container|body
    body.appendChild(div);

    //set configuration
    obj.config = config;

    //set progressbar ID
    obj.progressBarID = progress.id;

    /*
    *   sets progressbar progress
    *   @param progressLevel [integer
    */
    obj.setProgress = (progressLevel) => {
        //obtain progress element
        //get and initialize some of its properties width and left
        const progress = document.querySelector("#electronjsprogressbar");
        const currentWidth = progress.style.width;
        const leftSpace = progress.style.left;

        //parseInt the properties currentWidth and leftSpace
        const length = parseInt(currentWidth.toString().replace("%", ""));
        const left = parseInt(leftSpace.toString().replace("%", ""));

        //initialize lSpace
        let lSpace = (left !== 80 && left < 81) ? (left + speed) : 80;

        //if type is equal to determinate 'D'
        if(type == type1){
            if(progressLevel == null){
                
                //Ops you have refused to provide a progress for us
                console.error("ProgressBar: Param progressLevel not set in setProgress() or change type to " +type2);
            
            } else {
                
                //continue progressing except level is equal to 100%
                if(currentWidth !== "100%"){
                    progress.style.width = progressLevel+"%";
                }
            }
        } else { 

            //type is set a intermediate
            //if: increase the progressbar to Imax if progressbar width != Imax
            //else if: move the progressbar by an incremental left
            //else if: if progressbar has reached maz parent position, reduce progressbar width to approach 0
            //and increase left to approch 100
            //else if: progressbar is equal to 0 restart by setting left to 0

            if(length < Imax && left < 80){
                innerProgress = length + speed;
                progress.style.width = innerProgress+"%";
            } else if (left < 81 && !end){
                lSpace = ((lSpace < 81) ? (lSpace) : 80);
                progress.style.left = lSpace +"%";

                if(left === 80){
                    progress.style.width = Imax-speed;
                    progress.style.left = 80+speed;
                    end = true;
                }
            } else if(left === 80 || left < 101){
                progress.style.width = (length - speed) +"%";
                progress.style.left = (left + speed) +"%";

                if(left === 100 || left > 100){
                    progress.style.left = "0%";
                    lSpace = 0;
                    end = false;
                }
            } else if(currentWidth == 0){
                progress.style.left = 0+"0";
            }
            
        }
    }

    //This is a simple setInterval function to rerun the progress 200 ms
    //used instead of a loop and thread sleep
    obj.progresser = setInterval( function(){

        //if: status is LOADING and type != I setProgress in a determinate method
        //else if: LOADING && I set progress in a intermediate method
        //else if: COMPLETED turn of progress and set status to DONE

        if(obj.status === "L" && progressLevel < 81){
            progress.style.display = "block";
            obj.setProgress(progressLevel);
            
            progressLevel += speed;
        } else if(obj.status === "L" && type === "I"){
            progress.style.display = "block";
            obj.setProgress(progressLevel);

            progressLevel += speed;  
        } else if(obj.status == "C") {
            if(progressLevel < 80) progressLevel = 85;

            obj.setProgress(progressLevel);

            if(progressLevel > 100){
                obj.setProgressStatus("D");
            }
            progressLevel += speed;
        }
        
    }, 200);

    /*
    * Set progress status
    * @param status (default = "L")
    */
    obj.setProgressStatus = (status = "L") => {
        //obtain progress element
        const progress = document.querySelector("#electronjsprogressbar");
                        
        if(status === "C"){
            //triggers a completion
            obj.status = "C";
        } else if(status === "D"){
            //create setInterval
            clearInterval(obj.progresser);
            
            //reset elements properties once DONE : D
            progress.style.display = "none";
            progress.style.left = "0%";
            progress.style.width = "0%";
            progressLevel = 0;
        }

        //starts a new progress if was recently completed 
        if(status === "L" && obj.status == "C"){
            obj.status = "L";
            progress.style.display = "block";

            //This is a simple setInterval function to rerun the progress 200 ms
            //used instead of a loop and thread sleep
            obj.progresser = setInterval( function(){

                //if: status is LOADING and type != I setProgress in a determinate method
                //else if: LOADING && I set progress in a intermediate method
                //else if: COMPLETED turn of progress and set status to DONE

                if(obj.status === "L" && progressLevel < 81){
                    progress.style.display = "block";
                    obj.setProgress(progressLevel);
                    
                    progressLevel += speed;
                } else if(obj.status === "L" && type === "I"){
                    progress.style.display = "block";
                    obj.setProgress(progressLevel);

                    progressLevel += speed;  
                } else if(obj.status == "C") {
                    if(progressLevel < 80) progressLevel = 85;

                    obj.setProgress(progressLevel);

                    if(progressLevel > 100){
                        obj.setProgressStatus("D");
                    }
                    progressLevel += speed;
                }
                
            }, 200);
        }

    }

    //return object
    return obj;
}