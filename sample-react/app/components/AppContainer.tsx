import * as React from "react";
import { alert } from "@nativescript/core";
import { CalendarPlugin } from "calendar-plugin";

let calendarPlugin: CalendarPlugin;

export default function Greeting({}) {
    calendarPlugin = new CalendarPlugin();
    return (
        <gridLayout
            width={"100%"}
            height={"100%"}
            rows={"*, auto, auto, *"}
            columns={"*, 200, *"}
        >
            <label
                row={1}
                col={1}
                className="info"
                textAlignment={"center"}
                fontSize={24}
            >
                <formattedString>
                    <span className="fas" text="&#xf135;"/>
                    <span> Hello World!</span>
                </formattedString>
            </label>
            <button
                row={2}
                col={1}
                fontSize={24}
                textAlignment={"center"}
                onTap={() => {
                  
                  calendarPlugin.showCalendar((calendar) => {
                    console.log("got a calendar!", calendar);
                  });
                  // alert("Tap received!")
                }}
            >
                Tap me
            </button>
        </gridLayout>
    );
}
