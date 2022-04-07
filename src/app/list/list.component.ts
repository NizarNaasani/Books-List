import { Component, Directive, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';
import { bookItem } from '../models/bookItem';

@Component({
  selector: 'book-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  @Input() books: bookItem[] = [];
  @Input() listIndex: number = 0;

  constructor(private appService: AppService, private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.booksList = this.books;
  }

  asc: boolean = false;
  currentYear: number = this.appService.currentYear
  listCols: string[] = ["Book Title", "Year", "Author name", "Delete"];
  booksList: bookItem[] = [];

  //#region Book Form
  bookForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    year: [1100, [Validators.required, Validators.min(1100), Validators.max(this.currentYear)]],
    author: ['', [Validators.required, Validators.minLength(4)]],
    order: [1, [Validators.required, Validators.min(0), Validators.max(100)]]
  })
  get title() { return this.bookForm.get('title'); }
  get year() { return this.bookForm.get('year'); }
  get author() { return this.bookForm.get('author'); }
  get order() { return this.bookForm.get('order'); }
  //#endregion

  SortList() {
    let self = this;
    this.asc = !this.asc;
    this.booksList.sort(function (l, r) {
      return l.order > r.order ? (self.asc ? 1 : -1)
        : l.order < r.order ? (self.asc ? -1 : 1)
          : 0;
    });
  }

  RemovebooksList() {
    this.appService.RemovebooksList(this.listIndex);
  }

  ShowAddBookModal(modal: TemplateRef<any>) {
    this.modalService.open(modal, { size: 'lg' });
  }

  AddBookToList(listIndex: number, bookForm: FormGroup) {
    this.appService.AddBookToList(listIndex, bookForm.value);
    this.modalService.dismissAll();
    this.bookForm.reset();
  }

  RemoveBook(bookIndex: number) {
    this.appService.RemoveBook(this.listIndex, bookIndex)
  }
}
