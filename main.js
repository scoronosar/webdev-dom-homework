const ButtonElement = document.getElementById('add-form-button');

const ListElement = document.getElementById('comments');

const UserName = document.getElementById('add-form-name');

const UserComment = document.getElementById('add-form-text');

const preLoaderText = document.getElementById("pre-loader");

const likeButtons = document.querySelectorAll('.like-button');

const commentsToAnswer = document.querySelectorAll('.comment');

import {renderComments} from './render-comments.js';
import {likes} from './likes.js';
import {initReplayClickListener} from './replay.js';

let UserLikes = 0;

const currentDate = new Date();
const dateString = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()} `;

let Users = [];

  likes();

renderComments();


fetch("https://wedev-api.sky.pro/api/v1/sayfiddinov-aliakbar/comments", {
  method: "GET",
}).then((response) => {
  response.json().then((responseData) => {
    const getApiComments = responseData.comments.map((comment) => {
      return {
        author: comment.author.name,
        date: dateString,
        likes: comment.likes,
        isLiked: false,
        text: comment.text,
      };
    });
    Users = getApiComments;
    renderComments();
    });
  });

preLoaderText.textContent = "Загрузка комментариев ...";

const getFetchApi = () => {
  return fetch(
    "https://wedev-api.sky.pro/api/v1/sayfiddinov-aliakbar/comments",
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const getApiComments = response.comments.map((comment) => {
        return {
          author: comment.author.name,
          date: dateString,
          likes: comment.likes,
          isLiked: false,
          text: comment.text,
        };
      });
      Users = getApiComments;
      renderComments();
    })
    .then((response) => {
      preLoaderText.textContent = "";
      preLoaderText.classList.remove("margin");
          });
      };

getFetchApi();

ButtonElement.addEventListener("click", () => {
    UserName.style.backgroundColor = "white";
    UserComment.style.backgroundColor = "white";
    if (UserName.value === "" ){
        UserName.style.backgroundColor = "red";
        UserName.placeholder = "Пожалуйста заполните это поле";
    }
    else if (UserComment.value === ""){
        UserComment.style.backgroundColor = "red";
        UserComment.placeholder = "Пожалуйста заполните это поле";
    }
    else if (UserName.value.length < 3 || UserComment.value.length < 3){
      alert("используйте в комментариях и в имени более двух символов")
    }
    else{
      preLoaderText.textContent = "Комментарий публикуется...";
      fetch("https://wedev-api.sky.pro/api/v1/sayfiddinov-aliakbar/comments", {
        method: "POST",
        body: JSON.stringify({
          name: UserName.value
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;"),
          text: UserComment.value
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;"),
        }),
        })

        .then((responseData) => {
          return fetch(
            "https://wedev-api.sky.pro/api/v1/sayfiddinov-aliakbar/comments", 
            {
              method: "GET",
            })
        .then((response) => {
          console.log(response.status);
          if (response.status === 400) {
            preLoaderText.textContent = "";
            throw new Error();
          } 
          if (response.status === 500){
            preLoaderText.textContent = "";
            throw new Error();
          }
          else {
            UserName.value = '';
            UserComment.value = '';
            return getFetchApi();
          }
          })
          .catch((error) => {
            if (error === "TypeError: Failed to fetch") {
              preLoaderText.textContent = "";
              alert("Проблемы с интернетом");
            }
            if (error === "400"){
              preLoaderText.textContent = "";
              alert("Имя и комментарий должны быть длиннее 3 символов");
            }
            if (error === "500"){
              preLoaderText.textContent = "";
              alert("forceError: true");
            }
            else {
              ButtonElement.disabled = false;
              console.warn(error);
            }
      });
    });
    }
        renderComments();
        likes();
        initReplayClickListener();
});

export{ListElement, UserName, UserComment, likeButtons, commentsToAnswer, Users};