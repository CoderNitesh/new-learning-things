import { when, reaction } from "mobx"
import { types, getParent, getSnapshot, applySnapshot, destroy } from "mobx-state-tree"
import { Book } from "./BookStore"

const CartEntry = types
    .model("CartEntry", {
        quantity: 0,
        book: types.reference(Book)  // when reference use 
    })
    .views((self) => ({
        get price() {
            return self.book.price * self.quantity
        },
        get isValidBook() {
            return self.book.isAvailable
        }
    }))
    .actions((self) => ({
        increaseQuantity(number) {
            self.quantity += number
        },
        setQuantity(number) {
            self.quantity = number
        },
        remove() {
            getParent(self, 2).remove(self) // not understand
        }
    }))

export const CartStore = types
    .model("CartStore", {
        entries: types.array(CartEntry)
    })
    .views((self) => ({
        get shop() {
            return getParent(self)
        },
        get subTotal() {
            return self.entries.reduce((sum, e) => sum + e.price, 0)
        },
        get hasDiscount() {
            return self.subTotal >= 100
        },
        get discount() {
            return self.subTotal * (self.hasDiscount ? 0.1 : 0)
        },
        get total() {
            return self.subTotal - self.discount
        },
        get canCheckout() {
            return (
                self.entries.length > 0 &&
                self.entries.every((entry) => entry.quantity > 0 && entry.isValidBook)
            )
        }
    }))
    .actions((self) => ({
        // what this life cycle does also when and reaction
        afterAttach() {
            if (typeof window !== "undefined" && window.localStorage) {
                when(
                    () => !self.shop.isLoading,
                    () => {
                        self.readFromLocalStorage()
                        reaction(
                            () => getSnapshot(self),
                            (json) => {
                                window.localStorage.setItem("cart", JSON.stringify(json))
                            }
                        )
                    }
                )
            }
        },
        addBook(book, quantity = 1, notify = true) {
            let entry = self.entries.find((entry) => entry.book === book)
            // console.log('entry: ', entry.toJSON());
            if (!entry) {
                self.entries.push({ book: book })

                // THIS IS TO INCREASE THE BYDEFAULT COUNT TO 1O
                entry = self.entries[self.entries.length - 1]
            }
            entry.increaseQuantity(quantity)
            if (notify) self.shop.alert("Added to cart")
        },
        remove(book) {
            destroy(book) // not understand
        },
        checkout() {
            const total = self.total
            self.clear()
            self.shop.alert(`Bought books for ${total} ??? !`)
        },
        clear() {
            self.entries.clear()
        },
        readFromLocalStorage() {
            const cartData = window.localStorage.getItem("cart")
            if (cartData) applySnapshot(self, JSON.parse(cartData))
        }
    }))