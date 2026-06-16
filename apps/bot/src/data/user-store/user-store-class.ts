export abstract class UserStoreAbstract {
  abstract subscribeUser(userId: number): Promise<void>;

  abstract unsubscribeUser(userId: number): Promise<void>;

  abstract isUserSubscribed(userId: number): Promise<boolean>;

  abstract getSubscribedUsers(): Promise<number[]>;
}
