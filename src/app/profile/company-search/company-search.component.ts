import {
  Component,
  OnInit,
  Input,
  Output,
  AfterViewInit,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewChild
} from "@angular/core";
import { CompanyModel } from "../company.module";
import { baseURL } from "./../../shared/baseurl";
import { CompanyService } from "../company.service";
import { MatDialog } from "@angular/material/dialog";
import { AddCompanyDialog } from "./AddCompanyDialog";
import { MatAutocompleteTrigger } from "@angular/material";

@Component({
  selector: "app-company-search",
  templateUrl: "./company-search.component.html",
  styleUrls: ["./company-search.component.scss"],
  host: {
    "(document:click)": "clickout($event)"
  }
})
// AfterViewInit
export class CompanySearchComponent implements OnInit {
  @Input() userId;
  @Output() addedCompany = new EventEmitter();
  @Output() closeCompanyInput = new EventEmitter();
  @Input() searchForCompany: boolean;
  @ViewChild(MatAutocompleteTrigger, { static: false })
  trigger: MatAutocompleteTrigger;
  companies: CompanyModel[];
  imgBaseUrl = baseURL + "uploads/";
  query: string = "";

  constructor(
    private companyService: CompanyService,
    public dialog: MatDialog,
    private elRef: ElementRef
  ) {
    this.companies = [];
  }

  ngOnInit() {}

  // ngAfterViewInit() {
  //   this.trigger.autocomplete.closed.subscribe(e => {
  //     console.log("emitted");
  //   });
  // }

  getSearchCompany(query) {
    if (query) {
      this.companyService
        .getSeachResult(query)
        .subscribe(data => (this.companies = data));
    } else {
      this.companies = [];
    }
  }

  openAddCompanyDialog(): void {
    const dialogRef = this.dialog.open(AddCompanyDialog, {
      data: {
        name: this.query,
        location: "",
        website: "",
        description: "",
        logoImg: ""
      },
      width: "560px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { name, location, website, description, logoImg } = result;
        const data = {
          name,
          location,
          website,
          description,
          logoImg
        } as CompanyModel;
        this.addNewCompany(data);
      }
    });
  }

  addNewCompany(data: CompanyModel) {
    this.companyService.addNewCompany(data, this.userId).subscribe(data => {
      this.addedCompany.emit(data as CompanyModel);
      this.query = "";
    });
  }

  clickout(event) {
    if (this.elRef.nativeElement.contains(event.target)) {
      console.log("clicked inside");
    } else {
      if (
        event.target != document.querySelector("#add-company") &&
        event.target != document.querySelector("#add-company img")
      ) {
        if (this.searchForCompany) {
          this.closeCompanyInput.emit();
        }
      }
    }
  }
}
