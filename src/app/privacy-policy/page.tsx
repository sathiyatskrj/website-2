import { ChevronRight, Shield } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — ANCA",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="bg-primary text-primary-foreground py-10 border-b-4 border-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-3">
            <Link href="/">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Privacy Policy</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-poppins uppercase tracking-wide flex items-center gap-3">
            <Shield className="h-8 w-8 text-secondary" /> Privacy Policy
          </h1>
          <p className="text-primary-foreground/80 mt-2">Last updated: 01 March 2026</p>
        </div>
      </section>

      <section className="py-10 container mx-auto px-4 flex-1">
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-sm p-8 md:p-12 prose prose-sm dark:prose-invert max-w-none">
          
          <h2>1. Introduction</h2>
          <p>
            The Andaman &amp; Nicobar Chess Association (&quot;ANCA&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy of all players, participants, parents/guardians, and visitors. This Privacy Policy explains how we collect, use, store, and share personal information when you interact with our website, register for tournaments, or engage with our services.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Player Registration Data</h3>
          <ul>
            <li>Full name, date of birth, gender</li>
            <li>AICF ID, FIDE ID, and chess ratings</li>
            <li>Contact details: phone number, email address</li>
            <li>District association and club affiliation</li>
            <li>Photograph (optional, for player profiles)</li>
          </ul>

          <h3>2.2 Tournament Registration Data</h3>
          <ul>
            <li>Tournament selection and category</li>
            <li>Payment references (UPI UTR, card transaction IDs)</li>
            <li>Payment proof uploads</li>
          </ul>

          <h3>2.3 Website Usage Data</h3>
          <ul>
            <li>Browser type, device information, and IP address</li>
            <li>Pages visited, time spent, and navigation patterns</li>
            <li>Cookies and session identifiers</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li><strong>Tournament management:</strong> Processing registrations, pairing, result publication, and certificate generation</li>
            <li><strong>Player directory:</strong> Maintaining the public player rating list as required by AICF and FIDE</li>
            <li><strong>Communication:</strong> Sending tournament notices, circulars, results, and important updates</li>
            <li><strong>Performance analytics:</strong> Generating district-level chess analytics and performance dashboards</li>
            <li><strong>Compliance:</strong> Meeting AICF, FIDE, and government regulatory requirements</li>
          </ul>

          <h2>4. Data Sharing &amp; Disclosure</h2>
          <p>We may share your data with:</p>
          <ul>
            <li><strong>AICF &amp; FIDE:</strong> Player data is shared with the All India Chess Federation and FIDE for rating list compilation, title applications, and national/international event selections</li>
            <li><strong>Tournament organizers:</strong> When you register for events organized in partnership with other bodies</li>
            <li><strong>Government authorities:</strong> When required by applicable law or regulation</li>
          </ul>
          <p>We do <strong>not</strong> sell personal data to third parties for marketing purposes.</p>

          <h2>5. Data Security</h2>
          <p>
            We implement industry-standard security measures including encrypted data transmission (SSL/TLS), secure database storage, and role-based access controls. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            Player registration data is retained indefinitely as it forms part of the historical chess record. Tournament registration and payment data is retained for a minimum of 5 years for audit and compliance purposes. You may request deletion of non-essential data by contacting us.
          </p>

          <h2>7. Children&apos;s Privacy</h2>
          <p>
            Many of our players are minors. For players under 18 years of age, registration must be completed by or with the consent of a parent or legal guardian. We take extra precautions with minor data and limit its exposure in public-facing directories.
          </p>

          <h2>8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access and review your personal data held by ANCA</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of non-essential data</li>
            <li>Opt out of non-essential communications</li>
            <li>Lodge a complaint regarding data handling</li>
          </ul>

          <h2>9. Cookies</h2>
          <p>
            Our website uses essential cookies for session management and basic functionality. We may use analytics cookies (e.g., Google Analytics) to understand usage patterns. You may disable cookies through your browser settings, though some features may not function correctly.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the revised policy.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            For any privacy-related queries, data requests, or complaints, please contact:
          </p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:privacy@ancachess.in" className="text-primary font-bold">privacy@ancachess.in</a></li>
            <li><strong>Phone:</strong> +91 94340 99999</li>
            <li><strong>Address:</strong> O/o The Secretary, ANCA, Sports Complex, Port Blair, A&amp;N Islands - 744101</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
