import { LightningElement, api } from "lwc";

export default class SearchBar extends LightningElement {
  @api searchKey;
  changeHandler(event) {
    this.searchKey = event.target.value;
    this.dispatchEvent(
      new CustomEvent("changevalue", {
        detail: this.searchKey
      })
    );
  }

  searchHandler() {
    this.dispatchEvent(new CustomEvent("search"));
  }
}