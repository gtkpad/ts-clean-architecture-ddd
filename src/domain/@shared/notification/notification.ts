export type NotificationErrorProps = {
  message: string;
  context: string;
};

export class Notification {
  private _errors: NotificationErrorProps[] = [];

  public addError(error: NotificationErrorProps) {
    this._errors.push(error);
  }

  public messages(context?: string): string {
    let errors = this._errors;
    if (!!context)
      errors = this._errors.filter((error) => error.context === context);

    return errors
      .map((error) => `${error.context}: ${error.message}`)
      .join(",");
  }

  public getErrors() {
    return this._errors;
  }

  public hasErrors(): boolean {
    return this._errors.length > 0;
  }
}
