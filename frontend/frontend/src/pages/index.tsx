import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import ModuleCard from '@site/src/components/ModuleCard'; // Import ModuleCard

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="hero__title">
            Physical AI & Humanoid Robotics
          </motion.h1>
          <motion.p variants={itemVariants} className="hero__subtitle">
            Explore the Convergence of AI and Robotics with ROS 2, Gazebo, Unity, NVIDIA Isaac & LLMs
          </motion.p>
          <div className={styles.buttons}>
            <motion.div variants={itemVariants}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/intro">
                Start Reading
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  const moduleCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const statCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };


  return (
    <Layout
      title={`Home - ${siteConfig.title}`}
      description="A Docusaurus-powered textbook on Physical AI & Humanoid Robotics.">
      <HomepageHeader />
      <main>
        <section className={styles.moduleCardsSection}>
          <div className="container">
            <Heading as="h2">Modules</Heading>
            <div className="row">
              <motion.div
                className="col col--6 margin-bottom--lg"
                variants={moduleCardVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
              >
                <ModuleCard
                  title="Module 1: ROS 2"
                  description="The Robotic Nervous System (ROS 2 Architecture & Core Concepts, Nodes, Topics, Services, URDF for Humanoid Robots)"
                  link="/docs/module-1/chapter-1"
                  delay={0}
                />
              </motion.div>
              <motion.div
                className="col col--6 margin-bottom--lg"
                variants={moduleCardVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
              >
                <ModuleCard
                  title="Module 2: Digital Twin"
                  description="Gazebo & Unity Simulation (Gazebo Physics, Unity High-Fidelity Rendering, Sensor Simulation)"
                  link="/docs/module-2/chapter-4"
                  delay={0.1}
                />
              </motion.div>
              <motion.div
                className="col col--6 margin-bottom--lg"
                variants={moduleCardVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
              >
                <ModuleCard
                  title="Module 3: AI-Robot Brain"
                  description="NVIDIA Isaac (Isaac Sim for Training, Isaac ROS for Perception, Nav2 for Bipedal Navigation)"
                  link="/docs/module-3/chapter-7"
                  delay={0.2}
                />
              </motion.div>
              <motion.div
                className="col col--6 margin-bottom--lg"
                variants={moduleCardVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
              >
                <ModuleCard
                  title="Module 4: VLA"
                  description="Vision-Language-Action (Whisper for Voice Commands, LLMs for Planning, Autonomous Humanoid Capstone)"
                  link="/docs/module-4/chapter-10"
                  delay={0.3}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className={styles.aboutSection}>
          <div className="container">
            <Heading as="h2">About the Course</Heading>
            {/* Placeholder for About Section Content */}
            <p>
              (This section will provide an overview of the course, hardware requirements,
              prerequisites, instructor info, GitHub repo link, and MIT License details.)
            </p>
          </div>
        </section>

        <section className={styles.quickStatsSection}>
          <div className="container">
            <Heading as="h2">Quick Stats</Heading>
            <div className="row">
              <motion.div
                className="col col--4"
                variants={statCardVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
              >
                <div className="card">
                  <div className="card__body">
                    <h3>Modules</h3>
                    <p>4</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="col col--4"
                variants={statCardVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="card">
                  <div className="card__body">
                    <h3>Chapters</h3>
                    <p>12</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="col col--4"
                variants={statCardVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true, amount: 0.8 }}
              >
                <div className="card">
                  <div className="card__body">
                    <h3>Practice</h3>
                    <p>Hands-on Exercises</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
