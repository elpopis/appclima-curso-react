import { useState } from "react"

export const WheatherApp = () => {

    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
    const API_key = '7c6c51144396029b64d1cbfd90874e49';
    
    const [ciudad, setCiudad] = useState('');
    const [dataClima, setDataClima] = useState(null);
    const difKelvin = 273.15;
    
    //Vamos seteando ciudad
    const onChangeCiudad = e => {
        setCiudad(e.target.value);
    }

    const onSubmit = e =>{
        e.preventDefault();
        //console.log(ciudad)
        if (ciudad.length >0) fetchClima()
    }

    const fetchClima = async() => {
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_key}`);
            const data = await response.json();
            setDataClima(data);
            console.log(dataClima)
        }catch(error){
            console.error('Ocurrio el error: '+error);
        }
    }
  
    return (
    <div className="container">
        <h1>Aplicación del clima</h1>
        <form onSubmit={onSubmit}>
            <input 
            type="text" 
            value={ciudad}
            onChange={onChangeCiudad}
            />
            <button type="submit">Buscar</button>
        </form>

        {
            //Si data clima es true mostramos información
            dataClima && (
                <div>
                    {/* Podemos usar un pormateador de JSON para que quede piola */}
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {parseInt(dataClima.main.temp - difKelvin)}°C</p>
                    <p>Condición meteorológica: {dataClima.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}.png`} alt="icono del clima" />
                </div>
            )
        }
    </div>
  )
}
