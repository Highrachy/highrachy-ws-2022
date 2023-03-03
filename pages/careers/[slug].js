import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import Upload from '@/components/forms/Upload';
import Footer from '@/components/layout/Footer';
import { SectionHeader } from '@/components/layout/Header';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { about } from '@/data/navigation';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { JobInfo } from '.';
import { toast } from 'react-toastify';
import FormikButton from '@/components/forms/FormikButton';
import { jobApplicationSchema } from '@/components/forms/schemas/page-schema';

const SingleCareer = ({ job }) => {
  const router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const {
    available,
    title,
    minimumRequirements,
    desiredSkills,
    softwareProficiency,
    note,
  } = job;
  const breadcrumb = [{ title: 'Careers', url: 'careers' }, { title: title }];
  return (
    <>
      <NextSeo
        title={`Careers | ${title}`}
        description="Highrachy is a 21st century project-oriented organization setup
        primarily to meet your real estate needs."
      />
      <Navigation parentPage={about.url} />
      <PageHeader
        title={`Career - ${title}`}
        bgImage="/assets/img/bg/careers.jpg"
        breadcrumb={breadcrumb}
      />

      <Section className="careers-page">
        {!available && <JobNotAvailableAlert />}
        <Intro job={job} />
        <WhoWeAre />
        <RichTextSection title="Job Summary" text={minimumRequirements} />
        <RichTextSection title="Qualifications" text={desiredSkills} />
        <RichTextSection
          title="Skills and Competencies"
          text={softwareProficiency}
        />
        {note && <RichTextSection title="Note" text={note} />}
        {!available && <JobNotAvailableAlert />}
      </Section>

      {available && <ApplicationForm job={job} />}
      <Footer hideConsultation />
    </>
  );
};

const JobNotAvailableAlert = () => (
  <PaddedSection>
    <div className="alert alert-info">This job is currently not available</div>
  </PaddedSection>
);
const Intro = ({ job: { title, remote, contract, location } }) => (
  <PaddedSection>
    <Link passHref href={'#apply-now'}>
      <a className="float-end btn btn-primary text-uppercase">Apply Now</a>
    </Link>
    <h3 className="mb-0">{title}</h3>
    <p className="mb-1">
      at Highrachy (
      <Link href="/careers" passHref>
        <a>View all Jobs</a>
      </Link>
      )
    </p>
    <JobInfo location={location} remote={remote} contract={contract} />
  </PaddedSection>
);

const WhoWeAre = () => (
  <PaddedSection title="Who we are">
    <p>
      At Highrachy, we are passionate about delivering value-driven real estate
      solutions that make a difference. As a leading 21st-century
      project-oriented organization, deliver top-notch processes and solutions
      that ensure our clients&apos; real estate goals are met consistently.
    </p>
    <p>
      Our vision is to be globally recognised as the access point for real
      opportunities within the African Real Estate industry. Our mission is to
      provide convenient access to value driven real estate opportunities with
      keen focus on quality, comfort and value for money.
    </p>
    <p>
      We are seeking brilliant and passionate individuals who share our values
      and want to make a difference in the world. Join us and be a part of a
      team that is committed to excellence, innovation, and making a positive
      impact in the world of real estate.
    </p>
  </PaddedSection>
);

export const RichTextSection = ({ title, text }) => (
  <PaddedSection title={title}>
    <ReactMarkdown>{text}</ReactMarkdown>
  </PaddedSection>
);

const PaddedSection = ({ children, title }) => (
  <section className="pb-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-9 col-sm-10">
          {title && <SectionHeader small>{title}</SectionHeader>}
          {children}
        </div>
      </div>
    </div>
  </section>
);

const ApplicationForm = ({ job }) => {
  const handleSubmit = async (values, actions) => {
    const fetchOptions = {
      /**
       * The default method for a request with fetch is GET,
       * so we must tell it to use the POST HTTP method.
       */
      method: 'POST',
      /**
       * These headers will be added to the request and tell
       * the API that the request body is JSON and that we can
       * accept JSON responses.
       */
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      /**
       * The body of our POST request is the JSON string that
       * we created above.
       */
      body: JSON.stringify({ data: { ...values, job: job.id } }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/applicants`,
      fetchOptions
    );

    if (!response.ok) {
      if (response.status === 403) {
        toast.info('You have already submitted an application for this job');
        return;
      }

      const errorMessage = await response.text();

      toast.error(errorMessage);
    } else {
      toast.success('Information sent successfully');
    }
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <div id="apply-now">
      <Section title={`Apply for ${job.title}`} centered altBg>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10 col-sm-8 col-lg-7 col-xl-6">
              <FormikForm
                schema={jobApplicationSchema}
                handleSubmit={handleSubmit}
                name={`${job.slug}-form`}
                showFormikState
                showAllFormikState
                persistForm
              >
                <Input floatingLabel label="Full Name" name="fullName" />
                <Input
                  floatingLabel
                  label="Email"
                  name="email"
                  placeholder="Valid Email"
                />
                <Input floatingLabel label="Phone Number" name="phoneNumber" />
                <Upload
                  changeText="Update Resume"
                  customFormats={['pdf']}
                  defaultImage="/assets/img/placeholder/document.png"
                  imgOptions={{
                    className: 'mb-3 icon-md',
                    width: 200,
                    height: 200,
                  }}
                  name="resume"
                  uploadText={`Upload Resume`}
                  folder={`cv/${job?.slug}`}
                />
                <FormikButton color="primary">Submit Application</FormikButton>
              </FormikForm>
              <p className="small text-muted mb-0 font-italic">
                All applications will remain private
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/jobs?filters[slug][$eq]=${params.slug}`
  );

  const { data } = await res.json();

  return {
    props: { job: { id: data[0].id, ...data[0]['attributes'] } },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
  const { data: jobs } = await res.json();
  return {
    paths: jobs.map((job) => {
      return {
        params: {
          slug: job['attributes']['slug'],
        },
      };
    }),
    fallback: true,
  };
}

export default SingleCareer;
