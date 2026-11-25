/* eslint-disable react/no-unescaped-entities -- verbatim draft policy copy */
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { shell } from "@/lib/chrome";

export const metadata: Metadata = {
  title: "CommonLife Privacy Policy — Draft",
  description: "Adonai Innovations, LLC — CommonLife Privacy Policy. Effective upon publication.",
  robots: { index: false, follow: false },
};

function H2({ children }: { children: string }) {
  return <h2 className="mt-10 font-lora text-[28px] font-bold leading-9 text-clDeepOcean">{children}</h2>;
}

function H3({ children }: { children: string }) {
  return <h3 className="mt-6 font-lora text-[21px] font-semibold leading-[30px] text-clDeepOcean">{children}</h3>;
}

function P({ children }: { children: string }) {
  return <p className="mt-4 font-inter text-base leading-[27px] text-clDeepOcean">{children}</p>;
}

export default function PrivacyPage() {
  return (
    <div className="bg-clWhite font-inter text-clDeepOcean">
      <Navbar />
      <main>
        <article className={`${shell} max-w-[860px] py-16 min-[1180px]:py-24`}>
          <p className="font-inter text-xs font-semibold uppercase tracking-[0.1em] text-clDeepOcean">Draft</p>
          <h1 className="mt-4 font-lora text-[36px] font-bold leading-[44px] tracking-[-0.01em] min-[1180px]:text-[48px] min-[1180px]:leading-[58px]">
            Adonai Innovations, LLC — CommonLife Privacy Policy
          </h1>
          <p className="mt-4 font-inter text-[15px] leading-[22px]">Effective upon publication</p>
          <P>
            This policy describes how Adonai Innovations, LLC ("Adonai," "we," "us," or "our") handles information in the CommonLife: AI Bible Companion mobile applications for iOS and Android (the "App").
          </P>
          <P>
            This policy is written only from facts we have been able to verify from public store listings, the App's public description and version history, and related public sites. We have not been able to inspect the App's source code or private backend configuration. Where a practice is not confirmed, we say so rather than guess.
          </P>
          <P>If you have questions, want to revoke a permission, or want us to delete information, email hello@adonaiinnovations.com.</P>

          <H2>Who we are</H2>
          <P>
            Adonai Innovations, LLC is a Texas limited liability company. We publish the App under that name. The App Store seller is Adonai Innovations, LLC. Google Play lists support at support@adonaiinnovations.com. For privacy requests under this policy, please use hello@adonaiinnovations.com.
          </P>
          <P>
            The App is a Bible-study and sermon-preparation assistant. Public listings describe scripture-backed answers, a Bible reader, multiple translations, multi-language responses, sharing, sermon-drafting tools, and optional paid subscriptions.
          </P>
          <P>
            This policy covers the iOS and Android App. Separate sites exist at https://www.commonlife.ai and app.commonlife.ai. Those sites are not fully described here, and they do not currently publish their own privacy policies. See "Related websites" below.
          </P>

          <H2>What the app stores currently say</H2>
          <P>On the Apple App Store, the developer privacy label for the App is "Data Not Collected." The developer states that the App does not collect data from the App.</P>
          <P>On Google Play, the Data safety section states that no data is collected and that no data is shared with third parties.</P>
          <P>The App's public store description also says: "Data privacy: We never cache or store your data."</P>
          <P>
            Those statements are the company's current public disclosures on the store pages. They need to be read together with the features described in the App's version history and on related sites, which we summarize below. If any of those features store personal information, the store labels should be reviewed and, if needed, updated so they remain accurate.
          </P>

          <H2>Information that may be processed when you use the App</H2>
          <H3>Questions and answers</H3>
          <P>
            To give you an AI-generated, scripture-referenced answer, the App must send the question you type, and any needed context such as a selected Bible translation or language, to a service that can generate the answer, and then return that answer to your device. We have not confirmed where that processing runs, whether your questions or answers are retained after the reply is shown, or whether they are used to train models. We also have not confirmed which, if any, third-party AI or hosting providers are used.
          </P>
          <H3>Subscriptions and payments</H3>
          <P>
            The App is free to download and offers in-app subscriptions. The current App Store listing includes a weekly subscription, a monthly subscription, and a yearly subscription. Payments for in-app purchases on iOS are processed by Apple, and payments on Android are processed by Google, under their terms and privacy policies. Version history for the App also mentions a Customer Center for viewing and managing subscription status, and support for subscription codes. We do not receive your full payment card number from Apple or Google when you buy through the store.
          </P>
          <H3>Accounts</H3>
          <P>
            App Store version history for version 1.14.0 and 1.14.1 lists "Logged in User Support" and a "My Account Screen." We have not confirmed what account information the mobile App collects, whether an account is required, how long account data is kept, or whether the App includes an in-app account-deletion flow. Apple requires an in-app way to delete an account if the App lets users create one. If you have created an account and want it deleted, email hello@adonaiinnovations.com, and we will work with you to complete that request.
          </P>
          <P>
            A related web application at app.commonlife.ai provides Login and Sign up with email and password and uses Supabase as a backend. We have not confirmed that the mobile App uses that same system, but if it does, account credentials and related profile data would be processed by that backend.
          </P>
          <H3>Prayer requests</H3>
          <P>
            App Store version history for version 1.12.0 lists "Prayer Request Support." We have not confirmed what prayer-request content the mobile App sends or stores. The related web application at app.commonlife.ai allows a user to submit a prayer, including a category and related details, to a first-party prayer endpoint. Prayer content can be sensitive. If you have submitted a prayer request and want it deleted, email hello@adonaiinnovations.com.
          </P>
          <H3>Notifications</H3>
          <P>
            App Store version history for version 1.7.0 lists notification support for a weekly Bible-study prompt. Sending push notifications typically requires your permission and a device or app token. We have not confirmed the notification provider or whether tokens are stored. You can usually turn off notifications in your device settings. You may also email us to ask that we stop sending App notifications if we control them.
          </P>
          <H3>Information we have not found evidence the App collects</H3>
          <P>
            We have not found public evidence that the App collects precise location, contacts, photos, or device-address-book data, or that it sells personal data. If a later version of the App requests those permissions, this policy should be updated before that version is released.
          </P>

          <H2>How we use information</H2>
          <P>To the extent we process information in connection with the App, we use it to:</P>
          <ul className="mt-4 list-disc space-y-2 pl-5 font-inter text-base leading-[27px]">
            <li>Provide the features you request, including answers, reading tools, subscriptions, accounts, prayer requests, and notifications</li>
            <li>Maintain and secure the App</li>
            <li>Communicate with you about the App when you contact us</li>
            <li>Comply with law</li>
          </ul>
          <P>We do not sell personal data. We do not use App information for third-party targeted advertising that we have been able to verify.</P>

          <H2>Third parties</H2>
          <P>Depending on how you use the App, the following third parties may process information:</P>
          <ul className="mt-4 list-disc space-y-2 pl-5 font-inter text-base leading-[27px]">
            <li>Apple, for App Store distribution, in-app purchases, and related account or receipt features on iOS</li>
            <li>Google, for Google Play distribution and in-app purchases on Android</li>
            <li>Supabase, which is used by the related web application at app.commonlife.ai. We have not confirmed whether the mobile App also uses Supabase.</li>
          </ul>
          <P>We have not confirmed other processors, including any AI model host, email provider, or push-notification provider.</P>
          <P>Apple and Google also receive certain information under their own rules when you download or pay for the App. Their policies apply to that processing.</P>

          <H2>Retention and deletion</H2>
          <P>
            We have not confirmed a specific retention period for App data. The public store description says the company does not cache or store user data. That statement is difficult to reconcile with login, account, prayer-request, and notification features if those features keep information on our servers. Until that is confirmed, please treat server-side retention as unconfirmed.
          </P>
          <P>
            To request deletion of personal data we hold, or to revoke a consent you have given us, email hello@adonaiinnovations.com. We will respond as described below. You may also delete the App from your device at any time. Deleting the App may not, by itself, delete information stored in an online account. If you have an Apple or Google subscription, you will also need to manage or cancel it through your Apple or Google account settings.
          </P>
          <P>If the App offers an in-app account or data-deletion control, use that control as well. We have not confirmed that such a control exists.</P>

          <H2>Children</H2>
          <P>
            The App has an App Store age rating of 4+ and a Google Play content rating of Everyone. The public CommonLife marketing site describes the product as accessible to children learning Bible stories and mentions possible use in Christian schools. We have not confirmed a minimum age to create an account, whether the App is directed to children under 13, or what parental-consent practices, if any, are in place.
          </P>
          <P>
            Because those facts are unconfirmed, we do not claim that the App is only for adults. If you are a parent or guardian and believe a child has provided personal information through the App, email hello@adonaiinnovations.com. We will review the request and delete information we hold when required or appropriate. Personal data collected from a known child can be sensitive data under Texas law.
          </P>

          <H2>Your privacy rights under Texas law</H2>
          <P>The Texas Data Privacy and Security Act, Chapter 541 of the Texas Business and Commerce Code, gives Texas consumers rights in personal data, including the right to:</P>
          <ul className="mt-4 list-disc space-y-2 pl-5 font-inter text-base leading-[27px]">
            <li>Confirm whether we process your personal data</li>
            <li>Access that data</li>
            <li>Correct inaccuracies</li>
            <li>Delete personal data you provided or that we obtained about you</li>
            <li>Obtain a copy of personal data you previously provided to us, in a portable format if available</li>
            <li>Opt out of targeted advertising, the sale of personal data, or profiling that produces a legal or similarly significant effect</li>
          </ul>
          <P>
            To make a request, email hello@adonaiinnovations.com. Please include the email or other identifier associated with your use of the App, if you have one. We will not require you to create a new account only to make a request.
          </P>
          <P>We will respond within 45 days after we receive your request. If we reasonably need more time, we may extend that period by up to 45 additional days and will tell you why.</P>
          <P>We will not discriminate against you for exercising these rights.</P>
          <P>
            Some businesses that qualify as small businesses under U.S. Small Business Administration rules are covered by only part of this Texas law. We still intend to honor the request process described here for personal data we actually hold.
          </P>

          <H2>Appeals</H2>
          <P>
            If we decline all or part of your request, we will tell you why. You may appeal by sending another email to hello@adonaiinnovations.com with the subject line "Privacy Appeal," explaining why you disagree. We will review the appeal and respond in writing within 45 days. If we deny your appeal, we will tell you how you may contact the Texas Attorney General if you wish to submit a complaint.
          </P>

          <H2>Sale of personal data</H2>
          <P>We do not sell personal data, including sensitive personal data or biometric data. Because we do not sell that data, this policy does not include a sale notice.</P>

          <H2>Related websites</H2>
          <P>https://www.commonlife.ai is a public marketing site. When we reviewed it, it did not publish a privacy policy, terms of service, cookie notice, or accessibility statement.</P>
          <P>
            app.commonlife.ai is a web application that, when we reviewed it, offered login and sign-up, prayer-request submission, remote fonts from Google Fonts, and a backend provided by Supabase. The host set a session-affinity cookie.
          </P>
          <P>If you use those sites, their practices may differ from the mobile App. We recommend that this policy, or a companion policy, be expanded once those practices are confirmed.</P>

          <H2>Changes</H2>
          <P>
            If we change this policy, we will post the updated version at the URL below and update the effective date. The posted version is the current version. When the App links to this policy, that link should point to the posted page, not to the Website homepage.
          </P>

          <H2>Contact</H2>
          <p className="mt-4 font-inter text-base leading-[27px]">
            Adonai Innovations, LLC
            <br />
            Email: hello@adonaiinnovations.com
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
