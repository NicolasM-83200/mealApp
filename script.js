const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");
let meals = [];

const fetchMeals = async (search) => {
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => (meals = data.meals));

  console.log(meals);
};

function mealsDisplay() {
  if (meals === null) {
    result.innerHTML = "<h2>Aucun résultat</h2>";
  } else {
    meals.length = 12;

    result.innerHTML = meals
      .map((meal) => {
        let ingredients = [];

        for (let i = 1; i < 21; i++) {
          if (meal[`strIngredient${i}`]) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];

            ingredients.push(`<li>${ingredient} - ${measure}</li>`);
          }
        }
        //console.log(ingredients);

        return `
        <li class="card">
        <h2>${meal.strMeal}</h2>
        <p>${meal.strArea}</p>
        <div class="img">
          <img src="${meal.strMealThumb}" alt="Photo ${meal.strMeal}">
          <a href="${meal.strYoutube}" target="_blank">
            <img src="/video-arrow.png" alt="video arrow">
          </a>
        </div>
        <div class="text">
          <div class="ingredients-container">
            <h3>Ingredients</h3>
            <ul>${ingredients.join("")}</ul>
          </div>
          <div class="instruct-container">
            <h3>Instructions</h3>
            <div class="instruct">${meal.strInstructions}</div>
          </div>
        </div>
      </li>
            `;
      })
      .join("");
  }
}

input.addEventListener("input", (e) => {
  //fetchMeals(e.target.value);
  fetchMeals(e.target.value).then(() => mealsDisplay());
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  mealsDisplay();
});
