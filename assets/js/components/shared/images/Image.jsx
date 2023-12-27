import React from 'react';
import {useImage} from "../../../../utils/importImage";
import './Image.css';

export const Image = ({className, name, dirName = 'icons', alt = 'icon', ...rest}) => {
    const {loading, error, image} = useImage(name, dirName);

    if (error) return <p>{alt}</p>

    return (
        <img className={loading ? className + ' loadingImage' : className} src={image} alt={alt} {...rest} />
    )
}