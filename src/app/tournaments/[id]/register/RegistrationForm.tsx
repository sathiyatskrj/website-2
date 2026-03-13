"use client";

import { useState } from "react";
import { CheckCircle2, CreditCard, User, Upload, Smartphone, Landmark } from "lucide-react";

export function RegistrationForm({ tournamentId }: { tournamentId: string }) {
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");

  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black font-poppins text-primary mb-2">Tournament Registration</h1>
          <p className="text-muted-foreground">Complete the form below to register and pay the entry fee securely.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold font-poppins mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-secondary" /> Player Details
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-primary" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date of Birth</label>
                  <input type="date" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">AICF ID (Optional)</label>
                  <input type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-primary" placeholder="e.g. 12345" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">FIDE ID (Optional)</label>
                  <input type="text" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-primary" placeholder="e.g. 5000000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">FIDE Rating</label>
                  <input type="number" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-primary" placeholder="0 if Unrated" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-primary">
                    <option>Open Category</option>
                    <option>Under 19</option>
                    <option>Under 15</option>
                    <option>Under 11</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium flex items-center justify-between">
                  <span>Payment Proof (Screenshot / PDF)</span>
                  <span className="text-xs text-muted-foreground">Max 2MB</span>
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                </div>
              </div>
            </div>

            {/* Payment Gateway Section */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold font-poppins mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-secondary" /> Payment
              </h2>
              
              {/* Payment Method Tabs */}
              <div className="flex gap-2 mb-6">
                <button 
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm border-2 transition-all ${
                    paymentMethod === "upi" 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-border bg-background text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <Smartphone className="h-4 w-4" /> UPI Payment
                </button>
                <button 
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm border-2 transition-all ${
                    paymentMethod === "card" 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-border bg-background text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <CreditCard className="h-4 w-4" /> Card Payment
                </button>
              </div>
              
              <div className="p-5 bg-muted/50 rounded-xl border border-border">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
                  <span className="font-bold text-foreground">Total Payable</span>
                  <span className="text-2xl font-black text-primary">₹1,000</span>
                </div>

                {/* UPI Payment */}
                {paymentMethod === "upi" && (
                  <div className="space-y-4">
                    <div className="bg-background border border-border rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 bg-[#5F259F]/10 rounded-lg flex items-center justify-center">
                          <Smartphone className="h-5 w-5 text-[#5F259F]" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm">Pay via UPI</p>
                          <p className="text-xs text-muted-foreground">GPay / PhonePe / Paytm / BHIM</p>
                        </div>
                      </div>
                      
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">UPI VPA</p>
                        <p className="text-lg font-black text-primary font-mono">anca.chess@sbi</p>
                      </div>
                      
                      {/* QR Code Placeholder */}
                      <div className="flex justify-center mb-4">
                        <div className="w-48 h-48 bg-white border-2 border-border rounded-xl flex flex-col items-center justify-center">
                          <div className="grid grid-cols-5 gap-1 mb-2">
                            {[...Array(25)].map((_, i) => (
                              <div key={i} className={`w-5 h-5 rounded-sm ${Math.random() > 0.4 ? 'bg-foreground' : 'bg-background'}`} />
                            ))}
                          </div>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Scan to Pay</p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground text-center mb-4">
                        Scan the QR code or use the UPI VPA above to make payment
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">UTR / Transaction Reference</label>
                      <input 
                        type="text" 
                        className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-primary" 
                        placeholder="Enter 12-digit UTR number after payment"
                      />
                      <p className="text-xs text-muted-foreground">You will find the UTR in your payment app&apos;s transaction history</p>
                    </div>
                    
                    <button 
                      className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors flex justify-center items-center gap-2 shadow-sm"
                      onClick={() => alert("Registration submitted with UPI payment! Admin will verify your transaction.")}
                    >
                      <CheckCircle2 className="h-5 w-5 text-secondary" /> Submit Registration with UPI
                    </button>
                  </div>
                )}

                {/* Card Payment */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div className="bg-background border border-border rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm">Pay via Card</p>
                          <p className="text-xs text-muted-foreground">Visa / Mastercard / RuPay</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Card Number</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm font-mono tracking-widest focus:outline-primary" 
                              placeholder="0000 0000 0000 0000"
                              maxLength={19}
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                              <div className="w-8 h-5 bg-blue-600 rounded text-white text-[6px] flex items-center justify-center font-bold">VISA</div>
                              <div className="w-8 h-5 bg-red-500 rounded text-white text-[6px] flex items-center justify-center font-bold">MC</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Cardholder Name</label>
                          <input 
                            type="text" 
                            className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm focus:outline-primary" 
                            placeholder="Name as on card"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Expiry Date</label>
                            <input 
                              type="text" 
                              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm font-mono focus:outline-primary" 
                              placeholder="MM / YY"
                              maxLength={7}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">CVV</label>
                            <input 
                              type="password" 
                              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm font-mono focus:outline-primary" 
                              placeholder="•••"
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                      <Landmark className="h-4 w-4 text-green-600 shrink-0" />
                      <p className="text-xs text-green-700 dark:text-green-400">Your payment is secured with 256-bit SSL encryption</p>
                    </div>
                    
                    <button 
                      className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex justify-center items-center gap-2 shadow-sm"
                      onClick={() => alert("Card payment processed! Registration confirmed.")}
                    >
                      <CreditCard className="h-5 w-5" /> Pay ₹1,000 Now
                    </button>
                  </div>
                )}

                {/* Divider */}
                <div className="relative flex py-3 items-center mt-4">
                  <div className="flex-grow border-t border-border"></div>
                  <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs uppercase font-medium">or</span>
                  <div className="flex-grow border-t border-border"></div>
                </div>
                
                <button 
                  className="w-full py-3 bg-background border-2 border-border text-foreground font-bold rounded-lg hover:bg-muted hover:border-primary/50 transition-all flex justify-center items-center gap-2"
                  onClick={() => alert("Registration submitted! Admin will contact you for payment.")}
                >
                  <CheckCircle2 className="h-5 w-5 text-secondary" /> Submit Registration (Pay Later)
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Tournament Summary */}
          <div className="space-y-6">
            <div className="bg-primary text-primary-foreground rounded-xl p-6 shadow-lg shadow-primary/20">
              <h3 className="font-bold font-poppins text-lg mb-4 text-secondary border-b border-primary-foreground/20 pb-4">Order Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-primary-foreground/80">Tournament</span>
                  <span className="font-semibold text-right max-w-[150px]">45th A&N State Championship ({tournamentId})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-foreground/80">Date</span>
                  <span className="font-semibold">15–20 May 2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-foreground/80">Venue</span>
                  <span className="font-semibold text-right">ANCA Sports Complex</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary-foreground/80">Entry Fee</span>
                  <span className="font-semibold">₹1,000</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-primary-foreground/20">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-xl text-secondary">₹1,000</span>
                </div>
              </div>
            </div>
            
            {/* Payment Methods Accepted */}
            <div className="bg-card border border-border p-5 rounded-xl">
              <h3 className="font-bold font-poppins mb-3 text-sm text-foreground">Accepted Payment Methods</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-muted text-xs font-bold rounded-md text-muted-foreground">UPI</span>
                <span className="px-3 py-1.5 bg-muted text-xs font-bold rounded-md text-muted-foreground">Visa</span>
                <span className="px-3 py-1.5 bg-muted text-xs font-bold rounded-md text-muted-foreground">Mastercard</span>
                <span className="px-3 py-1.5 bg-muted text-xs font-bold rounded-md text-muted-foreground">RuPay</span>
              </div>
            </div>
            
            <div className="bg-card border border-border p-6 rounded-xl">
               <h3 className="font-bold font-poppins mb-2">Need Help?</h3>
               <p className="text-sm text-muted-foreground mb-4">Contact the organizing committee if you face any issues during registration.</p>
               <p className="text-sm font-medium">📞 +91 94340 99999</p>
               <p className="text-sm font-medium">✉️ support@ancachess.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
