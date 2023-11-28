export default class Logger {
  static debug(...args: any[]) {
    if (process.env.NODE_ENV !== "production") {
      console.debug(...args);
    }
  }
}
