"use client";

import * as React from "react";
import { Send, CheckCircle2, BellRing } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { Container } from "@/components/ui/layout";

export function StayConnected({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  const [contact, setContact] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    setSubscribed(true);
  };

  return (
    <section className="border-t border-line bg-white py-12 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-[2px] border border-forest/20 bg-gradient-to-br from-forest/[0.04] via-gold/[0.05] to-forest/[0.08] p-6 sm:p-10 lg:p-12 shadow-xs">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            {/* Text info */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-forest">
                <BellRing className="h-5 w-5 text-gold-deep" />
                <span className="text-[13px] font-bold text-forest">
                  {bn ? "সরাসরি আপডেট" : "Direct Updates"}
                </span>
              </div>
              <h2 className="bn-heading mt-2 text-2xl font-bold text-forest sm:text-3xl">
                {bn ? "জনসম্পৃক্ততায় যুক্ত থাকুন" : "Stay Connected & Informed"}
              </h2>
              <p className="bn mt-3 max-w-xl text-[15px] leading-relaxed text-body">
                {bn
                  ? "সংসদীয় বক্তব্য, পটুয়াখালী-৩ আসনের উন্নয়ন উদ্যোগ ও গুরুত্বপূর্ণ জনঘোষণা সরাসরি পেতে আপনার যোগাযোগ নম্বর বা ইমেইল দিন।"
                  : "Receive parliamentary speeches, Patuakhali-3 development initiatives, and official statements directly."}
              </p>
            </div>

            {/* Form / Success message */}
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="rounded-[2px] border border-forest/30 bg-forest/10 p-5 text-center">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-forest" />
                  <p className="bn-heading mt-2 text-lg font-bold text-forest">
                    {bn ? "ধন্যবাদ! আপনি যুক্ত হয়েছেন।" : "Thank you! You are connected."}
                  </p>
                  <p className="bn mt-1 text-[13px] text-muted">
                    {bn
                      ? "নুরুল হক নুরের নতুন প্রকাশনা ও সংবাদ আপনার কাছে পৌঁছে যাবে।"
                      : "New updates and announcements will reach your inbox or phone."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder={
                        bn ? "মোবাইল নম্বর বা ইমেইল লিখুন" : "Enter mobile number or email"
                      }
                      className="h-12 flex-1 rounded-[2px] border border-line-strong bg-white px-4 text-[14px] text-charcoal shadow-2xs outline-none transition-colors focus:border-forest focus:ring-1 focus:ring-forest"
                    />
                    <button
                      type="submit"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-[2px] bg-forest px-6 text-[14px] font-semibold text-white shadow-xs transition-colors hover:bg-forest-deep"
                    >
                      <span>{bn ? "যুক্ত হোন" : "Subscribe"}</span>
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[11.5px] text-muted">
                    <span>
                      {bn
                        ? "কোনো স্প্যাম পাঠানো হবে না।"
                        : "No spam. Your contact remains private."}
                    </span>
                    <div className="flex items-center gap-2 text-forest">
                      <span className="font-medium">{bn ? "অফিসিয়াল পেজ:" : "Official:"}</span>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold-deep"
                        aria-label="Facebook"
                      >
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                      <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold-deep"
                        aria-label="YouTube"
                      >
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
