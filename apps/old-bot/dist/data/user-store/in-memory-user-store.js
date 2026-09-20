"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserStore = void 0;
const user_store_class_1 = require("./user-store-class");
class InMemoryUserStore extends user_store_class_1.UserStoreAbstract {
    constructor() {
        super(...arguments);
        this.subscribedUsers = new Set();
    }
    async subscribeUser(userId) {
        this.subscribedUsers.add(userId);
    }
    async unsubscribeUser(userId) {
        this.subscribedUsers.delete(userId);
    }
    async isUserSubscribed(userId) {
        return this.subscribedUsers.has(userId);
    }
    async getSubscribedUsers() {
        return Array.from(this.subscribedUsers);
    }
}
exports.InMemoryUserStore = InMemoryUserStore;
