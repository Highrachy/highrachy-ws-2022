import React from 'react';
import Backend from '@/components/admin/Backend';
import { Accordion } from 'react-bootstrap';
import Link from 'next/link';
import CreateSignature from './create-signature';

const Internal = () => {
  return (
    <Backend>
      <h4 className="mb-3">Internal Resources</h4>
      <InternalAccordion />
    </Backend>
  );
};

const content = [
  {
    header: 'Onboarding Checklist',
    content: (
      <ul>
        <li>
          <a
            target="_blank"
            href="https://docs.google.com/document/d/1s9opfwXrN5dyL-F7-VqH4JxFp3bMGSqmvnZ5UujYLiU/edit?pli=1#heading=h.pdd8wt8ls9ve"
            rel="noopener noreferrer"
          >
            LAPTOP POLICY ACCEPTANCE FORM
          </a>
        </li>
      </ul>
    ),
  },
  {
    header: 'Managing your Highrachy Signature Line',
    content: (
      <ul>
        <li>
          <Link href="/admin/internal/create-signature">
            Creating a new Highrachy Signature Line
          </Link>
        </li>
        <li>
          <Link href="/admin/internal/create-signature" passHref>
            <a>
              Updating your Signature Line <em>(In Progress)</em>
            </a>
          </Link>
        </li>
        <li>
          <a
            target="_blank"
            href="https://docs.google.com/document/d/1s9opfwXrN5dyL-F7-VqH4JxFp3bMGSqmvnZ5UujYLiU/edit?pli=1#heading=h.pdd8wt8ls9ve"
            rel="noopener noreferrer"
          >
            The current version of our signature line
          </a>
        </li>
      </ul>
    ),
  },
];

const InternalAccordion = () => (
  <Accordion>
    {content.map(({ header, content }, index) => (
      <Accordion.Item key={index} eventKey={index} className="py-2">
        <Accordion.Header>{header}</Accordion.Header>
        <Accordion.Body>{content}</Accordion.Body>
      </Accordion.Item>
    ))}
  </Accordion>
);

export default Internal;
