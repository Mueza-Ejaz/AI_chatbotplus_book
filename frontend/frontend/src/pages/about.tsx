import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function About(): React.ReactNode {
  return (
    <Layout
      title="About"
      description="Learn about the Physical AI & Humanoid Robotics Textbook.">
      <main className="container margin-vert--lg">
        <Heading as="h1" className="hero__title">
          About the Physical AI & Humanoid Robotics Textbook
        </Heading>

        <section>
          <h2>Course Overview</h2>
          <p>
            This textbook provides a comprehensive introduction to the exciting field of Physical AI
            and Humanoid Robotics. It covers fundamental concepts in ROS 2, advanced simulation
            techniques using Gazebo and Unity, and cutting-edge AI integration with NVIDIA Isaac platform,
            culminating in Vision-Language-Action (VLA) models for autonomous humanoids.
            Designed for students and professionals, this book combines theoretical knowledge with
            practical hands-on exercises to equip readers with the skills needed to develop
            next-generation robotic systems.
          </p>
        </section>

        <section>
          <h2>Hardware Requirements</h2>
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Minimum</th>
                <th>Recommended</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CPU</td>
                <td>Intel Core i5 (8th Gen) / AMD Ryzen 5 2000 Series</td>
                <td>Intel Core i7 (10th Gen) / AMD Ryzen 7 3000 Series or newer</td>
              </tr>
              <tr>
                <td>GPU</td>
                <td>NVIDIA GeForce GTX 1060 (6GB)</td>
                <td>NVIDIA GeForce RTX 3060 (12GB) or newer (for Isaac Sim/ROS)</td>
              </tr>
              <tr>
                <td>RAM</td>
                <td>8 GB</td>
                <td>16 GB or more</td>
              </tr>
              <tr>
                <td>Storage</td>
                <td>256 GB SSD</td>
                <td>512 GB SSD or more</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>Prerequisites</h2>
          <ul>
            <li>**Basic Python Programming**: Familiarity with Python syntax, data structures, and object-oriented programming.</li>
            <li>**Linux Command Line**: Comfort with basic Linux commands for navigation and file operations.</li>
            <li>**Fundamentals of Robotics**: Basic understanding of robot kinematics, sensors, and actuators is helpful but not strictly required.</li>
            <li>**Linear Algebra**: A foundational understanding of vectors, matrices, and transformations.</li>
          </ul>
        </section>

        <section>
          <h2>Instructor Information</h2>
          <p>
            **Dr. Alex Robotics** is a leading researcher in humanoid robotics and artificial intelligence.
            With over 15 years of experience in the field, Dr. Robotics specializes in developing
            autonomous systems and teaches at a prominent robotics institute. He is passionate about
            making complex robotics concepts accessible to a wider audience.
          </p>
        </section>

        <section>
          <h2>GitHub Repository</h2>
          <p>
            You can find the source code for this textbook and related projects on GitHub: <a href="https://github.com/gemini-cli/ai-robotics-textbook" target="_blank" rel="noopener noreferrer">gemini-cli/ai-robotics-textbook</a>
          </p>
        </section>

        <section>
          <h2>License</h2>
          <p>
            This textbook is released under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT License</a>.
          </p>
        </section>
      </main>
    </Layout>
  );
}
