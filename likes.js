export const likes = (ListElement, Users, rerender) => {

  const likeButtons = document.querySelectorAll('.like-button')
  
  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', (event) => {
      const index = likeButton.dataset.index
      event.stopPropagation()
      if (Users[index].userLike === false) {
        Users[index].paint = '-active-like'
        Users[index].likes += 1
        Users[index].userLike = true
      }
      else if (Users[index].userLike === undefined) {
        Users[index].paint = '-active-like'
        Users[index].likes += 1
        Users[index].userLike = true
      }
      else {
        Users[index].paint = ''
        Users[index].likes -= 1
        Users[index].userLike = false
      }

      rerender(ListElement, Users)
    
    })
  }
}