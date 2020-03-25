export interface CommandInterface {
  exec(): Promise<void>;
}
