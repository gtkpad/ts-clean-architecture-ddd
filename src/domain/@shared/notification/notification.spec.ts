import { Notification } from "./notification";

describe("Unit tst for notifications", () => {
  it("Should create errors", () => {
    const notification = new Notification();
    const error = {
      message: "Error message",
      context: "customer",
    };
    const error2 = {
      message: "Error message2",
      context: "customer",
    };
    const error3 = {
      message: "Error message3",
      context: "order",
    };
    notification.addError(error);
    notification.addError(error2);
    notification.addError(error3);

    expect(notification.messages("customer")).toBe(
      "customer: Error message,customer: Error message2"
    );

    expect(notification.messages()).toBe(
      "customer: Error message,customer: Error message2,order: Error message3"
    );
  });

  it("Should check if notification has at least one error", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });

  it("Should get all errors props", () => {
    const notification = new Notification();
    const error1 = {
      message: "error message",
      context: "customer",
    };
    const error2 = {
      message: "error message2",
      context: "customer",
    };
    notification.addError(error1);
    notification.addError(error2);

    expect(notification.getErrors()).toEqual([error1, error2]);
  });
});
