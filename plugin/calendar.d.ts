declare class EKCalendarChooserDelegateImpl extends NSObject {
    static ObjCProtocols: {
        prototype: EKCalendarChooserDelegate;
    }[];
    owner: WeakRef<CalendarPlugin>;
    static initWithOwner(owner: WeakRef<CalendarPlugin>): EKCalendarChooserDelegateImpl;
    calendarChooserDidFinish(chooser: EKCalendarChooser): void;
    calendarChooserSelectionDidChange(chooser: EKCalendarChooser): void;
    calendarChooserDidCancel(chooser: EKCalendarChooser): void;
    dismiss(chooser: EKCalendarChooser): void;
}
export declare class CalendarPlugin {
    calendarChooser: EKCalendarChooser;
    calendarDelegate: EKCalendarChooserDelegateImpl;
    private _callback;
    constructor();
    choseCalendar(calendar: any): void;
    showCalendar(callback: (calendar: any) => void): void;
}
export {};
