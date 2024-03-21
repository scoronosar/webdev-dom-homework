import { likes } from "./likes.js"
import { ListElement, UserComment , appElement ,SetUsers , Users, preLoaderText } from "./main.js"
import { initReplayClickListener } from "./replay.js"
import { loginFetch, token ,getFetchApi} from "./api.js"


export const renderComments = () => {
  const UsersHTML = Users.map((item, index) => {
    return `
      <li class="comment" data-username="${item.author}" data-text="${item.text}">
        <div class="comment-header">
          <div>${item.author}</div>
          <div>${item.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${item.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${item.likes}</span>
            <button data-index='${index}' class="like-button ${item.paint}"></button>
          </div>
        </div>
      </li>
    `
  }).join("")
  const Container = document.getElementById('comments-container')
  const loginLink = `Чтобы добавить комментарий <a href="#" class="login-link-main" id = "login-link-main">авторизуйтесь</a>`
  Container.innerHTML = `
  <ul class="comments" id="comments">
  ${UsersHTML}
  </ul>
  ${loginLink}
  `
  const loginLinkElement = document.getElementById('login-link-main')
  loginLinkElement.addEventListener('click', () =>{
    Container.innerHTML = `
    <div class="form">
    <h3>Форма входа</h3>
    <div class="input-container">
        <input type="text" placeholder="Логин" id="login-input" class="input">
        <input type="text" placeholder="Пароль" id="password-input" class="input">
    </div>
    <button type="submit" id="submit-button" class="button">Войти</button>
  </div>
    ` 
    const submitButtonElement = document.getElementById('submit-button')
    submitButtonElement.addEventListener('click', () => {
      const loginInput = document.getElementById('login-input').value
      const passwordInput = document.getElementById('password-input').value
      loginFetch(loginInput, passwordInput)
      Container.innerHTML = UsersHTML + `
      <div class="add-form">
        <input type="text" class="add-form-name" id = 'add-form-name' value="${loginInput}" disabled>
        <textarea type="textarea" id = 'add-form-text' class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="add-form-button">Написать</button>
        </div>
      </div>
      `
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
          fetch("https://wedev-api.sky.pro/api/v2/sayfiddinov-aliakbar/comments", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: UserName.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
              text: UserComment.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
            }),
          })
            .then(() => fetch("https://wedev-api.sky.pro/api/v2/sayfiddinov-aliakbar/comments", { 
              method: "GET" 
            })
              .then((response) => {
      
                if (response.status === 400) {
      
                  preLoaderText.textContent = ""
                  throw new Error("400")
      
                }
      
                if (response.status === 500) {
      
                  preLoaderText.textContent = ""
                  throw new Error("500")
      
                } else {
                  UserComment.value = ""
                  return getFetchApi()
      
                }
              })
              .catch((error) => {
                if (error === "TypeError: Failed to fetch") {
                  preLoaderText.textContent = ""
                  alert("Проблемы с интернетом")
                }
      
                if (error === "400") {
                  preLoaderText.textContent = ""
                  alert("Имя и комментарий должны быть длиннее 3 символов")
                }
      
                if (error === "500") {
                  preLoaderText.textContent = ""
                  alert("проблемы с сервером")
                } else {
                  ButtonElement.disabled = false
                  console.warn(error)
                }
              }))
      
        }
      })
    })
  })

  likes(ListElement, Users, renderComments)
  initReplayClickListener(
    UserComment, 
    Users, 
    ListElement, 
    renderComments
  )

}

