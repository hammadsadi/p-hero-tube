let defaultCatId = 1000;
// Get All Category
let getAllCatagory = async () => {
  let res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  let cat = await res.json();
  showAllCatList(cat.data);
};

// Show All Cat List
let showAllCatList = (catagories) => {
  // Get Element By ID
  let catagoryList = document.getElementById("catagory-list");
  //   Show Catagory List Using ForEach
  catagories.forEach((cat) => {
    // Create Button
    let createBtn = document.createElement("button");
    createBtn.classList =
      "py-1 px-3 bg-slate-200 rounded-md text-slate-600 text-sm";
    createBtn.innerText = cat.category;
    // Send Category Id
    createBtn.addEventListener("click", () => getCategoryItem(cat.category_id));
    catagoryList.appendChild(createBtn);
    console.log(cat);
  });
};

// Get Category Id
let getCategoryItem = async (id) => {
  defaultCatId = id;
  let res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${defaultCatId}`
  );
  let resItem = await res.json();
  displayData(resItem.data);
};

// Display Data
let displayData = (data) => {
  // Get Card Container
  let cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  data.forEach((videoInfo) => {
    console.log(videoInfo);
    // Create Div
    let cardDiv = document.createElement("div");
    cardDiv.classList = "card card-compact";
    cardDiv.innerHTML = `
    
    <img
    src="${videoInfo?.thumbnail}"
    alt="Shoes"
    class="rounded-md w-[312px] h-[200px] object-cover"
  />
  <div class="flex gap-3 p-2 mt-1">
    <img
      src="${videoInfo.authors[0]?.profile_picture}"
      alt=""
      class="w-10 h-10 rounded-full object-cover"
    />
    <div class="space-y-1">
      <h3 class="text-base font-bold">
        ${videoInfo.title}
      </h3>
      <!-- User info  -->
      <div class="flex gap-2">
        <h5 class="text-[#171717B3]">${videoInfo.authors[0]?.profile_name}</h5>
       ${
         videoInfo.authors[0]?.verified
           ? '<img src="./images/badges.svg" alt="" class="" />'
           : ""
       }
        
      </div>
      <p class="text-[#171717B3]">${videoInfo?.others.views}</p>
    </div>
  </div>
    `;
    cardContainer.appendChild(cardDiv);
  });
  //   Display Cat Video
};
// Load All Video
getCategoryItem(defaultCatId);
getAllCatagory();
