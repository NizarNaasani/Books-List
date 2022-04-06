import { Component, Directive, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../app.service';
import { BookItem } from '../models/BookItem';

@Component({
  selector: 'book-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})



export class ListComponent implements OnInit {
  @Input() books: BookItem[] = [];
  @Input() listIndex: number = 0;

  constructor(private appService: AppService, private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.BooksList = this.books;
  }

  asc: boolean = false;
  ListCols: String[] = ["Book Title", "Year", "Author title", "Delete"];
  BooksList: BookItem[] = [];
  BookForm: FormGroup = this.formBuilder.group({
    title: ["", Validators.required],
    year: [1950, Validators.required],
    author: ["", Validators.required],
    order: [1, Validators.required]
  })

  sortList() {
    var self = this;
    this.asc = !this.asc;
    this.BooksList.sort(function (l, r) {
      return l.order > r.order ? (self.asc ? 1 : -1) : l.order < r.order ? (self.asc ? -1 : 1) : 0;
    });
  }

  RemoveList() {
    this.appService.RemoveList(this.listIndex);
  }

  showAddBookModal(modal: any) {
    this.modalService.open(modal, { size: 'lg' });
  }

  AddBookToList(listIndex: number, BookForm: FormGroup) {
    this.appService.AddBookToList(listIndex, BookForm.value);
    this.modalService.dismissAll();
    this.BookForm.reset();
  }

  RemoveBook(bookIndex: number) {
    this.appService.RemoveBook(this.listIndex, bookIndex)
  }
}
