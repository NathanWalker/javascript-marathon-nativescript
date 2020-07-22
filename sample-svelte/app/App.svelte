
  <page>
      <actionBar title="Svelte Native App" />
      <stackLayout>
          <button text="Open" on:tap="{ open }" />
          <label class="info" horizontalAlignment="center" verticalAlignment="center" textWrap="true">
              <formattedString>
                  <span class="fas" text="&#xf135;" />
                  <span text=" {message}" />
              </formattedString>
          </label>
      </stackLayout>
  </page>


<script>
    import { onMount } from 'svelte';
    import { CalendarPlugin } from 'calendar-plugin';
    let message = "Blank Svelte Native App";
    let calendarPlugin;

    const open = () => {
      calendarPlugin.showCalendar((calendar) => {
        console.log('calendar:', calendar);
      });
    };

    onMount(() => {
    	console.log('onMount!');
      calendarPlugin = new CalendarPlugin();
    });
</script>

<style>
    .info .fas {
        color: #3A53FF;
    }
    .info {
        font-size: 20;
    }
</style>
