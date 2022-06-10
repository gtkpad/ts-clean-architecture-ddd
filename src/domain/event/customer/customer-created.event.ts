import { IEvent } from "../@shared/event.interface";

export class CustomerCreatedEvent implements IEvent {
  dataTimeOccured: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccured = new Date();
    this.eventData = eventData;
  }
}
