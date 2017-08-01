import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  version = environment.version;
  buildDate = environment.buildDate;
  currentRoute: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    router.events.subscribe(scroll => {
      // Scroll to top of page on route change
      window.scrollTo(0, 0);
    });
  }

  gotoHashtag(fragment: string) {
    const element = document.querySelector('#' + fragment);
    if (element) {
      element.scrollIntoView();
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
