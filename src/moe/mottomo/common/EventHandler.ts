type EventHandler<TThis, TEvent> = (this: TThis, ev: TEvent) => void;

export default EventHandler;
