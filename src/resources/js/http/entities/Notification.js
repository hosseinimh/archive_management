import { BASE_URL, PAGE_ITEMS } from "../../constants";
import Entity from "./Entity";

export class Notification extends Entity {
  constructor() {
    super();
  }

  async getPaginate(category = 0, _pn = 1, _pi = PAGE_ITEMS) {
    return await this.handlePost(`${BASE_URL}/u/notifications`, {
      category,
      _pn,
      _pi,
    });
  }

  async getReview() {
    return await this.handlePost(`${BASE_URL}/u/notifications/review`);
  }

  async seen(id) {
    return await this.handlePost(`${BASE_URL}/u/notifications/seen/${id}`);
  }

  async seenReview() {
    return await this.handlePost(`${BASE_URL}/u/notifications/seen_review`);
  }
}
