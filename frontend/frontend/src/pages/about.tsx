import React from 'react';
import Layout from '@theme/Layout';

export default function About() {
  return (
    <Layout
      title="About"
      description="Learn about the Physical AI & Humanoid Robotics Textbook">
      <header className="hero hero--primary">
        <div className="container">
          <h1 className="hero__title">About This Textbook</h1>
        </div>
      </header>
      <main>
        <section className="container padding-vert--xl">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <h2>Overview of the Course</h2>
              <p>
                The "Physical AI & Humanoid Robotics" course delves into the
                fascinating intersection of artificial intelligence and robotics,
                focusing specifically on the challenges and opportunities
                presented by embodied AI in humanoid forms. This textbook serves
                as a comprehensive guide for students and researchers looking to
                understand the theoretical foundations, practical applications,
                and ethical considerations of creating intelligent, autonomous
                robots that can interact with the physical world.
              </p>
              <p>
                We explore advanced topics such as perception, cognition,
                manipulation, locomotion, and human-robot interaction, drawing
                from cutting-edge research in machine learning, control theory,
                and cognitive science. The goal is to equip readers with the
                knowledge and skills necessary to design, develop, and deploy
                next-generation humanoid robots.
              </p>

              <h2>Course Objectives</h2>
              <ul>
                <li>Understand the fundamental principles of AI applied to physical robots.</li>
                <li>Analyze and design robotic systems for perception, control, and manipulation.</li>
                <li>Develop algorithms for autonomous navigation and interaction in complex environments.</li>
                <li>Evaluate ethical implications and societal impact of humanoid robotics.</li>
                <li>Gain practical experience with robotic simulation and hardware platforms.</li>
              </ul>

              <h2>Textbook Structure</h2>
              <p>
                This textbook is organized into <strong>4 modules</strong>, each containing <strong>3 chapters</strong>,
                totaling <strong>12 chapters</strong> designed to progressively build knowledge
                from foundational concepts to advanced applications.
              </p>
              <h3>Modules:</h3>
              <ul>
                <li><strong>Module 1: Foundations of Physical AI</strong> - Covers core AI concepts, robotics fundamentals, and sensory perception.</li>
                <li><strong>Module 2: Robotic Cognition & Control</strong> - Focuses on decision-making, learning, and advanced control strategies for humanoid robots.</li>
                <li><strong>Module 3: Human-Robot Interaction & Collaboration</strong> - Explores natural language processing, gesture recognition, and safe human-robot collaboration.</li>
                <li><strong>Module 4: Advanced Applications & Future Trends</strong> - Discusses cutting-edge research, ethical considerations, and future directions in humanoid robotics.</li>
              </ul>

              <h2>About the Author/Contributors</h2>
              <p>
                This textbook is a collaborative effort by leading experts in the fields of
                Artificial Intelligence, Robotics, and Cognitive Science. Our team comprises
                academics and industry professionals dedicated to advancing the understanding
                and application of physical AI and humanoid robotics. Each contributor brings
                a wealth of experience and specialized knowledge, ensuring a comprehensive
                and authoritative resource for students worldwide.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}