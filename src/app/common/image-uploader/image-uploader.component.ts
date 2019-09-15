import {
  Component,
  OnInit,
  ElementRef,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { FileUploader } from "ng2-file-upload/ng2-file-upload";
import { ImageService } from "./image.service";
import { baseURL } from "src/app/shared/baseurl";

function readBase64(file): Promise<any> {
  var reader = new FileReader();
  var future = new Promise((resolve, reject) => {
    reader.addEventListener(
      "load",
      function() {
        resolve(reader.result);
      },
      false
    );

    reader.addEventListener(
      "error",
      function(event) {
        reject(event);
      },
      false
    );

    reader.readAsDataURL(file);
  });
  return future;
}

const URL = baseURL + "upload";

@Component({
  selector: "app-image-uploader",
  templateUrl: "./image-uploader.component.html",
  styleUrls: ["./image-uploader.component.scss"]
})
export class ImageUploaderComponent implements OnInit {
  @Input() imgUrl;
  @Output() imgChange = new EventEmitter();
  public hasBaseDropZoneOver: boolean = false;

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: "photo"
  });

  // public uploader:FileUploader = new FileUploader({
  //   url: URL,
  //   disableMultipart:true
  //   });

  constructor(private imageService: ImageService, private el: ElementRef) {}

  ngOnInit() {
    this.fileUploadInit();
  }

  upload() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
      "#photo"
    );
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) {
      formData.append("photo", inputEl.files.item(0));
      this.imageService.uploadImg(formData);
    }
  }

  fileUploadInit() {
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      this.imgUrl = `${baseURL}uploads/${response}`;
      this.onvalueChange(response);
    };
  }

  onvalueChange(imgName) {
    this.imgChange.emit(imgName);
  }

  clickHandler() {
    document.getElementById("file-upload").click();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
