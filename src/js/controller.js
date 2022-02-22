import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'
import bookmarksView from './views/bookmarksView.js'


const controlRecipes = async function() {
    try {
        const id = window.location.hash.slice(1);


        if (!id) return;
        recipeView.renderSpinner()
            //1)Loading recipe
        await model.loadRecipe(id);
        const { recipe } = model.state

        // 2) Rendering recipe and bookmarks

        recipeView.render(model.state.recipe)
        bookmarksView.render(model.state.bookmarks)

    } catch (err) {

        recipeView.renderError()
    }

}

const controlServings = function(newServings) {
    // Update the receipe servings (in state)
    model.updateServings(newServings);
    //Update recipe view
    recipeView.render(model.state.recipe);
}

const controlAddBookmark = function() {
    //Add/remove bookmarks

    if (!model.state.recipe.bookmarked) {
        model.addBookmark(model.state.recipe);
    } else {
        model.deleteBookmark(model.state.recipe.id);
    }

    //Update recipe view
    recipeView.render(model.state.recipe);

    //Render bookmarks

    bookmarksView.render(model.state.bookmarks)

}




const controlSearchResults = async function() {
    try {
        resultsView.renderSpinner();

        //Get search query
        const query = searchView.getQuery();
        if (!query) return;

        //Load search results
        await model.loadSearchResults(query)

        //Render results

        resultsView.render(model.getSearchResultsPage(1));

        //Render Initial pagination buttons
        paginationView.render(model.state.search)

    } catch (err) {

    }

}

const controlPagination = function(goToPage) {
    //Render new results

    resultsView.render(model.getSearchResultsPage(goToPage));

    //Render New pagination buttons
    paginationView.render(model.state.search)
}





const init = function() {
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark)
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
}

init();