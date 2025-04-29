import { EventPayload } from "./event-payload.interface";

export interface EventInterface {
  getName(): string;
  getDateTime(): Date;
  getPayload(): EventPayload;
}