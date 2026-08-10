export function SuccessState({
  title,
  description,
  onClose,
}: {
  title: string;
  description: string;
  onClose?: () => void;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h4 className="mt-4 text-xl font-semibold text-ink">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white"
        >
          Zamknij
        </button>
      ) : null}
    </div>
  );
}
