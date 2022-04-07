import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';
import { BookItem } from '../models/BookItem';

@Component({
  selector: 'app-book-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  @Input() books: BookItem[] = [];
  @Input() listIndex: number = 0;

  constructor(private appService: AppService, private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.booksList = this.books;
  }

  asc: boolean = false;
  currentYear: number = this.appService.currentYear
  listCols: string[] = ["Book Title", "Year", "Author name", "Delete"];
  booksList: BookItem[] = [];

  //#region Book Form
  bookForm: FormGroup = this.formBuilder.group(this.appService.bookItem);
  get title() { return this.bookForm.get('title'); }
  get year() { return this.bookForm.get('year'); }
  get author() { return this.bookForm.get('author'); }
  get order() { return this.bookForm.get('order'); }
  //#endregion

  sortList() {
    let self = this;
    this.asc = !this.asc;
    this.booksList.sort(function (l, r) {
      return l.order > r.order ? (self.asc ? 1 : -1)
        : l.order < r.order ? (self.asc ? -1 : 1)
          : 0;
    });
  }

  removeBooksList() {
    this.appService.removeBooksList(this.listIndex);
  }

  showAddBookModal(modal: TemplateRef<any>) {
    this.modalService.open(modal, { size: 'lg' });
  }

  addBookToList(listIndex: number, bookForm: FormGroup) {
    this.appService.addBookToList(listIndex, bookForm.value);
    this.modalService.dismissAll();
    this.bookForm.reset();
  }

  removeBook(bookIndex: number) {
    this.appService.removeBook(this.listIndex, bookIndex)
  }
}
