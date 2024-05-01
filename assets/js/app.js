const appId = "66212a2becacf4adb3025fe6";
const userApi = "https://dummyapi.io/data/v1/user?limit=50";
const postApi = "https://dummyapi.io/data/v1/tag/water/post?limit=13";
const commentApi =
  "https://dummyapi.io/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10";
const randomIndex = Math.floor(Math.random() * 10) + 1;
const leftSec = document.querySelector(".left");
const fixed = document.querySelector(".fixed");
const rightSec = document.querySelector(".right");
const activity = document.querySelector(".activity");
const explore = document.querySelector(".explore");
const MsgSec = document.querySelector(".message");
const suggesSec = document.querySelector(".suggestions");
const heading = document.querySelector(".heading");
const storyMentions = document.querySelector(".storyMentions");

async function fetchData(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "app-id": appId,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function populateUserData() {
  try {
    const userData = await fetchData(userApi);
    return userData.data;
  } catch (error) {
    console.error("Error populating user data:", error);
    return [];
  }
}

async function populatePostData() {
  try {
    const postData = await fetchData(postApi);
    return postData.data;
  } catch (error) {
    console.error("Error populating post data:", error);
    return [];
  }
}

async function populateCommentData() {
  try {
    const commentData = await fetchData(commentApi);
    return commentData.data;
  } catch (error) {
    console.error("Error populating comment data:", error);
    return [];
  }
}

function scrollRight() {
  const element = document.querySelector(".stories");
  element.scrollLeft += 50;
}

function scrollLeft() {
  const element = document.querySelector(".stories");
  element.scrollLeft -= 50;
}

async function populateStoryParent() {
  try {
    const userData = await populateUserData();
    const storyParent = document.querySelector(".storyParent");
    const storyMentions = document.querySelector(".storyMentions");
    const notifications = document.querySelector(".notifications");

    // Populate user stories
    for (let i = 0; i < Math.min(userData.length, 10); i++) {
      storyParent.innerHTML += `
                <div class="story">
                    <img src="${userData[i].picture}" alt="person"> 
                </div>`;
    }

    // Populate mention story
    const mentionStory = document.createElement("div");
    mentionStory.classList.add("d-flex", "mb-3", "align-items-center");
    mentionStory.innerHTML = `
            <div class="story custom-size me-2 ">
                <img src="${
                  userData[
                    Math.floor(Math.random() * Math.min(userData.length, 10))
                  ].picture
                }" alt="person"> 
            </div>
            <div>
                <p class="fs-6 m-0 fw-bold">Mentions</p>
                <p class="m-0">2 stories mention you</p>
            </div>`;
    storyMentions.appendChild(mentionStory);

    // Populate new followers notifications
    const newFollowers = document.createElement("div");
    const suggestions = document.querySelector(".suggestions");
    newFollowers.classList.add("d-flex", "flex-column", "gap-3");
    const selectedIndices = [];

    let randomIndex;
    for (let i = 0; i < 5; i++) {
      do {
        randomIndex = Math.floor(Math.random() * userData.length);
      } while (selectedIndices.includes(randomIndex));

      selectedIndices.push(randomIndex);
      const randomUser = userData[randomIndex];
      newFollowers.innerHTML += `
            <div class="d-flex peoples justify-content-between align-items-center">
              <div class="story custom-size me-2">
                <img src="${randomUser.picture}" alt="person"> 
              </div>
              <p class="m-0 lineHeight"><strong>${randomUser.firstName}</strong> started following you.</p>
              <div class="icon  d-flex justify-content-end">
                <i class="fa-solid fa-user-plus bg-secondary border-0 round-button d-flex justify-content-center align-items-center rounded-circle" onclick="removeFollowers(event)" ></i>
              </div>
            </div>`;
      suggestions.innerHTML += `
            <div class="d-flex peoples justify-content-between align-items-center">
            <div class="d-flex">
                <div class="story custom-size me-2">
                  <img src="${randomUser.picture}" alt="person"> 
                </div>
                <div>
                <p class="m-0 lineHeight fs-6 fw-bold">${randomUser.firstName}</p>
                <p class="m-0"> suggested for you.</p>
                </div>
              </div>
              <div class="icon d-flex justify-content-end ">
                <i class="fa-solid fa-user-plus bg-secondary border-0 round-button d-flex justify-content-center align-items-center rounded-circle" onclick="removeFollowers(event)"></i>
              </div>
            </div>
        `;
    }
    notifications.appendChild(newFollowers);

    // populate messages
    const messages = document.querySelector(".friends");
    const searchBar = document.querySelector("#search-bar");
    const searchMsg = (e) => {
      const message = document.querySelectorAll(".messages");
      const val = e.target.value.toLowerCase();
      message.forEach((ele) => {
        let name = ele.textContent.toLowerCase();
        if (name.indexOf(val) !== -1) {
          ele.parentElement.parentElement.style.display = "block";
          ele.parentElement.parentElement.classList.add("d-flex");
        } else {
          ele.parentElement.parentElement.classList.remove("d-flex");
          ele.parentElement.parentElement.style.display = "none";
        }
      });
    };
    searchBar.addEventListener("input", (e) => searchMsg(e));
    // searchBar.addEventListener('input',(e)=>{
    //   console.log(e.target.value);
    // })
    let msgData = [
      "ki hal ha",
      "bhatti sab",
      "homie?",
      "koi kaam dham nae",
      "tour p chalay",
    ];
    for (let i = 0; i < userData.length - 45; i++) {
      messages.innerHTML += `
        <div class="d-flex align-items-center">
            <div class="story custom-size me-2">
                <img src="${userData[i].picture}"alt="person">
            </div>
            <div class = "">
                <p class="fs-6 m-0 fw-bold messages">${userData[i].firstName}</p>
                <p class="m-0 ">${msgData[i]}</p>
            </div>
        </div>
        `;
    }
  } catch (error) {
    console.error("Error populating story parent:", error);
  }
}

populateStoryParent();

let likeCount = 0;
async function populateposts() {
  try {
    const PostData = await populatePostData();
    let comments = await populateCommentData();
    const posts = document.querySelector(".posts");
    // console.log(PostData.length);
    // console.log(comments[1].owner.picture);
    // console.log(comments[0].message);

    for (let i = 0; i <= Math.min(PostData.length, 10); i++) {
      // await console.log(PostData[i].picture);
      posts.innerHTML += `
        <div class="post-card p-3 bg-white w-100 h-100">
                        <div class="post-header d-flex justify-content-between">
                            <div class="d-flex">
                                <div class="story custom-size-post me-2">
                                    <img src="${PostData[i].owner.picture}"
                                        alt="person">
                                </div>
                                <div>
                                    <p class="fs-6 m-0 fw-bold">${
                                      PostData[i].owner.title +
                                      " " +
                                      PostData[i].owner.firstName +
                                      " " +
                                      PostData[i].owner.lastName
                                    }</p>
                                    <p class="m-0 caption">${
                                      PostData[i].text
                                    }</p>
                                </div>
                            </div>
                            <div class="moreDetail">
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </div>
                        <div class=" mt-3 rounded post-img overflow-hidden">
                            <img class="w-100 h-100" src="${
                              PostData[i].image
                            }" alt="">
                        </div>
                        <div class="mt-3 post-social d-flex justify-content-between ">
                            <div class="icons d-flex gap-3">
                                <i class="fs-4 fa-solid fa-heart" onclick="likeToogle(event)"></i>
                                <i class="fs-4 fa-regular fa-comment" onclick="SeeCmnts(event)"></i>
                                <i class="fs-4 fa-solid fa-share"></i>
                            </div>
                            <div class="left-icon">
                                <i class="fs-4 fa-regular fa-bookmark" onclick=""></i>
                            </div>
                        </div>
                        <div class="peolplesWholikes d-flex align-items-center">
                            <p class="ms-2 mt-3">Liked by <strong>${PostData[randomIndex].owner.lastName}</strong> and <span class="like-count">${ PostData[i].likes + likeCount -1}</span> others</p>
                        </div>
                        <div class="comment-desc">
                            <p><strong>name</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, cupiditate.</p>
                        </div>
                        <div class="modal none modal-position " tabindex="-1" role="dialog">
                            <div class="modal-dialog" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title">Comments</h5>
                                  <button type="button" class="close" onclick="close_Modal(event)" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div class="modal-body  d-flex flex-column gap-2" >
                                    <div class="d-flex  ">
                                        <div class="story custom-size me-2">
                                            <img src="${
                                              comments[0].owner.picture
                                            }" alt="person"> 
                                        </div>
                                        <p class="m-0 lineHeight"><strong>${
                                          comments[0].owner.firstName +
                                          " " +
                                          comments[0].owner.lastName
                                        }</strong> ${comments[0].message}</p>
                                    </div>
                                    <div class="d-flex ">
                                        <div class="story custom-size me-2">
                                            <img src="${
                                              comments[1].owner.picture
                                            }" alt="person"> 
                                        </div>
                                        <p class="m-0 lineHeight"><strong>${
                                          comments[1].owner.firstName +
                                          " " +
                                          comments[1].owner.lastName
                                        }</strong> ${comments[1].message}</p>
                                    </div>
                                </div>
                                <div class="add-cmnt d-flex p-3 gap-3">
                                    <input class="w-75 p-1 rounded  border-secondary" onchange="getusercmnt(event)" type="text" placeholder="Add a comment..." > <button onclick="addCmnt(event)" type="button" class="btn btn-outline-primary btn-sm px-3">Post</button>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
        `;
    }
  } catch (error) {
    console.error("Error populating posts:", error);
  }
}

populateposts();

async function populateExploreData() {
  try {
    const PostData = await populatePostData();
    explore.innerHTML += `
      <div class="containerGrid">
                          <div>
                              <img src="${PostData[0].image}"
                                  alt="">
                          </div>
                          <div>
                              <img src="${PostData[1].image}"
                                  alt="">
                          </div>
                          <div class="vertical">
                              <img src="${PostData[2].image}"
                                  alt="">
                          </div>
                          <div>
                              <img src="${PostData[3].image}"
                                  alt="">
                          </div>
                          <div>
                              <img src="${PostData[4].image}"
                                  alt="">
                          </div>
                          <div class="vertical">
                              <img src="${PostData[5].image}"
                                  alt="">
                          </div>
                          <div class="">
                              <img src="${PostData[6].image}"
                                  alt="">
                          </div>
                          <div class="">
                              <img src="${PostData[7].image}"
                                  alt="">
                          </div>
                          <div>
                              <img src="${PostData[8].image}"
                                  alt="">
                          </div>
                          <div >
                              <img src="${PostData[9].image}"
                                  alt="">
  
                          </div>
                          <div class="horizontal">
                              <img src="${PostData[10].image}"  alt="">
                          </div>
                          <div class="vertical">
                              <img src="${PostData[11].image}"
                                  alt="">
                          </div>
                          <div class="horizontal">
                              <img src="${PostData[12].image}"
                                  alt="">
                          </div>
                      </div>
      `;
  } catch (error) {
    console.log("Error populating exploreData" + error);
  }
}
populateExploreData();
let Likeflag = true;
async function likeToogle(e) {
  const likeIcon = e.target;

  if (likeIcon.classList.contains("fa-heart")) {
    const likeCountElement = likeIcon.parentElement.parentElement.nextElementSibling.querySelector('.like-count');

    if (Likeflag) {
      likeIcon.style.color = "red";
      likeCount++;
    } else {
      likeIcon.style.color = "black";
      likeCount--;
    }

    likeCountElement.textContent = parseInt(likeCountElement.textContent) + (Likeflag ? 1 : -1);
    Likeflag = !Likeflag;
  }
}

function SeeCmnts(event) {
  // const Modal = document.querySelector('.modal');
  const Modal = event.target.closest(".post-card").querySelector(".modal");
  Modal.style.display = "block";
  document.querySelector(".overlay").classList.add("bg-black");
}
function close_Modal(event) {
  const Modal = event.target.closest(".post-card").querySelector(".modal");
  Modal.style.display = "none";
  document.querySelector(".overlay").classList.remove("bg-black");
}

let ownerCmnt;
async function addCmnt(event) {
  console.log(event.target.parentElement);
  let cmntBody = event.target.parentElement.previousElementSibling;
  if (ownerCmnt != "" && ownerCmnt !== undefined) {
    cmntBody.innerHTML += `<!-- idhar maasla kr rha is ki wjha post zaida ha aur hume na general ek hi classs kia hui ha -->
        <div class="d-flex  ">
        <div class="story custom-size me-2">
            <img class="border-0 " src="../../riyan.jpg" alt="person"> 
        </div>
        <p class="m-0 lineHeight"><strong class="me-2">Riyan Qadir</strong>${ownerCmnt}</p>
        <button type="button" onclick="remove_btn(event)" class="btn btn-outline-danger delete btn-sm ml-auto">Delete</button>
        </div>
        `;
    event.target.previousElementSibling.value = "";
    ownerCmnt = "";
  } else {
    alert("Please enter a comment before posting.");
  }
}

function remove_btn(event) {
  event.target.parentElement.remove();
}

function getusercmnt(event) {
  console.log(event.target.value);
  ownerCmnt = event.target.value;
}
document
  .getElementById("scrollButtonRight")
  .addEventListener("click", scrollRight);

document
  .getElementById("scrollButtonLeft")
  .addEventListener("click", scrollLeft);

let index = 0;
window.addEventListener("scroll", () => {
  const scrollPercentage =
    ((window.scrollY + window.innerHeight) /
      document.documentElement.scrollHeight) *
    100;
  if (scrollPercentage >= 80 && index < 5) {
    populateposts();
    index++;
  }
});

function removeFollowers(event) {
  event.target.parentElement.parentElement.remove();
}

let asideBar = document.querySelector(".aside-bar");
function show() {
  asideBar.classList.add("show");
  console.log("hello");
}
function hide() {
  asideBar.classList.remove("show");
}

function common(event) {
  if (event.target.classList.contains("Notifications")) {
    leftSec.classList.toggle("db");
    rightSec.classList.remove("db");

    // fixed.classList.toggle('db');
    // explore.style.display = 'none';
    // storyMentions.style.display = 'none';
    // heading.style.display = 'none';
    // console.log("hello");
  } else if (event.target.classList.contains("Messages")) {
    rightSec.classList.toggle("db");
    leftSec.classList.remove("db");

    // fixed.classList.toggle('db')
    // fixed.style.display = 'block';
    // console.log(document.querySelector(".message"));
  } else if (event.target.classList.contains("Explore")) {
    rightSection.classList.toggle("db");
    messageSection.classList.toggle("db");
  } else if (event.target.classList.contains("Messages")) {
    rightSection.classList.toggle("db");
    requestSection.classList.toggle("db");
  }
}
