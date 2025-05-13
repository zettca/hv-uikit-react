# Notifications

The **App Shell** supports notification features to capture user attention effectively. It offers two distinct modes to deliver timely information and facilitate immediate action:

- [Banner](/components/banner): For persistent messages that require user engagement.
- [Snackbar](/components/snackbar): For transient messages that convey brief, auto-dismissing alerts.

## Triggering Notifications

To trigger notifications, the **App Shell** listens to the CustomEvent `@hv/app-shell:notifications:trigger`.

When dispatching this event, the detail object should include:

- `type`: The notification type (`"snackbar"` or `"banner"`).
- `variant`: The [variant](/components/banner?tab=props#hvbanner-variant) of the notification.
- `message`: The notification text to be displayed.
- `actions`: Actions to display.
- `actionsCallback`: The callback function ran when an action is triggered, receiving action as parameter.

For event dispatching, utilize the `globalThis` variable and below is an example on how to trigger a "success" snackbar notification with the message "This is a snackbar":

```ts
const actions = {
  actions: [
    { id: "action1", label: "Action 1" },
    { id: "action2", label: "Action 2" },
  ],
  actionsCallback: (evt, id, action) => {
    // do something
  },
};
const customEvent = new CustomEvent<HvAppShellEventNotification>()(
  HvAppShellEventNotificationTrigger,
  {
    detail: {
      type: "snackbar",
      variant: "success",
      message: "This is a snackbar",
      ...actions,
    },
  },
);
globalThis.dispatchEvent(customEvent);
```
