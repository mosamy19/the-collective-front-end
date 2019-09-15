import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  @Output() addExpertEvent = new EventEmitter();
  @Output() search = new EventEmitter();
  searchQuery;
  isProfileList: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() {
    this.getRouteParams();
  }

  addExpert() {
    this.addExpertEvent.emit();
  }

  getRouteParams() {
    if (this.router.url == "/profile/list") {
      this.isProfileList = true;
    }
  }

  onSeachBtnClick() {
    this.search.emit(this.searchQuery);
  }
}
