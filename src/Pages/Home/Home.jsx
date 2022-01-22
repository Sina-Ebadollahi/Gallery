// styles
import './Home.css';
// images
import searchIcon from '../../assets/img/searchICon.png'
// hooks
import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import useFetch from '../../Hooks/useFetch';
import useGlobalContext from '../../Hooks/useGlobalContext';
// config
import api from '../../Config/api';
import { Link } from 'react-router-dom';
export default function Home() {
    const { data: globalData } = useGlobalContext();
    // fetch('angag',)
    console.log(globalData);
    return (
        <div className="home-container">
            <GallerySearch />
            <PhotoContainer data={globalData} />
        </div>
    )
}
const randomWords = ['Computer', 'Rose', 'Dark', 'Violin', 'Love', 'Cat'];
function GallerySearch() {
    const [searchData, setSearchData] = useState('');
    const formRef = useRef();
    const { getDataByEndpoint } = useFetch();
    const handleSearchSubmit = (e, url, info, category) => {
        if (e) {
            e.preventDefault();
        }
        if (searchData && searchData != '') {
            console.log(category);
            getDataByEndpoint(url, info, category);
        }
    }
    
    const url = `${api.pexels}search?query=${searchData}`;
    // useEffect(() => {
    //     (function(){
    //         console.log(Math.floor(Math.random() * (5 + 1)));
    //         getDataByEndpoint(`${api.pexels}search?query=${randomWords[Math.floor(Math.random() * (5 + 1))]}`, {headers: 'Authorization : 563492ad6f9170000100000196bfcf75b7a24fc088452a8c7ebaab01'}, searchData)
    //     })();
    // },[])
    return (
        <form onSubmit={e => handleSearchSubmit(e, url, { headers: 'Authorization : 563492ad6f9170000100000196bfcf75b7a24fc088452a8c7ebaab01' }, searchData)} onKeyDown={e => { if (e.keyCode === 13) { handleSearchSubmit(e, url, { headers: 'Authorization : 563492ad6f9170000100000196bfcf75b7a24fc088452a8c7ebaab01' }, searchData) } }} className='searchForm'>
            <input type="text" onChange={(e) => setSearchData(e.target.value)} />
            <img onClick={() => formRef.current.submit()} src={searchIcon} alt="search icon" title='search icon' />
        </form>
    )
}
function PhotoContainer({ data }) {
    const [isHovered, setIsHovered] = useState({ status: false, id: null });
    const { category, dispatch } = useGlobalContext();


    function updateImageData(e, p){
        dispatch({type: 'CURRENT_IMAGE', payload: p});
    }
    return (
        <div className='galleryContainer'>
            {data ? data.photos.map((p) => {
                return (
                    <Link onClick={(e) => updateImageData(e, p)} to={`/images/${category}/${p.id}`}>
                        <div onMouseLeave={() => setIsHovered({ status: false, id: null })} onMouseEnter={() => setIsHovered({ status: true, id: p.id })} className='photoContainer' key={p.id} style={{ backgroundColor: p.avg_color }}>
                            <img className='eachImage' src={p.src.medium} alt={p.alt} />
                            {isHovered.status && isHovered.id === p.id && (
                                <div className='extra'>
                                    <h3 className='extra-text'>Photographer : {p.photographer}</h3>
                                </div>
                            )}
                        </div>
                    </Link>
                )
            }) : <div>Please Wait...</div>}
        </div>
    )
}
