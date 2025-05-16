export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow container mx-auto px-4 py-8">
          {/*
            'flex-grow' is the KEY for the main content area to expand
            and push the footer down.
            'container mx-auto px-4 py-8' are just example styling for content.
          */}
          {children}
        </main>
        <footer className="bg-gray-100 dark:bg-gray-800 text-center p-6 mt-auto">
          {/* mt-auto will push the footer to the bottom if the main content is short,
          assuming the parent container is a flex column with min-height: 100vh */}
          <p className="text-gray-600 dark:text-gray-300">
            &copy; 2025 Your Company Name. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="/privacy" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="text-blue-500 hover:underline">
              Terms of Service
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
