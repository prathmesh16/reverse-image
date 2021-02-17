import React, { useState } from 'react'
import './HomeScreen.css'
import logo from './logo.svg';

function HomeScreen() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [resultFile, setResultFile] = useState(null);
    
    const readURL = file => {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = e => res(e.target.result);
            reader.onerror = e => rej(e);
            reader.readAsDataURL(file);
        });
    };

    const handleInput = async event => {
        const file = event.target.files[0];
        const url = await readURL(file);
        setSelectedFile(url);
    };

    const convert = () =>{
        setResultFile(selectedFile);
    }

    const downloadImage = () =>{

        var canvas = document.createElement("canvas");
        var image = document.getElementById("result");
        canvas.width = image.width;
	    canvas.height = image.height;
        var ctx = canvas.getContext("2d");
        //ctx.rotate(90*Math.PI/180);
        ctx.drawImage(image,0,0,image.width, image.height);
        
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(-90*Math.PI/180);
        ctx.drawImage(image,-image.width/2,-image.width/2);
        ctx.restore();
        
        setResultFile(canvas.toDataURL());
        //console.log(canvas.toDataURL());

        var link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'Download.jpeg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

      return (
        <div className="homeScreen">
            <div className="homeScreenContents">
                <div className="images">
                    <img
                        className={`selectedImage ${ !selectedFile && 'hideDiv' }`}
                        src={selectedFile}
                        alt=""
                    />
                    <img
                        id="result"
                        className={`resultImage ${ !resultFile && 'hideDiv' }`}
                        src={resultFile}
                        alt=""
                    />
                </div>
                <form className="inputForm">
                    <p>Select Image</p>
                    <input 
                        type="file" 
                        onChange={handleInput}/>    
                </form>  
                <div className="buttons">
                    <button onClick={convert}>
                            Convert Image    
                    </button>
                    {/* <button onClick={downloadImage}>
                            Download Image    
                    </button>  */}
                </div>
            </div>
                  
        </div>
    )
}

export default HomeScreen
