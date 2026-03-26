import { cn } from "@/lib/utils";

// React 19: ref is a plain prop on function components — no forwardRef needed.
interface FloatingLabelInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  /** Visible label text */
  label: string;
  /** Validation error message from react-hook-form */
  error?: string;
  /** Required for <label htmlFor> and input id */
  id: string;
}

/**
 * Text input with a floating label.
 *
 * Pattern:
 *   • Default state  → label sits at vertical center (large, muted)
 *   • Focused        → label floats to top (small, teal)
 *   • Filled         → label stays at top (small, slate)
 *
 * Uses Tailwind v4 peer utilities. The single-space placeholder=" " is
 * required for peer-placeholder-shown to fire correctly; it is hardcoded
 * inside the component and cannot be overridden by callers.
 *
 * Compatible with react-hook-form: spread {...register("field")} directly
 * onto this component — the ref is forwarded via React 19's ref-as-prop.
 */
export function FloatingLabelInput({
  label,
  error,
  id,
  ref,
  className,
  required,
  ...rest
}: FloatingLabelInputProps & { ref?: React.Ref<HTMLInputElement> }) {
  return (
    <div className="relative">
      <input
        ref={ref}
        id={id}
        {...rest}
        // Always override caller's placeholder — the single space is load-bearing.
        placeholder=" "
        className={cn(
          // Base
          "peer w-full rounded-lg border px-4 pt-6 pb-2",
          "text-[#3d3027] bg-white transition-all duration-200",
          "focus:outline-none focus:ring-2",
          // State: error vs normal
          error
            ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200/50"
            : "border-slate-300 focus:border-[#52796f] focus:ring-[#52796f]/20",
          className
        )}
      />

      {/*
        Label positioning logic:
          default (filled/unfocused) → top-2, text-xs, slate-600
          peer-placeholder-shown     → top-4, text-sm, slate-400  (input is empty)
          peer-focus                 → top-2, text-xs, #52796f    (overrides above)
      */}
      <label
        htmlFor={id}
        className={cn(
          // Floated (filled) state — default
          "pointer-events-none absolute left-4 top-2 text-xs font-medium text-slate-600",
          "transition-all duration-200",
          // Empty + unfocused → push down to vertical center
          "peer-placeholder-shown:top-[1.05rem] peer-placeholder-shown:text-sm",
          "peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-400",
          // Focused (empty or filled) → float back up, teal
          "peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-[#52796f]",
          // Error state label color
          error && "text-red-500 peer-focus:text-red-500"
        )}
      >
        {label}
        {required && (
          <span className="ml-0.5 text-[#c1666b]" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {error && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
