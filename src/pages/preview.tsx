import Link from "next/link";
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
    <main className="container mx-auto">
      <section className="grid grid-cols-[3fr_1fr] pt-16 gap-8">
        <article className="px-8 py-8 mb-20 bg-white border-t-4 border-b-4 border-gray-600">
          <pre>{JSON.stringify(form, null, 2)}</pre>
        </article>
        <aside>
          <Link className="btn" href="/">
            Go back
          </Link>
          <button className="btn">Generate PDF</button>
        </aside>
      </section>
    </main>
  );
}
