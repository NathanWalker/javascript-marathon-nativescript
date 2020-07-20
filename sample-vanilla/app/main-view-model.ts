import { Observable, Frame } from "@nativescript/core";
import { CalendarPlugin } from "calendar-plugin";

export class EKCalendarChooserDelegateImpl extends NSObject {
    static ObjCProtocols = [EKCalendarChooserDelegate];
    owner: WeakRef<HelloWorldModel>;

    static initWithOwner(owner: WeakRef<HelloWorldModel>) {
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

export class HelloWorldModel extends Observable {
    calendarChooser: EKCalendarChooser;
    calendarDelegate: EKCalendarChooserDelegateImpl;

    calendarPlugin: CalendarPlugin;

    private _counter: number;
    private _message: string;

    constructor() {
        super();

        // Initialize default values.
        this._counter = 42;
        this.updateMessage();

        // Option 1 (code your platform right away):
        const eventStore = new EKEventStore();
        eventStore.requestAccessToEntityTypeCompletion(
            EKEntityType.Event,
            (success, error) => {
                this.calendarChooser = EKCalendarChooser.new();

                // Option 1 (get it working):
                // this.calendarDelegate = new EKCalendarChooserDelegateImpl();

                // Option 2 (more power):
                this.calendarDelegate = EKCalendarChooserDelegateImpl.initWithOwner(new WeakRef(this));

                this.calendarChooser.delegate = this.calendarDelegate;

                this.calendarChooser.initWithSelectionStyleDisplayStyleEventStore(
                    EKCalendarChooserSelectionStyle.Single,
                    EKCalendarChooserDisplayStyle.AllCalendars,
                    eventStore
                );
            }
        );

        // Option 2 (plugin - better for maintainability and scalability):
        // this.calendarPlugin = new CalendarPlugin();
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange("message", value);
        }
    }

    choseCalendar(calendar) {
        console.log("choseCalendar:", calendar);
    }

    onTap() {
        this._counter--;
        this.updateMessage();

        // Option 1:
        UIApplication.sharedApplication.keyWindow.rootViewController.presentViewControllerAnimatedCompletion(this.calendarChooser, true, null);

        // Option 2 (easier to remember):
        // (<UINavigationController>(
        //     Frame.topmost().ios.controller
        // )).presentViewControllerAnimatedCompletion(this.calendarChooser, true, null);

        // Option 3 (advanced):
        // this.calendarChooser.showsDoneButton = true;
        // this.calendarChooser.showsCancelButton = true;
        // const navctrl = UINavigationController.new();
        // navctrl.initWithRootViewController(this.calendarChooser);

        // (<UINavigationController>(
        //   Frame.topmost().ios.controller
        // )).presentViewControllerAnimatedCompletion(navctrl, true, null);

        // Option 4 (pro level):
        // this.calendarPlugin.showCalendar((calendar) => {
        //     console.log("got a calendar!", calendar);
        // });
    }

    private updateMessage() {
        if (this._counter <= 0) {
            this.message =
                "Hoorraaay! You unlocked the NativeScript clicker achievement!";
        } else {
            this.message = `${this._counter} taps left`;
        }
    }
}
