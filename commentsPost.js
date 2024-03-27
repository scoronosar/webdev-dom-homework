import { commentPostFetch } from "./api.js"
import { preLoaderText } from "./main.js"
export const addcomment = () => {
  const ButtonElement = document.getElementById("add-form-button")
  const UserComment = document.getElementById("add-form-text")
  const UserName = document.getElementById("add-form-name")
  ButtonElement.addEventListener("click", () => {
    UserComment.style.backgroundColor = "white"
  
    if (UserComment.value === "") {
  
      UserComment.style.backgroundColor = "red"
      UserComment.placeholder = "Пожалуйста заполните это поле"
  
    } else if (UserComment.value.length < 3) {
  
      alert("используйте в комментариях и в имени более двух символов")
  
    } else {
      preLoaderText.textContent = "Комментарий публикуется..."
      commentPostFetch(UserName,UserComment)
    }
  })
}