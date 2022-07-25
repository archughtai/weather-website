const weatherForm= document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')


messageOne.textContent=''
weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    messageOne.textContent='loading...'
    messageTwo.textContent=''
    const location= search.value
    console.log(location)
    fetch("http://localhost:3000/weather?address="+ encodeURIComponent(location)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
                return console.log(data.error)
            }else{
                
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
                return console.log(data.location+","+data.forecast)
                
        }
        debugger
    })})
    
})