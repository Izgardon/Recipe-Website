import View from './View.js';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');


    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;

            const goToPage = btn.dataset.goto;


            handler(goToPage);
        })
    }


    _generateMarkup() {
        const currentPage = this.data.page
        const numPages = Math.ceil(this.data.results.length / this.data.resultsPerPage);


        //Page 1, and there are other pages
        if (currentPage == 1 && numPages > 1) {
            return `
            <button data-goto="${parseInt(currentPage)+1}" class="btn--inline pagination__btn--next">
            <span>Page ${parseInt(currentPage)+1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
            `
        }


        //Last page
        if (currentPage == numPages && numPages > 1) {
            console.log(currentPage)
            return `
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
            </button>`
        }
        //Middle page
        if (currentPage < numPages && currentPage > 1) {

            return `
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage-1}</span>
          </button>
          <button data-goto="${parseInt(currentPage)+1}"  class="btn--inline pagination__btn--next">
            <span>Page ${parseInt(currentPage)+1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
            `
        }
        //Page 1, no other pages
        return ''
    }
}


export default new PaginationView()