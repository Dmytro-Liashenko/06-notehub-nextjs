import "./global.module.css";
import Header from "@components/Header/Header"
import Footer from "@components/Footer/Footer";
import TanStackProvider from "@components/TanStackProvider/TanStackProvider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header/>
          {children}
          <Footer/>
          <div id="modal-root"></div>
        </TanStackProvider>
      </body>
    </html>
  );
} 
