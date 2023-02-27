import { useEffect, useState } from "react";

export default function Preview() {
  const [form, setForm] = useState(null);

  useEffect(() => {
    const invoice = JSON.parse(window.sessionStorage.getItem("invoice") ?? "");
    if (invoice) {
      setForm(invoice);
    }
  }, []);

  return (
    <div>
      <h1>PREVIEW</h1>
      <div>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </div>
  );
}
