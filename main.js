const ButtonElement = document.getElementById("add-form-button")
const ListElement = document.getElementById("comments")

const UserName = document.getElementById("add-form-name")
const UserComment = document.getElementById("add-form-text")

const preLoaderText = document.getElementById("pre-loader")
const likeButtons = document.querySelectorAll(".like-button")

import { renderComments } from "./render-comments.js"

const currentDate = new Date()
const dateString = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()} `

let Users = []

preLoaderText.textContent = "Загрузка комментариев ..."

const getFetchApi = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/sayfiddinov-aliakbar/comments", { method: "GET" })
    .then(response => response.json())
    .then(response => {
      const getApiComments = response.comments.map(comment => {
        return {
          author: comment.author.name,
          date: dateString,
          likes: comment.likes,
          isLiked: false,
          text: comment.text,
        }
      })
      Users = getApiComments
    })
    .then(() => {
      setTimeout(() => {
        preLoaderText.textContent = ""
        preLoaderText.classList.remove("margin")
        renderComments(ListElement, Users)
      }, 900)
    })
}

getFetchApi()

ButtonElement.addEventListener("click", () => {

  UserName.style.backgroundColor = "white"
  UserComment.style.backgroundColor = "white"

  if (UserName.value === "") {

    UserName.style.backgroundColor = "red"
    UserName.placeholder = "Пожалуйста заполните это поле"

  } else if (UserComment.value === "") {

    UserComment.style.backgroundColor = "red"
    UserComment.placeholder = "Пожалуйста заполните это поле"

  } else if (UserName.value.length < 3 || UserComment.value.length < 3) {

    alert("используйте в комментариях и в имени более двух символов")

  } else {

    preLoaderText.textContent = "Комментарий публикуется..."

    fetch("https://wedev-api.sky.pro/api/v1/sayfiddinov-aliakbar/comments", {
      method: "POST",
      body: JSON.stringify({
        name: UserName.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
        text: UserComment.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
      }),
    })
      .then(() => fetch("https://wedev-api.sky.pro/api/v1/sayfiddinov-aliakbar/comments", { method: "GET" })
        .then((response) => {

          if (response.status === 400) {

            preLoaderText.textContent = ""
            throw new Error("400")

          }

          if (response.status === 500) {

            preLoaderText.textContent = ""
            throw new Error("500")

          } else {

            UserName.value = ""
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

export {
  ListElement,
  UserName,
  UserComment,
  likeButtons,
  Users
}
