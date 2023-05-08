import React, { Component, useEffect} from 'react';
import video from '../../../public/videos//Webvideo ULTRA COMPRESSED.mp4'
import '../../index.css'

function Services() {
    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log('sending request');
            const response = await fetch('http://localhost:8080/test');
            const data = await response.text();
            console.log(data);
          } catch (error) {
           
          }
        };
    
        fetchData();
      }, []);
    return(
        <div className="header">
            <p>Hello World!</p>
        </div>  
    )
}

export default Services;