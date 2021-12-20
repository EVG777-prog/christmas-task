import { homePageHTML } from "./pages/home";
import { selectPageHTML } from "./pages/select";

import { View } from "./view";

class Router {
  constructor() {
    addEventListener('hashchange', this.handleHash);
  }
  handleHash() {

    switch (window.location.hash) {
      case '#home':
        console.log('It is HOME!');
        View.renderHomePage();
        break;
      case '#select':
        console.log('It is SELECT!');
        View.renderSelectPage();
        break;
      case '#tree':
        console.log('It is TREE!');
        View.renderHomePage();
        break;
    }

  }
}

export { Router };