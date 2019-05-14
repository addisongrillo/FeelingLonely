const form = document.querySelector('form')
const input = document.querySelector('input')
const button  = document.querySelector('button')
const chatbox = document.querySelector('#chatbox')
let id = 0

form.addEventListener('submit', handleSubmit)
button.addEventListener('click', getAdvice)

function handleSubmit(event){
    event.preventDefault()
    const sender = ['Me', 'Myself', 'I'][Math.floor(Math.random() * 3)]
    createMessage(sender, input.value)
    form.reset()
  }
function getAdvice(){
fetch('https://api.adviceslip.com/advice')
    .then(response => response.json())
    .then(json => createMessage('A word of Advice', json.slip.advice))
}

function createMessage(sender, messageText){
  if (!messageText.length) return
  id ++
  const timestamp   = (new Date()).toLocaleTimeString()
  const message     = `<div class='message' id='${id}'>
                        <span>${timestamp}</span>
                        <span class="sender">${sender}:</span>
                        <span class="mes">${messageText}</span>
                        <span class="delete" onclick='deleteMessage(${id})'>❌</span>
                      </div>`
  chatbox.innerHTML += message
  chatbox.scrollTop = chatbox.scrollHeight
}

function deleteMessage(id){
  if(confirm('Are you sure?')){
    const message = document.getElementById(id)
    message.remove()
  }
}
