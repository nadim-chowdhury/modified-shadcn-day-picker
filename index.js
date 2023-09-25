import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/ui/button";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  const defaultDate = props.defaultMonth || new Date();

  const [currentMonth, setCurrentMonth] = React.useState(
    defaultDate.getMonth()
  );
  const [currentYear, setCurrentYear] = React.useState(
    defaultDate.getFullYear()
  );

  const [showMonthPicker, setShowMonthPicker] = React.useState(false);
  const [showYearPicker, setShowYearPicker] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(true);

  const handleDayClick = (day, modifiers, event) => {
    setIsOpen(false);
    if (props.onDayClick) {
      props.onDayClick(day, modifiers, event);
    }
  };

  if (!isOpen) {
    return null;
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const MonthPicker = ({ selectedMonth, onSelect, btnClick }) => (
    <div className="relative">
      <button
        className="border p-1 rounded absolute top-3 left-4"
        onClick={btnClick}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <h4 className="pt-3 text-center">Select Month</h4>
      <div className="grid grid-cols-2 gap-2 p-4 w-[252px] px-[12px]">
        {months.map((month, index) => (
          <button key={month} onClick={() => onSelect(index)}>
            {month}
          </button>
        ))}
      </div>
    </div>
  );

  const YearPicker = ({ initialYear, onSelect }) => {
    const [selectedYear, setSelectedYear] = React.useState(initialYear);
    const years = Array.from({ length: 21 }, (_, i) => selectedYear - 10 + i);

    return (
      <div>
        <div className="flex justify-between items-center px-7 pt-3">
          <button
            className="border p-1 rounded"
            onClick={() => setSelectedYear(selectedYear - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span>Select Year</span>
          <button
            className="border p-1 rounded"
            onClick={() => setSelectedYear(selectedYear + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 p-4 w-[252px] px-[12px]">
          {years.map((year) => (
            <button key={year} onClick={() => onSelect(year)}>
              {year}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {showMonthPicker || showYearPicker ? null : (
        <DayPicker
          month={new Date(currentYear, currentMonth)}
          onDayClick={handleDayClick}
          showOutsideDays={showOutsideDays}
          className={cn("p-3", className)}
          classNames={{
            months:
              "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            nav_button: cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            ),
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell:
              "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: cn(
              buttonVariants({ variant: "ghost" }),
              "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
            ),
            day_selected:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle:
              "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
            ...classNames,
          }}
          components={{
            Caption: () => (
              <div className="flex justify-between px-2">
                <div className="cursor-pointer flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (currentMonth === 0) {
                        setCurrentMonth(11);
                        setCurrentYear(currentYear - 1);
                      } else {
                        setCurrentMonth(currentMonth - 1);
                      }
                    }}
                    className="border p-1 rounded"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <div
                    className="w-[88px]"
                    onClick={() => setShowMonthPicker(!showMonthPicker)}
                  >
                    {months[currentMonth]}
                  </div>

                  <button
                    onClick={() => {
                      if (currentMonth === 11) {
                        setCurrentMonth(0);
                        setCurrentYear(currentYear + 1);
                      } else {
                        setCurrentMonth(currentMonth + 1);
                      }
                    }}
                    className="border p-1 rounded"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div
                  onClick={() => setShowYearPicker(!showYearPicker)}
                  className="cursor-pointer"
                >
                  {currentYear}
                </div>
              </div>
            ),
            IconLeft: ({ ...props }) => (
              <button
                onClick={() => {
                  if (currentMonth === 0) {
                    setCurrentMonth(11);
                    setCurrentYear(currentYear - 1);
                  } else {
                    setCurrentMonth(currentMonth - 1);
                  }
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            ),
            IconRight: ({ ...props }) => (
              <button
                onClick={() => {
                  if (currentMonth === 11) {
                    setCurrentMonth(0);
                    setCurrentYear(currentYear + 1);
                  } else {
                    setCurrentMonth(currentMonth + 1);
                  }
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            ),
          }}
          {...props}
        />
      )}

      {showMonthPicker && (
        <MonthPicker
          selectedMonth={currentMonth}
          onSelect={(month) => {
            setCurrentMonth(month);
            setShowMonthPicker(false);
          }}
          btnClick={() => setShowMonthPicker(false)}
        />
      )}

      {showYearPicker && (
        <YearPicker
          initialYear={currentYear}
          onSelect={(year) => {
            setCurrentYear(year);
            setShowYearPicker(false);
          }}
        />
      )}
    </div>
  );
}

Calendar.displayName = "Calendar";
export { Calendar };
