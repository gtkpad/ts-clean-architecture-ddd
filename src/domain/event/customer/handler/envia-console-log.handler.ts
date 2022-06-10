import { IEventHandler } from "../../@shared/event-handler.interface";
import { AddressChangedEvent } from "../address-changed.event";

export class EnviaConsoleLogHandler
  implements IEventHandler<AddressChangedEvent>
{
  handle(event: AddressChangedEvent): void {
    const { id, name, address } = event.eventData;
    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${address}`
    );
  }
}
