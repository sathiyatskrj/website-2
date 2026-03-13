import { MapPin, Phone, Mail, Send, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="bg-primary text-primary-foreground py-8 border-b-4 border-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-3">
            <Link href="/">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Contact Us</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-poppins uppercase tracking-wide">
            Contact ANCA Secretariat
          </h1>
          <p className="text-primary-foreground/80 mt-2">Get in touch for affiliations, queries, or tournament support</p>
        </div>
      </section>

      <section className="py-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-8">
            <div className="bg-card border border-border shadow-sm rounded-md p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
              <h2 className="text-xl font-bold font-poppins text-primary mb-1">Send a Message</h2>
              <p className="text-sm text-muted-foreground mb-6">All fields are mandatory. You will receive a response within 3 working days.</p>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full bg-background border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground" placeholder="Your Full Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" className="w-full bg-background border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground" placeholder="you@example.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Phone Number</label>
                    <input type="tel" className="w-full bg-background border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground" placeholder="+91 00000 00000" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Category <span className="text-red-500">*</span></label>
                    <select className="w-full bg-background border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-muted-foreground">
                      <option>Select Category</option>
                      <option>Player Registration</option>
                      <option>Tournament Query</option>
                      <option>Affiliation</option>
                      <option>Media / Press</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Subject <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full bg-background border border-border rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground" placeholder="Brief subject of your message" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Your Message <span className="text-red-500">*</span></label>
                  <textarea rows={5} className="w-full bg-background border border-border rounded px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground" placeholder="Please describe your query in detail..."></textarea>
                </div>
                <button type="button" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-3 rounded hover:bg-primary/90 transition-colors uppercase tracking-wider text-sm">
                  <Send className="h-4 w-4" /> Submit Query
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-primary text-primary-foreground rounded-md shadow-md p-6">
              <h3 className="font-poppins font-bold border-b border-primary-foreground/20 pb-3 mb-4 uppercase tracking-wider text-sm">Head Office</h3>
              <ul className="space-y-5 text-sm">
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-secondary mt-0.5" />
                  <span>#11, KM Road, Prem Nagar<br/>Near Electricity Site Office<br/>Port Blair, A &amp; N Islands - 744102</span>
                </li>
                <li className="flex gap-3 items-center">
                  <Phone className="h-4 w-4 shrink-0 text-secondary" />
                  <a href="tel:+919999999999" className="hover:text-white">Contact Secretariat</a>
                </li>
                <li className="flex gap-3 items-center">
                  <Mail className="h-4 w-4 shrink-0 text-secondary" />
                  <a href="mailto:anchessassociation@gmail.com" className="hover:text-white">anchessassociation@gmail.com</a>
                </li>
                <li className="flex gap-3 items-start">
                  <Clock className="h-4 w-4 shrink-0 text-secondary mt-0.5" />
                  <span>3:00 PM to 07:00 PM</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-md shadow-sm p-5">
              <h3 className="font-poppins font-bold text-primary text-sm uppercase tracking-wider border-b border-border pb-2 mb-4">Grievance Officer</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">For unresolved complaints, contact the Grievance Officer directly at <a href="mailto:grievance@ancachess.in" className="text-primary hover:underline">grievance@ancachess.in</a></p>
            </div>

            <div className="bg-muted border border-border rounded-md p-5 text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Disclaimer:</strong> This is the official contact portal of the Andaman &amp; Nicobar Chess Association. For FIDE/AICF matters, please contact the respective national body directly.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
