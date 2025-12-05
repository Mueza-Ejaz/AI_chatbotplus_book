---
sidebar_position: 1
---

# Chapter 1: ROS 2 Architecture & Core Concepts

## Learning Objectives

*   Understand the fundamental architecture of ROS 2.
*   Grasp core ROS 2 concepts like nodes, topics, and services.
*   Learn how to set up a basic ROS 2 workspace.

## Main Content

(Placeholder for 2000-3000 words of technical depth on ROS 2 architecture and core concepts. This section will cover the DDS layer, client libraries, and the overall communication mechanisms.)

## Code Examples

```cpp
// Placeholder for a simple ROS 2 publisher node in C++
#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);
  auto node = rclcpp::Node::make_shared("minimal_publisher");
  auto publisher = node->create_publisher<std_msgs::msg::String>("topic", 10);
  std_msgs::msg::String message;
  message.data = "Hello, ROS 2!";
  rclcpp::WallRate loop_rate(1.0); // 1 Hz
  while (rclcpp::ok()) {
    publisher->publish(message);
    rclcpp::spin_some(node);
    loop_rate.sleep();
  }
  rclcpp::shutdown();
  return 0;
}
```

## Diagrams/Figures

(Placeholder for interactive diagrams illustrating ROS 2 architecture components and communication flows.)

## Hands-on Exercises

1.  **Exercise 1.1**: Set up a new ROS 2 workspace and compile the provided publisher example.
2.  **Exercise 1.2**: Create a subscriber node to receive messages from the publisher.

## Key Takeaways

*   ROS 2 uses DDS for decentralized communication.
*   Nodes are executable processes, topics for asynchronous data streaming, and services for synchronous request/response.

## References & Further Reading

*   [ROS 2 Documentation](https://docs.ros.org/en/foxy/index.html)
*   [DDS Specification](https://www.omg.org/spec/DDS/)
