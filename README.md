# MedVault

MedVault is a decentralized health records management application that leverages Solana blockchain and Firebase to securely manage and share medical records.

## Features

- **Solana Wallet Authentication**: Users can authenticate using their Solana wallet via Phantom on the Devnet network.
- **Role-Based Dashboard**: Separate dashboards for patients and doctors with role-specific functionalities.
- **Medical Record Management**: Patients can upload, view, and manage their health records with metadata like title, description, and file URL.
- **Record Sharing**: Patients can share their records with doctors by adding their wallet addresses to an access list.
- **Responsive UI**: Includes a landing page, dashboard, upload form, and record viewing interface.

## Project Structure

```
MedVault/
├── public/ # Static assets (icons, manifest, etc.)
├── src/
│ ├── app/ # Next.js App Router pages and layout
│ │ ├── page.tsx # Main landing page
│ │ ├── layout.tsx # Root layout with providers
│ │ └── upload/ # Upload form page
│ ├── components/ # Reusable UI components
│ │ ├── WalletConnect.tsx # Solana wallet connect button
│ │ └── ... # Other UI components
│ ├── lib/ # Firebase, Solana config & utilities
│ │ ├── firebase.ts # Firebase config and init
│ │ └── solana.ts # Solana wallet adapter config
│ ├── types/ # TypeScript interfaces and types
│ ├── validators/ # Zod schema validators
│ └── app/actions/ # Server actions (upload, fetch records, etc.)
├── .firebaserc # Firebase project config
├── firebase.json # Firebase hosting and rules setup
├── firestore.rules # Firestore security rules
├── firestore.indexes.json # Firestore index definitions
├── next.config.js # Next.js config (static export for Firebase)
├── package.json # Project metadata and dependencies
└── README.md # Project overview and setup
```

### Key Directories

- **`src/app/`**: Contains the main application pages and layout components.
- **`src/components/`**: Reusable UI components like authentication, layout, and records management.
- **`src/lib/`**: Utility functions and integrations (e.g., Firebase, Solana).
- **`docs/`**: Documentation, including the project blueprint and style guidelines.
- **`public/`**: Static assets like the Firebase initialization scripts and index.html.

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Functions)
- **Blockchain**: Solana (Phantom Wallet integration)

## Getting Started

### Prerequisites

- Node.js and npm installed
- Phantom Wallet extension installed
- Firebase project setup

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/medvault.git
   cd medvault
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Update Firebase configuration in `firebase.ts` under `src/lib/`.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the app in your browser:
   ```
   http://localhost:3000
   ```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
