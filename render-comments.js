import { likes } from "./likes.js"
import { UserComment } from "./main.js"
import { initReplayClickListener } from "./replay.js"

export const renderComments = (ListElement, Users) => {
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

  ListElement.innerHTML = UsersHTML
  likes(ListElement, Users, renderComments)
  initReplayClickListener(
    UserComment, 
    Users, 
    ListElement, 
    renderComments
  )

}
