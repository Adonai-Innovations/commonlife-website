import type { Metadata } from "next";
import type { ReactNode } from "react";

import SiteFrame from "@/components/horizon/SiteFrame";

export const metadata: Metadata = {
  title: "Adonai Innovations, LLC — CommonLife Privacy Policy",
  description: "Effective upon publication",
  robots: { index: false, follow: false },
};

function H({ children }: { children: ReactNode }) {
  return <h2 className="legal-h">{children}</h2>;
}

function Sub({ children }: { children: ReactNode }) {
  return <h3 className="legal-sub">{children}</h3>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="legal-p">{children}</p>;
}

function Item({ children }: { children: ReactNode }) {
  return (
    <div className="legal-li">
      <span className="bullet" aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <SiteFrame>
      <div className="legal-wrap">
        <article className="legal-col">
          <p className="draft">Draft</p>
          <h1 className="t-privacy">Adonai Innovations, LLC — CommonLife Privacy Policy</h1>
          <p className="effective">Effective upon publication</p>
          <P>
            This policy describes how Adonai Innovations, LLC (&quot;Adonai,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) handles information in the CommonLife: AI Bible Companion mobile applications for iOS and Android (the &quot;App&quot;).
          </P>
          <P>
            This policy is written only from facts we have been able to verify from public store listings, the App&apos;s public description and version history, and related public sites. We have not been able to inspect the App&apos;s source code or private backend configuration. Where a practice is not confirmed, we say so rather than guess.
          </P>
          <P>If you have questions, want to revoke a permission, or want us to delete information, email hello@adonaiinnovations.com.</P>

          <H>Who we are</H>
          <P>
            Adonai Innovations, LLC is a Texas limited liability company. We publish the App under that name. The App Store seller is Adonai Innovations, LLC. Google Play lists support at support@adonaiinnovations.com. For privacy requests under this policy, please use hello@adonaiinnovations.com.
          </P>
          <P>
            The App is a Bible-study and sermon-preparation assistant. Public listings describe scripture-backed answers, a Bible reader, multiple translations, multi-language responses, sharing, sermon-drafting tools, and optional paid subscriptions.
          </P>
          <P>
            This policy covers the iOS and Android App. Separate sites exist at https://www.commonlife.ai and app.commonlife.ai. Those sites are not fully described here, and they do not currently publish their own privacy policies. See &quot;Related websites&quot; below.
          </P>

          <H>What the app stores currently say</H>
          <P>On the Apple App Store, the developer privacy label for the App is &quot;Data Not Collected.&quot; The developer states that the App does not collect data from the App.</P>
          <P>On Google Play, the Data safety section states that no data is collected and that no data is shared with third parties.</P>
          <P>The App&apos;s public store description also says: &quot;Data privacy: We never cache or store your data.&quot;</P>
          <P>
            Those statements are the company&apos;s current public disclosures on the store pages. They need to be read together with the features described in the App&apos;s version history and on related sites, which we summarize below. If any of those features store personal information, the store labels should be reviewed and, if needed, updated so they remain accurate.
          </P>

          <H>Information that may be processed when you use the App</H>
          <Sub>Questions and answers</Sub>
          <P>
            To give you an AI-generated, scripture-referenced answer, the App must send the question you type, and any needed context such as a selected Bible translation or language, to a service that can generate the answer, and then return that answer to your device. We have not confirmed where that processing runs, whether your questions or answers are retained after the reply is shown, or whether they are used to train models. We also have not confirmed which, if any, third-party AI or hosting providers are used.
          </P>
          <Sub>Subscriptions and payments</Sub>
          <P>
            The App is free to download and offers in-app subscriptions. The current App Store listing includes a weekly subscription, a monthly subscription, and a yearly subscription. Payments for in-app purchases on iOS are processed by Apple, and payments on Android are processed by Google, under their terms and privacy policies. Version history for the App also mentions a Customer Center for viewing and managing subscription status, and support for subscription codes. We do not receive your full payment card number from Apple or Google when you buy through the store.
          </P>
          <Sub>Accounts</Sub>
          <P>
            App Store version history for version 1.14.0 and 1.14.1 lists &quot;Logged in User Support&quot; and a &quot;My Account Screen.&quot; We have not confirmed what account information the mobile App collects, whether an account is required, how long account data is kept, or whether the App includes an in-app account-deletion flow. Apple requires an in-app way to delete an account if the App lets users create one. If you have created an account and want it deleted, email hello@adonaiinnovations.com, and we will work with you to complete that request.
          </P>
          <P>
            A related web application at app.commonlife.ai provides Login and Sign up with email and password and uses Supabase as a backend. We have not confirmed that the mobile App uses that same system, but if it does, account credentials and related profile data would be processed by that backend.
          </P>
          <Sub>Prayer requests</Sub>
          <P>
            App Store version history for version 1.12.0 lists &quot;Prayer Request Support.&quot; We have not confirmed what prayer-request content the mobile App sends or stores. The related web application at app.commonlife.ai allows a user to submit a prayer, including a category and related details, to a first-party prayer endpoint. Prayer content can be sensitive. If you have submitted a prayer request and want it deleted, email hello@adonaiinnovations.com.
          </P>
          <Sub>Notifications</Sub>
          <P>
            App Store version history for version 1.7.0 lists notification support for a weekly Bible-study prompt. Sending push notifications typically requires your permission and a device or app token. We have not confirmed the notification provider or whether tokens are stored. You can usually turn off notifications in your device settings. You may also email us to ask that we stop sending App notifications if we control them.
          </P>
          <Sub>Information we have not found evidence the App collects</Sub>
          <P>
            We have not found public evidence that the App collects precise location, contacts, photos, or device-address-book data, or that it sells personal data. If a later version of the App requests those permissions, this policy should be updated before that version is released.
          </P>

          <H>How we use information</H>
          <P>To the extent we process information in connection with the App, we use it to:</P>
          <Item>Provide the features you request, including answers, reading tools, subscriptions, accounts, prayer requests, and notifications</Item>
          <Item>Maintain and secure the App</Item>
          <Item>Communicate with you about the App when you contact us</Item>
          <Item>Comply with law</Item>
          <P>We do not sell personal data. We do not use App information for third-party targeted advertising that we have been able to verify.</P>

          <H>Third parties</H>
          <P>Depending on how you use the App, the following third parties may process information:</P>
          <Item>
            <span className="legal-strong">Apple,</span> for App Store distribution, in-app purchases, and related account or receipt features on iOS
          </Item>
          <Item>
            <span className="legal-strong">Google,</span> for Google Play distribution and in-app purchases on Android
          </Item>
          <Item>
            <span className="legal-strong">Supabase,</span> which is used by the related web application at app.commonlife.ai. We have not confirmed whether the mobile App also uses Supabase.
          </Item>
          <P>We have not confirmed other processors, including any AI model host, email provider, or push-notification provider.</P>
          <P>Apple and Google also receive certain information under their own rules when you download or pay for the App. Their policies apply to that processing.</P>

          <H>Retention and deletion</H>
          <P>
            We have not confirmed a specific retention period for App data. The public store description says the company does not cache or store user data. That statement is difficult to reconcile with login, account, prayer-request, and notification features if those features keep information on our servers. Until that is confirmed, please treat server-side retention as unconfirmed.
          </P>
          <P>
            To request deletion of personal data we hold, or to revoke a consent you have given us, email hello@adonaiinnovations.com. We will respond as described below. You may also delete the App from your device at any time. Deleting the App may not, by itself, delete information stored in an online account. If you have an Apple or Google subscription, you will also need to manage or cancel it through your Apple or Google account settings.
          </P>
          <P>If the App offers an in-app account or data-deletion control, use that control as well. We have not confirmed that such a control exists.</P>

          <H>Children</H>
          <P>
            The App has an App Store age rating of 4+ and a Google Play content rating of Everyone. The public CommonLife marketing site describes the product as accessible to children learning Bible stories and mentions possible use in Christian schools. We have not confirmed a minimum age to create an account, whether the App is directed to children under 13, or what parental-consent practices, if any, are in place.
          </P>
          <P>
            Because those facts are unconfirmed, we do not claim that the App is only for adults. If you are a parent or guardian and believe a child has provided personal information through the App, email hello@adonaiinnovations.com. We will review the request and delete information we hold when required or appropriate. Personal data collected from a known child can be sensitive data under Texas law.
          </P>

          <H>Your privacy rights under Texas law</H>
          <P>The Texas Data Privacy and Security Act, Chapter 541 of the Texas Business and Commerce Code, gives Texas consumers rights in personal data, including the right to:</P>
          <Item>Confirm whether we process your personal data</Item>
          <Item>Access that data</Item>
          <Item>Correct inaccuracies</Item>
          <Item>Delete personal data you provided or that we obtained about you</Item>
          <Item>Obtain a copy of personal data you previously provided to us, in a portable format if available</Item>
          <Item>Opt out of targeted advertising, the sale of personal data, or profiling that produces a legal or similarly significant effect</Item>
          <P>
            To make a request, email hello@adonaiinnovations.com. Please include the email or other identifier associated with your use of the App, if you have one. We will not require you to create a new account only to make a request.
          </P>
          <P>We will respond within 45 days after we receive your request. If we reasonably need more time, we may extend that period by up to 45 additional days and will tell you why.</P>
          <P>We will not discriminate against you for exercising these rights.</P>
          <P>
            Some businesses that qualify as small businesses under U.S. Small Business Administration rules are covered by only part of this Texas law. We still intend to honor the request process described here for personal data we actually hold.
          </P>
          <Sub>Appeals</Sub>
          <P>
            If we decline all or part of your request, we will tell you why. You may appeal by sending another email to hello@adonaiinnovations.com with the subject line &quot;Privacy Appeal,&quot; explaining why you disagree. We will review the appeal and respond in writing within 45 days. If we deny your appeal, we will tell you how you may contact the Texas Attorney General if you wish to submit a complaint.
          </P>
          <Sub>Sale of personal data</Sub>
          <P>We do not sell personal data, including sensitive personal data or biometric data. Because we do not sell that data, this policy does not include a sale notice.</P>

          <H>Related websites</H>
          <P>https://www.commonlife.ai is a public marketing site. When we reviewed it, it did not publish a privacy policy, terms of service, cookie notice, or accessibility statement.</P>
          <P>
            app.commonlife.ai is a web application that, when we reviewed it, offered login and sign-up, prayer-request submission, remote fonts from Google Fonts, and a backend provided by Supabase. The host set a session-affinity cookie.
          </P>
          <P>If you use those sites, their practices may differ from the mobile App. We recommend that this policy, or a companion policy, be expanded once those practices are confirmed.</P>

          <H>Changes</H>
          <P>
            If we change this policy, we will post the updated version at the URL below and update the effective date. The posted version is the current version. When the App links to this policy, that link should point to the posted page, not to the Website homepage.
          </P>

          <H>Contact</H>
          <p className="legal-p">
            Adonai Innovations, LLC
            <br />
            Email: hello@adonaiinnovations.com
          </p>
        </article>
      </div>
    </SiteFrame>
  );
}
