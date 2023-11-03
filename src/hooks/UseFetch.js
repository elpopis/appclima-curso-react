import { useState, useEffect } from "react";

export const UseFetch = (url = '') => {

  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null
  });

  const getFetch = async () =>{
    if (!url) return
    try{
      const response = await fetch(url);
      const data = await response.json();

      setState({
        data,
        isLoading: false,
        error: null
      });
    }catch(error){
      setState({
        data,
        isLoading: false,
        error
      });
    }
  }

  
  useEffect(()=>{
     getFetch()
    },[url]);
  
  return {
    ...state
  }
}
