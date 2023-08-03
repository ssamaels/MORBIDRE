import styled from "styled-components";
import { useDarkMode } from "@/components/DarkModeContext";
import { ClientSideContext } from "../_app";
import { useContext } from "react";

export default function PrivacyPolicy() {
  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

  return (
    <>
      {isClient && (
        <>
          <StyledPolicy $darkMode={darkMode}>
            <h2>Privacy Policy</h2>
            <p>Effective Date: 10. August 2023</p>

            <p>
              Thank you for visiting Morbidre-Design&apos;s portfolio website.
              This Privacy Policy outlines how we handle and protect the
              information collected through this website. By accessing or using
              this website, you agree to the terms of this Privacy Policy.
            </p>

            <h3>1. Information Collection and Use:</h3>
            <p>
              Morbidre-Design collects and uses only the email addresses
              provided voluntarily by visitors who wish to contact us for our
              services. We do not collect any other personally identifiable
              information through this website. The sole purpose of collecting
              email addresses is to respond to inquiries and provide information
              related to our services.
            </p>

            <h3>2. Data Security:</h3>
            <p>
              We take data security seriously and implement reasonable and
              appropriate measures to protect the information provided to us. We
              use industry-standard security protocols and technology to prevent
              unauthorized access, maintain data accuracy, and ensure the
              appropriate use of information.
            </p>

            <h3>3. Use of Email Addresses:</h3>
            <p>
              The email addresses provided by visitors will only be used to
              respond to inquiries or requests for information about our
              services. We will not use the email addresses for any other
              purpose without obtaining explicit consent from the individual.
            </p>

            <h3>4. Disclosure of Information:</h3>
            <p>
              Morbidre-Design does not sell, rent, or lease any personal
              information collected through this website, including email
              addresses. We may disclose email addresses to third-party service
              providers who assist us in managing and responding to inquiries or
              to comply with legal requirements.
            </p>

            <h3>5. Third-Party Links:</h3>
            <p>
              Our website may contain links to third-party websites or services.
              This Privacy Policy only applies to the Morbidre-Design portfolio
              website. We are not responsible for the privacy practices or
              content of any linked websites. We recommend reviewing the privacy
              policies of these third-party websites before providing any
              personal information.
            </p>

            <h3>6. Children&apos;s Privacy:</h3>
            <p>
              Morbidre-Design&apos;s portfolio website is not intended for use
              by individuals under the age of 13. We do not knowingly collect
              personal information from children under 13. If you are a parent
              or guardian and believe that your child has provided us with their
              personal information, please contact us at the email address
              provided below. We will take steps to remove such information from
              our systems.
            </p>

            <h3>7. Changes to this Privacy Policy:</h3>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. Any such updates will be posted on this page,
              and the revised date will be indicated at the top of the policy.
            </p>

            <h3>8. Contact Information:</h3>
            <p>
              If you have any questions, concerns, or requests related to this
              Privacy Policy or the use of your personal information, please
              contact us at:
            </p>

            <p>andreabajceta96@gmail.com</p>

            <p>
              By using Morbidre-Design&apos;s portfolio website, you consent to
              the terms outlined in this Privacy Policy. Please review this
              policy periodically for any updates or changes.
            </p>
          </StyledPolicy>
        </>
      )}
    </>
  );
}

const StyledPolicy = styled.div`
  color: #000000;
  line-height: 2rem;
  margin: 2rem;

  ${(props) =>
    props.$darkMode &&
    `
      color: #ffffff;
    `}
`;
