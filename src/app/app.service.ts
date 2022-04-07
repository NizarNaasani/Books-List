import { Injectable } from "@angular/core";
import { bookItem } from "./models/bookItem";
import { listItem } from "./models/listItem";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  currentYear: number = new Date().getFullYear();
  listItems: listItem[] = [
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

  GetBooksLists() {
    return this.listItems;
  }

  AddBooksList(list: bookItem[]) {
    this.listItems.push({
      list: list
    });
  }

  RemovebooksList(index: number) {
    this.listItems.splice(index, 1);
  }

  AddBookToList(listIndex: number, book: bookItem) {
    this.listItems[listIndex].list.push(book);
  }

  RemoveBook(listIndex: number, bookIndex: number) {
    this.listItems[listIndex].list.splice(bookIndex, 1);
  }


}
