import React from 'react';

export default function ServiceAreaMap() {
  return (
    <div className="w-full h-full bg-slate-100 relative">
      <iframe
        title="Omaha Service Area Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193056.3663673752!2d-96.22306265000002!3d41.26056265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87938dc8b50cfced%3A0x46424d4fae37b9e2!2sOmaha%2C%20NE!5e0!3m2!1sen!2sus!4v1709920000000!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'grayscale(20%)' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {/* Overlay to prevent accidental scroll interaction if needed */}
      <div className="absolute inset-0 pointer-events-none border-2 border-slate-200/50 rounded-xl" />
    </div>
  );
}