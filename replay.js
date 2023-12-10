export const initReplayClickListener = (UserComment, Users, ListElement, rerender) => {

  const commentsToAnswer = document.querySelectorAll(".comment")
  
  for (const commentToAnswer of commentsToAnswer) {
    commentToAnswer.addEventListener("click", () => {
      const index = commentToAnswer.querySelector('.like-button').dataset.index
      UserComment.value = `${Users[index].text}\n${Users[index].author}\n\n`
    })
  }

  false && rerender(ListElement, Users)

}
