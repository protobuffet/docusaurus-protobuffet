import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Documentation Generators',
    description: (
      <>
        Use our CLI to parse your Protobuf files and build
        deep linked markdown documentation. Sidebar and search support 
        to improve discovery within your docs.
      </>
    ),
  },
  {
    title: 'Component Library',
    description: (
      <>
        React components for documenting Protobuf file descriptors.
        Component library includes message, service, and enum views.
      </>
    ),
  },
  {
    title: 'Modern Technologies',
    description: (
      <>
        Built as an extension of the Docusaurus platform, Protobuffet
        follows industry standards and best practices. Emphasis on developer-driven,
        extensible documentation.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);

  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Documentation Toolset for Your Protobuf File Workspace">
      <header className={clsx('hero', styles.heroBanner)}>
        <div className={clsx('container', styles.heroBannerInner)}>
          <h1 className={clsx('hero__title', styles.heroTitleTextHtml)}>
            Toolset for <b>building</b> your <b>protobuf</b> documentation
          </h1>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--primary',
                styles.getStarted,
              )}
              to='https://protobuffet.com/docs/what/overview'>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
