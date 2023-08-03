import styled from "styled-components";
import { useDarkMode } from "@/components/DarkModeContext";
import { ClientSideContext } from "../_app";
import React, { useContext } from "react";

export default function TermsAndConditions() {
  const { darkMode, setDarkMode } = useDarkMode();
  const isClient = useContext(ClientSideContext);

  return (
    <>
      {isClient && (
        <>
          <StyledTerms $darkMode={darkMode}>
            <h1>Terms and Conditions</h1>
            <p>
              Welcome to Morbidre-Design&apos;s portfolio website. By accessing
              and using this website, you agree to comply with and be bound by
              the following terms and conditions:
            </p>
            <h2>1. Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text,
              graphics, logos, images, audio clips, and software, is the
              property of Morbidre-Design and is protected by intellectual
              property laws. You may not reproduce, distribute, or use any
              content from this website without our prior written consent.
            </p>
            <h2>2. Disclaimer</h2>
            <p>
              The information provided on this website is for general
              informational purposes only. While we strive to keep the
              information up to date and accurate, we make no warranties or
              representations of any kind, express or implied, about the
              completeness, accuracy, reliability, suitability, or availability
              with respect to the website or the information, products,
              services, or related graphics contained on the website. Any
              reliance you place on such information is at your own risk.
            </p>
            <h2>3. Limitation of Liability</h2>
            <p>
              Morbidre-Design shall not be liable for any direct, indirect,
              incidental, consequential, or exemplary damages, including but not
              limited to damages for loss of profits, data, or other intangible
              losses, arising out of or in connection with the use or
              performance of this website or the information it provides.
            </p>
            <h2>4. Links to Third-Party Websites</h2>
            <p>
              This website may contain links to third-party websites or services
              that are not owned or controlled by Morbidre-Design. We have no
              control over and assume no responsibility for the content, privacy
              policies, or practices of any third-party websites. You
              acknowledge and agree that Morbidre-Design shall not be
              responsible or liable, directly or indirectly, for any damage or
              loss caused or alleged to be caused by or in connection with the
              use of or reliance on any such content, goods, or services
              available on or through any third-party websites.
            </p>
            <h2>5. Governing Law</h2>
            <p>
              These terms and conditions shall be governed by and construed in
              accordance with the laws of [your country or state], without
              regard to its conflict of laws principles.
            </p>
            <h2>6. Changes to the Terms and Conditions</h2>
            <p>
              Morbidre-Design may update these terms and conditions at any time
              without prior notice. By continuing to access or use this website
              after any modifications, you agree to be bound by the revised
              terms and conditions.
            </p>
          </StyledTerms>
        </>
      )}
    </>
  );
}

const StyledTerms = styled.div`
  color: #000000;
  line-height: 3rem;
  margin: 2rem;

  ${(props) =>
    props.$darkMode &&
    `
      color: #ffffff;
    `}
`;
