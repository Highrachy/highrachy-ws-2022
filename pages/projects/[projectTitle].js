import { FacebookIcon } from '@/components/common/Icons';
import { LinkedInIcon } from '@/components/common/Icons';
import { InstagramIcon } from '@/components/common/Icons';
import { TwitterIcon } from '@/components/common/Icons';
import Section from '@/components/common/Section';
import Button from '@/components/form/Button';
import Footer from '@/components/layout/Footer';
import { SectionHeader } from '@/components/layout/Header';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import projects from '@/data/projects';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const SingleProject = ({ project }) => {
  const breadcrumb = [
    { title: 'Projects', url: 'projects' },
    { title: project.title },
  ];

  return (
    <>
      <Navigation />
      <PageHeader
        title={project.title}
        breadcrumb={breadcrumb}
        bgImage="/assets/img/bg/projects.jpg"
      />
      <Project {...project} />
      <Footer />
    </>
  );
};

const Project = ({ content, image, title }) => (
  <Section>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <SectionHeader className="mb-4">{title}</SectionHeader>
          <Image
            src={image}
            alt={title}
            className="img-fluid"
            height="800"
            width="1200"
          />
          <p className="">{content}</p>
          <Button color="primary" className="mt-3 mb-6">
            More Details
          </Button>
          <ShareContent />
        </div>
      </div>
    </div>
  </Section>
);

const ShareContent = () => (
  <div className="share-content">
    <strong>Share:</strong>
    <ul className="list-inline icon-md">
      <li className="list-inline-item">
        <FacebookIcon />
      </li>
      <li className="list-inline-item">
        <TwitterIcon />
      </li>
      <li className="list-inline-item">
        <LinkedInIcon />
      </li>
      <li className="list-inline-item">
        <InstagramIcon />
      </li>
    </ul>
  </div>
);

export async function getStaticProps({ params }) {
  const projectList = Object.values(projects);
  const project = projectList.find((p) => p.title === params.projectTitle);
  return { props: { project } };
}

export async function getStaticPaths() {
  const projectLists = Object.values(projects);
  return {
    paths: projectLists.map((projectList) => {
      return {
        params: {
          projectTitle: projectList.title,
        },
      };
    }),
    fallback: false,
  };
}

export default SingleProject;