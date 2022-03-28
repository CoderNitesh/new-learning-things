import { values } from "mobx"
import { types, getParent, flow } from "mobx-state-tree"

export const Book = types.model("Book", {
    id: types.identifier, // not understand
    name: types.string,
    author: types.string,
    series_t: types.optional(types.string, ""),
    sequence_i: types.number,
    genre_s: types.string,
    pages_i: types.number,
    price: types.number,
    isAvailable: true
})

export const BookStore = types
    .model("BookStore", {
        isLoading: true,
        books: types.map(Book) // confused between .map and .array which one when use
    })
    .views((self) => ({
        get shop() {
            return getParent(self) // why this is used here and what its means to be
        },
        get sortedAvailableBooks() {
            return sortBooks(values(self.books))  // what values meanse to be here
        }
    }))
    .actions((self) => {
        function markLoading(loading) {
            self.isLoading = loading
        }

        function updateBooks(json) {
            // not able to understand this whole process
            values(self.books).forEach((book) => (book.isAvailable = false)) 
            json.forEach((bookJson) => {
                self.books.put(bookJson)
                self.books.get(bookJson.id).isAvailable = true
            })
        }

        const loadBooks = flow(function* loadBooks() {
            try {
                const json = yield self.shop.fetch("/books.json")
                updateBooks(json)
                markLoading(false)
            } catch (err) {
                console.error("Failed to load books ", err)
            }
        })

        return {
            updateBooks,
            loadBooks
        }
    })

function sortBooks(books) {
    return books
        .filter((b) => b.isAvailable)
        .sort((a, b) => (a.name > b.name ? 1 : a.name === b.name ? 0 : -1))
}