export class HandlerAlreadyRegisteredError extends Error {
    constructor(eventName: string) {
      super(`Handler already registered for event: "${eventName}"`);
      this.name = "HandlerAlreadyRegisteredError";
    }
  }