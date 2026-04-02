import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import { MessageProvider } from "./providers/MessageProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Navbar></Navbar>
        <div className="container mt-4">
          <MessageProvider>{children}</MessageProvider>
        </div>
      </body>
    </html>
  );
}
