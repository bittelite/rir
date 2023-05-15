import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export function Layout({ children }) {
    return (
      <>
        <div className="grid place-items-center">
            <Navigation />
                <main>{children}</main>
            <Footer />
        </div>
      </>
    );
  }