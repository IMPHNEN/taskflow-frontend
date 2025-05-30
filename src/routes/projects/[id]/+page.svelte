<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import Sortable from "sortablejs";
    import { format } from "date-fns";

    import Item from "$lib/components/Project/Kanban/Item.svelte";
    import Modal from "$lib/components/Project/Kanban/Modal.svelte";
    import Market from "$lib/components/Project/Market.svelte";
    import Prd from "$lib/components/Project/Prd.svelte";

    import {
        generateProjectScope,
        loadProject,
        setupRepository,
        validateMarketFit,
    } from "$lib/actions";
    import type { ProjectDetail } from "$lib/types";
    import { projectStore } from "$lib/stores";
    import Brd from "$lib/components/Project/Brd.svelte";

    //     const markdown = `
    // # Market Validation Report: Project Management Tools

    // _Date: May 17, 2025_

    // ---

    // ## Executive Summary

    // This report validates the market opportunity for a new project management (PM) tool by analyzing competitors, identifying unique selling points (USPs), projecting market growth, and estimating revenue streams and initial costs.

    // **Key Findings:**

    // - Current leading competitors include ClickUp, Asana, Trello, Jira, and Monday.com, with broad features but notable gaps in advanced analytics, niche industry customization, and AI integration.
    // - Market trends show growing demand for remote collaboration tools, AI enhancements, and customizable automation.
    // - Our proposed PM tool should emphasize AI-driven personalization, advanced analytics, and niche industry focus supported by flexible, usage-based pricing.
    // - Market size is expanding steadily, with an expected CAGR of ~15% over the next 5 years.
    // - Multiple revenue streams are viable, including subscriptions, enterprise licensing, and marketplace fees.
    // - Initial MVP development requires a moderately sized team and 3-4 months, with estimated costs roughly $60k-$80k.

    // **Recommendations:**

    // - Differentiate by embedding advanced AI and analytics tools alongside deep niche-specific customizations.
    // - Adopt flexible, usage-based pricing to appeal to startups and SMBs.
    // - Focus marketing on enhanced remote collaboration and automation to leverage market trends.

    // ---

    // ## 1. Competitor Analysis

    // ### Overview of Top Competitors

    // | Competitor     | Key Features                                                                                                                      | Pricing Plans (per user/month)                           | Strengths                                                | Weaknesses                                         |
    // | -------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------- |
    // | **ClickUp**    | Project management, task tracking, time tracking, team collaboration, reports, extensive integrations, automation & customization | Free, Starter $5, Business $9, Enterprise custom         | Wide feature set; free tier; scalable; strong automation | Pricey for small teams; learning curve; complexity |
    // | **Asana**      | Task & project tracking, timelines, dashboards, automation, collaboration tools                                                   | Free, Premium $10.99, Business $24.99, Enterprise custom | Strong collaboration focus; clean UI                     | Limited advanced analytics; pricey tiers           |
    // | **Trello**     | Kanban boards, checklists, labels, power-ups, collaboration                                                                       | Free, Business $12.50, Enterprise custom                 | Intuitive visual management; easy to use                 | Limited in-depth reporting; lacks niche features   |
    // | **Jira**       | Agile project management, customizable workflows, reporting                                                                       | Free, Standard $7.75, Premium $15.25, Enterprise custom  | Robust agile tools; customizable; strong reporting       | Complex UI; steep learning curve                   |
    // | **Monday.com** | Project tracking, automation, dashboards, integrations, collaboration                                                             | Basic $8, Standard $10, Pro $16, Enterprise custom       | Flexible; good for all team sizes; visual tools          | Expensive; limited free plan                       |

    // ### Competitor Comparison Table

    // | Feature                      | ClickUp | Asana   | Trello    | Jira     | Monday.com |
    // | ---------------------------- | ------- | ------- | --------- | -------- | ---------- |
    // | Task Management              | ✔       | ✔       | ✔         | ✔        | ✔          |
    // | Time Tracking                | ✔       | Limited | No        | Limited  | ✔          |
    // | Advanced Analytics           | Basic   | Limited | No        | Advanced | Basic      |
    // | Automation                   | ✔       | ✔       | Power-ups | ✔        | ✔          |
    // | AI Integration               | No      | No      | No        | No       | No         |
    // | Niche Industry Customization | Limited | No      | No        | Custom   | Limited    |
    // | Collaboration Tools          | ✔       | ✔       | ✔         | ✔        | ✔          |
    // | Pricing Flexibility          | Tiered  | Tiered  | Tiered    | Tiered   | Tiered     |
    // | Free Plan Availability       | Yes     | Yes     | Yes       | Yes      | Limited    |

    // ---

    // ### Competitor Mindshare Visualization

    // \`\`\`mermaid
    // pie
    //     title Competitor Mindshare
    //     "ClickUp": 29
    //     "Asana": 24
    //     "Trello": 18
    //     "Jira": 16
    //     "Monday.com": 13
    // \`\`\`

    // ---

    // ## 2. Recommended Unique Selling Points (USPs)

    // Based on market gaps and competitor limitations, we recommend the following USPs:

    // - **Niche Industry Customization:** Tailored workflows and templates designed specifically for industries like healthcare, construction, and education.
    // - **Enhanced User Analytics:** AI-driven dashboards delivering deep insights on team productivity, project risks, and resource optimization.
    // - **AI-Driven Personalization:** Intelligent task prioritization, automated scheduling, and predictive project outcome analysis.
    // - **Flexible Pricing Models:** Usage-based pricing allowing startups and smaller teams to scale cost-effectively.
    // - **Integrated Remote Collaboration:** Advanced real-time communication tools embedded within the platform to support hybrid/remote teams.

    // ---

    // ### USP Relationships Visualization

    // \`\`\`mermaid
    // graph LR
    //     A[Niche Industry Customization] --> B[Increased Adoption]
    //     C[Enhanced User Analytics] --> D[Improved User Experience]
    //     E[AI-Driven Personalization] --> F[Enhanced User Engagement]
    //     G[Flexible Pricing Models] --> H[Broader Market Reach]
    // \`\`\`

    // ---

    // ## 3. Future Market Projection

    // Industry research indicates a strong growth trajectory driven by digital transformation and remote work demand.

    // | Year | Estimated Market Size (Billion USD) |
    // | ---- | ----------------------------------- |
    // | 2025 | 2.5                                 |
    // | 2026 | 2.9                                 |
    // | 2027 | 3.3                                 |
    // | 2028 | 3.8                                 |
    // | 2029 | 4.4                                 |
    // | 2030 | 5.0                                 |

    // ---

    // ### Market Size Projection Chart

    // \`\`\`mermaid
    // xychart-beta
    //     title "Market Size Projection"
    //     x-axis "Year" [2025, 2026, 2027, 2028, 2029, 2030]
    //     y-axis "Market Size (Billion USD)" 0 --> 5.5
    //     line [2.5, 2.875, 3.3, 3.8, 4.4, 5.0]
    // \`\`\`

    // ---

    // ## 4. Revenue Streams and Potential Earnings

    // ### Potential Revenue Streams

    // - **Subscriptions:** Monthly/Annual user subscriptions with tiered or usage-based pricing.
    // - **Marketplace Fees:** Commissions on third-party app/extension sales within our platform.
    // - **Enterprise Licensing:** Custom contracts for large organizations requiring advanced features and support.
    // - **Professional Services:** Consulting, onboarding, and training services.
    // - **Advertisements:** Limited, contextual promotions for complementary tools.

    // ### Estimated Revenue Distribution (Year 1–3)

    // \`\`\`mermaid
    // pie
    // title Revenue Streams
    // "Subscriptions": 50
    // "Enterprise Licensing": 25
    // "Marketplace Fees": 15
    // "Professional Services": 7
    // "Advertisements": 3
    // \`\`\`

    // ---

    // ## 5. Initial Cost Estimate for MVP Development

    // Key cost components include human resources, tools, and time:

    // | Cost Category    | Details                          | Estimated Cost |
    // | ---------------- | -------------------------------- | -------------- |
    // | Human Resources  | Developers (3) - $25k each       | $75,000        |
    // |                  | UI/UX Designers (1)              | $15,000        |
    // |                  | QA Engineer (1)                  | $10,000        |
    // | Tools & Software | Cloud Infrastructure (3 months)  | $5,000         |
    // |                  | Licensing/Third-Party APIs       | $4,000         |
    // | Time Allocation  | Development Timeline: 3-4 months | Included in HR |
    // | Miscellaneous    | Marketing Pre-launch, Legal      | $3,000         |

    // ---

    // ### Cost Breakdown Flowchart

    // \`\`\`mermaid
    // flowchart TD
    // A[Project Cost Estimate] --> B[Human Resources]
    // A --> C[Tools & Software]
    // A --> D[Time Allocation]
    // A --> E[Miscellaneous Expenses]
    // B --> B1[Developers - $75k]
    // B --> B2[Designers - $15k]
    // B --> B3[QA Engineer - $10k]
    // C --> C1[Cloud Services - $5k]
    // C --> C2[APIs/Tools - $4k]
    // D --> D1[3-4 Months Timeline]
    // E --> E1[Marketing & Legal - $3k]
    // \`\`\`

    // ---

    // ## Conclusion

    // The project management software market is vibrant and growing, but existing competitors leave significant gaps in AI-driven analytics, niche customization, and flexible pricing. Our proposed solution can leverage these gaps by focusing on AI integrations, industry-specific workflows, and subscription flexibility, backed by a reasonable MVP development budget.

    // Targeting these areas promises competitive differentiation, strong user adoption, and diversified revenue opportunities in a flourishing marketplace.

    // ---

    // # End of Report

    //     `

    //     const brd = `
    // # BUSINESS REQUIREMENTS DOCUMENT (BRD)
    // ## HealthAssistant

    // ## 1. Introduction
    // The HealthAssistant project aims to develop a retrieval-augmented generation (RAG) chatbot that provides personalized health information and guidance using Groq's LLM capabilities. The chatbot will assist users in navigating complex health topics, offering tailored advice and support. This project seeks to improve health outcomes by making high-quality health information more accessible and user-friendly.

    // ## 2. Business Objectives
    // - Enhance user engagement and retention through personalized health guidance
    // - Increase the accessibility of reliable health information for a broader audience
    // - Improve health literacy and user understanding of complex health topics
    // - Establish the HealthAssistant as a trusted source for health information and guidance
    // - Achieve a high level of user satisfaction and positive feedback

    // ## 3. Project Scope
    // The HealthAssistant project will include the following key components:
    // - Development of a RAG chatbot utilizing Groq's LLM capabilities
    // - Integration of a comprehensive health information database
    // - User registration and profile management system
    // - Personalized health guidance and recommendation engine
    // - User interface design for an intuitive and engaging user experience
    // - Integration with wearables and health tracking devices (optional)

    // ## 4. Functional Requirements
    // | Feature                   | Description                                                       | Priority |
    // | ------------------------- | ----------------------------------------------------------------- | -------- |
    // | User Registration         | Users can register using email or social media accounts          | High     |
    // | User Profile Management   | Users can manage their health profiles and preferences            | High     |
    // | Chatbot Interface          | Users can interact with the chatbot through text or voice input  | High     |
    // | Health Information Retrieval| Chatbot can retrieve and provide relevant health information     | High     |
    // | Personalized Guidance      | Chatbot offers personalized health guidance based on user input | High     |
    // | Symptom Checker           | Chatbot can help users identify potential health issues         | Medium   |
    // | Appointment Scheduling     | Integration with healthcare providers for appointment scheduling | Medium   |
    // | Wearable Integration       | Optional integration with wearables for enhanced health tracking | Low      |
    // | Health Tracking            | Users can track their health metrics and progress over time     | Medium   |
    // | Push Notifications        | System sends notifications for important health reminders       | Medium   |
    // | Data Security and Privacy  | The system must ensure user and health data security            | High     |

    // ## 5. Non-Functional Requirements
    // - **Performance**: The chatbot must respond to user queries within 2 seconds
    // - **Security**: All user and health data must be encrypted and stored securely
    // - **Scalability**: The system must support a growing user base and high traffic volumes
    // - **Availability**: The system must be available 24/7 with minimal downtime
    // - **Usability**: The user interface must be intuitive and easy to navigate
    // - **Compatibility**: The system must be compatible with multiple devices and browsers

    // ## 6. Project Constraints
    // - **Budget**: $1,000,000
    // - **Timeline**: 9 months
    // - **Team**: 10 developers, 2 designers, 1 project manager

    // ## 7. Project Acceptance Criteria
    // The project will be accepted if:
    // - All functional and non-functional requirements are met
    // - User testing and feedback are positive
    // - The system demonstrates high performance, security, and scalability
    // - Comprehensive documentation is delivered
    // - The project is completed within the specified budget and timeline

    // This BRD outlines the business needs and technical requirements for the HealthAssistant project, providing a comprehensive guide for development and implementation.
    // `

    //     const prd = `
    // # PRODUCT REQUIREMENTS DOCUMENT (PRD)
    // ## HealthAssistant

    // ### Introduction
    // The HealthAssistant project aims to develop a retrieval-augmented generation (RAG) chatbot that provides personalized health information and guidance using Groq's LLM capabilities. This PRD is based on the Business Requirements Document (BRD) for the development of the HealthAssistant application, providing technical guidance and details regarding the features to be developed.

    // ### Product Description
    // HealthAssistant is a conversational AI platform designed to assist users in navigating complex health topics, offering tailored advice and support. The application will utilize a RAG chatbot, integrating a comprehensive health information database, user registration and profile management system, personalized health guidance and recommendation engine, and an intuitive user interface.

    // ### Product Objective
    // - Enhance user engagement and retention through personalized health guidance
    // - Increase the accessibility of reliable health information for a broader audience
    // - Improve health literacy and user understanding of complex health topics
    // - Establish the HealthAssistant as a trusted source for health information and guidance
    // - Achieve a high level of user satisfaction and positive feedback

    // ### Target User
    // **1. Users:**
    // - Demographics: Individuals of all ages, with a focus on those seeking health information and guidance
    // - Psychographics: People interested in taking control of their health, seeking trustworthy advice, and valuing convenience
    // - Goals: To find accurate and personalized health information, manage their health effectively, and improve their overall well-being
    // - Behaviors: Active seekers of health information, likely to engage with health-related content, and interested in using technology to manage their health

    // **2. Healthcare Providers:**
    // - Demographics: Medical professionals, including doctors, nurses, and healthcare administrators
    // - Psychographics: Individuals committed to providing high-quality patient care, staying updated on the latest medical research, and interested in leveraging technology to enhance patient outcomes
    // - Goals: To provide accurate and reliable health information, support patients in managing their health, and stay informed about the latest medical advancements
    // - Behaviors: Regularly seeking updates on medical research, engaging with patients through digital platforms, and interested in using technology to streamline clinical workflows

    // ### Functional Requirements

    // #### 5.1 User Management

    // ##### 5.1.1 User Registration
    // - **Priority**: High
    // - Description: Users can register using email or social media accounts
    // - **User Story**: As a new user, I want to register with my email or social media account so that I can use the HealthAssistant app.
    // - **Acceptance Criteria**:
    //   - User can register using email or social media account
    //   - The system sends a verification code via email or SMS
    //   - Users can choose their preferred language and communication settings
    //   - The system stores user data securely
    //   - User receives notification of successful registration

    // ##### 5.1.2 User Login
    // - **Priority**: High
    // - Description: User can login with email or social media account
    // - **User Story**: As a registered user, I want to login with my email or social media account so that I can access my account.
    // - **Acceptance Criteria**:
    //   - User can login with email or social media account
    //   - The system provides a "forgot password" feature
    //   - The system displays a clear error message if login fails
    //   - The system provides a "remember me" option
    //   - The system records the last login time

    // ##### 5.1.3 Profile Management
    // - **Priority**: Medium
    // - Description: Users can manage their profile information
    // - **User Story**: As a user, I want to manage my profile information so that my data is always up to date.
    // - **Acceptance Criteria**:
    //   - Users can change their name, profile picture, and contact information
    //   - User can add multiple health profiles (e.g., for family members)
    //   - User can change password
    //   - System confirms data changes with verification

    // #### 5.2 Chatbot Interface

    // ##### 5.2.1 Health Information Retrieval
    // - **Priority**: High
    // - Description: Chatbot can retrieve and provide relevant health information
    // - **User Story**: As a user, I want to ask the chatbot health-related questions so that I can get accurate and reliable information.
    // - **Acceptance Criteria**:
    //   - Chatbot can understand and respond to user queries
    //   - Chatbot provides relevant and accurate health information
    //   - Chatbot can handle follow-up questions and conversations
    //   - Chatbot can provide personalized guidance based on user input
    //   - Chatbot can escalate complex queries to human healthcare professionals

    // ##### 5.2.2 Symptom Checker
    // - **Priority**: Medium
    // - Description: Chatbot can help users identify potential health issues
    // - **User Story**: As a user, I want to use the symptom checker so that I can identify potential health issues and seek medical attention if necessary.
    // - **Acceptance Criteria**:
    //   - Chatbot can ask relevant questions to identify symptoms
    //   - Chatbot can provide possible causes and recommendations for further action
    //   - Chatbot can provide resources for users to learn more about their symptoms
    //   - Chatbot can encourage users to consult with a healthcare professional if necessary

    // ##### 5.2.3 Appointment Scheduling
    // - **Priority**: Medium
    // - Description: Chatbot can integrate with healthcare providers for appointment scheduling
    // - **User Story**: As a user, I want to schedule an appointment with a healthcare provider so that I can receive medical attention.
    // - **Acceptance Criteria**:
    //   - Chatbot can provide a list of available healthcare providers
    //   - Chatbot can allow users to schedule appointments with healthcare providers
    //   - Chatbot can send reminders and notifications for upcoming appointments
    //   - Chatbot can provide resources for users to prepare for their appointments

    // #### 5.3 Health Tracking

    // ##### 5.3.1 Health Metrics Tracking
    // - **Priority**: Medium
    // - Description: Users can track their health metrics and progress over time
    // - **User Story**: As a user, I want to track my health metrics so that I can monitor my progress and make informed decisions about my health.
    // - **Acceptance Criteria**:
    //   - Users can track various health metrics (e.g., blood pressure, blood glucose, weight)
    //   - Users can view their progress over time
    //   - Users can set goals and reminders for health metrics
    //   - System provides insights and recommendations based on user data

    // ##### 5.3.2 Wearable Integration
    // - **Priority**: Low
    // - Description: Optional integration with wearables for enhanced health tracking
    // - **User Story**: As a user, I want to integrate my wearable device with the HealthAssistant app so that I can track my health metrics more accurately.
    // - **Acceptance Criteria**:
    //   - System can integrate with popular wearable devices
    //   - System can collect and analyze data from wearable devices
    //   - System can provide insights and recommendations based on wearable data

    // #### 5.4 Notifications and Reminders

    // ##### 5.4.1 Push Notifications
    // - **Priority**: Medium
    // - Description: System sends notifications for important health reminders
    // - **User Story**: As a user, I want to receive notifications for important health reminders so that I can stay on track with my health goals.
    // - **Acceptance Criteria**:
    //   - System sends notifications for appointment reminders, medication reminders, and health goal reminders
    //   - Users can customize notification settings
    //   - System can send notifications for new health information and updates

    // ##### 5.4.2 In-App Notifications
    // - **Priority**: Medium
    // - Description: System provides in-app notifications for health updates and reminders
    // - **User Story**: As a user, I want to receive in-app notifications for health updates and reminders so that I can stay informed and engaged with my health.
    // - **Acceptance Criteria**:
    //   - System provides in-app notifications for new health information, appointment reminders, and health goal reminders
    //   - Users can customize in-app notification settings
    //   - System can display notifications in a dedicated notification center

    // ### Non-Functional Requirements

    // #### 6.1 Performance
    // - Page load time is less than 2 seconds with normal internet connection
    // - Maximum API response time of 500ms
    // - System can handle at least 1000 simultaneous conversations
    // - Database can store up to 1 million user profiles
    // - Optimized bandwidth usage for users with limited connection
    // - Image optimization to speed up loading time
    // - Implementation of caching to improve performance
    // - Automatic database backup every 6 hours

    // #### 6.2 Security
    // - Implementation of HTTPS for all communications
    // - Encryption of user and health data with AES-256
    // - Implementation of token-based authentication
    // - Protection against SQL injection, XSS, and CSRF
    // - Logging of activity logs for sensitive actions
    // - Strong password policy (minimum 8 characters, combination of letters, numbers, symbols)
    // - Account blocking after multiple failed login attempts
    // - Compliance with HIPAA security standards for health data

    // #### 6.3 Scalability
    // - Microservices architecture for easy scaling
    // - Load balancing implementation for load distribution
    // - Auto-scaling based on server load
    // - Use of CDN for static content
    // - System can handle up to 100% increase in users in 6 months
    // - Distributed database to handle data growth

    // #### 6.4 Availability
    // - Uptime of at least 99.9% (less than 8.76 hours of downtime per year)
    // - Implementation of failover and redundancy
    // - Scheduled off-peak maintenance
    // - Automatic notification of system issues
    // - 24/7 system performance monitoring
    // - Disaster recovery plan with RPO < 1 hour and RTO < 4 hours

    // #### 6.5 Usability
    // - Intuitive and easy-to-use user interface
    // - Responsive design for all screen sizes
    // - Support for users with disabilities (accessibility)
    // - User guides and tooltips for complex features
    // - Consistency of design throughout the application
    // - Minimal training time for new users
    // - Support for swipe gestures in mobile apps
    // - Fast and accurate search features

    // #### 6.6 Compatibility
    // - Compatible with major browsers (Chrome, Firefox, Safari, Edge)
    // - Compatible with desktop operating systems (Windows, MacOS, Linux)
    // - Compatible with mobile operating systems (Android 7.0+, iOS 11.0+)
    // - Support for different screen resolutions
    // - Automatic adaptation to screen orientation (portrait/landscape)
    // - Support for dark mode

    // #### 6.7 Maintenance
    // - Complete code documentation
    // - Modular architecture for easy maintenance
    // - Automated testing (unit tests, integration tests)
    // - Versioning for API
    // - Regular updates without service interruption
    // - Monitoring system for performance and errors

    // #### 6.8 Internationalization
    // - Support for English as the primary language
    // - Preparation for additional language support in the future
    // - Time, date, and currency formats according to international standards
    // - Support for currency conversion (optional)

    // ### User Interface Requirements

    // #### 7.1 Home Page
    // - Introduction to the HealthAssistant app
    // - Call-to-action to register or login
    // - Featured health topics and resources
    // - User testimonials and reviews

    // #### 7.2 Chatbot Interface
    // - Conversational interface for users to interact with the chatbot
    // - Clear and concise responses from the chatbot
    // - Ability for users to ask follow-up questions and engage in conversation
    // - Visual indicators for chatbot responses (e.g., loading animations, response bubbles)

    // #### 7.3 Health Profile Page
    // - User health profile information (e.g., medical history, allergies, medications)
    // - Ability for users to edit and update their health profile
    // - Clear and concise display of user health data
    // - Visual indicators for health metrics and goals (e.g., progress bars, charts)

    // #### 7.4 Appointment Scheduling Page
    // - List of available healthcare providers
    // - Ability for users to schedule appointments with healthcare providers
    // - Clear and concise display of appointment details (e.g., date, time, location)
    // - Visual indicators for appointment reminders and notifications

    // ### Technical Requirements

    // #### 8.1 System Architecture
    // - Microservices-based architecture
    // - RESTful API for communication between front-end and back-end
    // - Single page application (SPA) for front-end
    // - Relational database for structured data
    // - NoSQL database for unstructured data (e.g., chatbot conversations, user feedback)

    // #### 8.2 Technology
    // - Front-end: React.js, React Native (for mobile apps)
    // - Back-end: Node.js/Express.js or Django/Python
    // - Database: PostgreSQL, MongoDB
    // - Caching: Redis
    // - Search Engine: Elasticsearch
    // - Message Queue: RabbitMQ
    // - CDN: Cloudflare or AWS CloudFront
    // - Hosting: AWS, Google Cloud, or Azure

    // ### Project Budget and Limitations
    // - Project Budget: $1,000,000
    // - Timeframe: 9 months
    // - Development Team: 10 people (1 Project Manager, 2 Backend Developers, 2 Frontend Developers, 1 UI/UX Designer, 1 DevOps Engineer, 1 QA Engineer, 1 Chatbot Developer, 1 Healthcare Consultant)

    // ### Project Acceptance Criteria
    // - All high and medium priority functional requirements are met
    // - Non-functional requirements are met, especially related to performance and security
    // - User testing with a minimum of 100 users shows an 80% satisfaction rate
    // - Application can handle a minimum of 1000 simultaneous conversations without performance degradation
    // - Full documentation available (user guide, technical documentation, API documentation)
    // - Passed third-party security testing

    // ### Schedule and Milestones

    // #### Milestone 1: Design and Planning (1 month)
    // - Requirements finalization
    // - UI/UX design
    // - Database design
    // - Design approval

    // #### Milestone 2: Initial Development (3 months)
    // - Basic feature development (user management, chatbot interface, health information retrieval)
    // - Integration with healthcare providers
    // - Alpha testing

    // #### Milestone 3: Advanced Development (3 months)
    // - Additional feature development (symptom checker, appointment scheduling, health tracking)
    // - Chatbot development and training
    // - Beta testing
    // - Performance optimization

    // #### Milestone 4: Finalize and Launch (2 months)
    // - User testing
    // - Bug fixes
    // - Final optimization
    // - Documentation
    // - Launch

    // ### Risk and Mitigation

    // #### Technical Risks
    // - Risks: Integration issues with healthcare providers
    //   Mitigation: Start integration early, prepare alternative integration methods
    // - Risk: Slow performance under high load
    //   Mitigation: Load testing early on, design scalable architecture

    // #### Business Risk
    // - Risk: Lack of adoption from users
    //   Mitigation: Develop a robust marketing strategy, offer incentives for early adopters
    // - Risk: Competition with established health and wellness platforms
    //   Mitigation: Focus on unique features and benefits, develop strategic partnerships with healthcare providers

    // ### Glossary
    // - RAG: Retrieval-Augmented Generation
    // - LLM: Large Language Model
    // - HIPAA: Health Insurance Portability and Accountability Act
    // - API: Application Programming Interface
    // - CDN: Content Delivery Network
    // - SPA: Single Page Application
    // - RPO: Recovery Point Objective
    // - RTO: Recovery Time Objective
    // `

    const tasks = [
        {
            title: "Setup Payment Gateway",
            description:
                "Integrate Stripe payment system for secure transactions",
            task_type: "epic",
            status: "backlog",
            position: 1,
            createdAt: "Added 2 days ago",
        },
        {
            title: "Implement Cart System",
            description:
                "Create shopping cart functionality with real-time updates",
            task_type: "feature",
            status: "backlog",
            position: 2,
            createdAt: "Added 3 days ago",
        },
        {
            title: "Design Product Page",
            description: "Create responsive layout for product details",
            task_type: "feature",
            status: "todo",
            position: 3,
            createdAt: "Added 1 day ago",
        },
        {
            title: "Setup Product Filters",
            description: "Implement category and price range filters",
            task_type: "task",
            status: "todo",
            position: 4,
            createdAt: "Added 1 day ago",
        },
        {
            title: "User Authentication",
            description: "Implement login and registration system",
            task_type: "epic",
            status: "in-progress",
            position: 5,
            createdAt: "Started 3 days ago",
        },
        {
            title: "Social Login Integration",
            description: "Add Google and Facebook login options",
            task_type: "feature",
            status: "in-progress",
            position: 6,
            createdAt: "Started 1 day ago",
        },
        {
            title: "Project Setup",
            description:
                "Initialize project and configure development environment",
            task_type: "task",
            status: "done",
            position: 7,
            createdAt: "Completed 1 week ago",
        },
        {
            title: "Database Schema Design",
            description: "Create initial database structure and relationships",
            task_type: "feature",
            status: "done",
            position: 8,
            createdAt: "Completed 5 days ago",
        },
    ];

    let showModal = $state(false);
    let showPRD = $state(false);
    let showBRD = $state(false);
    let showGithubTnc = $state(false);

    let project = $state<ProjectDetail | null>(null);
    let loading = true;
    let error = "";

    // Subscribe to the project store
    const unsubscribe = projectStore.subscribe((state) => {
        project = state.currentProject;
        loading = state.isLoading;
        error = state.error || "";
    });

    onMount(() => {
        (async () => {
            try {
                // Fetch projects and tasks in parallel
                await Promise.all([loadProject($page.params.id)]);
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
            }
        })();

        const backlog = document.getElementById("backlog");
        const todo = document.getElementById("todo");
        const inProgress = document.getElementById("in_progress");
        const done = document.getElementById("completed");

        new Sortable(backlog!, {
            group: "shared",
            animation: 300,
        });

        new Sortable(todo!, {
            group: "shared",
            animation: 300,
        });

        new Sortable(inProgress!, {
            group: "shared",
            animation: 300,
        });

        new Sortable(done!, {
            group: "shared",
            animation: 300,
        });

        return unsubscribe;
    });

    function formatDate(dateString: string | null | undefined) {
        if (!dateString) return "";
        return format(new Date(dateString), "MMM dd, yyyy");
    }
