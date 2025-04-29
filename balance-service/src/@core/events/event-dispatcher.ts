import { EventDispatcherInterface } from "@core/interfaces/event-dispatcher.interface";
import { EventHandlerInterface } from "@core/interfaces/event-handler.interface";
import { EventInterface } from "@core/interfaces/event.interface";
import { HandlerAlreadyRegisteredError } from "@core/errors/handler-already-registered.error";

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: Map<string, EventHandlerInterface[]> = new Map();

  register(eventName: string, handler: EventHandlerInterface): void {
    if (!this.eventHandlers.has(eventName)) {
      this.eventHandlers.set(eventName, []);
    }

    const handlers = this.eventHandlers.get(eventName)!;
    if (handlers.includes(handler)) {
      throw new HandlerAlreadyRegisteredError(eventName);
    }

    handlers.push(handler);
  }

  dispatch(event: EventInterface): void {
    const eventName = event.getName();
    const handlers = this.eventHandlers.get(eventName);
    if (!handlers || handlers.length === 0) return;

    handlers.forEach(handler => handler.handle(event));
  }

  remove(eventName: string, handler: EventHandlerInterface): void {
    const handlers = this.eventHandlers.get(eventName);
    if (!handlers) return;

    const index = handlers.indexOf(handler);
    if (index >= 0) {
      handlers.splice(index, 1);
    }
  }

  has(eventName: string, handler: EventHandlerInterface): boolean {
    const handlers = this.eventHandlers.get(eventName);
    if (!handlers) return false;

    return handlers.includes(handler);
  }

  clear(): void {
    this.eventHandlers.clear();
  }
}
