import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import './Images.css'


export default function Images(){
    const [imageData, setImageData] = useState({data: null, isPending: false})
    const { id, category } = useParams();
    const specificUrl = `https://api.pexels.com/v1/search/?id=${id}&query=${category}`;
    useEffect(() => {
        if(id && category){
            (async function(){
                setImageData({data: null, isPending: true});
                const fData = await fetch(specificUrl, {headers: {Authorization : "563492ad6f9170000100000196bfcf75b7a24fc088452a8c7ebaab01"}});
                if(fData.ok){
                    const jsonData = await fData.json();
                    if(jsonData){
                        console.log(jsonData);
                        setImageData({data: jsonData, isPending: false});
                    }
                }
            })()
        }
        return () => {
            setImageData({data: null, isPending: false});
        }
    },[id, category])
    return(
        <div style={{marginTop: '20vh'}}>
            {imageData.isPending && <div>Please wait...</div>}
            {imageData.data && function(){
                let indexRef = imageData.data.photos[0];
                console.log(indexRef);
                return(
                    <>
                        <img src={indexRef.src.large} alt={indexRef.alt} />
                    </>
                )
            }()}
        </div>
    )
}