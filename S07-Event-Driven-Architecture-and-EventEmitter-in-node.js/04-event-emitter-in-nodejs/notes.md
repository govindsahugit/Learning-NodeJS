Event Emitter in Nodejs

    We get built-in EventEmitter class in NodeJS.
    we can import it as:
        import EventEmitter from "events"

    This class have methods for emitting and creating custom events. for ex -> .on(), .emit(), etc

    when we create an event it adds in the _events object as key and value as it event handler.

    if 2 events are same then it will make an array and push both the handler in the array. And when event is emitted it will run both the handler function.

    Extra properties:
    .setMaxListners()
    .once() -> Emit the event only once and deletes it