const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector(".searchBtn");
const recipeContainer=document.querySelector(".recipeContainer");
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeCloseBtn=document.querySelector(' .recipe-close-btn');


// function to get recipie.
const fetchRecipes= async (query)=>{

  recipeContainer.innerHTML="<h2>fetching recipes....</h2>";
    try{

    
    const data= await fetch(` https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response= await data.json();
    recipeContainer.innerHTML=" ";
     response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea} </span> Dish</p>
        <p>Belongs to <span>${meal.strCategory} </span> Category</p>
        `
        const  button =document.createElement('button');
        button.textContent="More information";
        recipeDiv.appendChild(button);


          // adding event listener to recipe button.
          button.addEventListener('click', ()=>{
              openRecipePopup(meal);
          });


        recipeContainer.appendChild(recipeDiv);
        

    });
  }
  catch(eroor){
    recipeContainer.innerHTML="<h2>  Error  in fetching   recipes....</h2>";
  }
    // console.log(responce.meals[0]);
}
const fetchingredients=(meal)=>{
  // console.log(meal);
  let ingredientList=" ";
  for (let i=1; i<=20; i++){
    const ingredient=meal[`strIngredient${i}`];
    if (ingredient){
      const measure=meal[`strMeasure${i}`];
      ingredientList += `<li>${measure}  ${ingredient}</li>`
    }
    else{
      break;
    }
  }
  return ingredientList;

}
const openRecipePopup= (meal)=>{
  recipeDetailsContent.innerHTML=`
  <h2  class="recipeName"> ${meal.strMeal}</h2>
  <h3>ingredents:<h3>
  <ul class="ingredientList"> ${fetchingredients(meal)}</ul>
  <div class="recipeinstructions">
    <h3> Instructions </h3>
    <p>${meal.strInstructions}</p>

  </div>
  `
  


  recipeDetailsContent.parentElement.style.display="block";






}

recipeCloseBtn.addEventListener('click', ()=>{
  recipeDetailsContent.parentElement.style.display="none";

});

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    if (!searchInput){
      recipeContainer.innerHTML = `<h2> type the meal in the search box...</h2>`;
      return;
    }
    fetchRecipes(searchInput);
    
    
});

