import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import useGlobalContext from '../../Hooks/useGlobalContext';
import './Images.css'


export default function Images(){

    const navigate = useNavigate();
    const { imageData: rawData } = useGlobalContext();
    const [imageData, setImageData] = useState({data: null, isPending: false})
    const [errorOnLoading,setErrorOnLoading] = useState(false);
    const [isImageHovered, setIsImageHovered] = useState(false);
    // const [url,setUrl] = useState('');
    const { id, category } = useParams();
    // const specificUrl = `https://api.pexels.com/v1/search/?id=${id}&query=${category}`;
    console.log(id, category);
    useEffect(() => {
        window.localStorage.setItem(`${category}?${id}`, id);
        setImageData({...imageData, isPending: true})
        // todo *****************
        if(id && category){
            setImageData({data: rawData, isPending: false})  
            console.log(rawData); 
        }else if(window.localStorage.getItem(`${category}?${id}`).split('?')[1] === id){
            setImageData({data: window.localStorage.getItem(`${category}?${id}`), isPending: false})
        }
        return () => {
            setImageData({data: null, isPending: false});
        }
    },[id, category])
    function ImageDataFunc({data}){      
        console.log(data);  
        
        return(
            <>
                <img onMouseEnter={() => setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered(false)} className='images-image' src={data.src.large} alt={data.alt} />
            </>
        )
    }
    return(
        <div className='images-container' style={{marginTop: '15vh'}}>
            {imageData.data && isImageHovered && (
                <div onMouseEnter={() => setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered(false)} className='images-helpbar'>
                    <nav>
                        sss
                    </nav>
                </div>
            )}
            {imageData.isPending && <div>Please wait...</div>}
            {imageData.data && <ImageDataFunc data={imageData.data}/>}
            {errorOnLoading && <div>Sorry there was an error while loading, You will be redirected to homepage</div>}
        </div>
    )
}