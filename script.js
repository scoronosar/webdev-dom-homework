const ButtonElement = document.getElementById('add-form-button');

const ListElement = document.getElementById('comments');

const UserName = document.getElementById('add-form-name');

const UserComment = document.getElementById('add-form-text');

let UserLikes = 0;

const fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/saifuddinov-aliakbar/comments",{

    method:"GET",

  });
console.log(fetchPromise);

fetchPromise.then((response) =>  {
  console.log(response);

  const jsonPromise = response.json();

  jsonPromise.then((responseData) => {
    console.log(responseData);
  })
})

const currentDate = new Date();
const dateString = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()} `;

let Users = [];

const likes = () => {
    const likeButtons = document.querySelectorAll('.like-button');
    for (const likeButton of likeButtons) {
      likeButton.addEventListener('click', (event) => {
        const index = likeButton.dataset.index;
        event.stopPropagation();
        if (Users[index].userLike === false ) {
            Users[index].paint = '-active-like';
            Users[index].likes += 1;
            Users[index].userLike = true;
        } else {
            Users[index].paint = '';
            Users[index].likes -= 1;
            Users[index].userLike = false;
        }
        renderComments();
      });
    };
  };

const renderComments = () => {
        const UsersHTML = Users.map((item, index) => {
            return `
        <li class="comment" data-username="${item.name}" data-text="${item.comment}">
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
              <button data-index='${index}' class="like-button ${item.paint}"</button>
            </div>
          </div>
        </li>
    `})
            .join('');
            ListElement.innerHTML = UsersHTML;
            likes();
};

renderComments();

const initReplayClickListener = () => {
    const commentsToAnswer = document.querySelectorAll('.comment');
    for (const commentToAnswer of commentsToAnswer) {
      commentToAnswer.addEventListener("click", () => {
        const index = commentToAnswer.dataset.index;
        UserComment.value = `${Users[index].comment}\n${Users[index].name},\n`;
      });
    }
  }

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

likes();
initReplayClickListener();

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
    else{
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
			}).then((response) => {
				response.json().then((responseData) => {})})
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
        UserName.value = '';
        UserComment.value = '';
    }
        renderComments();
        likes();
        initReplayClickListener();
});