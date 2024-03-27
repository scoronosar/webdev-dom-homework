import { likes } from "./likes.js"
import { ListElement, UserComment , appElement ,SetUsers , Users, preLoaderText } from "./main.js"
import { initReplayClickListener } from "./replay.js"
import { renderlogin, User} from "./login.js"
import { addcomment } from "./commentsPost.js"

export const Container = document.getElementById('comments-container')
const loginLink = `Чтобы добавить комментарий <a href="#" class="login-link-main" id = "login-link-main">авторизуйтесь</a>`

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
  Container.innerHTML = `
  <ul class="comments" id="comments">
  ${UsersHTML}
  </ul>
  ${loginLink}
  `
  if(localStorage.length > 0){
    Container.innerHTML = UsersHTML + `
    <div class="add-form">
      <input type="text" class="add-form-name" id = 'add-form-name' value="${localStorage.getItem('user')}" disabled>
      <textarea type="textarea" id = 'add-form-text' class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
      <div class="add-form-row">
        <button class="add-form-button" id="add-form-button">Написать</button>
      </div>
    </div>
    `
    likes(ListElement, Users, renderComments)
    initReplayClickListener(
      UserComment, 
      Users, 
      ListElement, 
      renderComments
    )
    addcomment()
  }else{
    renderlogin() 
  }
}

