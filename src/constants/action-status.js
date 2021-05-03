export default class ActionStatus {
  static get IDLE() {
    return 'idle';
  }

  static get LOADING() {
    return 'loading';
  }

  static get SUCCEEDED() {
    return 'succeeded';
  }

  static get FAILED() {
    return 'failed';
  }
}
