import View from './View.js';

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it!"
    message = ""



    _generateMarkup() {

        return this.data.map(this._generateMarkupPreview).join('')



    }
    _generateMarkupPreview(result) {
        return `
        <li class="preview">
            <a class="preview__link" href="#${result.id}">
                <figure class="preview__fig">
                    <img src="${result.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${result.title}</h4>
                    <p class="preview__publisher">${result.publisher}</p>
                    
                </div>
            </a>
        </li>`
    }
}

export default new BookmarksView();