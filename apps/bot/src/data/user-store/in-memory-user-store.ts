import { UserStoreAbstract } from "./user-store-class";

export class InMemoryUserStore extends UserStoreAbstract {
    private subscribedUsers: Set<number> = new Set();

    async subscribeUser(userId: number): Promise<void> {
        this.subscribedUsers.add(userId);
    }

    async unsubscribeUser(userId: number): Promise<void> {
        this.subscribedUsers.delete(userId);
    }

    async isUserSubscribed(userId: number): Promise<boolean> {
        return this.subscribedUsers.has(userId);
    }

    async getSubscribedUsers(): Promise<number[]> {
        return Array.from(this.subscribedUsers);
    }
}