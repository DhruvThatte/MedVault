export function Footer() {
  return (
    <footer className="bg-card py-6 text-center shadow-sm border-t">
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MedVault. Secure Health Records on Solana.
        </p>
      </div>
    </footer>
  );
}
