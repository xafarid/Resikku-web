/**
 * Simple contact form that redirects to mailto
 * Static site version - no backend processing
 */

"use client";

import { FormEvent, useState } from "react";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";

export function SimpleContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Mohon isi semua field");
      return;
    }

    const subject = encodeURIComponent(`Pertanyaan dari ${formData.name}`);
    const body = encodeURIComponent(
      `Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`
    );

    // Redirect to mailto
    const mailtoUrl = `mailto:contact@resikku.id?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    // Reset form
    setFormData({ name: "", email: "", message: "" });
    toast.success("Email telah dibuka. Silakan kirim pesan Anda.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
          Nama Lengkap
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nama Anda"
          className="input-rsk"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@example.com"
          className="input-rsk"
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
          Pesan
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tulis pesan Anda di sini..."
          rows={5}
          className="input-rsk resize-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-rsk btn-rsk-primary w-full flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        {loading ? "Mengirim..." : "Kirim Pesan"}
      </button>

      <p className="text-xs text-ink-muted text-center">
        <Mail className="inline w-3 h-3 mr-1" />
        Email Anda akan dibuka untuk dikirim secara langsung
      </p>
    </form>
  );
}