</script>

<svelte:head>
    <title>E-Commerce Website</title>
</svelte:head>

<div class="flex flex-col gap-4">
    <div class="flex flex-col gap-4 bg-white p-4 rounded-lg shadow">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="bx bx-info-circle text-xl text-primary"></i>
                <h2 class="font-medium">Project Details</h2>
            </div>
            <div class="flex gap-2">
                <button
                    class="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all"
                >
                    Edit Project
                </button>
                <button
                    on:click={() => (showGithubTnc = true)}
                    class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-all flex items-center gap-2 ml-2"
                >
                    <i class="bx bxl-github"></i>
                    Setup Project Repository
                </button>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-6 grid-flow-row text-sm">
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Project Name</span>
                <p class="font-medium">{project?.name}</p>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Objective</span>
                <p>{project?.objective}</p>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Estimated Outcome</span>
                <p class="font-medium text-red-600">
                    ${project?.estimated_outcome}
                </p>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Estimated Income</span>
                <p class="font-medium text-green-600">
                    ${project?.estimated_income}
                </p>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Start Date</span>
                <p>{formatDate(project?.start_date)}</p>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">End Date</span>
                <p>{formatDate(project?.end_date)}</p>
            </div>
            {#if project?.github_setup}
                <div class="flex flex-col gap-2 col-span-2">
                    <span class="text-gray-500">Github Repository</span>
                    <a
                        href={project?.github_setup?.repository_url}
                        class="text-primary hover:text-secondary"
                        >{project?.github_setup?.repository_url}</a
                    >
                </div>
            {/if}
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Business Requirements Detail</span>
                <button
                    on:click={() => (showBRD = true)}
                    class="bg-primary w-max text-white px-4 py-2 rounded hover:bg-secondary transition-all"
                >
                    View
                </button>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Product Requirements Detail</span>
                <button
                    on:click={() => (showPRD = true)}
                    class="bg-primary w-max text-white px-4 py-2 rounded hover:bg-secondary transition-all"
                >
                    View
                </button>
            </div>
        </div>
    </div>

    <div
        class="flex flex-col gap-4 bg-white p-4 rounded-lg shadow relative z-0"
    >
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="bx bx-desktop text-xl text-primary"></i>
                <h2 class="font-medium">Mockup Project</h2>
            </div>
            <button
                disabled
                class="disabled:opacity-50 disabled:cursor-auto bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all"
            >
                Gave Some Preview
            </button>
        </div>

        <h3 class="text-3xl text-center">Incoming...</h3>
    </div>

    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-semibold text-gray-800">Kanban Board</h1>
            <p class="text-gray-500">Manage your project tasks and progress</p>
        </div>
        <button
            on:click={() => generateProjectScope(project!.id)} 
            class="disabled:opacity-50 disabled:cursor-auto bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all"
        >
            Generate Tasks
        </button>
    </div>

    {#if project?.tasks_generated?.length === 0}
        <div class="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow">
            <i class="bx bx-task text-6xl text-gray-300 mb-4"></i>
            <h3 class="text-xl font-medium text-gray-600 mb-2">No tasks yet</h3>
            <p class="text-gray-500">Let's generate some tasks to make our project more organized!</p>
        </div>
    {:else}
        <div class="grid grid-cols-4 gap-6 overflow-hidden">
            {#each ['backlog', 'todo', 'in_progress', 'completed'] as status}
                <div class="flex flex-col gap-4 h-96 max-h-96">
                    <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow sticky top-0 z-10">
                        <div class="flex items-center gap-2">
                            {#if status === 'backlog'}
                                <i class="bx bx-list-ul text-red-500 text-xl"></i>
                            {:else if status === 'todo'}
                                <i class="bx bx-list-ul text-blue-500 text-xl"></i>
                            {:else if status === 'in_progress'}
                                <i class="bx bx-loader text-yellow-500 text-xl"></i>
                            {:else if status === 'completed'}
                                <i class="bx bx-check-double text-green-500 text-xl"></i>
                            {/if}
                            <h2 class="font-medium capitalize">{status.replace('_', ' ')}</h2>
                        </div>
                        <span class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                            {project?.tasks_generated.filter(t => t.status === status).length}
                        </span>
                    </div>

                    <div id={status} class="flex flex-col gap-3">
                        {#each (project?.tasks_generated || []).filter(t => t.status === status).sort((a, b) => a.position - b.position) as task}
                            <Item
                                id={task.id}
                                project_id={task.project_id}
                                title={task.title}
                                description={task.description}
                                status={task.status}
                                position={task.position}
                                created_at={task.created_at}
                                updated_at={task.updated_at}
                                project_name={task.project_name}
                                handleContextMenu={() => (showModal = true)}
                            />
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
    <!-- <div class="grid grid-cols-4 gap-6">
        <div class="flex flex-col gap-4">
            <div
                class="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
                <div class="flex items-center gap-2">
                    <i class="bx bx-error-circle text-red-500 text-xl"></i>
                    <h2 class="font-medium">Backlog</h2>
                </div>
                <span
                    class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                    >3</span
                >
            </div>

            <div id="backlog" class="flex flex-col gap-3 min-h-96">
                {#each tasks.filter((task) => task.status === "backlog") as task}
                    <Item
                        {...task}
                        handleContextMenu={() => (showModal = true)}
                    />
                {/each}
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <div
                class="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
                <div class="flex items-center gap-2">
                    <i class="bx bx-list-ul text-blue-500 text-xl"></i>
                    <h2 class="font-medium">Todo</h2>
                </div>
                <span
                    class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >5</span
                >
            </div>

            <div id="todo" class="flex flex-col gap-3 min-h-96">
                {#each tasks.filter((task) => task.status === "todo") as task}
                    <Item
                        {...task}
                        handleContextMenu={() => (showModal = true)}
                    />
                {/each}
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <div
                class="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
                <div class="flex items-center gap-2">
                    <i class="bx bx-loader text-yellow-500 text-xl"></i>
                    <h2 class="font-medium">In Progress</h2>
                </div>
                <span
                    class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                    >2</span
                >
            </div>

            <div id="in-progress" class="flex flex-col gap-3 min-h-96">
                {#each tasks.filter((task) => task.status === "in-progress") as task}
                    <Item
                        {...task}
                        handleContextMenu={() => (showModal = true)}
                    />
                {/each}
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <div
                class="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
                <div class="flex items-center gap-2">
                    <i class="bx bx-check-double text-green-500 text-xl"></i>
                    <h2 class="font-medium">Done</h2>
                </div>
                <span
                    class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                    >8</span
                >
            </div>
            <div id="done" class="flex flex-col gap-3 min-h-96">
                {#each tasks.filter((task) => task.status === "done") as task}
                    <Item
                        {...task}
                        handleContextMenu={() => (showModal = true)}
                    />
                {/each}
            </div>
        </div>
    </div> -->

    <div class="flex flex-col gap-4 bg-white p-4 rounded-lg shadow">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="bx bx-search text-xl text-primary"></i>
                <h2 class="font-medium">Market Research</h2>
            </div>
            {#if project?.market_research?.status === "not_started" || !project?.market_research}
                <button
                    on:click={() => validateMarketFit(project!.id)}
                    class="disabled:opacity-50 bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all"
                >
                    Generate Market Research
                </button>
            {:else if project?.market_research?.status === "in_progress"}
                <div class="flex items-center gap-2">
                    <div
                        class="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"
                    ></div>
                    <span class="text-gray-600">Generating...</span>
                </div>
            {:else if project?.market_research?.status === "failed"}
                <button
                    on:click={() => validateMarketFit(project!.id)}
                    class="disabled:opacity-50 bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all"
                >
                    Try Again
                </button>
            {/if}
        </div>

        {#if project?.market_research?.status === "completed" && project?.market_research?.report_markdown}
            <Market markdown={project?.market_research?.report_markdown} />
        {:else if project?.market_research?.status === "in_progress"}
            <div class="flex flex-col items-center justify-center py-8">
                <div
                    class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"
                ></div>
                <p class="text-gray-600">Generating market research...</p>
            </div>
        {:else if project?.market_research?.status === "failed"}
            <div class="flex flex-col items-center justify-center py-8">
                <i class="bx bx-error-circle text-4xl text-red-500 mb-2"></i>
                <p class="text-gray-600">Failed to generate market research</p>
            </div>
        {:else}
            <div class="flex flex-col items-center justify-center py-8">
                <i class="bx bx-search text-4xl text-gray-400 mb-2"></i>
                <p class="text-gray-600">No market research available</p>
            </div>
        {/if}
    </div>
</div>

{#if showModal}
    <Modal close={() => (showModal = false)} />
{/if}

{#if showBRD}
    <Brd brd={project?.brd} id={project!.id} close={() => (showBRD = false)} />
{/if}

{#if showPRD}
    <Prd prd={project?.prd} id={project!.id} close={() => (showPRD = false)} />
{/if}

{#if showGithubTnc}
    <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
        <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-semibold">GitHub Terms & Conditions</h3>
                <button
                    class="text-gray-500 hover:text-gray-700"
                    on:click={() => (showGithubTnc = false)}
                >
                    <i class="bx bx-x text-2xl"></i>
                </button>
            </div>

            <div class="prose prose-sm max-h-96 overflow-y-auto mb-4">
                <p>By connecting your GitHub account, you agree to:</p>
                <ul class="list-disc pl-4 space-y-2">
                    <li>Grant read-only access to your public repositories</li>
                    <li>Allow us to store relevant repository data</li>
                    <li>
                        Use this data for project analysis and recommendations
                    </li>
                    <li>Maintain the confidentiality of your sensitive data</li>
                </ul>
                <p class="mt-4">We will not:</p>
                <ul class="list-disc pl-4 space-y-2">
                    <li>Access your private repositories</li>
                    <li>Make changes to your repositories</li>
                    <li>Share your data with third parties</li>
                </ul>
            </div>

            <div class="flex justify-end gap-3">
                <button
                    class="px-4 py-2 text-gray-600 hover:text-gray-800"
                    on:click={() => (showGithubTnc = false)}
                >
                    Cancel
                </button>
                <button
                    class="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors"
                    on:click={() => {
                        showGithubTnc = false;
                        // Add GitHub connection logic here
                    }}
                >
                    Agree & Continue
                </button>
            </div>
        </div>
    </div>
{/if}
