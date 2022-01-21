import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom'
import './Images.css'


export default function Images(){
    const [imageData, setImageData] = useState({data: null, isPending: false})
    const [url,setUrl] = useState('');
    const { id, category } = useParams();
    const specificUrl = `https://api.pexels.com/v1/search/?id=${id}&query=${category}`;
    console.log(id, category);
    useEffect(() => {
        // todo *****************
        if(id && category){
            // setUrl(`https://api.pexels.com/v1/search/?id=${id}&query=${category}`)
            const fetchFunc  = async () => {
                setImageData({data: null, isPending: true});
                console.log(specificUrl);
                const fData = await fetch(specificUrl, {headers: {Authorization : "563492ad6f9170000100000196bfcf75b7a24fc088452a8c7ebaab01"}});
                if(fData.ok){
                    console.log('inside');
                    const jsonData = await fData.json();
                    if(jsonData){
                        console.log(jsonData);
                        setImageData({data: jsonData, isPending: false});
                    }
                }
            }
            fetchFunc();
        }
        return () => {
            setImageData({data: null, isPending: false});
        }
    },[id, category])
    function imageDataFunc(data){
        
        const filteredData = data.photos.forEach((each) => {
            if(each.id === id){
                console.log(each);
                return each;
            }
        })      
        console.log(filteredData);  
        return(
            <>
                <img src={filteredData.src.large} alt={filteredData.alt} />
            </>
        )
    }
    return(
        <div style={{marginTop: '20vh'}}>
            {imageData.isPending && <div>Please wait...</div>}
            {imageData.data && imageDataFunc(imageData.data)}
        </div>
    )
}