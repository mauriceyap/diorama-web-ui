import Metro from "metro4";
import { toastTimeout } from "../../../styleConstants";
import { noop } from "../../../utils";
import SocketEvents from "../../../SocketEvents";
import Socket from "../../../Socket";

export function fireUserEvents(orderedUserEvents, onComplete) {
  orderedUserEvents.forEach(({ time, node: nid, action }) =>
    setTimeout(() => {
      Socket.send(SocketEvents.PERFORM_NODE_ACTION, { nid, action });
      Metro.toast.create(`${action} ${nid}`, noop, toastTimeout, "info");
    }, time)
  );
  setTimeout(
    onComplete,
    orderedUserEvents.length > 0
      ? orderedUserEvents[orderedUserEvents.length - 1].time
      : 0
  );
}
