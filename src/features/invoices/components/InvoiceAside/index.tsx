import { TaxComboBox } from "./TaxComboBox";
import { DiscountComboBox } from "./DiscountComboBox";
import { ShippingComboBox } from "./ShippingComboBox";

export function InvoiceAside() {
  return (
    <aside>
      <div className="sticky top-0">
        <div className="color-container">
          <h3>Color</h3>
          <p>choose your color</p>
        </div>
        <TaxComboBox />
        <DiscountComboBox />
        <ShippingComboBox />
      </div>
    </aside>
  );
}
