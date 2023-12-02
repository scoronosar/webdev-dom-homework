import {commentsToAnswer, UserComment, Users} from './main.js';

const initReplayClickListener = () => {
    for (const commentToAnswer of commentsToAnswer) {
        console.log("it's works");
        commentToAnswer.addEventListener("click", () => {
        const index = commentToAnswer.dataset.index;
        UserComment.value = `${Users[index].comment}\n${Users[index].name},\n`;
      });
    }
  } 

export {initReplayClickListener}
