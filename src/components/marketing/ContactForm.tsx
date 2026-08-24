"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "./Button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-md bg-income-bg border border-income-border text-center flex flex-col items-center">
        <div className="w-10 h-10 rounded-md bg-income text-white flex items-center justify-center mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-ink mb-1">Message Received</h3>
        <p className="text-xs sm:text-sm text-ink-secondary max-w-sm mb-4">
          Thank you for reaching out, {formData.name || "there"}. Our support team will review your inquiry and respond within 24-48 business hours.
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", subject: "general", message: "" });
          }}
          variant="secondary"
          size="sm"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono"
          >
            Your Name
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Doe"
            className="w-full px-3.5 py-2.5 rounded-md border border-hairline-strong bg-canvas text-ink text-sm focus:outline-2 focus:outline-primary"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono"
          >
            Email Address
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jane@example.com"
            className="w-full px-3.5 py-2.5 rounded-md border border-hairline-strong bg-canvas text-ink text-sm focus:outline-2 focus:outline-primary"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono"
        >
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-md border border-hairline-strong bg-canvas text-ink text-sm focus:outline-2 focus:outline-primary"
        >
          <option value="general">General Inquiry</option>
          <option value="support">Technical / Account Support</option>
          <option value="billing">Billing & Subscription</option>
          <option value="feature">Feature Request & Feedback</option>
          <option value="privacy">Privacy & Data Deletion</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5 font-mono"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can we assist you?"
          className="w-full px-3.5 py-2.5 rounded-md border border-hairline-strong bg-canvas text-ink text-sm focus:outline-2 focus:outline-primary"
        />
      </div>

      <div className="pt-2">
        <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
          <span>Send Message</span>
          <Send className="w-4 h-4" aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}
