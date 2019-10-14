export default class Search {
    constructor() {
        this.injectHTML()
        this.headerSearchIcon = document.querySelector(".header-search-icon")
        this.overlay = document.querySelector(".search-overlay")
        this.closeIcon = document.querySelector(".close-live-search")
        this.events()
    }

    events() {
        this.closeIcon.addEventListener("click", () => this.closeOverlay())
        this.headerSearchIcon.addEventListener("click", event => {
            event.preventDefault()
            this.openOverlay()
        })
    }

    openOverlay() {
        this.overlay.classList.add("search-overlay--visible")
    }

    closeOverlay() {
        this.overlay.classList.remove("search-overlay--visible")
    }

    injectHTML() {
        document.body.insertAdjacentHTML("beforeend", 
        `<div class="search-overlay">
        <div class="search-overlay-top shadow-sm">
          <div class="container container--narrow">
            <label for="live-search-field" class="search-overlay-icon"><i class="fas fa-search"></i></label>
            <input type="text" id="live-search-field" class="live-search-field" placeholder="What are you interested in?">
            <span class="close-live-search"><i class="fas fa-times-circle"></i></span>
          </div>
        </div>
    
        <div class="search-overlay-bottom">
          <div class="container container--narrow py-3">
            <div class="circle-loader"></div>
            <div class="live-search-results live-search-results--visible">
              <div class="list-group shadow-sm">
                <div class="list-group-item active"><strong>Search Results</strong> (4 items found)</div>
    
                <a href="#" class="list-group-item list-group-item-action">
                  <span class="text-muted small">Sample Content</span>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                  <span class="text-muted small">Sample Content</span>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                  <span class="text-muted small">Sample Content</span>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                  <span class="text-muted small">Sample Content</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>`)
    }
}