import { useMemo, useEffect, useState } from "react";
import { usePut } from "../utils/http/usePut";

const Webcast = () =>{
    const [updateWebcast, { response }] = usePut(process.env.REACT_APP_API_HOSTNAME+'/api/webcast/'+process.env.REACT_APP_API_ID_WEBCAST);
    const [stop, setStop]= useState(false);
    const url = useMemo(()=>{
        if(response)
        return process.env.REACT_APP_API_HOSTNAME+'/api/video?video='+response.data.data.url

        return null
    },[response])

    useEffect(()=>{
        if(!stop){
            updateWebcast();
        }
        setStop(true);
    },[])

    const nbVisiteur = useMemo(()=>{
        if(response){
            return response.data.data.nb_visitteur;
        }
        return 0;
    },[response]);  

    return (
        <div>
            <p>Visionnage du webcast</p>
            <video src={url} width={400} height={300} controls/>
            <p>Nombre visiteur : {nbVisiteur}</p>
            
        </div>
    )
}

export default Webcast;