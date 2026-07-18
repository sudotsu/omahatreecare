begin;

create table if not exists public.lead_records (
  receipt_id uuid primary key,
  idempotency_key_digest text not null unique,
  accepted_at timestamptz not null,
  delete_or_anonymize_after timestamptz not null,
  qualification_state text not null check (qualification_state in ('qualified', 'unqualified')),
  delivery_state text not null check (delivery_state in ('pending', 'acknowledged')),
  lead_payload jsonb not null check (jsonb_typeof(lead_payload) = 'object'),
  attribution jsonb not null default '{}'::jsonb check (jsonb_typeof(attribution) = 'object'),
  constraint lead_records_idempotency_digest_length check (length(idempotency_key_digest) = 64),
  constraint lead_records_retention_order check (delete_or_anonymize_after > accepted_at)
);

create index if not exists lead_records_pending_delivery_idx
  on public.lead_records (accepted_at)
  where delivery_state = 'pending';

create index if not exists lead_records_retention_idx
  on public.lead_records (delete_or_anonymize_after);

comment on table public.lead_records is
  'First-party homeowner lead receipts. Access is limited to the application role and explicitly authorized operators.';

commit;
