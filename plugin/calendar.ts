import { Frame } from "@nativescript/core";

class EKCalendarChooserDelegateImpl extends NSObject {
  static ObjCProtocols = [EKCalendarChooserDelegate];
  owner: WeakRef<CalendarPlugin>;

  static initWithOwner(owner: WeakRef<CalendarPlugin>) {
    const delegate = new EKCalendarChooserDelegateImpl();
    delegate.owner = owner;
    return delegate;
  }

  calendarChooserDidFinish(chooser: EKCalendarChooser) {
    console.log("calendarChooserDidFinish:", chooser);
    this.owner.get().choseCalendar(chooser.selectedCalendars);
    this.dismiss(chooser);
  }
  calendarChooserSelectionDidChange(chooser: EKCalendarChooser) {
    console.log(
      "calendarChooserSelectionDidChange:",
      chooser.selectedCalendars
    );
  }
  calendarChooserDidCancel(chooser: EKCalendarChooser) {
    console.log("calendarChooserDidCancel:", chooser);
    this.dismiss(chooser);
  }

  dismiss(chooser: EKCalendarChooser) {
    chooser.parentViewController.dismissViewControllerAnimatedCompletion(
      true,
      null
    );
  }
}

export class CalendarPlugin {
  calendarChooser: EKCalendarChooser;
  calendarDelegate: EKCalendarChooserDelegateImpl;
  private _callback: (calendar: any) => void;

  constructor() {
    const eventStore = EKEventStore.new();
    eventStore.requestAccessToEntityTypeCompletion(
      EKEntityType.Event,
      (success, error) => {
        this.calendarChooser = EKCalendarChooser.new();

        // Option 1 (get it working):
        // this.calendarDelegate = new EKCalendarChooserDelegateImpl();

        // Option 2 (more power):
        this.calendarDelegate = EKCalendarChooserDelegateImpl.initWithOwner(
          new WeakRef(this)
        );

        this.calendarChooser.delegate = this.calendarDelegate;

        this.calendarChooser.initWithSelectionStyleDisplayStyleEventStore(
          EKCalendarChooserSelectionStyle.Single,
          EKCalendarChooserDisplayStyle.AllCalendars,
          eventStore
        );
      }
    );
  }

  choseCalendar(calendar) {
    console.log("choseCalendar:", calendar);
    this._callback(calendar);
  }

  showCalendar(callback: (calendar: any) => void) {
    this._callback = callback;
    // Option 1:
    // UIApplication.sharedApplication.keyWindow.rootViewController.presentViewControllerAnimatedCompletion(this.calendarChooser, true, null);

    // Option 2 (easier to remember):
    // (<UINavigationController>(
    //     Frame.topmost().ios.controller
    // )).presentViewControllerAnimatedCompletion(this.calendarChooser, true, null);

    // Option 3 (advanced):
    this.calendarChooser.showsDoneButton = true;
    this.calendarChooser.showsCancelButton = true;
    const navctrl = UINavigationController.new();
    navctrl.initWithRootViewController(this.calendarChooser);

    (<UINavigationController>(
      Frame.topmost().ios.controller
    )).presentViewControllerAnimatedCompletion(navctrl, true, null);
  }
}
