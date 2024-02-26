function searchMeal() {
    var ing = document.getElementById('recipeSearch').value;

    if (ing.trim() !== '') {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`, {
        method: "GET",
        })
        .then((response) => response.json())
        .then((data) => {
            var meals = data.meals;
            var displayRecipe = document.getElementById('display-meal');
            
            displayRecipe.innerHTML = '';

            meals.forEach(meal => {
                var recipeBox = document.createElement('div');
                recipeBox.className = 'meal-box';

                var receipeButton = document.createElement('div');
                receipeButton.className = 'receipe-button';

                var strMealThumb = document.createElement('img');
                strMealThumb.className = 'meal-image';
                strMealThumb.src = meal.strMealThumb;
                strMealThumb.alt = meal.strMealThumb;

                var strMeal = document.createElement('p');
                strMeal.textContent = meal.strMeal;

                var recipeButton = document.createElement('button');
                recipeButton.className = 'recipe-button';
                recipeButton.textContent = 'Get Recipe';

                recipeButton.addEventListener('click', function() {
                    getReceipe(meal.idMeal);
                });

                recipeBox.appendChild(strMealThumb);
                recipeBox.appendChild(strMeal);
                recipeBox.appendChild(recipeButton);
                displayRecipe.appendChild(recipeBox);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    } else {
        console.log('input gol')
    }
}

// Function to get the recipe details
function getReceipe(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
            var mealDetails = data.meals[0];

            var modal = document.createElement('div');
            modal.className = 'modal';

            var modalContent = document.createElement('div');
            modalContent.className = 'modal-content';

            var closeBtn = document.createElement('span');
            closeBtn.className = 'close-btn';
            closeBtn.textContent = 'X'; 
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });

            var mealNameHeading = document.createElement('h2');
            mealNameHeading.textContent = mealDetails.strMeal;

            var mealCategory = document.createElement('h4');
            mealCategory.textContent = mealDetails.strCategory;

            var ingredientsHeading = document.createElement('h3');
            ingredientsHeading.textContent = 'Instruction:';

            var mealInstructions = document.createElement('div');
            mealInstructions.textContent = mealDetails.strInstructions;

            var mealThumb = document.createElement('img');
            mealThumb.className = 'meal-thumb';
            mealThumb.src = mealDetails.strMealThumb;
            mealThumb.alt = mealDetails.strMealThumb;

            var mealYoutube = document.createElement('a');
            mealYoutube.className = 'yt-link';
            mealYoutube.textContent = 'Watch Video';
            mealYoutube.href = mealDetails.strYoutube;

            modalContent.appendChild(closeBtn);
            modalContent.appendChild(mealNameHeading);
            modalContent.appendChild(mealCategory);
            modalContent.appendChild(ingredientsHeading);
            modalContent.appendChild(mealInstructions);
            modalContent.appendChild(mealThumb);
            modalContent.appendChild(mealYoutube);
            modal.appendChild(modalContent);

            document.body.appendChild(modal);

            modal.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

searchMeal();