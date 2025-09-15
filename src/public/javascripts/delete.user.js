  function confirmUserDelete(userId, buttonElement) {
    if (confirm("are you sure you want to delete this user?")) {
      deleteUserButtonClicked(userId, buttonElement);
    }
    
  }

function deleteUserFetch(userId, callback) {
    fetch(`/users/${userId}`, {method:'DELETE'})
    .then((res) => res.json())
    .then((data) => {
        return data.status != 200
        ? callback(data, undefined)
        : callback(undefined, data)
    })
    .catch((err) => {
      console.log(err)
      return callback(err, undefined);
    });
}
function deleteUserButtonClicked(userId, buttonElement){
    
    deleteUserFetch(userId, (error, result) => {
        if (error){
            console.log('Error: ' + error)
        }
        if (result){
            alert("Customer deleted")
            let card = buttonElement.closest('.col-12')
            if (card) card.remove()
            console.log('result: ', result)
        }
    })
}