import { IEventDispatcher } from "./event-dispatcher.interface";
import { IEventHandler } from "./event-handler.interface";
import { IEvent } from "./event.interface";

export class EventDispatcher implements IEventDispatcher {
  private eventHandlers: { [eventName: string]: IEventHandler[] } = {};

  get getEventHandlers(): { [eventName: string]: IEventHandler[] } {
    return this.eventHandlers;
  }

  notify(event: IEvent): void {
    if (!this.eventHandlers[event.constructor.name]) {
      return;
    }
    this.eventHandlers[event.constructor.name].forEach((eventHandler) => {
      eventHandler.handle(event);
    });
  }

  register(eventName: string, eventHandler: IEventHandler<IEvent>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: IEventHandler<IEvent>): void {
    if (!this.eventHandlers[eventName]) {
      return;
    }
    const index = this.eventHandlers[eventName].indexOf(eventHandler);
    if (index >= 0) {
      this.eventHandlers[eventName].splice(index, 1);
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
