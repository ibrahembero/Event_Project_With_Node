// const { default: axios } = require("axios")
function deleteEvent(){
    // client side
    let btn = document.getElementById('deleteBtn')
    let id = btn.getAttribute('data-id')
    //console.log(id)
    axios.delete('/events/delete/'+id)
    .then((res)=>{
        console.log(res.data)
        alert('Event Was Deleted')
        window.location.href = '/events'
    })
    .catch((err)=>{
        console.log(err)
    })
}
//upload avatar
function readUrl(input){
    if(input.files && input.files[0]){
        var reader = new FileReader()

        reader.onload = function(e){
            let image = document.getElementById('imagePlaceholder')
            image.style.display = "block"
            image.src= e.target.result

        }

        reader.readAsDataURL(input.files[0])
    }
}
///delete an user
function deleteUser(){
    // client side
    let btn = document.getElementById('deleteBtn')
    let id = btn.getAttribute('data-id')
    console.log(id)
    axios.delete('/users/delete/'+id)
    .then((res)=>{
        console.log(res.data)
        alert('User Was Deleted')
        window.location.href = '/users/admin'
    })
    .catch((err)=>{
        console.log(err)
    })
}
