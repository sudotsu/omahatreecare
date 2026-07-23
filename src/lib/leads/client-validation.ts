import { z } from "zod";

// CSP-001: the site's Content-Security-Policy intentionally omits
// 'unsafe-eval'. Zod v4 JIT-compiles its parsers with `Function(...)`, which
// the policy blocks; Zod then falls back, but the blocked attempt still raises
// a CSP Inspector issue on every form route and makes behavior depend on the
// fallback path. Disabling JIT keeps client validation on the eval-free code
// path with no violation. This is the single, intentional entry point for that
// configuration — import it for its side effect wherever client validation is
// initialized.
z.config({ jitless: true });
