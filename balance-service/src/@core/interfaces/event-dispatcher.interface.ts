import { EventHandlerInterface } from "./event-handler.interface";
import { EventInterface } from "./event.interface";

export interface EventDispatcherInterface {
  register(eventName: string, handler: EventHandlerInterface): void | Error;
  dispatch(event: EventInterface): void | Error;
  remove(eventName: string, handler: EventHandlerInterface): void | Error;
  has(eventName: string, handler: EventHandlerInterface): boolean;
  clear(): void | Error;
}
