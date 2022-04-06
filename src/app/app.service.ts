import { Injectable } from "@angular/core";
import { BookItem } from "./models/BookItem";
import { ListItem } from "./models/ListItem";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  ListItems: ListItem[] = [
    {
      List: [{ title: "Dune", year: 1965, author: "Frank Herbert", order: 2 },
      { title: "Eder's Game", year: 1985, author: "Orson Scott Car", order: 3 },
      { title: "1984", year: 1949, author: "George Orwell", order: 1 },]
    },
    {
      List: [{ title: "Dune", year: 1965, author: "Frank Herbert", order: 2 },
      { title: "Eder's Game", year: 1985, author: "Orson Scott Car", order: 3 },
      { title: "1984", year: 1949, author: "George Orwell", order: 1 },]
    },
    {
      List: [{ title: "Dune", year: 1965, author: "Frank Herbert", order: 2 },
      { title: "Eder's Game", year: 1985, author: "Orson Scott Car", order: 3 },
      { title: "1984", year: 1949, author: "George Orwell", order: 1 },]
    },
  ];

  GetBooksLists() {
    return this.ListItems;
  }

  AddBooksList(list: any) {
    this.ListItems.push({
      List: list
    });
  }

  RemoveBooksList(index: number) {
    this.ListItems.splice(index, 1);
  }

  AddBookToList(listIndex: number, book: BookItem) {
    this.ListItems[listIndex].List.push(book);
  }

  RemoveBook(listIndex: number, bookIndex: number) {
    this.ListItems[listIndex].List.splice(bookIndex, 1);
  }


}
