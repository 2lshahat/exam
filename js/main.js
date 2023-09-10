let rowData = document.getElementById("rowData");
arr = [];
$(document).ready(() => {
  searchByName("").then(() => {
    $(".loading-screen").fadeOut(500);
    $("body").css("overflow", "visible");
  });
});
function displayData() {
  let movieCard = "";
  for (let i = 0; i < arr.length; i++) {
    movieCard += `
    <div class="pic col-md-4">
          <div class="bg-black p-3">
            <img src="https://image.tmdb.org/t/p/w500${arr[i].poster_path}" alt="" />
            <div class="layer">
              <div class="movie-content">
                <h2>${arr[i].name}</h2>
                <p>
                 ${arr[i].overview}
                </p>
                <p>relased date:${arr[i].first_air_date}</p>
                <i class="fa-solid fa-star text-warning fs-6"></i>
                <i class="fa-solid fa-star text-warning fs-6"></i>
                <i class="fa-solid fa-star text-warning fs-6"></i>
            
                <h2 class="rate">${arr[i].vote_average}</h2>
              </div>
            </div>
          </div>
        </div>

  `;
  }
  rowData.innerHTML = movieCard;
}

async function requastData() {
  var https = await fetch(
    "https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
  );
  var dataRespone = await https.json();
  arr = dataRespone.results;
  displayData();
}
requastData();

function openSideNav() {
  $(".side-nav-menu").animate(
    {
      left: 0,
    },
    500
  );
  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 8) * 100
      );
  }
}
function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu").animate(
    {
      left: -boxWidth,
    },
    500
  );
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
  $(".links li").animate(
    {
      top: 500,
    },
    500
  );
}
closeSideNav();
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});
async function requastPopularData() {
  var https = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=a82cbe181c040076a2d44ae315b6fe65"
  );
  var datapRespone = await https.json();
  arr = datapRespone.results;
  displayData(datapRespone.results);
}
requastPopularData();
