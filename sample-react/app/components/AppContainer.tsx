import * as React from "react";
// import { alert } from "@nativescript/core";
import { CalendarPlugin } from "calendar-plugin";

export default function Greeting({}) {
    const calendarPluginRef = React.useRef<CalendarPlugin>(null);
    React.useEffect(() => {
        calendarPluginRef.current = new CalendarPlugin();
    });

    // Best practice is to use react-nativescript-navigation
    // https://github.com/shirakaba/react-nativescript-navigation/tree/master/react-nativescript-navigation
    // In particular, a StackNavigator could be used.
    // For simplicity shown frame/page from NativeScript core modules here.
    return (
        <frame>
          <page>
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
                      
                      calendarPluginRef.current.showCalendar((calendar) => {
                        console.log("got a calendar!", calendar);
                      });
                      // alert("Tap received!")
                    }}
                >
                    Tap me
                </button>
            </gridLayout>
          </page>
        </frame>
    );
}
