import { useEffect, useRef, useState, useContext } from "react"
import { UserContext } from "contexts/Login";
import axios from "axios";

declare global {
    interface Window {
      kakao: any;
    }
  }

export const MatchingWrite = () => {
    
    const keyWord = useRef<HTMLInputElement>(null);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [map, setMap] = useState<any>(null);

    const { userInfo } = useContext(UserContext);
    const { commonUrl } = useContext(UserContext);

    const [sidoName, setSidoName] = useState("");
    const [gugunName, setGugunName] = useState("");

    let ps = new window.kakao.maps.services.Places();

    let infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1});
    
    const searchPlaces = () => {
        if (!keyWord.current?.value.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }
        console.log("click");
        console.log(keyWord);
        ps.keywordSearch(keyWord.current?.value, placesSearchCB);
        
    }

    const placesSearchCB = (data: any, status: any, pagination: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
            console.log("status", status)
            console.log(data);
            setSearchResults(data);
            setIsModalOpen(true);
        }
    }

    const getDongCode = async () => {
        if (!userInfo) return;
        console.log(userInfo?.dongCode);
        const url = `${commonUrl}/locations/names/${userInfo?.dongCode}`;
        const { data } = await axios.get(url);
        setSidoName(data.sidoName);
        setGugunName(data.gugunName);
    }

    useEffect(() => {
        if (userInfo) {
          getDongCode();
        }
    }, [userInfo]);
    
    useEffect(() => {
        if (sidoName && gugunName) {
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(`${sidoName} ${gugunName}`, function (result: any, status: any) {
              if (status === window.kakao.maps.services.Status.OK) {
                let container = document.getElementById("map");
                let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                let options = {
                  center: coords,
                  level: 3,
                };
                let newMap = new window.kakao.maps.Map(container, options);
                setMap(newMap);
              }
            });
          }
      }, [gugunName, sidoName]);

  

    return (
        <div>
            <input type="text" ref={keyWord} />
            <button onClick={searchPlaces}>검색</button>
            <div id="map" style={{ width: "350px", height: "350px" }} />;
        </div>
    )
}