'use-strict'

module.exports = function (config) {
    const type1 = "D";
    const type2 = "I";
    
    let Imax = 20;

    if(config == null){
        config = {};

        config.baseBackground = "pink";
        config.progressBackground = "green";
        config.baseBackground = "#00000000";
        config.progressBackground = "blue";
        config.type = type1;
        config.speed = 2;

    } else {
        if(config.baseBackground == null) config.baseBackground = "#00000000";
        
        if(config.progressBackground == null) config.progressBackground = "blue";

        if(config.type == null) config.type = type1;

        if(config.speed == null) config.speed = 2;

    }

    const obj = {};

    if(obj.status == null)
        obj.status = "L";

    const body = document.querySelector("body");
    let div = document.createElement("div");
    let progress = document.createElement("div");

    div.style.width = "100%";
    div.style.height = "2px";
    div.style.background = config.baseBackground;
    div.style.position = "absolute";
    div.style.top = 0;

    progress.style.width = "0%";
    progress.style.height = "2px";
    progress.style.background = config.progressBackground;
    progress.style.position = "absolute";
    progress.style.top = 0;
    progress.style.left = "0%";
    progress.id = "progressbar";

    div.appendChild(progress);
    
    body.style.margin = "0px";
    body.appendChild(div);

    const type = config.type;
    const speed = config.speed;
    let innerProgress = 0;
    let end = false;
    let progressLevel = 0;

    obj.setProgress = (progressLevel) => {

        const progress = document.querySelector("#progressbar");
        const currentWidth = progress.style.width;
        const leftSpace = progress.style.left;

        const length = parseInt(currentWidth.toString().replace("%", ""));
        const left = parseInt(leftSpace.toString().replace("%", ""));
        let lSpace = (left !== 80 && left < 81) ? (left + speed) : 80;

        if(type == type1){
            if(progressLevel == null){
                console.error("ProgressBar: Param progressLevel not set in setProgress() or change type to " +type2);
            } else {
                if(currentWidth !== "100%"){
                    progress.style.width = progressLevel+"%";
                }
            }
        } else {                        
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
                progress.style.left = 0;
            }
            
        }
    }

    obj.progresser = setInterval( function(){
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

    obj.setProgressStatus = (status = "L") => {
        const progress = document.querySelector("#progressbar");
                        
        if(status === "C"){
            obj.status = "C";
        } else if(status === "D"){
            clearInterval(obj.progresser);
            progress.style.display = "none";
            progress.style.left = "0%";
            progress.style.width = "0%";
            progressLevel = 0;
        }

        if(status === "L" && obj.status == "C"){
            obj.status = "L";
            progress.style.display = "block";

            obj.progresser = setInterval( function(){
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
                        console.log("Done");
                        obj.setProgressStatus("D");
                    }
                    progressLevel += speed;
                }
                
            }, 200);
        }

    }

    obj.config = config;
    obj.progressBarID = progress.id;
    return obj;
}