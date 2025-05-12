import { DatePicker, DatesProvider } from "@mantine/dates";
import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import { useState } from "react";

function Demo({ setDate }) {
  const [value, setValue] = useState(null);

  const handleChange = (e) => {
    setValue(e);
    setDate(e);
  };

  return (
    <DatesProvider settings={{ consistentWeeks: true }}>
      <DatePicker value={value} onChange={(e)=>handleChange(e)} />
    </DatesProvider>
  );
}
export default Demo;
