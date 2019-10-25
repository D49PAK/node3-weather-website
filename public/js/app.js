const weatherForm = document.querySelector('form')
const search = document.querySelector('input') 
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()                          //prevent browser for default refresh after click submit

    const location = search.value               //fetching value enterd in search box

    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''
    //fetch('http://localhost:3000/weather?address='+location).then((response) => {
    fetch('/weather?address='+location).then((response) => {       //for Heroku
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                // console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    })
})