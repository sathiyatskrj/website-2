import { ChevronRight, Scale } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions — ANCA",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="bg-primary text-primary-foreground py-10 border-b-4 border-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-3">
            <Link href="/">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Terms &amp; Conditions</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-poppins uppercase tracking-wide flex items-center gap-3">
            <Scale className="h-8 w-8 text-secondary" /> Terms &amp; Conditions
          </h1>
          <p className="text-primary-foreground/80 mt-2">Last updated: 01 March 2026</p>
        </div>
      </section>

      <section className="py-10 container mx-auto px-4 flex-1">
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-sm p-8 md:p-12 prose prose-sm dark:prose-invert max-w-none">
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Andaman &amp; Nicobar Chess Association (&quot;ANCA&quot;) website, registering for tournaments, or using any ANCA services, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use our services.
          </p>

          <h2>2. Player Registration</h2>
          <ul>
            <li>All players must provide accurate and truthful information during registration.</li>
            <li>A valid AICF registration is mandatory for participation in all ANCA-sanctioned events.</li>
            <li>Players under 18 years of age must have parental or guardian consent for registration.</li>
            <li>ANCA reserves the right to refuse, suspend, or terminate registration for misrepresentation or misconduct.</li>
          </ul>

          <h2>3. Tournament Rules &amp; Participation</h2>
          <ul>
            <li>All tournaments are conducted under FIDE Laws of Chess unless otherwise specified in the tournament brochure.</li>
            <li>Players must carry a valid photo ID and AICF registration proof to every tournament venue.</li>
            <li>Pairings, tie-break, and results are final as decided by the tournament arbiter(s).</li>
            <li>Any disputes must be raised with the Chief Arbiter during the event; post-event appeals follow AICF guidelines.</li>
            <li>Use of electronic devices (phones, smartwatches, earphones) is strictly prohibited in the playing hall.</li>
          </ul>

          <h2>4. Anti-Cheating Policy</h2>
          <p>
            ANCA follows the FIDE Fair Play Commission guidelines. Any player found engaging in unfair means — including but not limited to computer assistance, collusion, or pre-arranged results — will be immediately disqualified, reported to AICF, and may face a multi-year ban from all ANCA events.
          </p>

          <h2>5. Entry Fees &amp; Payment</h2>
          <ul>
            <li>Entry fees are specified in the tournament brochure and must be paid before the registration deadline.</li>
            <li>Payments made via UPI, credit/debit card, or bank transfer are accepted.</li>
            <li><strong>Entry fees are strictly non-refundable</strong> once paid, regardless of withdrawal or non-participation.</li>
            <li>In the event of tournament cancellation by ANCA, a full refund will be processed within 30 working days.</li>
          </ul>

          <h2>6. Payment Methods</h2>
          <p>ANCA accepts the following payment methods for tournament registration:</p>
          <ul>
            <li><strong>UPI:</strong> Direct payment via UPI VPA. Players must submit the UTR number as payment reference.</li>
            <li><strong>Credit/Debit Card:</strong> Secure card payment through our payment gateway.</li>
            <li><strong>Bank Transfer:</strong> NEFT/IMPS to the official ANCA bank account (details provided during registration).</li>
          </ul>
          <p>Payment verification is done manually by the ANCA admin team. Registration is confirmed only after successful payment verification.</p>

          <h2>7. Intellectual Property</h2>
          <p>
            All content on this website — including text, design, logos, graphics, and tournament data — is the property of ANCA and is protected under applicable intellectual property laws. Unauthorized reproduction or distribution is prohibited.
          </p>

          <h2>8. User Conduct</h2>
          <p>Users of this website and participants in ANCA events agree to:</p>
          <ul>
            <li>Behave with sportsmanship and respect toward all players, arbiters, and organizers</li>
            <li>Not submit false, misleading, or fraudulent information</li>
            <li>Not attempt to disrupt, hack, or interfere with the website&apos;s functionality</li>
            <li>Follow all venue-specific rules and COVID/health protocols if applicable</li>
          </ul>

          <h2>9. Limitation of Liability</h2>
          <p>
            ANCA provides this website and its services on an &quot;as is&quot; basis. While we strive for accuracy, we do not guarantee that the website will be error-free or uninterrupted. ANCA is not liable for any indirect, incidental, or consequential damages arising from the use of our services.
          </p>

          <h2>10. Disclaimers</h2>
          <ul>
            <li>Rating data is sourced from FIDE and AICF and may not reflect the most recent updates.</li>
            <li>Tournament schedules and details are subject to change. Players are advised to check the website regularly for updates.</li>
            <li>External links on this website do not imply endorsement by ANCA.</li>
          </ul>

          <h2>11. Governing Law</h2>
          <p>
            These Terms &amp; Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts at Port Blair, Andaman &amp; Nicobar Islands.
          </p>

          <h2>12. Amendments</h2>
          <p>
            ANCA reserves the right to modify these Terms at any time. Changes will be posted on this page. Continued use of our services constitutes acceptance of the modified terms.
          </p>

          <h2>13. Contact</h2>
          <p>For questions or concerns regarding these Terms, contact:</p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:legal@ancachess.in" className="text-primary font-bold">legal@ancachess.in</a></li>
            <li><strong>Phone:</strong> +91 94340 99999</li>
            <li><strong>Address:</strong> O/o The Secretary, ANCA, Sports Complex, Port Blair, A&amp;N Islands - 744101</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
