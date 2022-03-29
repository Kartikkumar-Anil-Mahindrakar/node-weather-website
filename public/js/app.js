
// console.log('Client Side Javascript is Loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.getElementById('message-1')
const message2 = document.getElementById('message-2')


const getWeatherForeCast = (address)=>{
    
    message1.textContent = 'Loading...';
    message2.textContent = '';
    fetch(`http://localhost:3000/weather?address=${address}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            // console.log(data.error)
            message1.textContent = data.error
        }else{
            // console.log(data.Locations)
            message1.textContent=data.Locations
            message2.textContent=data.forecast 
            // console.log(data.forecast)
            // console.log(data)
        }
    })
})
}



weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    // console.log('testing');
    const location = search.value;
    // console.log(location)
    getWeatherForeCast(location)
})