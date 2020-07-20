import { Component, OnInit, NgZone } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";
import { CalendarPlugin } from "calendar-plugin";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    items: Array<Item>;
    calendarPlugin: CalendarPlugin;
    selected = 'None';

    constructor(private itemService: ItemService, private ngZone: NgZone) {
      this.calendarPlugin = new CalendarPlugin();
     }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    open() {
      this.calendarPlugin.showCalendar((calendar) => {
        console.log("got a calendar!", calendar);
        // investigate it's native class name from javascript
        // Usually your plugin would handle the coercion of data types for you (best practice)
        console.log("calendar.constructor.name:", calendar.constructor.name);
        this.ngZone.run(() => {
          this.selected = (<NSMutableSet<any>>calendar).allObjects.objectAtIndex(0).title;
        });
      });
    }
}
