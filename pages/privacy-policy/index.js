import Section, { PaddedSection } from '@/components/common/Section';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { about } from '@/data/navigation';
import { NextSeo } from 'next-seo';
import React from 'react';

const breadcrumb = [{ title: 'Privacy Policy' }];

const PrivacyPolicy = () => {
  return (
    <>
      <NextSeo
        title="Privacy Policy"
        description="Highrachy is a 21st century project-oriented organization setup
        primarily to meet your real estate needs."
        canonical="https://www.highrachy.com/privacy-policy/data-protection-statement"
      />
      <Navigation parentPage={about.url} />
      <PageHeader
        breadcrumb={breadcrumb}
        title="Privacy Policy"
        bgImage="/assets/img/bg/about-us.jpg"
      />

      <Section>
        <PaddedSection title="Privacy Policy">
          <div className="mt-3">
            <strong>Last Updated: April 12, 2023</strong>
          </div>
          <div className="mt-3">
            This Privacy Policy governs how Highrachy Investment and Technology
            (“the Company,” “we,” “us,” or “our”) collects, uses, and discloses
            the personal data of tenants (“you” or “your”) when you use our
            services. By using our services, you agree to the collection and use
            of your personal data in accordance with this Privacy Policy.
          </div>

          <section>
            <h3 className="mt-6">Interpretation and Definitions</h3>
            <h5 className="mt-4">Interpretation</h5>
            <p className="mt-3">
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </p>
            <h5 className="mt-4">Definitions</h5>
            <p className="mt-3">
              For the purposes of this Privacy Policy:
              <ul>
                <li>
                  <strong>Account</strong> means a unique account created for
                  You to access our Service or parts of our Service.
                </li>
                <li>
                  <strong>Affiliate</strong> means an entity that controls, is
                  controlled by or is under common control with a party, where
                  &quot;control&quot; means ownership of 50% or more of the
                  shares, equity interest or other securities entitled to vote
                  for election of directors or other managing authority.
                </li>
                <li>
                  <strong>Company</strong> (referred to as either &quot;the
                  Company&quot;, &quot;We&quot;, &quot;Us&quot; or
                  &quot;Our&quot; in this Agreement) refers to Highrachy
                  Investment and Technology, 5th Floor, Ibukun House, No. 70
                  Adetokunbo Ademola Street, Victoria Island, Lagos
                </li>
                <li>
                  <strong>Cookies</strong> are small files that are placed on
                  Your computer, mobile device or any other device by a website,
                  containing the details of Your browsing history on that
                  website among its many uses.
                </li>
                <li>
                  <strong>Country</strong> refers to: Nigeria
                </li>
                <li>
                  <strong>Device</strong> means any device that can access the
                  Service such as a computer, a cellphone or a digital tablet.
                </li>
                <li>
                  <strong>Personal Data</strong> is any information that relates
                  to an identified or identifiable individual.
                </li>
                <li>
                  <strong>Service</strong> refers to the Website.
                </li>
                <li>
                  <strong>Service Provider</strong> means any natural or legal
                  person who processes the data on behalf of the Company. It
                  refers to third-party companies or individuals employed by the
                  Company to facilitate the Service, to provide the Service on
                  behalf of the Company, to perform services related to the
                  Service or to assist the Company in analyzing how the Service
                  is used.
                </li>
                <li>
                  <strong>Third-party Social Media</strong> Service refers to
                  any website or any social network website through which a User
                  can log in or create an account to use the Service.
                </li>
                <li>
                  <strong>Usage Data</strong> refers to data collected
                  automatically, either generated by the use of the Service or
                  from the Service infrastructure itself (for example, the
                  duration of a page visit).
                </li>
                <li>
                  <strong>Website</strong> refers to Highrachy Investment and
                  Technology, accessible from{' '}
                  <a href="https://highrachy.com/">https://highrachy.com</a>
                </li>
                <li>
                  <strong>You</strong> means the individual accessing or using
                  the Service, or the company, or other legal entity on behalf
                  of which such individual is accessing or using the Service, as
                  applicable.
                </li>
              </ul>
            </p>
          </section>

          <section>
            <h3 className="mt-6">Data Collection and Usage</h3>
            <h5 className="mt-4">Personal Data</h5>
            <p className="mt-3">
              While using our services, we may request you to provide us with
              certain personally identifiable information that can be used to
              contact or identify you. This personal data may include, but is
              not limited to:
              <ul>
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, state, province, zip/postal code, city</li>
              </ul>
            </p>

            <h5 className="mt-4">Usage Data</h5>
            <p className="mt-3">
              Usage data is collected automatically when you use our services.
              This usage data may include information such as your device’s
              internet protocol (IP) address, browser type, browser version,
              pages of our service that you visit, time and date of your visit,
              time spent on those pages, unique device identifiers, and other
              diagnostic data.
            </p>
            <p className="mt-3">
              When you access our services through a mobile device, we may
              collect certain information automatically, including but not
              limited to the type of mobile device you use, your mobile device’s
              unique ID, the IP address of your mobile device, your mobile
              operating system, the type of mobile internet browser you use,
              unique device identifiers, and other diagnostic data.
            </p>
            <p className="mt-3">
              We may also collect information that your browser sends whenever
              you visit our service or when you access our service through a
              mobile device.
            </p>

            <h5 className="mt-4">Cookies and Tracking Technologies</h5>
            <p className="mt-3">
              We use cookies and similar tracking technologies to track the
              activity on our service and store certain information. We use
              beacons, tags, and scripts to collect and track information and to
              improve and analyze our service. The technologies we use may
              include:
              <ul>
                <li>
                  <strong>Cookies or browser cookies:</strong> A cookie is a
                  small file placed on your device. You can instruct your
                  browser to refuse all cookies or to indicate when a cookie is
                  being sent. However, if you do not accept cookies, you may not
                  be able to use some parts of our service. Unless you have
                  adjusted your browser setting so that it will refuse cookies,
                  our service may use cookies.
                </li>
                <li>
                  <strong>Web beacons: </strong>Certain sections of our service
                  and our emails may contain small electronic files known as web
                  beacons (also referred to as clear gifs, pixel tags, and
                  single-pixel gifs) that permit the Company, for example, to
                  count users who have visited those pages or opened an email
                  and for other related website statistics (for example,
                  recording the popularity of a certain section and verifying
                  system and server integrity).
                </li>
              </ul>
            </p>

            <h5 className="mt-4">Third-Party Social Media Services</h5>
            <p className="mt-3">
              We allow you to create an account and log in to use our services
              through the following third-party social media services:
              <ul>
                <li>Google</li>
                <li>Facebook</li>
                <li>LinkedIn</li>
                <li>Twitter</li>
              </ul>
            </p>

            <p className="mt-3">
              If you decide to register through or otherwise grant us access to
              a third-party social media service, we may collect personal data
              that is already associated with your third-party social media
              service’s account, such as your name, your email address, your
              activities, or your contact list associated with that account.
            </p>
            <p className="mt-3">
              You may also have the option of sharing additional information
              with us through your third-party social media service’s account.
              If you choose to provide such information and personal data,
              during registration or otherwise, you are giving us permission to
              use, share, and store it in a manner consistent with this Privacy
              Policy.
            </p>

            <h5 className="mt-4">Data Protection</h5>
            <p className="mt-3">
              We use appropriate technical and organizational measures to
              protect the personal data we collect and process from loss,
              misuse, unauthorized access, disclosure, alteration, and
              destruction.
            </p>

            <h5 className="mt-4">Data Retention</h5>
            <p className="mt-3">
              We will retain Your Personal Data only for as long as is necessary
              for the purposes set out in this Privacy Policy. We will retain
              and use Your Personal Data to the extent necessary to comply with
              our legal obligations (for example, if we are required to retain
              your data to comply with applicable laws), resolve disputes, and
              enforce our legal agreements and policies.
            </p>

            <p className="mt-3">
              We will also retain Usage Data for internal analysis purposes.
              Usage Data is generally retained for a shorter period of time,
              except when this data is used to strengthen the security or to
              improve the functionality of our Service, or we are legally
              obligated to retain this data for longer periods.
            </p>

            <h5 className="mt-4">Transfer of Your Personal Data</h5>
            <p className="mt-3">
              Your information, including Personal Data, may be transferred to
              and maintained on computers located outside of Your state,
              province, country, or other governmental jurisdiction where the
              data protection laws may differ from those of Your jurisdiction.
            </p>

            <p className="mt-3">
              If You are located outside Nigeria and choose to provide
              information to us, please note that we transfer the data,
              including Personal Data, to Nigeria and process it there.
            </p>
            <p className="mt-3">
              Your consent to this Privacy Policy followed by Your submission of
              such information represents Your agreement to that transfer.
            </p>
            <p className="mt-3">
              The Company will take all steps reasonably necessary to ensure
              that Your data is treated securely and in accordance with this
              Privacy Policy and no transfer of Your Personal Data will take
              place to an organization or a country unless there are adequate
              controls in place including the security of Your data and other
              personal information.
            </p>
          </section>

          <section>
            <h3 className="mt-6">Disclosure of Your Personal Data</h3>
            <h5 className="mt-4">Business Transactions</h5>
            <p className="mt-3">
              If the Company is involved in a merger, acquisition, or asset
              sale, Your Personal Data may be transferred. We will provide
              notice before Your Personal Data is transferred and becomes
              subject to a different Privacy Policy.
            </p>
            <h5 className="mt-4">Law enforcement</h5>
            <p className="mt-3">
              Under certain circumstances, the Company may be required to
              disclose Your Personal Data if required to do so by law or in
              response to valid requests by public authorities (e.g. a court or
              a government agency).
            </p>
            <h5 className="mt-4">Other legal requirements</h5>
            <p className="mt-3">
              The Company may disclose Your Personal Data in the good faith
              belief that such action is necessary to:
              <ul>
                <li>Comply with a legal obligation</li>
                <li>
                  Protect and defend the rights or property of the Company
                </li>
                <li>
                  Prevent or investigate possible wrongdoing in connection with
                  the Service
                </li>
                <li>
                  Protect the personal safety of Users of the Service or the
                  public
                </li>
                <li>Protect against legal liability</li>
              </ul>
            </p>
            <h5 className="mt-5">Security of Your Personal Data</h5>
            <p className="mt-3">
              The security of Your Personal Data is important to Us, but
              remember that no method of transmission over the Internet, or
              method of electronic storage is 100% secure. While We strive to
              use commercially acceptable means to protect Your Personal Data,
              We cannot guarantee its absolute security.
            </p>
            <h5 className="mt-5">Links to Other Websites</h5>
            <p className="mt-3">
              Our Service may contain links to other websites that are not
              operated by Us. If You click on a third-party link, You will be
              directed to that third party&apos;s site. We strongly advise You
              to review the Privacy Policy of every site You visit.
            </p>
            <p className="mt-3">
              We have no control over and assume no responsibility for the
              content, privacy policies or practices of any third-party sites or
              services.
            </p>
            <h5 className="mt-5">Changes to this Privacy Policy</h5>
            <p className="mt-3">
              We may update Our Privacy Policy from time to time. We will notify
              You of any changes by posting the new Privacy Policy on this page.
            </p>
            <p className="mt-3">
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
            <h5 className="mt-5">Contact Us</h5>
            Contact Us By visiting this page on our website:
            https://www.highrachy.com/contact-us
            <p className="mt-3">
              If you have any questions about this Privacy Policy, You can
              contact us:
              <ul>
                <li>
                  By email:{' '}
                  <a href="mailto:info@highrachy.com">info@highrachy.com</a>
                </li>
                <li>
                  By visiting this page on our website:{' '}
                  <a href="https://www.highrachy.com/contact-us">
                    https://www.highrachy.com/contact-us
                  </a>
                </li>
              </ul>
            </p>
          </section>
        </PaddedSection>
      </Section>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
