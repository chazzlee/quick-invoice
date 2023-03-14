type AddMoreProps = Readonly<{
  onAddMore(): void;
}>;

export function AddMoreButton({ onAddMore }: AddMoreProps) {
  return (
    <button
      type="button"
      className="text-white bg-black btn btn-sm btn-square"
      onClick={onAddMore}
    >
      +
    </button>
  );
}
