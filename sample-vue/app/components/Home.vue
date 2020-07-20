<template>
    <Page>
        <ActionBar>
            <Label text="Home"/>
        </ActionBar>

        <GridLayout>
            <Button text="Button" @tap="open" />
            <!--<Label class="info">
                <FormattedString>
                    <Span class="fas" text.decode="&#xf135; "/>
                    <Span :text="message"/>
                </FormattedString>
            </Label>-->
        </GridLayout>
    </Page>
</template>

<script>
  import { CalendarPlugin } from "calendar-plugin";
  let calendarPlugin = new CalendarPlugin();
  export default {
    computed: {
      message() {
        return "Blank {N}-Vue app";
      }
    },
    methods: {
      open: function() {
        calendarPlugin.showCalendar((calendar) => {
          console.log("got a calendar!", calendar);
        });
      }
    }
  };
</script>

<style scoped lang="scss">
    @import '~@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>
