  function confirmFilmDelete(filmId, buttonElement) {
    if (confirm("are you sure you want to delete this Film?")) {
      deleteButtonClicked(filmId, buttonElement);
    }
    
  }

function deleteFetch(filmId, callback) {
    fetch(`/films/${filmId}`, {method:'DELETE'})
    .then((res) => res.json())
    .then((data) => {
        return data.status != 200
        ? callback(data, undefined)
        : callback(undefined, data)
    })
    .catch((err) => {
      return callback(err, undefined);
    });
}
function deleteButtonClicked(filmId, buttonElement){
    deleteFetch(filmId, (error, result) => {
        if (error){
            console.log('Error: ' + error)
        }
        if (result){
            alert("Film deleted")
            let card = buttonElement.closest('.col-12')
            if (card) card.remove()
            console.log('result: ', result)
        }
    })
}