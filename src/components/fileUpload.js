import React from 'react';
import { DragAndDrop } from './dragAndDrop';

const style = {
    button: {
        background: 'indigo',
        color: 'white',
        padding: '0.5rem',
        fontFamily: 'sans-serif',
        borderRadius: '0.3rem',
        cursor: 'pointer',
        margin: '1rem'
    },
    image: {
        width: '100px'
    },
    imageCont: {
        display: 'flex',
        justifyContent: 'space-around',
        alignContent: 'flex-start'

    },
    alert: {
        background: 'red',
        color: 'black'
    },
    dragZone: {
        height: '200px',
    }

}

export const FileUploader = props => {
    const hiddenFileInput = React.useRef(null);
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const [validation, setValidation] = React.useState(false);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = files => {
        const validFiles = [];
        for (const file of files) {
            if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                setValidation('Please select valid image file.');
                break
            } else if (file.size > 5000000) {
                setValidation('This file is too large')
                break
            } else {
                setValidation(false);
                validFiles.push({ file, href: URL.createObjectURL(file) })
            }
        }
        setSelectedFiles([...selectedFiles, ...validFiles])
    };
    const imageReview = selectedFiles.length > 0 ?
        selectedFiles.map((fileObj, index) => {
            return (<div key={index} >
                <img style={style.image} src={fileObj.href} alt='someting' />
            </div>)
        })
        :
        <div>No images</div>




    return (
        <>
            <button style={style.button} onClick={handleClick}>
                Upload a file
            </button>
            <DragAndDrop handleDrop={(files) => handleChange(files)}><p>Drop here</p></DragAndDrop>
            <input type="file"
                ref={hiddenFileInput}
                accept="image/*,"
                onChange={(e) => handleChange(e.target.files)}
                multiple
                style={{ display: 'none' }}
            />
                {validation && <h2 style={style.alert} >{validation}</h2>}
            <div style={style.imageCont}>
                {imageReview}
            </div>
        </>
    );
};