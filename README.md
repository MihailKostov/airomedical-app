# Airomedical-app
The app displays a list of beer recipes. Users could scroll through a list of recipes and view a single recipe.
## Link to Demo
https://mihailkostov.github.io/airomedical-app/
## Detailed explanation
● Get a list of recipes on initial load, save them in the zustand store
(https://api.punkapi.com/v2/beers?page=1)

● The amount of recipes rendered should always be 15

● Implement multiple selection of recipes. User can select multiple recipes by clicking on
recipes with the mouse right button. If user selected at least one recipe, the "Delete"
button should appear somewhere.

● If the user clicks the "Delete" button, selected items should be removed from rendered
list (but still 15 recipes should be rendered).

● Users can deselect recipe if item is clicked one more time.

● Users can go to a single recipe page by clicking on recipe card with mouse left button.

● If there is no more recipes to show, you should make another API request to get another
25 recipes.



## Screenshot
### Desktop
![](https://github.com/MihailKostov/images/blob/master/AiroMedicalFront.png)
#
![](https://github.com/MihailKostov/images/blob/master/AiroMedicalBack.png)
