import React from 'react'; 
import axios from 'axios'; 


const getData = (url) => {

    const request = axios.get(url)
    return request.then(response => response); 

}


const updateHours = (objDate, intHours) => {

    let mLSeconds = new Date(objDate).getTime(); 
    let addSeconds = (intHours * 60) * 60 * 1000; 
    let newDate = new Date(mLSeconds + addSeconds)
    return newDate; 
}

const countDown = (nextUpdateDate) => {

    let distance = nextUpdateDate - new Date().getTime(); 

    let d = Math.floor(distance / (1000 * 60 * 60 * 24))

    let hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    let min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); 

    let sec = Math.floor((distance % (1000 * 60 * 60)) / 1000); 

    if(distance > 0){
        return d + "d " + hrs + "h " + min + "m " + sec + "s "; 
    }
    else{
        return "Update Commencing"
    }  
}

export default {
    getData:getData,
    updateHours:updateHours,
    countDown: countDown
}