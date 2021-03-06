import { types, getEnv } from "mobx-state-tree"
import { BookStore } from "./BookStore"
import { CartStore } from "./CartStore"
import { ViewStore } from "./ViewStore"

export const ShopStore = types.model("ShopStore", {
        // not understand isLoading is not here but in BookStore its present
        bookStore: types.optional(BookStore, {
            books: {}
        }),
        cart: types.optional(CartStore, {
            entries: []
        }),
        view: types.optional(ViewStore, {})
    })
    .views((self) => ({
        get fetch() {
            return getEnv(self).fetch // not understand
        },
        get alert() {
            return getEnv(self).alert
        },
        get isLoading() {
            return self.bookStore.isLoading
        },
        get books() {
            return self.bookStore.books
        },
        get sortedAvailableBooks() {
            return self.bookStore.sortedAvailableBooks
        }
    }))
    .actions((self) => ({
        // not understand when its actully run 
        afterCreate() {
            self.bookStore.loadBooks()
        }
    }))