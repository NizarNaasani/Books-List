import { Component, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './app.service';
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
  currentYear: number = this.appService.currentYear;
  booksLists: ListItem[] = this.appService.GetBooksLists();
  //#region List Form
  bookItemForm: FormGroup = this.formbuilder.group(this.appService.bookItem);
  listForm: FormGroup = this.formbuilder.group({
    books_list: this.formbuilder.array([
      this.bookItemForm
    ])
  });
  get booksList() {
    return this.listForm.get('books_list') as FormArray;
  }
  //#endregion

  showAddListModal(modal: TemplateRef<any>) {
    this.modalService.open(modal, { size: 'lg' });
  }

  addBookInput() {
    this.booksList.push(this.bookItemForm)
  }

  deleteBookInput(index: number) {
    this.booksList.removeAt(index);
  }

  addList(booksList: FormArray) {
    this.appService.AddBooksList(booksList.value);
    this.modalService.dismissAll();
    this.listForm.reset();
  }
}
