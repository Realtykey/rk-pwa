import React, { useEffect } from 'react'
//image picker
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


export default function ImagesPicker({ setImgFiles, setImgRefs }) {

    useEffect(() => {
        //listen for file selected
        var fileButton = document.getElementById('fileButton');
        fileButton.addEventListener('change', function (e) {
            //get file or files
            let files = fileButton.files;
            setImgFiles(files);
            console.log(files);
            var urls = [];
            //extract images urls
            Array.prototype.forEach.call(files,
                (file) => {
                    let url = window.URL.createObjectURL(file).toString();
                    console.log(url);
                    urls.push(url);
                }
            )

            console.log(urls);
            //images loaded
            setImgRefs(urls);
            console.log('urls array size ' + urls)

        })

        return () => {
            fileButton.removeEventListener("mouseover", () => console.log('img listener removed'));
        }
    })


    return (
        <>
            <label htmlFor="fileButton">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>

            <input hidden="hidden" accept="image/*" id="fileButton" type="file" multiple />

            <progress id="progressBar" value="0" max="100"> </progress>
        </>
    )
}
