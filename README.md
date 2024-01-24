# Welcome to Dishcover!

Welcome to **Dishcover**, your go-to platform for culinary exploration and creativity! **Dishcover** is a web app designed to bring together food enthusiasts from around the world, allowing them to share, discover, and savor delightful homemade recipes.

:cherries: Have fun! :carrot:

A collaboration effort between @chunxtan @Haozhi415 @xsijin

## Screenshots

Enter App's landing page and any other screenshots of interest

## Technologies Used

JavaScript, CSS, HTML, GitHub, React, React Router, Vite, Tailwind/DaisyUI, Mongoose, Express, Crypto, SplideJS/React-Splide

localStorage to store token

## Getting Started

Web link: https://dishcoveries.onrender.com/

Repos:
Front End: https://github.com/xsijin/Dishcover
Back End: https://github.com/Haozhi415/GA_P3_backend 

[Miro Board](https://miro.com/app/board/uXjVN9wiZ8c=/)
[Figma Wireframe](https://www.figma.com/file/jmQyhu4rRCjEOahmJ2iO0Q/Project-3?type=design&mode=design&t=FHnU6fG21cagAsb2-0)
[Trello Board](https://trello.com/b/dccanYjz/project3-rox)

## User Types & Authorization

| Authorization    | Public         | Logged in User | Logged in & Owner  | Admin          |
| ----------------- | --------------| -------------- | -------------- | -------------- |
| Read Recipes      | ✔             | ✔             | ✔              | ✔              |
| Create Recipes    |               | ✔              | ✔             | ✔              |
| Update Recipes    |               |                | ✔ (own)        | ✔ (all)        |
| Delete Recipes    |               |                | ✔ (own)        | ✔ (all)        |
| Read Reviews      | ✔             | ✔             | ✔              | ✔              |
| Create Reviews    |               | ✔              | ✔              | ✔              |
| Update Reviews    |               |                | ✔ (own)        | ✔ (all)        |
| Delete Reviews    |               |                | ✔ (own)        | ✔ (all)        |

## Authentication Flow

## Entity-Relationship-Diagram

## Next Steps

- [ ] Planned future enhancements (icebox items).

## Showed the code for the "main" Mongoose Model, its controller & favorite React Component

My favourite part of the javascript is finally understanding how functions within functions work. I was able to bundle similar & repeated functions which makes my code look neater and less DRY.

```
function initialize() {
    countScore = 0;
    safespot.classList.add("begin");
    obstacles.classList.add("begin");
    isGameOver = false;
    removeButtons();
    gameStart();
    safespot.addEventListener('animationiteration', safespotAnimationListener);
}
```

For the above, I added a single removeButtons(); function instead of having 3 separate removeButton functions for each button.

```
function removeButtons() {
    onePlayer.remove();
    twoPlayer.remove();
    mobile.remove();
}
```

## Key Challenges / Learning / Takeaways

1. Check git branch first before doing any work! This will save you headaches down the road trying to change commits to a different branch.
2. Git pull often to reduce the chances of a merge conflict.
3. Try to ensure all pull requests are approved first before making new changes to reduce the chances of a merge conflict.
4. Communicate with team members which file we are working on to reduce the chances of a merge conflict.

## Resources

- [Render](https://render.com/) - Deployment of Front End & Back End
- [Miro](https://miro.com) - Task and project management platform
- [Figma](https://figma.com) - Wireframe
- [Trello](https://trello.com) - Ideas & User Story creation
- [Postman](https://www.postman.com) - API Client
