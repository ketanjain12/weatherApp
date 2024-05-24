
// const apiKey='4ecac77b3d1d45b67562c0c588c40972';
// const getWeather=async (city) => {
//     return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4ecac77b3d1d45b67562c0c588c40972`)
//     .then((res)=>res.json())
//     .then((json)=>{
//         // console.log('------------',json)
//         return json;
//     })
// }
// export default getWeather;

const apiKey = '4ecac77b3d1d45b67562c0c588c40972';
const getWeather = async (city) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4ecac77b3d1d45b67562c0c588c40972`);
  
    if (!response.ok) {
      throw new Error('City not found or an error occurred.');
    }
  
    const json = await response.json();
    return json;
  } catch (err) {
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
}

export default getWeather;
