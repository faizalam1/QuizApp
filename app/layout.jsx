import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Core Quiz App",
  description: "A quiz app built with Next.js and React.",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body className="w-full h-screen">
      <Provider>
        <div className='main w-full'>
          <div className='gradient' />
        </div>

        <main className='app w-full'>
          <Nav className="z-50" />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
