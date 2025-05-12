import { DatePicker, DatesProvider } from "@mantine/dates";
import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import { useState } from "react";
import { useMediaQuery } from '@mantine/hooks';

function MyCalendar({ setDate }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [value, setValue] = useState(null);

  const handleChange = (e) => {
    setValue(e);
    setDate(e);
  };

  return (
    <DatesProvider settings={{ consistentWeeks: true }}>
      <DatePicker
  value={value}
  onChange={handleChange}
  styles={{
    day: {
      width: isMobile ? 28 : 36,
      height: isMobile ? 28 : 36,
      padding: isMobile ? 3 : 6,
      fontSize: isMobile ? 12 : 14,
    },
  }}
/>
    </DatesProvider>
  );
}
export default MyCalendar;
