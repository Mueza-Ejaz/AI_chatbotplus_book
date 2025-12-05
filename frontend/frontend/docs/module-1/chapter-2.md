---
sidebar_position: 2
---

# Chapter 2: Nodes, Topics, Services in ROS 2

## Learning Objectives

*   Deep dive into the concepts of ROS 2 nodes, topics, and services.
*   Understand the lifecycle management of ROS 2 nodes.
*   Learn to create and manage ROS 2 communication patterns.

## Main Content

(Placeholder for 2000-3000 words of technical depth on ROS 2 nodes, topics, and services, including detailed explanations of message types, quality of service settings, and client/server implementation.)

## Code Examples

```python
# Placeholder for a simple ROS 2 subscriber node in Python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):

    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info('I heard: "%s"' % msg.data)

def main(args=None):
    rclpy.init(args=args)
    minimal_subscriber = MinimalSubscriber()
    rclpy.spin(minimal_subscriber)
    minimal_subscriber.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Diagrams/Figures

(Placeholder for diagrams illustrating the data flow in ROS 2 topics and the request-response mechanism in ROS 2 services.)

## Hands-on Exercises

1.  **Exercise 2.1**: Implement a ROS 2 service client and server pair.
2.  **Exercise 2.2**: Experiment with different Quality of Service (QoS) settings for ROS 2 topics.

## Key Takeaways

*   ROS 2 communication is built upon nodes interacting via topics and services.
*   QoS settings are crucial for reliable and efficient data exchange.

## References & Further Reading

*   [ROS 2 Nodes documentation](https://docs.ros.org/en/foxy/Concepts/About-Nodes.html)
*   [ROS 2 Topics documentation](https://docs.ros.org/en/foxy/Concepts/About-Topics.html)
*   [ROS 2 Services documentation](https://docs.ros.org/en/foxy/Concepts/About-Services.html)
