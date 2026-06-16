# Dravidian Campus Website - Project Overview

## Purpose

This website was built for **Dravidian Campus**, a coaching institute that provides:

* Tuition Classes
* Competitive Exam Preparation
* Computer Classes
* Spoken English 
* Library Facilities
* AC Library Facilities

The goal is to:

1. Generate admissions.
2. Improve Google search rankings.
3. Improve Google Business visibility.
4. Collect student inquiries.


5. Prepare for future CRM integration.

---

# Tech Stack

## Frontend

* HTML5
* Tailwind CSS
*  JavaScript

## Backend

(Current)

* Node.js
* Express.js
* Nodemailer

(Future)

* Student Management CRM
* Fee Tracking
* Bill Generation
* Authentication

---

# Current Features

## Homepage

Contains:

* Hero Section
* Services Overview
* Coaching Section
* Computer Training Section
* Library Section
* Admission Form
* Statistics Section
* Contact Section
* CTA Sections
* Footer

---

## Inquiry Form

Students can submit:

* Full Name
* Phone Number
* Course
* Message

Frontend validation includes:

* Required fields
* Phone number validation

Backend:

POST

```http
/new-admission
```

Email notification sent to admin.

---

# SEO Strategy

## Location Target

Primary location:

Chauhan Patti

Secondary future locations:


---

## SEO Pages Created

### 1.

```text
/best-coaching-center-in-chauhan-patti.html
```

Target keywords:

* Best Coaching Center In Chauhan Patti
* Coaching Classes In Chauhan Patti

---

### 2.

```text
/computer-classes-in-chauhan-patti.html
```

Target keywords:

* Computer Classes In Chauhan Patti
* Tally Classes In Chauhan Patti
* Python Classes In Chauhan Patti
* Java Classes In Chauhan Patti
* Best Institute In Chuahan Patti
* Best Tuition Classes In Chauhan Patti
* Best Tuition Classes In Loni
* Best Spoken Class In Chauhan Patti
* Best Library In Chauhan Patti

---

### 3.

```text
/best-library-in-chauhan-patti.html
```

Target keywords:

* Best Library In Chauhan Patti
* Study Library In Chauhan Patti
* Reading Room In Chauhan Patti
* Best Coaching Classes
* Best Tuition Classes
* Best Science Stream Classes
* Best Maths Classes
* Best English Classes
* Best Political Science Classes
* Best History Classes
* Best Geography  Classes
* Best Sanskrit Classes
* Best Economics Classes
* Best Account Classes
* Best Business Study Classes
* Best English Speaking Classes


//____Computer Classes Goes here ____//

---

### 4.

```text
/ac-library-in-chauhan-patti.html
```

Target keywords:

* AC Library In Chauhan Patti
* Air Conditioned Library In Chauhan Patti

---

### 5.

```text
/spoken-english-classes-in-chauhan-patti.html
```

Target keywords:

* Spoken English Classes In Chauhan Patti
* English Speaking Classes In Chauhan Patti

---

# SEO Structure

Each SEO page contains:

## Hero Section

* Main keyword in H1
* Service image
* CTA button

## Content Sections

* 800–1200 words
* Keyword naturally distributed

## FAQ Section

Modern accordion FAQ

Used for:

* User experience
* Rich snippets
* Long-tail keywords

## Internal Linking

Each page links to:

* Coaching Page
* Computer Page
* Library Page
* Spoken English Page

Purpose:

* Better crawlability
* Better SEO authority distribution

---

# Images Required

## Campus

* Front View
* Signboard
* Building Exterior

## Coaching

* Classroom
* Teacher Teaching
* Students Studying

## Computer Lab

* Lab Overview
* Students Practicing

## Library

* Reading Hall
* Study Area

## AC Library

* AC Study Hall
* Premium Seating

## Spoken English

* Discussion Sessions
* Classroom Training

## Additional

* Faculty Photos
* Events
* Workshops
* Student Achievements

---

# Google Business Optimization

Description includes:

* Coaching
* Library
* Computer Classes

Target terms:

* Best Coaching Center In Chauhan Patti
* Best Library In Chauhan Patti
* Computer Classes In Chauhan Patti

Future:

* Weekly Posts
* Photo Uploads
* Student Reviews

---

# Current Backend Structure

## Controllers

### email.controller.ts

Responsibilities:

* Receive admission form requests
* Validate request body
* Call email service

---

## Services

### email.service.ts

Responsibilities:

* Format email content
* Send emails using Nodemailer

---

## Routes

Example:

```text
POST /new-admission
```

---

# Future CRM Roadmap

## Student Module

Fields:

* Student Name
* Father Name
* Phone Number
* Address
* Course
* Admission Date

---

## Fee Module

Fields:

* Total Fees
* Paid Fees
* Due Fees
* Payment History

---

## Library Module

Fields:

* Membership Type
* Start Date
* Expiry Date

---

## Attendance Module

Fields:

* Date
* Present
* Absent

---

## Bill Generation

Planned using:

* @libpdf/core

Features:

* Dynamic bill generation
* Fee receipts
* Student payment slips

---

# Future Features

## High Priority

### Gallery Page

```text
/gallery.html
```

Campus photos and events.

---

### Results Page

```text
/results.html
```

Topper and achievement showcase.

---

### Fee Structure Page


/fees.html


Course pricing.

---

### Course Detail Pages

Examples:

```text
/tally-course-in-chauhan-patti.html

/python-course-in-chauhan-patti.html

/java-course-in-chauhan-patti.html

/ms-excel-course-in-chauhan-patti.html
```

---

### Blog Section

Examples:

* Study Tips
* Board Exam Preparation
* Computer Learning Guides
* Library Benefits

Purpose:

Generate organic traffic.

---

# Design System

## Primary Colors

Background:

```css
#FAEED4
```

Dark Brown:

```css
#251901
```

Accent:

```css
Orange
```

---

## Components

Reusable:

* Hero Section
* FAQ Accordion
* CTA Section
* Service Cards
* Contact Form

---

# Deployment

Frontend:

* Hostinger

Domain:

* GoDaddy

Backend :

* Planning (looking for free one if available)
---

# Important Notes For Future Developers

1. Preserve internal links between SEO pages.
2. Keep keyword stuffing low.
3. Use original campus images.
4. Maintain consistent FAQ design.
5. Reuse existing CTA sections.
6. Backend should remain API-first.
7. CRM should be developed separately from public website pages.
8. Bill generation already planned around @libpdf/core.
9. Student, Fee, Attendance, and Library modules should remain independent services.
10. All future SEO pages should follow the same page template already established.
