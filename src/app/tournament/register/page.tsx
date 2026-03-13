"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Suspense } from "react";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const schema = z.object({
  name: z.string().min(3),
  dob: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  phone: z.string().min(8).optional(),
  email: z.string().email(),
  aicf_id: z.string().optional(),
  fide_id: z.string().optional(),
  state: z.string().optional(),
  rating: z.string().optional(),
  category: z.string().optional(),
  payment_reference: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

function RegistrationFormContent() {
  const router = useRouter();
  const search = useSearchParams();
  const slug = search.get("slug");

  const upiVpa = process.env.NEXT_PUBLIC_UPI_VPA || "";
  const razorpayLink = process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_LINK || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { state: "Andaman & Nicobar" },
  });

  async function onSubmit(values: FormValues) {
    try {
      if (!slug) {
        setError("name", { message: "Missing tournament slug." });
        return;
      }

      const supabase = getSupabaseBrowserClient();
      const { data: t, error: tErr } = await supabase
        .from("tournaments")
        .select("id, slug")
        .eq("slug", slug)
        .maybeSingle();
      if (tErr) throw tErr;
      if (!t?.id) {
        setError("name", { message: "Tournament not found." });
        return;
      }

      const { error } = await supabase.from("tournament_registrations").insert({
        tournament_id: t.id,
        name: values.name,
        dob: values.dob || null,
        gender: values.gender || null,
        phone: values.phone || null,
        email: values.email,
        aicf_id: values.aicf_id || null,
        fide_id: values.fide_id || null,
        state: values.state || null,
        rating: values.rating ? Number(values.rating) : null,
        category: values.category || null,
        payment_status: "pending",
        payment_reference: values.payment_reference || null,
      });
      if (error) throw error;

      router.replace(`/tournament?slug=${encodeURIComponent(slug)}&registered=1`);
    } catch (e) {
      setError("email", {
        message: e instanceof Error ? e.message : "Registration failed.",
      });
    }
  }

  if (!slug) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="font-medium">No tournament selected</div>
        <div className="mt-2 text-sm text-muted-foreground">
          Go to{" "}
          <Link className="text-primary hover:underline" href="/tournaments">
            tournaments
          </Link>{" "}
          and choose a tournament.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <div className="text-sm text-muted-foreground">
          <Link
            className="hover:underline"
            href={`/tournament?slug=${encodeURIComponent(slug)}`}
          >
            ← Back to tournament
          </Link>
        </div>
        <h1 className="font-[var(--font-heading)] text-2xl font-semibold">
          Tournament registration
        </h1>
        <p className="text-sm text-muted-foreground">
          Submit your details to register online. Payment is handled separately
          (UPI / Razorpay link) and will be verified by admin.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-border bg-card p-6 space-y-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Full name</label>
              <input
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                {...register("name")}
                placeholder="Player name"
              />
              {errors.name?.message ? (
                <div className="text-xs text-red-600">{errors.name.message}</div>
              ) : null}
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Email</label>
              <input
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                {...register("email")}
                placeholder="name@email.com"
                type="email"
              />
              {errors.email?.message ? (
                <div className="text-xs text-red-600">{errors.email.message}</div>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">
                Date of birth
              </label>
              <input
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                type="date"
                {...register("dob")}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Gender</label>
              <select
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                {...register("gender")}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Phone</label>
              <input
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                {...register("phone")}
                placeholder="+91…"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">AICF ID</label>
              <input
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                {...register("aicf_id")}
                placeholder="AICF12345"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">FIDE ID</label>
              <input
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                {...register("fide_id")}
                placeholder="12345678"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Rating</label>
              <input
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                {...register("rating")}
                inputMode="numeric"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">State</label>
              <input
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                {...register("state")}
                placeholder="Andaman & Nicobar"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Category</label>
              <input
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                {...register("category")}
                placeholder="Open / U-17 / U-13"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">
              Payment reference (optional)
            </label>
            <input
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              {...register("payment_reference")}
              placeholder="UPI UTR / Razorpay ref"
            />
            <p className="text-xs text-muted-foreground">
              If you already paid, enter UTR/reference for faster verification.
            </p>
          </div>

          <button
            disabled={isSubmitting}
            className="w-fit rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit registration"}
          </button>
        </form>

        <aside className="rounded-2xl border border-border bg-card p-6">
          <div className="text-sm font-medium">Payment Methods</div>
          <div className="mt-3 space-y-3 text-sm text-muted-foreground">
            {/* UPI */}
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="text-xs font-medium text-foreground">
                UPI Payment
              </div>
              <div className="mt-1 text-xs text-muted-foreground">Pay via GPay / PhonePe / Paytm</div>
              <div className="mt-2 bg-primary/5 border border-primary/20 rounded-lg px-3 py-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">VPA</p>
                <p className="font-mono font-bold text-primary text-sm">{upiVpa || "anca.chess@sbi"}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Enter the UTR number in the payment reference field after paying.</p>
            </div>
            {/* Card */}
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="text-xs font-medium text-foreground">
                Card / Razorpay
              </div>
              <div className="mt-1 text-xs text-muted-foreground">Visa / Mastercard / RuPay accepted</div>
              {razorpayLink ? (
                <a
                  className="mt-2 block rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
                  href={razorpayLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Pay via Razorpay →
                </a>
              ) : (
                <p className="mt-2 text-xs text-muted-foreground italic">Card payment link will be available after admin setup.</p>
              )}
            </div>
            <div className="text-xs">
              Admin will verify payment and update status in the dashboard.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function TournamentRegistrationPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading form...</div>}>
      <RegistrationFormContent />
    </Suspense>
  );
}
