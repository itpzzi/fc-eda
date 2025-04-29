import { EventDispatcher } from "@core/events/event-dispatcher";
import { EventInterface } from "@core/interfaces/event.interface";
import { EventHandlerInterface } from "@core/interfaces/event-handler.interface";
import { HandlerAlreadyRegisteredError } from "@core/errors/handler-already-registered.error";

class TestEvent implements EventInterface {
  constructor(
    private name: string,
    private dateTime: Date,
    private payload: any
  ) {}

  getName(): string {
    return this.name;
  }

  getDateTime(): Date {
    return this.dateTime;
  }

  getPayload(): any {
    return this.payload;
  }
}

class TestHandler implements EventHandlerInterface {
  public wasCalled = false;
  handle(event: EventInterface): void {
    this.wasCalled = true;
  }
}

describe("EventDispatcher", () => {
  let dispatcher: EventDispatcher;
  let handler: TestHandler;
  let event: TestEvent;

  beforeEach(() => {
    dispatcher = new EventDispatcher();
    handler = new TestHandler();
    event = new TestEvent("TestEvent", new Date(), { data: 123 });
  });

  it("should register a handler", () => {
    dispatcher.register("TestEvent", handler);
    expect(dispatcher.has("TestEvent", handler)).toBe(true);
  });

  it("should throw error when registering a handler twice", () => {
    dispatcher.register("TestEvent", handler);
    expect(() => {
      dispatcher.register("TestEvent", handler);
    }).toThrow(HandlerAlreadyRegisteredError);
  });

  it("should dispatch event and call handler", () => {
    dispatcher.register("TestEvent", handler);
    dispatcher.dispatch(event);
    expect(handler.wasCalled).toBe(true);
  });

  it("should return false when checking handler not registered", () => {
    expect(dispatcher.has("TestEvent", handler)).toBe(false);
  });

  it("should remove a handler", () => {
    dispatcher.register("TestEvent", handler);
    dispatcher.remove("TestEvent", handler);
    expect(dispatcher.has("TestEvent", handler)).toBe(false);
  });

  it("should clear all handlers", () => {
    dispatcher.register("TestEvent", handler);
    dispatcher.clear();
    expect(dispatcher.has("TestEvent", handler)).toBe(false);
  });
});
