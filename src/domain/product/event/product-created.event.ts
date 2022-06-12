import { IEvent } from "../../@shared/event/event.interface";

export class ProductCreatedEvent implements IEvent {
  dataTimeOccured: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccured = new Date();
    this.eventData = eventData;
  }
}
