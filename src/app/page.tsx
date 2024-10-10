import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Landing Page</h1>
      <div className="home-links">
        <Link href="/login" className="home-link">
          Go to Log In
        </Link>
        <br />
        <Link href="/signup" className="home-link">
          Go to Sign Up
        </Link>
      </div>
    </div>
  );
}
