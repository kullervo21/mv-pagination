import { LitElement, html, css } from "lit";
import "@meveo-org/mv-button";

export class MvPagination extends LitElement {
  static get properties() {
    return {
      page: { type: Number, attribute: true, reflect: true },
      pages: { type: Number, attribute: true, reflect: true },

      // max-buttons must be an odd number >= 3, default 5
      "max-buttons": { type: Number, attribute: true, reflect: true },
      // valid justify values are: "left", "right", or "center", default "center"
      justify: { type: String, attribute: true, reflect: true },
      // valid type values are: "button", "text", or "none", default "button"
      type: { type: String, attribute: true, reflect: true },

      //  valid theme values are: "light", "dark"
      //    default: "light"
      theme: { type: String, attribute: true },
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
        --light-background: var(--mv-pagination-light-background, #eaebf0);
        --dark-background: var(--mv-pagination-dark-background, #3999c1);
        --selected-light-background: var(
          --mv-pagination-selected-light-background,
          #008fc3
        );
        --selected-dark-background: var(
          --mv-pagination-selected-dark-background,
          #23404c
        );
        --light-color: var(--mv-pagination-light-color, #80828c);
        --dark-color: var(--mv-pagination-dark-color, #ffffff);
        --hover-light-background: var(
          --mv-pagination-hover-light-background,
          #ffffff
        );
        --hover-dark-background: var(
          --mv-pagination-hover-dark-background,
          #007fad
        );
        --pagination-width: var(--mv-pagination-width);
        --pagination-min-width: var(--mv-pagination-min-width);
        --pagination-height: var(--mv-pagination-height);
        --pagination-display: var(--mv-pagination-display);
        --pagination-align-items: var(--mv-pagination-align-items);
        --pagination-span-justify-content: var(--mv---pagination-span-justify-content);
        --pagination-current-page-margin: var(--mv-pagination-current-page-margin);
        --pagination-current-page-padding: var(--mv-pagination-current-page-padding);
        --pagination-current-page-background-color: var(--mv-pagination-current-page-background-color);
        --pagination-current-page-border-radius: var(--mv-pagination-current-page-border-radius);
        --pagination-current-page-font-weight: var(--mv-pagination-current-page-font-weight);
        --mv-pagination-container-height: var(--mv-pagination-container-light-height);
        --pagination-group-top-margin: var(--mv-pagination-group-top-margin);
      }
      .mv-pagination-container {
        margin-top: var(--pagination-group-top-margin, 10px);
        display: flex;
        flex-direction: row;
        height: var(--mv-pagination-container-height);
      }
      .mv-pagination-container.left {
        justify-content: flex-start;
      }
      .mv-pagination-container.center {
        justify-content: center;
      }
      .mv-pagination-container.right {
        justify-content: flex-end;
      }
      .mv-pagination-group {
        display: flex;
        align-items: center;
        width: var(--pagination-width);
        justify-content: var(--mv-pagination-justify-content);
      }
      .button-group {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: var(--background-color);
        border-radius: 55px;
        margin: 0px 15px;
        --mv-button-margin: 0 5px;
      }
      .button-group mv-button:first-child,
      .button-group mv-button:nth-child(2) {
        --mv-button-margin: 0 5px 0 0;
      }
      .button-group mv-button:last-child,
      .button-group mv-button:nth-last-child(2) {
        --mv-button-margin: 0 0 0 5px;
      }
      .page-buttons {
        font-size: var(--font-size-m, 16px);
        font-weight: var(--pagination-button-font-weight, normal);
      }
      .page-buttons.large {
        font-size: var(--font-size-xxl, 24px);
        font-weight: var(--pagination-button-font-weight-large, bold);
        height: 24px;
        width: 24px;
        display: inline-block;
        position: relative;
        top: -6px;
      }
      .current-page {
        color: var(--mv-pagination-current-page-color);
        width: var(--pagination-width);
        min-width: var(--pagination-min-width);
        height: var(--pagination-height);
        display: var(--pagination-display);
        align-items: var(--pagination-align-items);
        justify-content: var(--pagination-span-justify-content);
        margin: var(--pagination-current-page-margin);
        padding: var(--pagination-current-page-padding);
        background-color: var(--pagination-current-page-background-color);
        border-radius: var(--pagination-current-page-border-radius);
        font-weight: var(--pagination-current-page-font-weight);
      }
      .light {
        --mv-button-circle-background: var(--light-background);
        --mv-button-light-background: var(--selected-light-background);
        --background-color: var(--light-background);
        --mv-button-circle-hover-background: var(--hover-light-background);
        --mv-button-circle-color: var(--light-color);
        --width: var(--pagination-width, auto);
        --mv-pagination-justify-content: var(--mv-pagination-light-justify-content, space-evenly);
        --mv-pagination-current-page-color: var(--mv-pagination-current-page-text-color, black);
      }
      .dark {
        --mv-button-circle-background: var(--dark-background);
        --mv-button-light-background: var(--selected-dark-background);
        --background-color: var(--dark-background);
        --mv-button-circle-hover-background: var(--hover-dark-background);
        --mv-button-circle-color: var(--dark-color);
        --width: var(--pagination-width, auto);
        --mv-pagination-justify-content: space-evenly;
        --mv-pagination-current-page-color: white;
      }
    `;
  }

  constructor() {
    super();
    this.page = 1;
    this.pages = 0;
    this["max-buttons"] = 5;
    this.justify = "center";
    this.type = "button";
    this.isButtonType = true;
    this.isHidden = true;
    this.showLeftSeparator = false;
    this.showRightSeparator = false;
    this.showFirstPageButton = false;
    this.showLastPageButton = false;
    this.leftMostButton = 0;
    this.rightMostButton = 0;
    this.pageGroup = [];
    this.theme = "light";
  }

  render() {
    const containerClass = `mv-pagination-container ${this.justify}`;
    const isFirstPage = this.page === 1;
    const isLastPage = this.page === this.pages;

    this.setVisibility(this.page, this.pages);

    return this.isHidden
      ? html``
      : html`
          <div class="${containerClass} ${this.theme}">
            <div class="mv-pagination-group">
              <mv-button
                @button-clicked="${this.gotoPage(1)}"
                ?disabled="${isFirstPage}"
                .visible="${!this.isButtonType}"
                type="circle"
              >
                <slot name="first-button">
                  <span class="page-buttons large">&laquo;</span>
                </slot>
              </mv-button>
              <mv-button
                @button-clicked="${this.gotoPage(this.page - 1)}"
                ?disabled="${isFirstPage}"
                type="circle"
              >
                <slot name="previous-button">
                  <span class="page-buttons large">&lsaquo;</span>
                </slot>
              </mv-button>
              ${this.type === "text"
                ? html`
                    <span class="current-page">
                      ${`Page ${this.page} of ${this.pages}`}
                    </span>
                  `
                : html``}
              ${this.isButtonType
                ? html`
                    <div class="button-group">
                      <mv-button
                        @button-clicked="${this.gotoPage(1)}"
                        ?disabled="${isFirstPage}"
                        .visible="${this.showFirstPageButton}"
                        type="circle"
                      >
                        <span class="page-buttons">1</span>
                      </mv-button>
                      ${this.showLeftSeparator
                        ? html` <span class="page-buttons">...</span> `
                        : html``}
                      ${this.pageGroup.map(
                        (page) => html`
                          <mv-button
                            @button-clicked="${this.gotoPage(page)}"
                            ?selected="${page === this.page}"
                            ?disabled="${page > this.pages}"
                            type="circle"
                          >
                            <span class="page-buttons">${page}</span>
                          </mv-button>
                        `
                      )}
                      ${this.showRightSeparator
                        ? html` <span class="page-buttons">...</span> `
                        : html``}
                      <mv-button
                        @button-clicked="${this.gotoPage(this.pages)}"
                        ?disabled="${isLastPage}"
                        .visible="${this.showLastPageButton}"
                        type="circle"
                      >
                        <span class="page-buttons">${this.pages}</span>
                      </mv-button>
                    </div>
                  `
                : html``}
              <mv-button
                @button-clicked="${this.gotoPage(this.page + 1)}"
                ?disabled="${isLastPage}"
                type="circle"
              >
                <slot name="next-button">
                  <span class="page-buttons large">&rsaquo;</span>
                </slot>
              </mv-button>
              <mv-button
                @button-clicked="${this.gotoPage(this.pages)}"
                ?disabled="${isLastPage}"
                .visible="${!this.isButtonType}"
                type="circle"
              >
                <slot name="last-button">
                  <span class="page-buttons large">&raquo;</span>
                </slot>
              </mv-button>
            </div>
          </div>
        `;
  }

  connectedCallback() {
    const { page, pages } = this;
    this.isFirstPage = page === 1;
    this.isLastPage = page === pages;
    this.setVisibility(page, pages);
    if (this.type === "button") {
      const maxButtons = this["max-buttons"];
      const isEven = maxButtons % 2 === 0;
      if (isEven) {
        this["max-buttons"] = maxButtons - 1;
      }
      this.setButtonProps();
    }
    super.connectedCallback();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.isButtonType = this.type === "button";
    if (this.isButtonType) {
      this.setButtonProps();
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  setVisibility = (page, pages) => {
    this.isHidden = page < 1 || pages < 1;
  };

  setButtonProps() {
    const maxButtons = this["max-buttons"];
    const adjacentButtonCount = Math.floor(maxButtons / 2);
    this.pageGroup = [];
    this.leftMostButton = this.page - adjacentButtonCount;
    this.rightMostButton = this.page + adjacentButtonCount;
    let start = 1;
    if (this.leftMostButton < 1) {
      start = 1;
    } else if (this.rightMostButton > this.pages) {
      start = this.pages - maxButtons + 1;
    } else {
      start = this.leftMostButton;
    }
    this.pageGroup = Array.from({ length: maxButtons }, (_, i) => i + start);
    this.showLeftSeparator = this.leftMostButton > 2;
    this.showRightSeparator = this.rightMostButton < this.pages - 1;
    this.showFirstPageButton =
      (this.isButtonType && this.showLeftSeparator) ||
      this.leftMostButton === 2;
    this.showLastPageButton =
      (this.isButtonType && this.showRightSeparator) ||
      this.rightMostButton === this.pages - 1;
  }

  gotoPage(page) {
    return () => {
      this.dispatchEvent(new CustomEvent("change-page", { detail: { page } }));
    };
  }
}

customElements.define("mv-pagination", MvPagination);