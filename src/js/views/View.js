export default class View {


    data
    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this.data = data
        const markup = this._generateMarkup();
        this._clear();

        this._parentElement.insertAdjacentHTML('afterbegin', markup)

    }

    _clear() {
        this._parentElement.innerHTML = "";
    }

    //Reusable function for rendering loading spinner
    renderSpinner() {
        const markup = `
      <div class="spinner">
            <svg>
              <use href="src/img/icons.svg#icon-loader"></use>
            </svg>
      </div>

    `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)

    }


    renderError(message = this._errorMessage) {
        const markup = `
            <div class="error">
            <div>
            <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>`
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    renderMessage(message = this.message) {
        const markup = `
            <div class="message">
            <div>
            <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>`
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

}