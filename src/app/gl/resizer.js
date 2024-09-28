export class Resizer {
  static subscribers = [];

  static init(container, callback = null) {
    this.observer = new ResizeObserver((entry) => {
      this.subscribers.forEach((sub) => {
        sub.cb(entry[0].contentRect);
      });
    });

    if (callback) this.subscribers.push({ cb: callback, id: "init" });

    this.observer.observe(container);
    return this.dispose.bind(this);
  }

  static dispose() {
    this.observer.disconnect();
  }

  static subscribe(cb, id = Symbol()) {
    this.subscribers.push({ cb, id });
    return id;
  }

  static unsubscribe(id) {
    this.subscribers = this.subscribers.filter((sub) => sub.id !== id);
  }
}
