# Zenvue - Your Feed, Your Rules

**Our Vision:** Zenvue is pioneering a new advertising paradigm centered on user choice and empowerment. We are building the essential bridge between discovery and purchase, creating a win-win ecosystem where consumers control their feed, brands connect with engaged audiences, and value is shared equitably.

---

This is a Next.js application for Zenvue, a platform that allows users to take control of their ad experience.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN/UI](https://ui.shadcn.com/)
- **Backend & Database:** [Firebase](https://firebase.google.com/) (Authentication, Firestore)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or later recommended)
- `npm` or your favorite package manager

### Firebase Setup

The project is pre-configured to connect to a Firebase project. The configuration details are located in `src/lib/firebase.ts`.

For the application to function correctly, ensure that:
1.  You have a Firebase project created.
2.  **Firestore** is enabled.
3.  **Anonymous Authentication** is enabled in the Firebase Authentication service.
4.  The appropriate Firestore Security Rules are in place. The required rules are in the `firestore.rules` file.

### Installation

1.  Clone the repository to your local machine.
2.  Install the necessary dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

Once the dependencies are installed, you can start the local development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
