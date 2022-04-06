import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './app.service';
import { BookItem } from './models/BookItem';
import { ListItem } from './models/ListItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private appService: AppService, private modalService: NgbModal
    , private formbuilder: FormBuilder) {
  }

  title = 'book-list';
  date = new Date().getFullYear();
  BooksLists: ListItem[] = this.appService.GetLists();

  ListForm: FormGroup = this.formbuilder.group({
    books_list: this.formbuilder.array([
      this.formbuilder.group({
        title: ['', Validators.required],
        year: [1950, Validators.required],
        author: ['', Validators.required],
        order: [1, Validators.required]
      })
    ])
  });
  get booksList() {
    return this.ListForm.get('books_list') as FormArray;
  }
  showAddListModal(modal: any) {
    this.modalService.open(modal, { size: 'lg' });
  }
  AddBookInput() {

    this.booksList.push(this.formbuilder.group({
      title: ['', Validators.required],
      year: [1950, Validators.required],
      author: ['', Validators.required],
      order: [1, Validators.required]
    }))
  }

  DeleteBookInput(index: number) {
    this.booksList.removeAt(index);
  }

  AddList(booksList: FormArray) {
    this.appService.AddList(booksList.value);
    this.modalService.dismissAll();
    this.ListForm.reset();
  }

}
