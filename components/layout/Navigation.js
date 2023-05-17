import Link from "next/link";

export function Navigation({  }) {
    return (
      <>
        <nav>
            <div className="grid place-items-center p-6">
              <Link href="/">
              <img src="/rir_logo_full.png" width="120px" height="auto" />
              </Link>
            </div>
        </nav>
      </>
    );
  }