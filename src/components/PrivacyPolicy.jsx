import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-[#E3DCCF] space-y-6">
      <h1 className="text-2xl font-bold text-[#6FCF97]">Privacy Policy</h1>

      <p>
        White House Feed respects your privacy. We do not collect personally identifiable
        information from our users.
      </p>

      <p>
        We use Google Analytics to understand how people use the site — such as page views,
        browser types, and traffic sources. This data is anonymous and helps us improve the
        experience. Google Analytics may use cookies to perform this function.
      </p>

      <p>
        You can opt out of Google Analytics using browser extensions like{' '}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-moss-green"
        >
          Google's official opt-out tool
        </a>
        .
      </p>

      <p>
        We do not sell, rent, or share your data. We may update this policy as we add new
        features (like alerts or signups) in the future.
      </p>

      <p>Last updated: May 2025</p>
    </div>
  );
}
