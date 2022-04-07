import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { BookItem } from "./models/BookItem";
import { ListItem } from "./models/ListItem";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  currentYear: number = new Date().getFullYear();
  ListItems: ListItem[] = [
    {
      list: [{ title: "Dune", year: 1965, author: "Frank Herbert", order: 2 },
      { title: "Eder's Game", year: 1985, author: "Orson Scott Car", order: 3 },
      { title: "1984", year: 1949, author: "George Orwell", order: 1 },]
    },
    {
      list: [{ title: "Dune", year: 1965, author: "Frank Herbert", order: 2 },
      { title: "Eder's Game", year: 1985, author: "Orson Scott Car", order: 3 },
      { title: "1984", year: 1949, author: "George Orwell", order: 1 },]
    },
    {
      list: [{ title: "Dune", year: 1965, author: "Frank Herbert", order: 2 },
      { title: "Eder's Game", year: 1985, author: "Orson Scott Car", order: 3 },
      { title: "1984", year: 1949, author: "George Orwell", order: 1 },]
    },
  ];
  bookItem: object = {
    title: ['', [Validators.required, Validators.minLength(4)]],
    year: [1100, [Validators.required, Validators.min(1100), Validators.max(2022)]],
    author: ['', [Validators.required, Validators.minLength(4)]],
    order: [1, [Validators.required, Validators.min(0), Validators.max(100)]]
  };
  GetBooksLists() {
    return this.ListItems;
  }

  AddBooksList(list: BookItem[]) {
    this.ListItems.push({
      list: list
    });
  }

  removeBooksList(index: number) {
    this.ListItems.splice(index, 1);
  }

  addBookToList(listIndex: number, book: BookItem) {
    this.ListItems[listIndex].list.push(book);
  }

  removeBook(listIndex: number, bookIndex: number) {
    this.ListItems[listIndex].list.splice(bookIndex, 1);
  }
}
