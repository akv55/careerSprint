'use client';

export default function BillingPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-base-content">Billing</h1>
        <p className="mt-1 text-sm text-base-content/70">
          Manage subscription, invoices, and payment methods.
        </p>
      </div>

      <div className="card card-pad">
        <p className="text-sm text-base-content/70">
          Billing details UI will go here (plans, usage, invoice history).
        </p>
      </div>
    </div>
  );
}
